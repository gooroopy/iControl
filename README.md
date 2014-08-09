iControl - Internet Control
===========================

ระบบควบคุบระยะไกลผ่านอินเทอร์เน็ต

ฮาร์ดแวร์
------

1. Raspberry PI B+ (http://www.raspberrypi.org/)
    เป็นบอร์ดคอมพิวเตอร์ขนาดจิ๋ว ซึ่งสามารถต่อกับจอทีวี คีย์บอร์ด เมาส์ และใช้งานเสมือนคอมพิวเตอร์ได้เลย นอกจากนี้ยังเปิดให้สามารถนำไปพัฒนาเป็นอุปกรณ์เฉพาะทางต่างๆ ได้ เช่น นำไปใช้เป็นบอร์ดคอมบคุมการทำงานของหุ่นยนต์ นำไปพัฒนาเป็นตัวควบคุมการทำงานของระบบบ้านอัจริยะ เป็นต้น

2. 2 Channels Relay board (http://www.thaieasyelec.com/products/components-th/2-channels-relay-module-detail.html)
    เป็นบอร์ดรีเลย์สำหรับทำหน้าที่เสมือนสวิตช์ไฟฟ้า สำหรับเปิด/ปิด การทำงานของอุปกรณ์ โดยรับสัญญาณควบคุมจากบอร์ด Raspberry PI

3. microSD 8 GB
    เป็นหน่วยความจำ สำหรับเก็บระบบปฏิบัติการ และโปรแกรมต่างๆ ให้กับ Raspberry PI (เปรียบเสมือนฮาร์ดดิสก์ ขนาดจิ๋วสำหรับ Raspberry PI)

4. USB Wireless LAN
    ตัวบอร์ด Raspberry PI ไม่ได้รวมเอาการเชื่อมต่อแบบ Wi-Fi ไว้ในตัว (มีเฉพาะพอร์ต LAN) เพื่อให้บอร์ดสามารถเชื่อมต่อแบบ Wi-Fi ได้ต้องต่ออุปกรณ์ภายนอกเพิ่มเติมผ่านพอร์ต USB

ระบบปฏิบัติการและเฟรมเวิร์กที่ใช้
-----------------------

1. Raspbian (เป็นระบบปฏิบัติการลินุกซ์ที่ดัดแปลงมาสำหรับใช้งานบน Raspberry PI โดยเฉพาะ)
2. Python (ไพธอนเป็นภาษาโปรแกรมแบบสคริปต์ นิยมใช้บน Raspberry PI)
3. Flask (เป็นเฟรมเวิร์กสำหรับพัฒนาเว็บแอพพลิเคชันที่เขียนโดยภาษาไพธอน มีขนาดเล็ก ง่ายต่อการเรียนรู้)
4. jQuery Mobile (เป็นเฟรมเวิร์กภาษาจาวาสคริปต์สำหรับพัฒนาเว็บแอพพลิเคชันบนอุปกรณ์พกพา)


เว็บแอพพลิเคชัน - iControl
----------------------

ตัวเว็บแอพพลิเคชันสำหรับเปิดปิดอุปกรณ์ไฟฟ้าระยะไกลผ่านระบบอินเทอร์เน็ตขอเรียกว่า iControl ประกอบด้วย

```
iControl
|   icontrol.py                        ==> โปรแกรมหลักของ iControl (Python)
|   README.md                          ==> ไฟล์รายละเอียด (ไฟล์นี้เอง)
|   requirements.txt                   ==> ไฟล์รายการ packages ที่ต้องติดตั้งเพิ่มเติม
|
+---static
|   |   icontrol.js                    ==> โปรแกรม iControl ในฝั่งเว็บ (JavaScript)
|   |   jquery.min.js                  ==> jQuery JavaScript
|   |   jquery.mobile-1.4.2.min.css    ==> jQuery Mobile Cascade Styles Sheet
|   |   jquery.mobile-1.4.2.min.js     ==> jQuery Mobile JavaScript
|   |
|   \---images
|           ajax-loader.gif            ==> รูปภาพสำหรับ jQuery
|
\---templates
        base.html                      ==> เทมเพลตหลักของเว็บ
        icontrol.html                  ==> เทมเพลตหน้าเว็บแอพพลิเคชัน iControl
```

สำหรับตัวเว็บแอพพลิเคชัน iControl จะติดตั้งที่ `/home/pi/projects/iControl` บน Raspberry PI

การติดตั้งเว็บแอพพลิเคชัน
------------------

1. `wget https://bootstrap.pypa.io/ez_setup.py`
2. `sudo python ez_setup.py`
3. `pip install -r requirements.txt`

การรันเว็บแอพพลิเคชัน
----------------

* บน Raspberry PI

```
python icontrol.py
```

* เปิดเว็บเบราเซอร์ไปยัง URL: http://<IP ของ Raspberry PI>


แหล่งข้อมูลอ้างอิง
------------

* การใช้งาน GPIO ของ Raspbery PI

    http://www.deaware.com/raspberry-pi-with-gpio-%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%9E%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%AA%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2/

* การเขียนเว็บแอพพลิเคชันสำหรับ Raspberry PI

    http://mattrichardson.com/Raspberry-Pi-Flask/

* jQuery Mobile - Flip Switch

    http://demos.jquerymobile.com/1.4.2/flipswitch/

* วิธีการตั้งค่าให้ Raspberry PI ทำงานเป็น Ad-hoc Wireless Access Point

    http://www.novitiate.co.uk/?p=183

