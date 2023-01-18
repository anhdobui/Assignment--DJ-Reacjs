from django.db import models
from ckeditor.fields import RichTextField
# Create your models here.
class Base(models.Model):
    class Meta:
        abstract = True
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

class ProductCatalogue(Base):
    title = models.CharField(max_length = 255, blank = False, null = False)
    description = RichTextField(max_length=1000,blank = True, null = True)
    content = RichTextField(max_length=1000,blank = True, null = True)
    

    

    def __str__(self):
        return self.title
class ProductBranch(Base):
    class Meta:
        ordering = ["-time_create"]

    name = models.CharField(max_length = 255, blank = False, null = False)
    label = models.CharField(max_length = 255, blank = True, null = True)
    reference = models.CharField(max_length = 255, blank = True, null = True)
    description_short = models.TextField(max_length=1000, blank = True, null = True)
    description_detail = RichTextField(max_length=1000,blank = True, null = True)
    cleaning = RichTextField(max_length=1000,blank = True, null = True)
    price = models.CharField(max_length = 20, blank = False, null = False)
    price_sale = models.CharField(max_length = 20, blank = True, null = True)
    category = models.ForeignKey(ProductCatalogue, on_delete=models.CASCADE)


    def __str__(self):
        return self.name

class ProductItem(Base):

    class Meta:
        ordering = ["-time_create"]

    parent_branch = models.ForeignKey(ProductBranch, on_delete=models.CASCADE)
    stock = models.IntegerField(blank = False, null = False)
    avatar = models.ImageField(upload_to='images', null=False)
    avatar_flip = models.ImageField(upload_to='images', null=True ,default=None)
    color = models.CharField(max_length = 255, blank = False, null = False ,default=None)
    style = models.CharField(max_length = 255, blank = True, null = True)
    specs = models.CharField(max_length = 255, blank = True, null = True)
    material = models.CharField(max_length = 255, blank = True, null = True)
    ean13 = models.CharField(max_length = 255, blank = True, null = True)

class ListSizeProduct(models.Model):
    size = models.IntegerField(max_length = 255, blank = False, null = False)
    idProduct =  models.ForeignKey(ProductItem, on_delete=models.CASCADE, null=False)
    

class Album(models.Model):
    album = models.FileField(upload_to='files', null=False)
    idProduct =  models.ForeignKey(ProductItem, on_delete=models.CASCADE, null=False)
    class Meta:
       unique_together = [['album', 'idProduct']]
       ordering = ["-idProduct"]

    
    def __str__(self):
        return self.album.name
    
    





    

   