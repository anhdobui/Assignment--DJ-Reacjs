import re
from django.core.exceptions import  ValidationError
from django.utils.translation import gettext_lazy as _

def my_validate_email(value):
    if not re.match(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',value):
        raise ValidationError(_("Email không đúng định dạng"))
    return value