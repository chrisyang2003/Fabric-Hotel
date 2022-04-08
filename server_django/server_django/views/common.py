from django.http import JsonResponse


def commonInit(request):
    _json = { "code": 1, "msg": "", "time": "1648997103", "data": { "upload": { "uploadurl": "https://booking.demo.fastadmin.net/api/common/upload", "cdnurl": "https://booking.demo.fastadmin.net", "savekey": "/uploads/{year}{mon}{day}/{filemd5}{.suffix}", "maxsize": "10mb", "mimetype": "jpg,png,bmp,jpeg,gif,webp,zip,rar,xls,xlsx,wav,mp4,mp3,webm,pdf", "multiple": False, "chunking": False, "chunksize": 2097152, "fullmode": False, "thumbstyle": "", "bucket": "local", "multipart": [], "storage": "local" }, "__token__": "532c54ff2abf677524136f360afb115f", "swiper": [{ "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/swiper2.jpg", "title": "xxxx", "path": "/pages/my/my" }, { "image": "https://booking.demo.fastadmin.net/uploads/20210301/264852e5df946e3347bf1ad8502b4dd5.jpg", "title": "xxxxx", "path": "/pages/my/my" }, { "image": "https://booking.demo.fastadmin.net/uploads/20210301/d18b6784d19628292157995173c84702.jpg", "title": "", "path": "" }], "order_timeout": "84000", "notice": [{ "title": "隐私保护酒店", "path": "/" },{ "title": "2018级本科毕设", "path": "/" },{ "title": "Hyperledger Fabric", "path": "/" }], "distance_checkin_time": None, "money_score": "1", "comment_score": "1", "category_mode": "0", "agreement": "<p>注册协议</p>", "navigate": [{ "id": 2, "name": "一键预定", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/7b739a52c16c6a0fa203aaa5577c8b7f.png", "path": "/pages/hotel/hotel", "switch": 1, "weigh": 5, "createtime": 1609402235, "updatetime": 1610444685 }, { "id": 3, "name": "一键退房", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/f20984045556f1e1395fd0d857174bf4.png", "path": "/pages/hotel/checkout", "switch": 1, "weigh": 4, "createtime": 1609402235, "updatetime": 1610444902 }, { "id": 4, "name": "一键吐槽", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/ac73687f6388fd5b55dfb81440ebe83a.png", "path": "/pages/index/message", "switch": 1, "weigh": 3, "createtime": 1609402235, "updatetime": 1610445152 }, { "id": 5, "name": "门店列表", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/7dc5f21dae8a448cfea2c4117748c9f6.png", "path": "/pages/store/store", "switch": 1, "weigh": 2, "createtime": 1609402235, "updatetime": 1610445415 }, { "id": 6, "name": "周边景点", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/4d1dfd0c063c41d37d8f2181cb576f6a.png", "path": "/pages/index/map?word=景点", "switch": 1, "weigh": 2, "createtime": 1609402235, "updatetime": 1610445649 }, { "id": 7, "name": "便利店", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/2fbbc98faef70ea2d134158032000a3c.png", "path": "/pages/index/map?word=便利店", "switch": 1, "weigh": 2, "createtime": 1609402235, "updatetime": 1610445722 }, { "id": 8, "name": "周边餐饮", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/aa1301669ad071a72bb2e2a467ef024a.png", "path": "/pages/index/map?word=餐饮", "switch": 1, "weigh": 2, "createtime": 1609402235, "updatetime": 1610445840 }, { "id": 9, "name": "交通", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/a1a553c9ffdbcaff7bb8ca4662c0feaa.png", "path": "/pages/index/map?word=交通", "switch": 1, "weigh": 2, "createtime": 1609402235, "updatetime": 1610445890 }, { "id": 13, "name": "一键WIFI", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/7dc5f21dae8a448cfea2c4117748c9f6.png", "path": "/pages/wifi/wifi", "switch": 1, "weigh": 2, "createtime": 1621218324, "updatetime": 1621587793 }, { "id": 1, "name": "周边商场", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/49e3df4b2447c7e2c0e85416726a10d5.png", "path": "/pages/index/map?word=商场", "switch": 1, "weigh": 1, "createtime": 1609402165, "updatetime": 1610444778 }, { "id": 11, "name": "优惠券", "size": 80, "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/navigation/49e3df4b2447c7e2c0e85416726a10d9.png", "path": "/pages/coupon/coupon", "switch": 1, "weigh": 1, "createtime": 1614839670, "updatetime": 1621588535 }], "sitename": "民宿预订管理系统演示", "tpl_ids": [], "navbar": { "titleColor": "#fff", "bgColor": { "background": "#374486" }, "backIconColor": "#fff", "backTextStyle": { "color": "#fff" }, "titleSize": "35", "isshow": True }, "theme": { "color": "#ffffff", "bgColor": "#374486", "ladder": 10, "number": 9, "border": 5 }, "tabbar": { "color": "#999", "selectColor": "#000", "bgColor": "#ffffff", "height": "100", "borderTop": True, "iconSize": "40", "midButton": False, "midButtonSize": "60", "list": [{ "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/home.png", "selectedImage": "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/home-hl.png", "text": "首页", "path": "/pages/index/index", "midButton": False, "count": 0, "isDot": False, "badgeColor": "#ffffff", "badgeBgColor": "#374486" }, { "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/store.png", "selectedImage": "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/store-hl.png", "text": "预订", "path": "/pages/hotel/hotel", "midButton": False, "count": 0, "isDot": False, "badgeColor": "#ffffff", "badgeBgColor": "#374486" }, { "image": "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/my.png", "selectedImage": "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/my-hl.png", "text": "我的", "path": "/pages/my/my", "midButton": False, "count": 0, "isDot": False, "badgeColor": "#ffffff", "badgeBgColor": "#374486" }], "isshow": True } } }
    return JsonResponse(_json)