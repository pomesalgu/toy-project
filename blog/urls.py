from django.conf.urls import url
from blog import views

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
    url(r'^post/create$', views.post_create, name='post_create'),
    url(r'^post/(?P<pk>\d+)$', views.post_detail, name='post_detail'),
    url(r'^post/(?P<pk>\d+)/edit$', views.post_edit, name='post_edit'),
]