from django import forms
from .validators import my_validate_email

class LoginForm(forms.Form):
    username = forms.CharField(error_messages={'required': 'Bạn chưa nhập tài khoản'})
    password = forms.CharField(error_messages={'required': 'Bạn chưa nhập mật khẩu'})