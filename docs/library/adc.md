---
title: ADC
icon: tachometer
---

ADC ，即analog to digital converter（模数转换器）是一种非常常见的外设，用于将电压等模拟信号转换为数字形式，以便微控制器可以读取和处理。

ADC 在控制和监控应用中非常有用，因为大多数传感器（例如温度、压力、力）都会产生模拟输出电压。

::: note
每个 MCU 或模块都有不同数量的 ADC，以及不同数量的可用通道和引脚。有关详细信息，请参阅每个板的数据手册。
:::

## ADC 通用 API

### analogRead

此函数用于获取给定引脚/ADC 通道的 ADC 原始值。

```cpp
uint32_t analogRead(uint32_t pin);
```

- `pin` GPIO 引脚或 ADC 通道。
- - ADC的内部通道可以为`ATEMP` (内部温度传感器)、`AVBAT` (VBAT电压)、`AREF` (内部参考电压)。

该函数将返回模拟原始值。

读取内部通道时需要最小 ADC 采样时间，因此默认将其设置为最大可能值。它可以通过定义更精确地定义：

- `ADC_SAMPLINGTIME_INTERNAL` 到所需的 ADC 采样时间。

`ADC_SAMPLINGTIME` 和 `ADC_CLOCK_DIV` 也可以通过变体或使用 build_opt.h 重新定义。

### analogReference

配置模拟输入所用的基准电压（即用作输入范围上限的值）。保留此功能只是为了与现有的基于 AVR 的 API 兼容。

```cpp
void analogReference(eAnalogReference ulMode) ;
```

## AirMCU 专用 API

### analogReadResolution

此函数用于设置 ADC 读取的分辨率。默认为 10 位（范围为 0 至 1023）。

```cpp
void analogReadResolution(uint8_t bits);
```
