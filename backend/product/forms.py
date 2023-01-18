from django import forms
from django.utils.translation import gettext_lazy as _
from .models import *
from .validators import *
class FormCatalogue(forms.ModelForm):
    use_readonly = False
    use_disabled = False
    use_required_attribute = False
    class Meta:
        model = ProductCatalogue
        fields = ("title","description","content",)
        widgets={
            'title':forms.TextInput(attrs={'class':'form-control'}),
            'description':forms.Textarea(attrs={'class':'form-control'}),
            'content':forms.Textarea(attrs={'class':'form-control'}),
        }
        error_messages = {
            'title': {
                'required': _("Bạn cần nhập vào trường tiêu đề"),
            },
        }
    
    def __init__(self, *args, **kwargs):
        super(FormCatalogue, self).__init__(*args, **kwargs)
        
        if FormCatalogue.use_disabled == True:
            self.fields['title'].widget.attrs['disabled'] = True
        if FormCatalogue.use_readonly == True:
            self.fields['title'].widget.attrs['readonly'] = True
    
    
# ---------------------------------------------------------------------------------------------------------------------
class FormBranch(forms.ModelForm):
    use_readonly = False
    use_disabled = False
    use_required_attribute = False
    category = forms.ModelChoiceField(
        queryset = ProductCatalogue.objects.filter(active=True),
        error_messages={'required': 'Bạn cần chọn danh mục cha'},
        )
    class Meta:
        model = ProductBranch  
        fields = ("name","label","reference",
        "description_short","description_detail","cleaning",
        "price","price_sale","category",
        ) 
        widgets={
            'name':forms.TextInput(attrs={'class':'form-control'}),
            'description_short':forms.Textarea(attrs={'class':'form-control'}),
            'description_detail':forms.Textarea(attrs={'class':'form-control'}),
            'cleaning':forms.Textarea(attrs={'class':'form-control'}),
            'price':forms.TextInput(attrs={'class':'form-control'}),
            'price_sale':forms.TextInput(attrs={'class':'form-control'}),
            'label':forms.TextInput(attrs={'class':'form-control'}),
            'reference':forms.TextInput(attrs={'class':'form-control'}),
        }
        error_messages = {
            'name': {
                'required': _("Bạn cần nhập tên sản phẩm"),
            },
            'price': {
                'required': _("Bạn cần nhập giá "),
            }
        }
    
    def clean_price(self):
        data = self.cleaned_data['price']
        if(data and data.find('€') ==-1 ):
            return f'{data}€'
        else:
            return data
    def clean_price_sale(self):
        data = self.cleaned_data['price_sale']
        if(data and data.find('€') ==-1 ):
            return f'{data}€'
        else:
            return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].widget.attrs['class'] = 'form-control m-b select2'

        self.fields['price'].validators = [valid_price]

        if FormBranch.use_disabled == True:
            self.fields['name'].widget.attrs['disabled'] = True
            self.fields['category'].widget.attrs['disabled'] = True
# ---------------------------------------------------------------------------------------------------------------------
class FormProduct(forms.ModelForm):
    use_disabled=False
    use_required_attribute = False
    parent_branch = forms.ModelChoiceField(
        queryset = ProductBranch.objects.filter(active=True),
        error_messages={'required': 'Bạn cần chọn dòng sản phẩm'},
        )
    avatar_flip = forms.FileField(required=False)
    class Meta:
        model = ProductItem  
        fields = ("parent_branch","stock","avatar","avatar_flip","color","style","specs","material","ean13",) 
        widgets={
            'stock':forms.TextInput(attrs={'class':'form-control'}),
            'color':forms.TextInput(attrs={'class':'form-control'}),
            'style':forms.TextInput(attrs={'class':'form-control'}),
            'specs':forms.TextInput(attrs={'class':'form-control'}),
            'material':forms.TextInput(attrs={'class':'form-control'}),
            'ean13':forms.TextInput(attrs={'class':'form-control'}),
        }
        error_messages = {
            'stock': {
                'required': _("Bạn cần nhập số hàng có"),
            },
            'avatar':{
                'required': _("Bạn cần ảnh đại diện"),
            },
            'color':{
                'required': _("Bạn cần nhập màu sản phẩm"),
            },
        }
    
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['parent_branch'].widget.attrs['class'] = 'form-control m-b select2'

        self.fields['avatar'].widget.attrs['class'] = 'input-upload'
        self.fields['avatar'].widget.attrs['onchange'] = 'handleUpload("id_avatar")'

        self.fields['avatar_flip'].widget.attrs['class'] = 'input-upload'
        self.fields['avatar_flip'].widget.attrs['onchange'] = 'handleUpload("id_avatar_flip")'

        if FormProduct.use_disabled == True:
            self.fields['color'].widget.attrs['disabled'] = True
            self.fields['parent_branch'].widget.attrs['disabled'] = True

class FormAlbum(forms.ModelForm):
    use_required_attribute = False
    album = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}),error_messages={'required': 'Bạn cần chọn album ảnh'})
    class Meta:
        model = Album  
        fields = ("album",) 

    
        
    
    
    


