from .views import test


from .views import common
from .views import store
from .views import house
from .views import order

from .views import user

from .views import admin
from .views import gover



from django.urls import path

urlpatterns = [
    # test
    path('hello/', test.hello),
    path('db/', test.db),

    #governance
    path('governance/trx', gover.trxList) ,

    # admin
    path('vue-element-admin/user/login', admin.login),
    path('vue-element-admin/user/info', admin.info),
    path('vue-element-admin/transaction/list', admin.List),
    path('admin/init', admin.init),
    path('admin/houseList', admin.houseList),



    path('addons/booking/common/init', common.commonInit),
    path('addons/booking/house/lodgerList',common.lodgerList),

    # store
    path('addons/booking/store/detail', store.detail),
    path('addons/booking/store/defaultStore', store.defaultStore),

    # house
    path('addons/booking/house/add', house.addHouse),
    path('addons/booking/house/houseList', house.houseList),
    path('addons/booking/house/detail', house.detail),
    path('addons/booking/house/booking', house.booking),

    #user
    path('api/my/balance', user.balance),

    # order
    path('addons/booking/order/pay', order.pay),
    path('addons/booking/order/add', order.add),
    path('addons/booking/order/detail', order.detail),
    path('addons/booking/order/orderList', order.orderList),
    # other

]
