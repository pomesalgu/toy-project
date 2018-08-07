from django import forms
from blog.models import Post

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'content')

    def save(self, request, commit=True):
        from django.utils import timezone
        post = super(PostForm, self).save(commit=False)
        post.author = request.user
        post.save()

        return post
