## ardunio 上读取 TouchSensor信号 并通过串口发送出去.

1.  接线 
    -   观察灯

        led 接个电阻,接13号口

    -   触控电容

        电容 vcc接5V,gnd接地,sig接2号口

2.  程序源码

    文件: ./touchsensor.ino

3. TODO:
    -   信号处理,事件提取. (with Rx.js ~)
    -   大数据分析 (with Cloud~)