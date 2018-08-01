from django.db import models
from django.utils import timezone

# https://tutorial.djangogirls.org/ko/django_models/

class Post(models.Model): # Post 모델 객체 정의
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    # CharField : 제한된 텍스트 정의
    # TextField : 긴 텍스트 위한 속성.
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)


    def publish(self): # 메서드/함수
        self.published_date = timezone.now()
        self.save()
