from django.http import JsonResponse




def balance(request):
    data = {"code":1,"msg":"ok","time":"","data": {"balance": 100}}
    return JsonResponse(data)