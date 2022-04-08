from .views.hello import hello


from .views import common
from .views import store
from .views import house
from .views import order

from .views import user


from django.urls import path

urlpatterns = [
    # 
    path('hello/', hello),
    path('addons/booking/common/init', common.commonInit),

    # store
    path('addons/booking/store/detail', store.detail),
    path('addons/booking/store/defaultStore', store.defaultStore),

    # house
    path('addons/booking/house/houseList', house.houseList),
    path('addons/booking/house/detail', house.detail),
    path('addons/booking/house/booking', house.booking),

    #user
    path('api/my/balance', user.balance),

    # order
    path('addons/booking/order/pay', order.pay),
    path('addons/booking/order/add', order.add),
    path('addons/booking/order/detail', order.detail),


]
