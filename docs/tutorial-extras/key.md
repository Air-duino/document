---
title: 按键输入
order: 2
icon: keyboard
---
## 简介 

本文将介绍使用 Air001 开发板驱动按键使LED灯闪烁。

:::tip
LED灯需要杜邦线连接Air001开发板。
:::

## 硬件准备

LED灯，Air001开发板（自带灯）。

# 排线
|LED灯|Air001|
|:----:|:----:|
|GND|GND|
|VCC|3.3V|
|IN|PA04|
## 软件部分

:::

代码块

```cpp
int LEDstate=LOW;
int Buttonstate;
int Button=PB_2;
int LEDpin=PA_4;

void setup() {
  // put your setup code here, to run once:
pinMode(LEDpin, OUTPUT);
Serial.begin(9600);
    pinMode(Button, INPUT_PULLUP)；
}
```

1. 定义`Button`状态变量，定义LED状态并赋值为LOW。
2. 分别定义按键，灯的引脚为PB_2,PA_4号引脚。
3. 设置引脚模式，初始化串口。

```cpp
void loop() {
  // put your main code here, to run repeatedly:
Buttonstate=digitalRead(Button);
Serial.println(Buttonstate);
delay(1500);
if(Buttonstate==HIGH)
{
  delay (500);
}
 if(Buttonstate==LOW)
 {
   LEDstate=!LEDstate;
   digitalWrite(LEDpin,LEDstate);
   
 }
}


```

1. `Buttonstate`读取存放按键的电平数据
2. 打印输出按键的状态。
3. `delay`当按下按钮,效果为延时一段时间。
4. 松开按键，电平取反，即灯的亮灭随着松开轮流切换。

## 输出结果

 当按下按键时闪烁，松开为常亮状态

