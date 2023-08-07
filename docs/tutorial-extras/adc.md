---
title: 测量 ADC
order: 3
icon: tachometer
---

## 简介

本章介绍使用arduino烧录Air001开发板测量ADC

## 硬件准备

1. 按[☁️ Air001开发板入门](/tutorial-advanced/Air001_start.html)，将Air001和DAPLink调试器使用排针排母连接
2. 可控电压源，负极接Air001的GND引脚(地),正极接引脚PA_0(ADC)

## 软件部分

按前文下载Arduino IDE、安装Air MCU，并选择接口和Air001 Dev Chip

开头添加代码定义ADC引脚`PA_0`

```cpp
#define ADC_PIN PA_0
```

在`setup()`函数中，添加如下代码

```cpp
void setup() {
  Serial.begin(115200);
  pinMode(ADC_PIN, INPUT);
}
```

使用`pinMode`函数初始化ADC引脚`PA_0`，并且设置为`INPUT`输入模式。

在`loop()`函数中添加其余代码

```cpp
void loop() {
  int adc_value = 0;
  int u;
  adc_value = analogRead(ADC_PIN);
  delay(1000);
  u = adc_value*3.3/1024*1000;
  Serial.printf("Current Reading on Pin(%d)=%d,Current Voltage=%d\n",ADC_PIN,adc_value,u);
  delay(1000);
}
```

- 首先新建变量`adc_value`赋予初值0和`u`
- 然后用`analogRead`函数来读取ADC引脚`PA_0`的值并赋给`adc_value`
- 使用`delay(1000)`延时一秒
- 计算实际AD的值
- 然后使用`prinf`函数打印出获得的引脚`PA_0`的值`adc_value`和实际AD的值`u`
- 使用`delay(1000)`延时一秒

::: tip

从0V开始逐渐增大电压并在串口监视器中读出测量值，可以发现当电压增大到3.3V后继续增大电压读数达到最大值1024不再增大，
由此可以得到一个方程: `读数 / 1024 = 实际 / 3.3`，
即实际AD的计算公式为(单位换算为mV)
$~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$`实际AD = 读数 * 3.3 / 1024 * 1000`

:::

## 输出结果

将波特率调为115200，在串口监视器中可观察到当前串口输出和实际AD的值(mV)

![输入电压为3V时的串口输出](img/adc_res.png)
