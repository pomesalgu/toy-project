from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from blog.models import Post
from blog.forms import PostForm

def post_list(request):
    if request.user.is_authenticated:
        posts = Post.objects.all().order_by('published_date')
    else:
        posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')

    data = {
        'posts': posts
    }
    return render(request, 'blog/posts.html', data)

def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(request)
            return redirect('post_detail', pk=post.pk)

    else:
        form = PostForm()

    data = {
        'form': form
    }
    return render(request, 'blog/form.html', data)

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    data = {
        'post': post
    }
    return render(request, 'blog/detail/post.html', data)

def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(request)
            return redirect('post_detail', pk=post.pk)

    else:
        form = PostForm(instance=post)

    data = {
        'post': post,
        'form': form
    }
    return render(request, 'blog/form.html', data)
