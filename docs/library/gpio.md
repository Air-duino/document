---
title: GPIO
icon: lightbulb
---

## About

GPIO 是微控制器中最常用和通用的外设之一。 GPIO 通常用于写入和读取引脚状态。

GPIO代表通用输入输出，负责控制或读取数字世界中特定引脚的状态。例如，该外设广泛用于创建 LED 闪烁或读取简单的按钮。

::: note
有些 GPIO 有特殊限制，并非所有 GPIO 都可以通过开发板访问。欲了解更多信息，请参阅相应的板引脚布局信息。
:::

## GPIO 模式

GPIO 配置有两种不同的模式：

- Input Mode （输入模式）

在此模式下，GPIO 将从特定设备接收数字状态。该设备可以是按钮或开关。

- Output Mode （输出模式）

对于输出模式，GPIO 会将 GPIO 数字状态更改为特定设备。例如，您可以驱动 LED。

## GPIO API

以下是 GPIO 外设的常用函数。

### pinMode

`pinMode` 函数用于定义特定引脚的GPIO操作模式。

```cpp
void pinMode(uint32_t ulPin, uint32_t ulMode)
```

- `ulPin`：要配置的引脚号。
- `ulMode`：要设置的模式。可以是以下值之一：

  - `INPUT`：输入模式。
  - `OUTPUT`：输出模式。
  - `INPUT_PULLUP`：输入模式，但是在引脚上启用内部上拉电阻。
  - `INPUT_PULLDOWN`：输入模式，但是在引脚上启用内部下拉电阻。
  - `INPUT_ANALOG`：模拟输入模式。
  - `OUTPUT_OPENDRAIN`：输出模式，但是在引脚上启用开漏输出。

### 内部上拉和下拉

AirMCU 系列通过内部大约 40k 电阻支持内部上拉和下拉，可在将 GPIO 模式配置为 INPUT 模式时启用。如果未定义上拉或下拉模式，引脚将保持在高阻抗模式。

### digitalWrite

函数 `digitalWrite` 将所选 GPIO 的状态设置为 HIGH 或 LOW 。仅当 `pinMode` 配置为 OUTPUT 时才使用此函数。

```cpp
void digitalWrite(uint32_t ulPin, uint32_t ulVal)
```

- `ulPin`：要配置的引脚号。
- `ulVal`：要设置的值。可以是以下值之一：

  - `HIGH`：将引脚状态设置为高电平。
  - `LOW`：将引脚状态设置为低电平。

### digitalRead

要读取配置为 `INPUT` 的给定引脚的状态，请使用函数 `digitalRead`。

```cpp
int digitalRead(uint32_t ulPin)
```

- `ulPin`：要配置的引脚号。
- 返回值：引脚状态。可以是以下值之一：

  - `HIGH`：引脚状态为高电平。
  - `LOW`：引脚状态为低电平。

## Interrupts （中断）

AirMCU 上的 GPIO 外设支持中断。

### attachInterrupt

函数 `attachInterrupt` 用于将中断附加到定义的引脚。

```cpp
void attachInterrupt(uint32_t pin, callback_function_t callback, uint32_t mode)
```

- `pin`：要配置的引脚号。
- `callback`：中断回调函数。
- `mode`：中断触发模式。可以是以下值之一：

  - `CHANGE`：引脚状态发生变化时触发中断。
  - `RISING`：引脚状态从低电平变为高电平时触发中断。
  - `FALLING`：引脚状态从高电平变为低电平时触发中断。
  - `LOW`：引脚状态为低电平时触发中断。
  - `HIGH`：引脚状态为高电平时触发中断。

### detachInterrupt

要从特定引脚分离中断，请使用 `detachInterrupt` 函数来分离 GPIO。

```cpp
void detachInterrupt(uint32_t channel)
```

- `channel`：要分离的引脚号。

## 示例代码

### GPIO 输入和输出模式

```cpp
const auto LED = PB0;
const auto BUTTON = PF4;

uint8_t stateLED = 0;

void setup() {
    pinMode(LED, OUTPUT);
    pinMode(BUTTON,INPUT_PULLUP);
}

void loop() {
   if(!digitalRead(BUTTON)){
     stateLED = stateLED^1;
    digitalWrite(LED,stateLED);
  }
}
```

### GPIO 中断

```cpp
const auto ledPin = PB0;
 
const auto interruptPin = PF4;  
 
volatile byte state = LOW;
 
void setup() {
  pinMode(ledPin, OUTPUT);
 
  pinMode(interruptPin, INPUT_PULLDOWN); 
 
  attachInterrupt(digitalPinToInterrupt(interruptPin), blink, CHANGE);
}
 
void loop() {
  digitalWrite(ledPin, state);
}
 
void blink() {
  state = !state;
}
```
