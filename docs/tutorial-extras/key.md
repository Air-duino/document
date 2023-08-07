---
title: 按键输入
order: 2
icon: keyboard
---
## 简介

本文将介绍使用 Air001 开发板按键打印按键状态。

## 硬件准备

Air001开发板一块。

::: tip

在 Air001 开发板上，`BOOT`按键可作为通用按键使用，GPIO 编号为`PB6`，具体可参考 Air001 硬件手册。

:::

## 软件部分

首先，在代码的开头定义一下全局变量：

```cpp
int ButtonState = LOW;
#define Button PB_6
```

- 定义`ButtonState`变量，用于存储上一次的按键状态。
- 将`Button`的值定义为`PB_6`，`BOOT`按键所属的 GPIO。

接着，在`setup()`函数中，添加如下代码：

```cpp
void setup() {
  Serial.begin(9600);
  pinMode(Button, INPUT_PULLDOWN);
}
```

- 初始化串口为`9600`波特率，用于打印按键状态。
- 使用`pinMode`函数初始化`PB6`这个GPIO，并且设置为`INPUT_PULLDOWN`下拉输入模式。

最后，我们在`loop()`函数中添加剩下的代码，轮询当前 GPIO 的状态：

```cpp
void loop() {
  int state = digitalRead(Button);
  if(ButtonState==state)
    return;
  if (state == LOW) {
    Serial.println("key up");
  } else {
    Serial.println("key pressed");
  }
  ButtonState = state;
}
```

- 我们首先获取这一次的按键电平状态，存入`state`变量中。
- 接着对比这一次的电平是否变化，如果没变化，退出这次检测。
- 如果有变化，我们打印一下当前按钮的电平状态，这里使用了`三元运算符`。
- 最后将当前的电平状态存入`ButtonState`，提供给下一次读取使用。

## 输出结果

可以在串口监视器中看到：

- 当按下按键时，打印`key pressed`。
- 松开时打印`key up`。

```log
key pressed
key up
key pressed
key up
key pressed
key up
key pressed
key up
```

::: warning

由于使用了`BOOT`按键，有概率会影响到自动进入`BOOT`模式的逻辑。  
如若无法进入`BOOT`模式导致无法烧录，可尝试下面的步骤进行烧录：

- 断开 USB 的连接
- 按住`BOOT`按键，不要松开
- 插入 USB
- 松开`BOOT`按键
- 点击电脑上的烧录按键，开始烧录

:::

## 进一步优化

我们会发现，`loop()`函数中只进行了轮询按键的判断，如果这个函数中添加了其他耗时的操作（比如进行了`delay`操作），那么按键打印将变得不够及时。

我们可以使用`GPIO 中断`来摆脱这种轮询逻辑造成的问题。

:::tip

`中断`就是 CPU 在运行过程中上报的一种`异常`（只是叫做`异常`，不一定真的运行异常），它可以打断当前代码的运行，优先执行`中断`的操作。  
当`中断`处理完后，再继续运行当前代码。  
这里的`GPIO 中断`就是当 GPIO 的状态符合某种条件时，会触发的`中断`。

:::

首先，在代码的开头定义一下全局变量：

```cpp
#define Button PB_6
```

- 将`Button`的值定义为`PB_6`，`BOOT`按键所属的 GPIO。

接着，新建一个`中断回调函数`，该函数用于触发中断后，进行调用

```cpp
void onChange() {
  if (digitalRead(Button) == LOW) {
    Serial.println("key up");
  } else {
    Serial.println("key pressed");
  }
}
```

- 当触发`onChange`函数后，获取一下当前的`GPIO`状态，用来判断时按下还是松开

:::tip

`中断回调函数`是这个`中断`被触发后会被调用的函数。当这个函数运行完毕后，其他代码会继续执行。

:::

在`setup()`函数中，添加如下代码：

```cpp
void setup() {
  Serial.begin(9600);      //打开串口
  pinMode(Button, INPUT_PULLDOWN);  //设置管脚为输入
  attachInterrupt(digitalPinToInterrupt(Button), onChange, CHANGE);
  /*
   LOW 当引脚为低电平时，触发中断
   CHANGE 当引脚电平发生改变时，触发中断
   RISING 当引脚由低电平变为高电平时，触发中断
   FALLING 当引脚由高电平变为低电平时，触发中断
   */
  pinMode(PB_1, OUTPUT);
}
```

- 初始化串口为`9600`波特率，用于打印按键状态。
- 使用`attachInterrupt`函数初始化一个中断事件，编号可以由`digitalPinToInterrupt`函数获取，触发标志设置为`CHANGE`。
- 我们使用`pinMode`函数初始化`PB1`，并且设置为`OUTPUT`输出模式，用来闪灯。

最后我们可以在我们在`loop()`函数中添加剩下的代码，为了演示不影响按键响应，我们加一个闪灯的功能代码：

```cpp
void loop() {
  digitalWrite(PB_1, HIGH);
  delay(500);
  digitalWrite(PB_1, LOW);
  delay(500);
}
```

当使用中断方式编写代码时，`loop()`函数中的延时将不会对按键状态变化时的相应造成影响。

## 优化后的结果

我们可以看到开发板上的 LED 灯正常闪烁，并且串口监视器中的按键事件打印也很及时。
