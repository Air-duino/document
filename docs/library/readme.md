---
title: 文档概述
order: 1
icon: certificate
---

## 支持的外设

目前，AirMCU 通过 Arduino API 支持以下外设。

| 外设 | Air001 | Air32F103 | Air401 | 备注 |
|:---:|:---:|:---:|:---:|:---:|
|ADC|✅|🔨|🔨|-|
|DAC|❌|🔨|🔨|-|
|GPIO|✅|✅|✅|-|
|I2C|✅|🔨|🔨|-|
|Servo|✅|🔨|🔨|-|
|SPI|✅|🔨|🔨|-|
|PWM|✅|🔨|🔨|-|
|UART|✅|🔨|✅|-|
|USB|❌|🔨|❌|-|

- ✅：支持
- 🔨：开发中
- ❌：不支持

## APIs

AirMCU 提供了一些独特的 API，如本节所述：

[ADC](./adc.md)
[GPIO](./gpio.md)
[I2C](./i2c.md)
[PWM](./pwm.md)

## Datasheet

目前，您可以在以下网站找到 AirMCU 支持芯片的相关数据手册。

- [air001](https://air001.cn)
- [air32f103](https://air32.cn)
- [air401](https://air401.cn)
