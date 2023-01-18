from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .forms import FormCatalogue,FormBranch,FormProduct, FormAlbum
from django.contrib import messages
from .models import ProductCatalogue,ProductBranch,ProductItem,Album
from django.conf import settings
# Create your views here.
#----------------------------------------product_item---------------------------------------------
@login_required(login_url='login')
def product(request):
    data = ProductItem.objects.all() 
    context={'data':data,'media_root': settings.MEDIA_ROOT, 'media_url': settings.MEDIA_URL}
    return render(request,'component/product/product/index.html', context)

@login_required(login_url='login')
def create_product(request):
    FormProduct.use_disabled=False
    form = FormProduct(request.POST or None)
    formAlbum = FormAlbum(request.POST or None)
    context={'form':form,'album':formAlbum}
    if request.method == 'POST':
        form = FormProduct(request.POST, request.FILES)
        formAlbum = FormAlbum(request.POST, request.FILES)
        files = request.FILES.getlist('album')
        if form.is_valid() and formAlbum.is_valid():
            Prd = form.save()
            for f in files:
                Album.objects.create(idProduct=Prd,album=f)
            messages.success(request,"Thêm mới sản phẩm thành công")
            return redirect('product')
        else:
            intaial_data={
                'color':request.POST.get('color'),
                'style':request.POST.get('style'),
                'specs':request.POST.get('specs'),
                'material':request.POST.get('material'),
                'ean13':request.POST.get('ean13'),
            }
            form = FormProduct(initial = intaial_data)
    return render(request,'component/product/product/create.html', context)
@login_required(login_url='login')
def update_product(request,pk):
    FormProduct.use_disabled=False
    product = ProductItem.objects.get(id=pk)
    init_avatar = product.avatar
    init_flip = product.avatar_flip
    init_album = Album.objects.filter(idProduct = pk)
    form = FormProduct(instance = product)
    formAlbum = FormAlbum(request.POST or None)
    if request.method == 'POST':
        form = FormProduct(request.POST, instance=product)
        formAlbum = FormAlbum(request.POST, request.FILES)
        files = request.FILES.getlist('album')
        if form.is_valid():
            Prd = form.save()
            if formAlbum.is_valid():
                init_album.delete()
                for f in files:
                    Album.objects.create(idProduct=Prd,album=f)
                messages.success(request,"Cập nhật sản phẩm thành công")
                return redirect('product')
            else:
                messages.success(request,"Cập nhật sản phẩm thành công")
                return redirect('product')
        else:
            intaial_data={
                'color':request.POST.get('color'),
                'style':request.POST.get('style'),
                'specs':request.POST.get('specs'),
                'material':request.POST.get('material'),
                'ean13':request.POST.get('ean13'),
            }
            form = FormProduct(request.POST, initial = intaial_data)
    context={'form':form,'update':True,'avatar':init_avatar,'avatar_flip':init_flip,'init_album':init_album,'album':formAlbum}
    return render(request,'component/product/product/update.html', context)
@login_required(login_url='login')
def delete_product(request,pk):
    FormProduct.use_disabled=True
    product = ProductItem.objects.get(id=pk)
    form = FormProduct(instance=product)
    name = f'{product.parent_branch} Màu {product.color}'
    if request.method == 'POST':
        product.delete()
        messages.success(request,"Bạn đã xóa thành công ")
        return redirect('product')
    context={'form':form,'name':name,'media_root': settings.MEDIA_ROOT, 'media_url': settings.MEDIA_URL,'avatar':product.avatar}
    return render(request,'component/product/product/delete.html', context)
@login_required(login_url='login')
def status_product(request,pk):
    product = ProductItem.objects.get(id=pk)
    product.active = not product.active
    product.save()
    return redirect('product')
# ------------------------------------------------------------------------------------------------
# ----------------------------------------branch------------------------------------------

# index
@login_required(login_url='login')
def branch(request):
    data = ProductBranch.objects.all() 
    list_count = {}
    for item in data:
        list_count[item.id] = len(ProductItem.objects.filter(parent_branch = item.id).filter(active=True))
    context={'data':data,'list_count':list_count}
    return render(request,'component/product/branch/index.html', context)
# create
@login_required(login_url='login')
def create_branch(request):
    FormBranch.use_disabled=False
    form = FormBranch(request.POST or None)
    context={'form':form}
    if request.method == 'POST':
        form = FormBranch(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Thêm mới dòng sản phẩm thành công")
            return redirect('productBranchCreate')
        else:
            intaial_data={
                'description_short':request.POST.get('description_short'),
                'description_detail':request.POST.get('description_detail'),
                'cleaning':request.POST.get('cleaning'),
                'price_sale':request.POST.get('price_sale'),
                'label':request.POST.get('label'),
                'reference':request.POST.get('reference'),
            }
            form = FormBranch(initial = intaial_data)
    return render(request,'component/product/branch/create.html', context)

# update
@login_required(login_url='login')
def update_branch(request, pk):
    FormBranch.use_disabled=False
    branch = ProductBranch.objects.get(id=pk)
    form = FormBranch(instance=branch)
   
    if request.method == 'POST':
        form = FormBranch(request.POST,instance=branch)
        if form.is_valid():
            form.save()
            messages.success(request,"Cập nhật dòng sản phẩm thành công")
            return redirect('productBranch')
    context={'form':form}
    return render(request,'component/product/branch/update.html', context)
# delete
def delete_branch(request,pk):
    FormBranch.use_disabled=True
    branch = ProductBranch.objects.get(id=pk)
    form = FormBranch(instance=branch)
    name = branch.name
    if request.method == 'POST':
        branch.delete()
        messages.success(request,"Bạn đã xóa thành công ")
        return redirect('productBranch')
    context={'form':form,'name':name}
    return render(request,'component/product/branch/delete.html', context)
# status
def status_branch(request,pk):
    branch = ProductBranch.objects.get(id=pk)
    branch.active = not branch.active
    branch.save()
    return redirect('productBranch')
# ------------------------------------------------------------------------------------------------
# ----------------------------------------product_catalogue---------------------------------------
@login_required(login_url='login')   
def catalogue(request):
    data = ProductCatalogue.objects.all() 
    context={'data':data}
    return render(request,'component/product/catalogue/index.html',context)
# create catalogue
@login_required(login_url='login')   
def create_catalogue(request):
    FormCatalogue.use_readonly=False
    FormCatalogue.use_disabled=False
    form = FormCatalogue(request.POST or None)
    context={'form':form}
    if request.method == 'POST':
        form = FormCatalogue(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Thêm mới nhóm sản phẩm thành công")
            return redirect('productCatalogue')
        else:
            intaial_data={
                'description':request.POST.get('description'),
                'content':request.POST.get('content')
            }
            form = FormCatalogue(initial = intaial_data)

            return render(request,'component/product/catalogue/create.html',context)
    return render(request,'component/product/catalogue/create.html',context)
# update catalogue
@login_required(login_url='login')   
def update_catalogue(request, pk):
    catalogue = ProductCatalogue.objects.get(id=pk)
    FormCatalogue.use_readonly=False
    FormCatalogue.use_disabled=False
    form = FormCatalogue(instance=catalogue)
   
    if request.method == 'POST':
        form = FormCatalogue(request.POST,instance=catalogue)
        if form.is_valid():
            form.save()
            messages.success(request,"Cập nhật nhóm sản phẩm thành công")
            return redirect('productCatalogue')
    context={'form':form}
    return render(request,'component/product/catalogue/update.html', context)
# delete catalogue
@login_required(login_url='login')   
def delete_catalogue(request, pk):
    catalogue = ProductCatalogue.objects.get(id=pk)
    FormCatalogue.use_readonly=True
    FormCatalogue.use_disabled=True
    form = FormCatalogue(instance=catalogue)
    title = catalogue.title
    if request.method == 'POST':
        catalogue.delete()
        messages.success(request,"Bạn đã xóa thành công ")
        return redirect('productCatalogue')
    context={'form':form,'title':title}
    return render(request,'component/product/catalogue/delete.html', context)

@login_required(login_url='login')
def status_catalogue(request, pk):
    catalogue = ProductCatalogue.objects.get(id=pk)
    catalogue.active = not catalogue.active
    catalogue.save()
    return redirect('productCatalogue')
# ------------------------------------------------------------------------------------------------

