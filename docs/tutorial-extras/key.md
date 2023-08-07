---
title: 按键输入
order: 2
icon: keyboard
---
## 简介 

本文将介绍使用 Air001 开发板按键打印按键状态。

:::tip
Air001开发板BOOT键可以做为按键。
:::

## 硬件准备

Air001开发板（按键）。


## 软件部分

代码如下

```cpp
int ButtonState;
#define Button PB_6
void setup() {
  Serial.begin(9600);
  pinMode(Button, INPUT_PULLUP);
}


```

1. 定义`Button`状态变量
2. 设置引脚模式，初始化串口。

```cpp
void loop() {
  int state = digitalRead(Button);
  if(ButtonState==state)
    return;
  Serial.println(state ? "key pressed" : "key up");
  ButtonState = state;
}


```

1. `Buttonstate`读取存放按键的电平数据
2. 打印输出按键的状态。


## 输出结果

 当按下按键时打印key pressed，松开时打印key up。

