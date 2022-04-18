import json
from django.http import JsonResponse


def add(_):
    # lodger_id = json.loads(_.body.decode())['lodger_ids']
    # print(lodger_id)
    data = {"code":1,"msg":"下单成功！","time":"1649696300","data":{"id":"3","amount":"120.00","status":"created"}}
    return JsonResponse(data)

def detail(request):
    data = {"code":1,"msg":"获取成功！","time":"1649006332","data":{}}
    return JsonResponse(data)

def pay(request):
    data = {"code":1,"msg":"获取成功！","time":"1649006332","data":{}}
    return JsonResponse(data)

def orderList(_):
    data = {"code":1,"msg":"","time":"1649696378","data":{"total":1,"per_page":15,"current_page":1,"last_page":1,"data":[{"id":3,"type":0,"orderid":"20220412125820000000016469","source_id":1,"user_id":1,"user_coupon_id":0,"amount":"120.00","coupon_amount":null,"status":"created","checkin_time":1649692800,"leave_time":1649779200,"house":{"id":1,"name":"房间二号","images":["http:\/\/chrisyy.top:5000\/assets\/addons\/booking\/img\/swiper1.jpg","http:\/\/chrisyy.top:5000\/assets\/addons\/booking\/img\/swiper2.jpg"],"checkin_time":"15:00:00","checkout_time":"12:00:00","status_text":""},"subscribe":null,"type_text":"民宿","paytime_text":"","checkin_time_text":"2022-04-12 00:00:00","leave_time_text":"2022-04-13 00:00:00","status_text":"未支付"}]}}
    return JsonResponse(data)

def detail(_):
    data = {"code":1,"msg":"","time":"1649694799","data":{
        "id":2,
        "orderid":"20220412123300000000017617",
        "type":0,
        "source_id":6,
        "user_id":1,
        "user_coupon_id":0,
        "amount":"0.00",
        "checkin_time":1649692800,"leave_time":1649779200,
        "actual_checkin_time":null,"actual_checkout_time":null,"lodgers_ids":"1","memo":null,"status":"created","createtime":1649694780,"updatetime":1649694780,"lodgers":[{"id":1,"name":"杨佳立","mobile":"199****8875","type_text":""}],"source_data":null,"type_text":"民宿","paytime_text":"","checkin_time_text":"2022-04-12 00:00:00","leave_time_text":"2022-04-13 00:00:00","status_text":"未支付"}}

    return JsonResponse(data)