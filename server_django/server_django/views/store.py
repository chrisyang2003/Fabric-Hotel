from django.http import JsonResponse


def defaultStore(request):
    _json = { "code": 1, "msg": "", "time": "1648997630", "data": { "id": 1, "name": "测试门店", "images": ["https://booking.demo.fastadmin.net/assets/addons/booking/img/swiper1.jpg", "https://booking.demo.fastadmin.net/assets/addons/booking/img/swiper2.jpg"], "phone": "19934358875", "latitude": "22.547", "longitude": "114.085947", "address": "成都郫都区", "is_more": True }}
    return JsonResponse(_json)

def detail(request):
    data = {"code":1,"msg":"","time":"1649316968","data":{"id":1,"name":"测试门店","phone":"0775-8545899","intro":"我是简介","content":"我是内容","is_default":1,"images":["http://chrisyy.top:5000/assets/addons/booking/img/swiper1.jpg","http://chrisyy.top:5000/assets/addons/booking/img/swiper2.jpg"],"address":"四川省郫都区","latitude":"22.547","longitude":"114.085947","createtime":1608714211,"updatetime":1610505806}}
    return JsonResponse(data)



