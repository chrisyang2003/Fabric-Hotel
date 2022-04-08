from django.http import HttpResponse
import json


def hello(request):
    msg = json.dumps({"msg":"helloworld!"})
    return HttpResponse(msg)