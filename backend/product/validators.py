import re
from django.core.exceptions import  ValidationError
from django.utils.translation import gettext_lazy as _

def valid_price(value):
    rex = r'^\d+(\.\d+)?€?$'
    if not re.match(rex,value):
        raise ValidationError(_("Nhập giá tiền không đúng định dạng"))
    return value
def is_number(value):
    rex = r'^\d+$'
    if not re.match(rex,value):
        raise ValidationError(_("Định dạng phải là kiểu số"))
    return value