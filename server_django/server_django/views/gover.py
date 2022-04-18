from django.http import JsonResponse


def trxList(_):
    data = {"code":1,"msg":"获取成功！","time":"1649006332","data":{
        "trxlist":[
            {"trx":"c8f336317775dd9bb9ffe35bb2c61aa5dfa0dbebad578dee26713126aed05d7e","user": "admin", "age": 18,"houseid":1, "price": 100, "time": 123, "status": False},
            {"trx":"c8f336317775dd9bb9ffe35bb2c61aa5dfa0dbebad578dee26713126aed05d7e","user": "admin", "age": 18,"houseid":1, "price": 100, "time": 123, "status": True}

        ]    
    }}
    return JsonResponse(data)
    