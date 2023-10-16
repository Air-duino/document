---
title: 硬件定时器
icon: fa-solid fa-clock
---

`HardwareTimer`库旨在提供对部分AirMCU硬件定时器功能的访问（如果需要其他功能，可以通过HAL/LL访问它们）。

使用该库假设您对 AirMCU 硬件定时器架构有一些基本了解。首先提醒一下，所有定时器并不等同，也不支持相同的功能。请参阅您的 MCU 的参考手册。

一些例子：
1. `TIM6` 和 `TIM7` 没有输出的引脚，这就是为什么在可用时，它们被用于实现 `Tone` 和 `Servo`。
2. 有些定时器有多达 4 个输出通道，其中有 4 个互补通道，而其他定时器则没有互补通道，或者只有 1 或 2 个通道...

每个定时器可以提供多个通道，但是重要的是要理解同一定时器的所有通道共享相同的计数器，因此具有相同的周期/频率。

::: warning
出于通用性目的，`HardwareTimer` 库使用所有定时器，如 16 位定时器（即使有些定时器的位数更多）。
:::

## API接口

```cpp
    void pause(void);  // Pause counter and all output channels
    void pauseChannel(uint32_t channel); // Timer is still running but channel (output and interrupt) is disabled
    void resume(void); // Resume counter and all output channels
    void resumeChannel(uint32_t channel); // Resume only one channel

    void setPrescaleFactor(uint32_t prescaler); // set prescaler register (which is factor value - 1)
    uint32_t getPrescaleFactor();

    void setOverflow(uint32_t val, TimerFormat_t format = TICK_FORMAT); // set AutoReload register depending on format provided
    uint32_t getOverflow(TimerFormat_t format = TICK_FORMAT); // return overflow depending on format provided

    void setPWM(uint32_t channel, PinName pin, uint32_t frequency, uint32_t dutycycle, callback_function_t PeriodCallback = nullptr, callback_function_t CompareCallback = nullptr); // Set all in one command freq in HZ, Duty in percentage. Including both interrup.
    void setPWM(uint32_t channel, uint32_t pin, uint32_t frequency, uint32_t dutycycle, callback_function_t PeriodCallback = nullptr, callback_function_t CompareCallback = nullptr);

    void setCount(uint32_t val, TimerFormat_t format = TICK_FORMAT); // set timer counter to value 'val' depending on format provided
    uint32_t getCount(TimerFormat_t format = TICK_FORMAT);  // return current counter value of timer depending on format provided

    void setMode(uint32_t channel, TimerModes_t mode, PinName pin = NC); // Configure timer channel with specified mode on specified pin if available
    void setMode(uint32_t channel, TimerModes_t mode, uint32_t pin);

    TimerModes_t getMode(uint32_t channel);  // Retrieve configured mode

    void setPreloadEnable(bool value); // Configure overflow preload enable setting

    uint32_t getCaptureCompare(uint32_t channel, TimerCompareFormat_t format = TICK_COMPARE_FORMAT); // return Capture/Compare register value of specified channel depending on format provided
    void setCaptureCompare(uint32_t channel, uint32_t compare, TimerCompareFormat_t format = TICK_COMPARE_FORMAT);  // set Compare register value of specified channel depending on format provided

    void setInterruptPriority(uint32_t preemptPriority, uint32_t subPriority); // set interrupt priority

    //Add interrupt to period update
    void attachInterrupt(callback_function_t callback); // Attach interrupt callback which will be called upon update event (timer rollover)
    void detachInterrupt();  // remove interrupt callback which was attached to update event
    bool hasInterrupt();  //returns true if a timer rollover interrupt has already been set
    //Add interrupt to capture/compare channel
    void attachInterrupt(uint32_t channel, callback_function_t callback); // Attach interrupt callback which will be called upon compare match event of specified channel
    void detachInterrupt(uint32_t channel);  // remove interrupt callback which was attached to compare match event of specified channel
    bool hasInterrupt(uint32_t channel);  //returns true if an interrupt has already been set on the channel compare match
    void timerHandleDeinit();  // Timer deinitialization

    // Refresh() is usefull while timer is running after some registers update
    void refresh(void); // Generate update event to force all registers (Autoreload, prescaler, compare) to be taken into account

    uint32_t getTimerClkFreq();  // return timer clock frequency in Hz.

    static void captureCompareCallback(TIM_HandleTypeDef *htim); // Generic Caputre and Compare callback which will call user callback
    static void updateCallback(TIM_HandleTypeDef *htim);  // Generic Update (rollover) callback which will call user callback

    // The following function(s) are available for more advanced timer options
    TIM_HandleTypeDef *getHandle();  // return the handle address for HAL related configuration
    int getChannel(uint32_t channel);
    int getLLChannel(uint32_t channel);
    int getIT(uint32_t channel);
    int getAssociatedChannel(uint32_t channel);
#if defined(TIM_CCER_CC1NE)
    bool isComplementaryChannel[TIMER_CHANNELS];
#endif
```

## 使用方式

1. `HardwareTimer` 是一个 C++ 类，要做的第一件事是以 `TIM` 实例作为参数实例化一个对象。

::: note
有些实例由 Servo、Tone 和 SoftSerial 使用（请参阅 TIMER_SERVO、TIMER_TONE 和 TIMER_SERIAL），但仅在使用时使用。只要确保与您自己的使用没有冲突即可。
:::

```cpp
HardwareTimer *MyTim = new HardwareTimer(TIM3);  // TIM3 is MCU hardware peripheral instance, its definition is provided in CMSIS
```

2. 然后就可以配置通道的模式。

::: note
无需配置引脚模式（输出/输入/AlternateFunction），它将由 HardwareTimer 库自动完成。
:::

::: note
通道范围[1..4]，但并非所有定时器都支持4个通道。
:::

```cpp
MyTim->setMode(channel, TIMER_OUTPUT_COMPARE_PWM1, pin);
```

支持模式有：

```cpp
typedef enum {
  TIMER_DISABLED,                         // == TIM_OCMODE_TIMING           no output, useful for only-interrupt
  // Output Compare
  TIMER_OUTPUT_COMPARE,                   // == Obsolete, use TIMER_DISABLED instead. Kept for compatibility reason
  TIMER_OUTPUT_COMPARE_ACTIVE,            // == TIM_OCMODE_ACTIVE           pin is set high when counter == channel compare
  TIMER_OUTPUT_COMPARE_INACTIVE,          // == TIM_OCMODE_INACTIVE         pin is set low when counter == channel compare
  TIMER_OUTPUT_COMPARE_TOGGLE,            // == TIM_OCMODE_TOGGLE           pin toggles when counter == channel compare
  TIMER_OUTPUT_COMPARE_PWM1,              // == TIM_OCMODE_PWM1             pin high when counter < channel compare, low otherwise
  TIMER_OUTPUT_COMPARE_PWM2,              // == TIM_OCMODE_PWM2             pin low when counter < channel compare, high otherwise
  TIMER_OUTPUT_COMPARE_FORCED_ACTIVE,     // == TIM_OCMODE_FORCED_ACTIVE    pin always high
  TIMER_OUTPUT_COMPARE_FORCED_INACTIVE,   // == TIM_OCMODE_FORCED_INACTIVE  pin always low

  //Input capture
  TIMER_INPUT_CAPTURE_RISING,             // == TIM_INPUTCHANNELPOLARITY_RISING
  TIMER_INPUT_CAPTURE_FALLING,            // == TIM_INPUTCHANNELPOLARITY_FALLING
  TIMER_INPUT_CAPTURE_BOTHEDGE,           // == TIM_INPUTCHANNELPOLARITY_BOTHEDGE

  // Used 2 channels for a single pin. One channel in TIM_INPUTCHANNELPOLARITY_RISING another channel in TIM_INPUTCHANNELPOLARITY_FALLING.
  // Channels must be used by pair: CH1 with CH2, or CH3 with CH4
  // This mode is very useful for Frequency and Dutycycle measurement
  TIMER_INPUT_FREQ_DUTY_MEASUREMENT,

  TIMER_NOT_USED = 0xFFFF  // This must be the last item of this enum
} TimerModes_t;
```

3. 然后就可以配置`PrescalerFactor`。定时器时钟将除以该因子（如果定时器时钟为 10Khz，预分频器因子为 2，则定时器将以 5kHz 计数）。

:::note
将方法 `setOverflow` 与 `format == MICROSEC_FORMAT` 或 `format == HERTZ_FORMAT` 一起使用时，预分频器的配置是自动的。
:::

::: note
预分频器用于定时器计数器，因此对所有通道都是通用的。
:::

::: note
预分频器因子范围：[1..0x10000]（硬件寄存器范围为[0..0xFFFF]）。
:::

```cpp
MyTim->setPrescaleFactor(8);
```

4. 然后就可以配置溢出（也称为翻转或更新）。

对于输出，它对应于周期或频率。

对于输入捕获，建议使用最大值：0x10000，以避免在捕获发生之前发生翻转。

::: note

将方法 setOverflow 与 format == MICROSEC_FORMAT 或 format == HERTZ_FORMAT 一起使用时，预分频器的配置是自动的。

溢出是所有通道共有的。

溢出范围：[1..0x10000]（硬件寄存器的范围为[0..0xFFFF]）。

:::

```cpp
MyTim->setOverflow(10000); // Default format is TICK_FORMAT. Rollover will occurs when timer counter counts 10000 ticks (it reach it count from 0 to 9999)
MyTim->setOverflow(10000, TICK_FORMAT);
MyTim->setOverflow(10000, MICROSEC_FORMAT); // 10000 microseconds
MyTim->setOverflow(10000, HERTZ_FORMAT); // 10 kHz
```

5. 然后可以配置 CaptureCompare（通道特定的 CaptureCompare 寄存器）。

::: note
CaptureCompare 仅适用于一个通道。

CaptureCompare 范围：[0.. 0xFFFF]
:::

```cpp
MyTim->setCaptureCompare(channel, 50); // Default format is TICK_FORMAT. 50 ticks
MyTim->setCaptureCompare(channel, 50, TICK_FORMAT)
MyTim->setCaptureCompare(channel, 50, MICROSEC_COMPARE_FORMAT); // 50 microseconds    between counter resetand compare
MyTim->setCaptureCompare(channel, 50, HERTZ_COMPARE_FORMAT); // 50 Hertz -> 1/50    seconds between counterreset and compare
MyTim->setCaptureCompare(channel, 50, RESOLUTION_8B_COMPARE_FORMAT); // used for    Dutycycle: [0.. 255]
MyTim->setCaptureCompare(channel, 50, RESOLUTION_12B_COMPARE_FORMAT); // used for   Dutycycle: [0.. 4095]
```

可以在更新中断（翻转）和/或捕获/比较中断上附加用户回调。如果未指定通道，则用户回调将附加到更新事件。请注意，更新中断标志 (UIF) 在更新事件发生并生成中断时设置，并在执行用户回调之前由 HAL 驱动程序自动清除。用户回调无需显式清除 UIF。

```cpp
MyTim->attachInterrupt(Update_IT_callback); // Userdefined call back. See 'Examples' chapter to see how to use callback with or without parameter
MyTim->attachInterrupt(channel, Compare_IT_callback); // Userdefined call back. See 'Examples' chapter to see how to use callback with or without parameter
```

6. 现在可以启动定时器了

::: note
同一定时器的所有通道同时启动（因为每个定时器只有 1 个计数器）。
:::

```cpp
MyTim->resume();
```

计时器可以暂停然后恢复

```cpp
MyTim->pause();
// ...
MyTim->resume();
```

以下是完整 PWM 配置的示例:

```cpp
MyTim->setMode(channel, TIMER_OUTPUT_COMPARE_PWM1, pin);
// MyTim->setPrescaleFactor(8); // Due to setOverflow with MICROSEC_FORMAT, prescaler   will be computedautomatically based on timer input clock
MyTim->setOverflow(100000, MICROSEC_FORMAT); // 10000 microseconds = 10 milliseconds
MyTim->setCaptureCompare(channel, 50, PERCENT_COMPARE_FORMAT); // 50%
MyTim->attachInterrupt(Update_IT_callback);
MyTim->attachInterrupt(channel, Compare_IT_callback);
MyTim->resume();
```

为了简化基本 PWM 配置，提供了专用的一体化 API。溢出/频率以赫兹为单位，占空比以百分比为单位。

```cpp
MyTim->setPWM(channel, pin, 5, 10, NULL, NULL); // No callback required, we can   simplify the function call
MyTim->setPWM(channel, pin, 5, 10); // 5 Hertz, 10% dutycycle
```

一些额外的 API 允许检索配置：

```cpp
getPrescaleFactor();
getOverflow();
getCaptureCompare(); // In InputCapture mode, this method doesn't retrieve configuration   but retrieve thecaptured counter value
getCount();
```

另外，要使用中断回调：

```cpp
detachInterrupt()
```

::: note
一旦计时器启动并启用回调，您可以通过 `detachInterrupt` 和 `attachInterrupt` 自由禁用和启用回调，次数不限。但是，如果第一个 resume （= 计时器启动）在调用 `attachInterrupt` 之前完成，则 `HardwareTimer` 将无法稍后附加中断（出于性能原因，计时器将启动禁用中断）
:::

如果在定时器运行时分离和附加中断，您还可以通过该方法知道是否已经附加了回调（无需在外部跟踪它）

```cpp
hasInterrupt()
```
