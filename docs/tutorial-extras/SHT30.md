---
title: I²C读取SHT30温湿度
order: 12
icon: umbrella
---

:::warning

本文档尚未进行review，可能存有不准确的描述内容。

:::

## 简介

本章介绍使用Air001开发板驱动SHT30。

::: tip

SHT30是一款使用I²C通信接口的温湿度传感器。

:::

## 硬件准备

- 按[☁️ Air001开发板入门](/tutorial-advanced/Air001_start.html)，将`Air001`和`DAPLink调试器`使用排针排母连接。

- 将`SHT30`与`Air001开发板`，按如下表格进行相连：

| SHT30 |  Air001  |
| :----: | :------: |
|  GND   |   GND   |
|  VCC   |   3.3V   |
|  SCL   | PF_1 |
|  SDA   |   PF_0    |

## 软件部分

```cpp
#include <Wire.h>
//SHT30 I²C通信地址为0x44
#define Addr_SHT30 0x44
void setup() {
  //设定SCL和SDA引脚
  Wire.setSDA(PF_0);
  Wire.setSCL(PF_1);
  //初始化I²C
  Wire.begin();
  //设定波特率为9600
  Serial.begin(9600);
  //延时
  delay(300);
}

void loop() {
  //定义数组以存储获取的6个数据
  unsigned char data[6];
  //I²C开始地址
  Wire.beginTransmission(Addr_SHT30);
  //发送测量命令0x2C06,由于一次只能发一个8位数据，因此分开发两次
  Wire.write(0x2C);
  Wire.write(0x06);
  //I²C停止
  Wire.endTransmission();
  //延时（等待测量数据）
  delay(500);
  //请求获取6字节的数据
  Wire.requestFrom(Addr_SHT30, 6);
  //读取6字节的数据
  Serial.println(Wire.available());
  //读取成功则将读取的数据依次赋给前面定义的数组
  if (Wire.available() == 6) {
    for (int i = 0; i <= 5; i++) {
      data[i] = Wire.read();
    }
  //失败则打印"error!"
  } else {
    Serial.println("error!");
    return;
  }
  //计算得到的数据将其转化为直观的温度和湿度，公式见下图
  int cTemp = ((((data[0] * 256) + data[1]) * 175) / 65535) - 45;
  int humidity = ((((data[3] * 256) + data[4]) * 100) / 65535);
  //在串口里输出得到的数据
  Serial.printf("湿度：%d%%RH\n",humidity);
  Serial.printf("温度：%d℃",cTemp);
  //延时
  delay(500);
}
```

![计算公式](img/formula.jpg)

::: tip

数组`data[]`中的数据依次对应温度8位高数据，温度8位低数据，温度8位CRC校验数据，湿度8位高数据，湿度8位低数据，湿度8位CRC校验数据。
由于代码示例中没有CRC校验(可运行)，因此在计算时不会用到`data[2]`和`data[5]`。
我们要分别将`data[0]`、`data[3]`和`data[1]`、`data[4]`拼接，即前者乘2⁸=256(提前8位)再加上后者。

:::

## 输出结果

在串口监视器中将波特率调至9600可观察到当前温湿度，如下图。

![](img/sht30_res.png)
