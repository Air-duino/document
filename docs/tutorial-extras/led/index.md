---
sidebar_position: 1
---

# 💡 点灯

## 简介

本章介绍使用arduino烧录Air001开发板控制其上3个LED灯闪烁

## 硬件准备

按前文“☁️ Air001开发板入门”将Air001和DAPLink调试器使用排针排母连接

## 软件部分

:::tip

按前文下载Arduino IDE、安装Air MCU，并选择接口和Air001 Dev Chip

:::

代码如下

```cpp
void setup() {
  // put your setup code here, to run once:
  pinMode(PB_1, OUTPUT);
  pinMode(PB_0, OUTPUT);
  pinMode(PB_3, OUTPUT);
  /*
    pinMode(pin, mode)是用来设置Arduino数字门的模式的，只用于数字门定义是输入INPUT还是输出OUTPUT
  */
  Serial.begin(115200);
  Serial.printf("Hello, Air001. \n");
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(PB_1, HIGH);
  digitalWrite(PB_0, HIGH);
  digitalWrite(PB_3, HIGH);
  /*
    digitalWrite(pin, mode)是当引脚pin在pinMode0的中被设置为OUTPUT模式时，其电压将被设置为相应的值，HIGH为3.3V，LOW为OV。这里就是给3个引脚3.3V的高电平，点亮各引脚上连接的LED
  */
}
```

:::tip

Air001上的3个LED对应的pin引脚可参考<https://wiki.luatos.com/chips/air001/board.html>

:::

## 输出结果

3个LED灯常亮，如下图

![light](img/light.jpg)
