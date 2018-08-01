from django.contrib import admin
from .models import Post

# https://tutorial.djangogirls.org/ko/django_admin/
# https://docs.djangoproject.com/en/1.8/ref/contrib/admin/
admin.site.register(Post)