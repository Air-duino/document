---
title: UART
icon: exchange
---

## 关于

UART，即Universal Asynchronous Receiver/Transmitter（通用异步收发器），是一种串行、异步、全双工的通信协议，在嵌入式领域应用的非常广泛。

## UART 通用API

在 Arduino 中，我们一般把`UART`称为`Serial`。我们在此仅介绍一些常用的 API ，具体的通用 API 可以参考 [Arduino 官方文档](https://www.arduino.cc/reference/en/language/functions/communication/serial/)。

### begin

此函数用于初始化串口，设置波特率。

```cpp
void begin(unsigned long baud, byte config)
```

- `baud`：波特率，单位为 bps
- `config`：配置，可选值为`SERIAL_8N1` `SERIAL_8N2` `SERIAL_7N1` `SERIAL_8E1` `SERIAL_7E2` `SERIAL_8E2` `SERIAL_7O1` `SERIAL_8O1` `SERIAL_7O2` `SERIAL_8O2` 

当然，您也可以使用

```cpp
void begin(unsigned long baud)
```

来进行初始化，此时配置为`SERIAL_8N1`。

### end

此函数用于关闭串口。

```cpp
void end()
```

### available

此函数用于获取串口接收缓冲区中的字节数。

```cpp
int available()
```

- 返回值：串口接收缓冲区中的字节数

### read

此函数用于从串口接收缓冲区中读取一个字节。

```cpp
int read()
```

- 返回值：读取到的字节，如果没有可读取的字节，则返回`-1`

### write

此函数用于向串口发送数据。

```cpp
size_t write(uint8_t data)
```

- 返回值：发送的字节数
- `data`：要发送的字节

当然，您也可以使用

```cpp
size_t write(const uint8_t *buffer, size_t size)
```

来发送多个字节。

- `buffer`：要发送的字节缓冲区
- `size`：要发送的字节数
- 返回值：发送的字节数

### flush

此函数用于清空串口接收缓冲区。

```cpp
void flush()
```

### peek

此函数用于查看串口接收缓冲区中的下一个字节，但不会将其从缓冲区中删除。

```cpp
int peek()
```

- 返回值：下一个字节，如果没有可读取的字节，则返回`-1`

## AirMCU 专用API

AirMCU 有多个 U(S)ART 外设。为方便起见，U(S)ARTx 编号用于定义 Serialx 实例：

- Serial1 为 USART1
- Serial2 为 USART2
- Serial3 为 USART3
- Serial4 为 UART4
- ...对于 LPUART1 ，为 SerialLP1

默认情况下，只有一个 Serialx 实例可映射到通用 Serial 名称。需要注意的是，一般我们习惯上使用`Serial1`来作为全局的`Serial`对象。

要使用第二个串行端口，代码中应中在 `setup()` 函数之前声明 `HardwareSerial` 对象：

```cpp
//                      RX    TX
HardwareSerial Serial2(PA1, PA0);

void setup() {
  Serial1.begin(115200); 
}

void loop() {
  Serial1.println("Hello World!");
  delay(1000);
}
```

另一个解决方案是在主 `.ino` 文件旁边添加一个 `build_opt.h` 文件： `-DENABLE_HWSERIALx` 。这将使用变体的 `PeripheralPins.c` 中找到的第一个 `USARTx` 实例来定义 `Serialx` 实例。

:::tip
只用使用这种解决方案才能在代码中使用 `serialEventx()` 回调。
:::

例如，如果您在 `build_opt.h` 中定义： `-DENABLE_HWSERIAL2`

这将使用您的变体的 `PeripheralPins.c` 中的 `PinMap_UART_RX[]` 和 `PinMap_UART_TX[]` 数组中找到的第一个 Rx 和 Tx 引脚实例化 `Serial2` `serialEvent2()` 将被启用。

要指定应使用哪个 Rx 或 Tx 引脚而不是第一个找到的引脚，您可以指定 `PIN_SERIALn_RX` 或 `PIN_SERIALn_TX` ，其中 n 是串行实例的编号。

`Serial2` 的示例：

- 在 `variant.h` 中：

```c
#define PIN_SERIAL2_RX PA1
#define PIN_SERIAL2_TX PA0
```

- 在 `build_opt.h` 中： `-DPIN_SERIAL2_RX=PA1 -DPIN_SERIAL2_TX=PA0`

### 更改默认 Serial 实例引脚

还可以使用下列 API 更改 `Serial` 实例使用的默认引脚：

- `void setRx(PinName rxPin)`
- `void setRx(uint32_t rxPin)`
- `void setTx(PinName txPin)`
- `void setTx(uint32_t txPin)`

::: warning
这些API必须在 `begin()` 之前调用。
:::

### 启用半双工模式

U(S)ART 可配置为遵循单线半双工协议，其中 Tx 和 Rx 线路在内部连接。在此通信模式下，仅 Tx 引脚用于发送和接收。

- 扩展 `HardwareSerial` 构造函数：
    - `HardwareSerial(uint32_t _rxtx)` ：用于半双工的 U(S)ART Tx 引脚号 ( PYn )
    - `HardwareSerial(PinName _rxtx)` ：用于半双工的 U(S)ART Tx 引脚名称 ( PY_n )
    - 如果 Rx == Tx 则采用半双工模式：
        - `HardwareSerial(uint32_t _rx, uint32_t _tx)` ：用于半双工的 U(S)ART Tx 引脚号 ( PYn )
        - `HardwareSerial(PinName _rx, PinName tx)` ：用于半双工的 U(S)ART Tx 引脚名称 ( PY_n )
    - `HardwareSerial(void *peripheral, HalfDuplexMode_t halfDuplex = HALF_DUPLEX_DISABLED)` ：如果 `HALF_DUPLEX_ENABLED` 获取用于半双工的  `PeripheralPins.c` 中请求的外设的第一个Tx引脚

- 添加 `enableHalfDuplexRx()` 以在 Rx 模式下启用串行。可以使用 `read()` ，但会避免执行读取。在 `available()` 使用之前有用

- `void setHalfDuplex()` ：当实例未以半双工模式实例化时，启用实例的半双工模式。在这种情况下，必须在 `begin()` 之前调用。

### 启用硬件流控制

`HardwareSerial` 构造函数接受可选的 RTS/CTS 引脚：

- `HardwareSerial(uint32_t _rx, uint32_t _tx, uint32_t _rts = NUM_DIGITAL_PINS, uint32_t _cts = NUM_DIGITAL_PINS)`
- `HardwareSerial(PinName _rx, PinName _tx, PinName _rts = NC, PinName _cts = NC)`

您还可以在 `HardwareSerial` 实例上启用 RTS/CTS 引脚：

- `void setRts(uint32_t _rts)`
- `void setCts(uint32_t _cts)`
- `void setRtsCts(uint32_t _rts, uint32_t _cts)`
- `void setRts(PinName _rts)`
- `void setCts(PinName _cts)`
- `void setRtsCts(PinName _rts, PinName _cts)`
