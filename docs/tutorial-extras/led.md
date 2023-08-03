---
title: 💡 点灯
order: 1
---

## 简介

本章介绍使用arduino烧录Air001开发板控制其上3个LED灯闪烁

## 硬件准备

按[☁️ Air001开发板入门](/tutorial-advanced/Air001_start.html)，将Air001和DAPLink调试器使用排针排母连接

::: tip

在Air001开发板上，板载的三个LED灯，分别由`PB1`、`PB0`和`PB3`三个GPIO控制  
具体可参考[Air001 开发板PinOut](https://wiki.luatos.com/chips/air001/board.html#pinout)

:::

## 软件部分

按前文下载Arduino IDE、安装Air MCU，并选择接口和Air001 Dev Chip

在`setup()`函数中，添加如下代码

```cpp
void setup() {
  pinMode(PB_1, OUTPUT);
  pinMode(PB_0, OUTPUT);
  pinMode(PB_3, OUTPUT);
}
```

在这里，我们使用`pinMode`函数初始化`PB1`、`PB0`和`PB3`这三个GPIO，并且设置为`OUTPUT`输出模式。

接着，我们在`loop()`函数中添加剩下的代码

```cpp
void loop() {
  digitalWrite(PB_1, HIGH);
  digitalWrite(PB_0, HIGH);
  digitalWrite(PB_3, HIGH);
  delay(1000);
  digitalWrite(PB_1, LOW);
  digitalWrite(PB_0, LOW);
  digitalWrite(PB_3, LOW);
  delay(1000);
}
```

我们在这段代码中，使用`digitalWrite`函数来控制这三个GPIO的数出状态：

- 首先将GPIO设置为`HIGH`——高电平。此时LED灯亮起
- 使用`delay(1000)`延时一秒
- 然后将GPIO设置为`LOW`——低电平。此时LED灯熄灭
- 使用`delay(1000)`延时一秒

可以在开发板上观察到测试结果

## 更进一步

在上面代码的基础上，我们可以将`loop()`函数更改为下面这样，可以实现三个灯依次被点亮的效果

```cpp
void loop() {
  digitalWrite(PB_3, LOW);
  digitalWrite(PB_1, HIGH);
  delay(200);
  digitalWrite(PB_1, LOW);
  digitalWrite(PB_0, HIGH);
  delay(200);
  digitalWrite(PB_0, LOW);
  digitalWrite(PB_3, HIGH);
  delay(200);
}
```
