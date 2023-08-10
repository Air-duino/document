---
title: PWM
---

PWM，即Pulse Width Modulation（脉宽调制）是是利用微处理器的数字输出来对模拟电路进行控制的一种非常有效的技术，广泛应用在测量、通信、工控等方面。

## PWM 通用 API

### analogWrite

此函数用于设置 PWM 输出的占空比

```cpp
void analogWrite(uint32_t ulPin, uint32_t ulValue)
```

- `ulPin`：要设置的 PWM 输出引脚
- `ulValue`：占空比

## AirMCU 专用 API

### analogWriteFrequency

此函数用于设置 `analogWrite()` 使用的频率。默认值为 `PWM_FREQUENCY (1000)`，单位为赫兹。

```cpp
void analogWriteFrequency(uint32_t freq);
```

- `freq`：要设置的频率

::: note
频率对于指定定时器的所有通道是通用的，为一个通道设置频率将影响同一定时器的所有其他通道。
:::

### analogWriteResolution

此函数用于设置 analogWrite 参数的分辨率。默认为 8 位（范围为 0 至 255）。

```cpp
void analogWriteResolution(int bits);
```

- `bits`：要设置的分辨率
