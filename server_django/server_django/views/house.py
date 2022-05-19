from django.http import HttpResponse, JsonResponse
from model.house import house
import requests

latitude = 30.783238
longitude = 103.960651
address = '成都市郫都区广场路北一段126号'
hotelName = '测试门店'

id8tags = ["消费200 8折", "月租优惠"]


def addHouse(_):
    name = _.GET['name']

    market_price = _.GET['market_price']
    house_price = _.GET['house_price']

    area = _.GET['area']
    livenums = _.GET['livenums']
    image = _.GET['image']
    tag = _.GET.getlist('tag[]')
    desc = _.GET['desc']

    newHouse = house(
        name=name,

        market_price=market_price,
        house_price=house_price,

        area=area,
        livenums=livenums,
        image=image,
        tag=tag,
        desc=desc
    )
    newHouse.save()
    return HttpResponse()


def houseList(requset):

    # get fabric order
    r = requests.get('http://chrisyy.top:3000/order/getall').json()
    r = [i['value'] for i in r]
    noempty = [int(i['houseid']) for i in r]
    print(noempty)

    data = []
    for item in house.objects.all():

        housestatus = '空房'
        for i in r:
            if item.id == int(i['houseid']):
                housestatus = i['status']

        data.append({
            "id": item.id,
            "name": item.name,

            "market_price": item.market_price,
            "house_price": item.house_price,

            "area": item.area,
            "livenums": item.livenums,
            "image": item.image,
            "tag": item.tag,
            "desc": item.desc,
            "status": housestatus
        })

    _json = {"code": 1, "msg": "", "time": "1648983355", "data": {
        "total": 4, "per_page": 15, "current_page": 1, "last_page": 1, "data": data}}
    return JsonResponse(_json)


def detail(_):
    id = _.GET['id']
    resp = house.objects.get(id=id)

    import time
    calendar = []
    for i in range(60):
        calendar.append({
            "id": i,
            "price": resp.house_price if i != 2 else resp.house_price + 50000,
            "day_time_text":  time.strftime('%Y-%m-%d', time.localtime(time.time() + 3600 * 24 * i))
        })

    data = {"code": 1, "msg": "", "time": "1649000334", "data": {
        "id": id,
        "market_price": resp.market_price,
        "price": resp.house_price,
        "name": resp.name,
        "image": resp.image,
        "intro": resp.desc,
        "area": resp.area,
        "livenums": resp.livenums,

        "group_names": {"facility": [" 火灾报警器", "吹风机", "有电梯", "榻榻米"], "tag": resp.tag},
        "facility": [{"id": 4, "name": "WIFI", "image": "", "type_text": ""}, {"id": 5, "name": "吹风机", "image": "", "type_text": ""}, {"id": 7, "name": "空调", "image": "", "type_text": ""}, {"id": 8, "name": "有浴缸", "image": "", "type_text": ""}, {"id": 9, "name": "电视", "image": "", "type_text": ""}, {"id": 10, "name": "落地窗", "image": "", "type_text": ""}, {"id": 11, "name": "洗衣机", "image": "", "type_text": ""}, {"id": 12, "name": "游戏机", "image": "", "type_text": ""}, {"id": 24, "name": "露台/阳台", "image": None, "type_text": ""}, {"id": 25, "name": "榻榻米", "image": None, "type_text": ""}, {"id": 26, "name": "有电梯", "image": None, "type_text": ""}, {"id": 27, "name": "烘干机", "image": None, "type_text": ""}, {"id": 28, "name": "寄存行李", "image": None, "type_text": ""}, {"id": 33, "name": "门禁系统", "image": None, "type_text": ""}, {"id": 34, "name": " 火灾报警器", "image": None, "type_text": ""}, {"id": 35, "name": "烟雾报警器", "image": None, "type_text": ""}, {"id": 36, "name": "灭火器", "image": None, "type_text": ""}, {"id": 37, "name": "安全报警器", "image": None, "type_text": ""}],
        "calendar": calendar,
        "order_calendar": [],
        "store": {"id": 1, "name": hotelName, "latitude": latitude, "longitude": longitude, "address": address}
    }}
    return JsonResponse(data)


def booking(_):
    id = _.GET['id']

    resp = house.objects.get(id=id)

    import time
    calendar = []
    for i in range(60):
        calendar.append({
            "id": i,
            "price": resp.house_price if i != 2 else resp.house_price + 50000,
            "day_time_text":  time.strftime('%Y-%m-%d', time.localtime(time.time() + 3600 * 24 * i))
        })

    
    data = {"code": 1, "msg": "获取成功！", "time": "1649006332", "data": {"detail": {
        "id": id,
        "market_price": resp.market_price,
        "price": resp.house_price,
        "name": resp.name,
        "image": resp.image,
        "intro": resp.desc,
        "area": resp.area,
        "livenums": resp.livenums,
        "calendar": calendar,
        "store": {"id": 1, "name": "测试", "latitude": "22.547", "longitude": "114.085947", "address": "1"}, "type": {"id": 23, "name": "新房特惠", "type_text": ""}, "status_text": "上架"}, 
        "lodger":[{"id":1,"user_id":112,"name":"梨花","type":0,"idnumber":"50023320000103031X", "age":22},
        {"id":2,"user_id":14,"name":"李华","type":0,"idnumber":"50023320000103031X", "age":17}]}}
    return JsonResponse(data)
