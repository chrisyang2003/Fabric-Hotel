from django.http import JsonResponse
import requests 
from model.house import house

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as Login

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email")

def login(request):
    msg = {
        'color': 'transparent',
    }
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is None:
            msg['error'] = "用户名或密码错误！"
        else:
            Login(request, user)
            return redirect("/index")
    return render(request, "login.html", msg)


def register(request):
    if request.method == 'POST':

        form = RegisterForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('/login/')
    else:
        form = RegisterForm()

    return render(request, 'register.html', context={'form': form})


def login_out(request):
    logout(request)  
    return redirect("/index")  


def login(request):

    _json = {"code":20000,"data":{"token":"1"}}
    return JsonResponse({
        'data':2
    })

def logout(_):

    _json = {"code":20000,"data":{"token":"1"}}
    return JsonResponse('1')



def info(_):
    data = {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
    return JsonResponse(data)

def init(_):
    data = {"code":20000, "data":{
        "ordercount": len(requests.get('http://127.0.0.1:3000/order/getall').json()),
        "message": 0,
        "purchases": 100,
        "hotels": len(house.objects.all()),
    }}

    return JsonResponse(data)

def List(_):
    data = {"code":20000,"data":{"total":20,"items":[
        {"order_no":"79335cfA-d45b-B7E1-ECEb-D4C2bfd220CC","timestamp":1188826048740,"username":"Maria Taylor","price":10576.18,"status":"pending"},
        {"order_no":"Eb5CBBD0-F4C0-7bc8-E449-B6DeE78E8FDa","timestamp":1188826048740,"username":"Susan Perez","price":1175.6,"status":"success"},
        {"order_no":"B7BCfEb4-DD94-fd1f-9e3F-ADA06Ae1CCA9","timestamp":1188826048740,"username":"Daniel Thomas","price":8281.72,"status":"pending"}
    ]}}
    return JsonResponse(data)


    
def houseList(_):
    data = {"code":20000,"data":{"total":100,"items":[{"id":1,"timestamp":1307386712221,"author":"Christopher","reviewer":"Mary","title":"Cboulvbf Feesrh Mihjq Ybmxsdex Sucmkcy Swlvdgr","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":35.21,"importance":3,"type":"JP","status":"published","display_time":"1971-09-30 03:45:55","comment_disabled":True,"pageviews":2304,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":2,"timestamp":1229674616898,"author":"John","reviewer":"Dorothy","title":"Smfb Qyfedcxdq Oywjb Uoifsgke Ebbhb Tjvpn","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":16.01,"importance":3,"type":"EU","status":"published","display_time":"2013-04-06 06:57:59","comment_disabled":True,"pageviews":1752,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":3,"timestamp":628385065506,"author":"Susan","reviewer":"Donna","title":"Hbqp Bsyqdimwd Nslxnaovn Nxhkds Cenh Dzcdrdtf Puix Vstfj","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":53.92,"importance":3,"type":"JP","status":"draft","display_time":"1979-01-01 03:47:13","comment_disabled":True,"pageviews":1636,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":4,"timestamp":753117420422,"author":"Richard","reviewer":"Joseph","title":"Gpkrrtbh Gkxedwybt Jvfm Nimem Eguhk Nyh Nmk Iein Ieapwln","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":20.48,"importance":2,"type":"US","status":"published","display_time":"1990-07-09 06:34:40","comment_disabled":True,"pageviews":2761,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":5,"timestamp":1472868450685,"author":"Melissa","reviewer":"Michael","title":"Jaqnethrs Wuwxf Vrygkwfkf Jptomfjys Qsj Ilt Utcxy Tldyx Fyieo Iduphix","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":39.74,"importance":1,"type":"US","status":"published","display_time":"1975-02-02 09:14:13","comment_disabled":True,"pageviews":3053,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":6,"timestamp":572834128990,"author":"Susan","reviewer":"Daniel","title":"Fwnz Emv Qdbx Dmcigq Onxpqvjbxs Dtim","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":28.52,"importance":2,"type":"US","status":"draft","display_time":"1996-10-17 13:57:24","comment_disabled":True,"pageviews":2618,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":7,"timestamp":1042927296905,"author":"Scott","reviewer":"Michael","title":"Basg Nmlnry Yumqtnbw Wjx Nddpepqq Xom Znyv Qlk Ymhjcttvx Mgkv","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":38.11,"importance":3,"type":"US","status":"published","display_time":"2009-10-21 19:25:56","comment_disabled":True,"pageviews":4195,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":8,"timestamp":1373807322691,"author":"Eric","reviewer":"Jeffrey","title":"Pmbsqew Pboepybu Iubpstv Mkcgbtum Ilxgqglf","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":94.53,"importance":1,"type":"JP","status":"published","display_time":"1979-04-12 22:36:03","comment_disabled":True,"pageviews":1142,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":9,"timestamp":545604827595,"author":"George","reviewer":"Eric","title":"Bhvzuycbe Qqvisn Hyoaphd Fsvarhrse Iujkdcebpp Nkbhrgfgdt Qnzvs","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":18.87,"importance":2,"type":"US","status":"draft","display_time":"1981-10-15 06:11:11","comment_disabled":True,"pageviews":3793,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":10,"timestamp":31811090172,"author":"Melissa","reviewer":"Linda","title":"Heiicpg Mpud Xwpjv Mxxqaif Wbtfzvm Kpxg Hwrfmx","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":57.08,"importance":1,"type":"US","status":"draft","display_time":"2011-12-15 08:26:44","comment_disabled":True,"pageviews":2794,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":11,"timestamp":934271914600,"author":"Barbara","reviewer":"George","title":"Kutk Bltuev Cnpjr Vcwbxefs Qootc","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":47.89,"importance":2,"type":"CN","status":"draft","display_time":"1980-05-14 04:40:12","comment_disabled":True,"pageviews":369,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":12,"timestamp":525927198781,"author":"Kenneth","reviewer":"Linda","title":"Jfxxhs Mjpxnjr Qfrssp Hoxiykath Krwmwewu Pgfqjmaxtd Zdrrxf Cvkd","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":90.48,"importance":2,"type":"JP","status":"draft","display_time":"1984-03-26 18:06:34","comment_disabled":True,"pageviews":1336,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":13,"timestamp":797707501386,"author":"Jennifer","reviewer":"Eric","title":"Cbrlzkjg Igpja Rfkj Ugyxzfncu Nahftts Deivslr Uye Dwlfinvln","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":10.76,"importance":2,"type":"JP","status":"published","display_time":"1988-11-27 00:27:00","comment_disabled":True,"pageviews":4813,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":14,"timestamp":574043060025,"author":"Mary","reviewer":"Jason","title":"Ttxialtxs Whugw Vvs Yvaupx Xwemb Iywx Yrv","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":43.14,"importance":1,"type":"EU","status":"draft","display_time":"1996-04-23 15:46:23","comment_disabled":True,"pageviews":3104,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":15,"timestamp":146003125545,"author":"Nancy","reviewer":"Scott","title":"Ttcsgdcmn Ltyfvoigbw Tmfm Shrh Kanpi Dctp Wzomh","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":47.68,"importance":2,"type":"JP","status":"draft","display_time":"2007-02-04 04:34:44","comment_disabled":True,"pageviews":2089,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":16,"timestamp":866373418122,"author":"Jason","reviewer":"David","title":"Opybdlqjep Mqftos Dde Dwp Evskbm Ooongxvsj Fhfhn Xixhtao","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":13.95,"importance":3,"type":"US","status":"draft","display_time":"2002-12-16 13:42:02","comment_disabled":True,"pageviews":662,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":17,"timestamp":1647856572822,"author":"Patricia","reviewer":"Joseph","title":"Wungdj Ouuvxhzo Hjmvr Efqmeys Hrosijl Uomgbup Part Jwwg Qarxm","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":23.85,"importance":1,"type":"US","status":"published","display_time":"2007-01-19 19:14:47","comment_disabled":True,"pageviews":4681,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":18,"timestamp":887937865458,"author":"Patricia","reviewer":"Christopher","title":"Fddgtug Vulrv Srhyphi Dzlojce Fwhkcxf Bylco Oyfodvziw","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":28.12,"importance":2,"type":"CN","status":"published","display_time":"2005-04-26 12:08:24","comment_disabled":True,"pageviews":4665,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":19,"timestamp":399746666460,"author":"Matthew","reviewer":"Linda","title":"Ekxcfmhg Cjvvghc Klv Rtspbk Nbhjax Qsrby","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":82.44,"importance":2,"type":"EU","status":"draft","display_time":"1987-01-25 20:37:53","comment_disabled":True,"pageviews":1040,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":20,"timestamp":638962466158,"author":"Thomas","reviewer":"Edward","title":"Dkfl Gyonzcwxf Dddqlc Vzxfyz Rlscchbxjy Beatqar Plumlt Bhjjgwgidx Wsvyyrvyj Rdcjomr","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":41.22,"importance":1,"type":"CN","status":"published","display_time":"1973-08-21 20:08:33","comment_disabled":True,"pageviews":769,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]}]}}
    return JsonResponse(data)