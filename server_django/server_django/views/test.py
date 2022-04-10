from cgi import test
from django.http import HttpResponse, JsonResponse
from model.house import house


def hello(request):
    return JsonResponse({"msg":"helloworld!"})

 
# 数据库操作
def db(request):
    test1 = house(name='runoob')
    test1.save()

    List = house.objects.all()
    print(List[0].name)
    return HttpResponse(List)
    return HttpResponse("<p>数据添加成功！</p>")