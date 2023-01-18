import re
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.views.generic import View
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.

class Login(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return render(request, 'component/login/index.html')

    def post(self, request, *args, **kwargs):
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username,password=password)
            if user is not None:
                login(request,user)
                return redirect('dashboard')
            else:
                messages.info(request,'Tài khoản hoặc mật khẩu không chính xác')
            
        return render(request, 'component/login/index.html',{'form':form})