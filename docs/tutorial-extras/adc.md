---
title: 测量 ADC
order: 3
icon: tachometer
---

## 简介

本章介绍使用 Arduino 烧录 Air001 开发板测量 ADC。

## 硬件准备

1. 按 [☁️ Air001 开发板入门](/tutorial-advanced/Air001_start.html)，将 Air001 和 DAPLink 调试器使用排针排母连接。
2. 可控电压源，负极接 Air001 的 GND 引脚（地）、正极接引脚 PA0 以及 PA1。

## 软件部分

按前文下载 Arduino IDE、安装 AirMCU，并选择接口和 AirM2M Air001 Board。

添加如下代码：

```cpp
void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
}

void loop() {
  Serial.printf("PA0 Voltage is %d mv \n", analogReadMillivolts(PA0));
  Serial.printf("PA1 Voltage is %d mv \n", analogReadMillivolts(PA1));
  Serial.printf("Chip temp is %d C \n", analogReadTempSensor());
  Serial.printf("Vref is %d mv \n", analogReadVref());
  delay(500);
}

```

## 输出结果

将波特率调为 115200，在串口监视器中可观察到当前串口输出和引脚上的实际电压。
