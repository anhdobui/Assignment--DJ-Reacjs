from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .product.models import *
# -------------------------------------------------------------------------------------
class GetBraSerializer(ModelSerializer):
    class Meta:
        model = ProductBranch
        fields = ["name","label","reference",
        "description_short","description_detail","cleaning",
        "price","price_sale","category"
        ]
        depth = 1

# -------------------------------------------------------------------------------------
class GetAlbumSerializer(ModelSerializer):
    album = serializers.SerializerMethodField('get_album')
    def get_album(self,obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.album.url)
            
    class Meta:
        model = Album
        fields = ["id","album"]
# 

class GetSamePrdSerializer(ModelSerializer):
    avatar = serializers.SerializerMethodField('get_avatar')
    def get_avatar(self,obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.avatar.url)
            
    class Meta:
        model = ProductItem
        fields = ["id","avatar"]
# 
class GetProductsSlz(ModelSerializer):
    product_same = serializers.SerializerMethodField('get_product_same')
    album = serializers.SerializerMethodField('get_album')
    def get_product_same(self, obj):
        request = self.context.get('request')
        parentId = ProductItem.objects.get(id=obj.id).parent_branch.id
        prds_same = ProductItem.objects.filter(parent_branch__id = parentId).exclude(id = obj.id).filter(active=True)[:3]
        return GetSamePrdSerializer(prds_same, many=True, context={'request': request}).data
    def get_album(self,obj):
        request = self.context.get('request')
        result = Album.objects.filter(idProduct=obj.id)
        return GetAlbumSerializer(result, many=True, context={'request': request}).data
    class Meta:
        model = ProductItem
        fields = ["id","avatar","avatar_flip","stock","product_same","album"]
# 
class GetBranchSlz(ModelSerializer):
    children = serializers.SerializerMethodField('get_children')
    def get_children(self,obj):
        request = self.context.get('request')
        product = ProductItem.objects.filter(active=True, parent_branch__id=obj.id)
        return GetProductsSlz(product, many=True, context={'request': request}).data
    class Meta:
        model = ProductBranch
        fields = ["id","name","label","price","price_sale","children"
        ]
# 
class GetCatalogueSerializer(ModelSerializer):
    products = serializers.SerializerMethodField('get_products')
    def get_products(self,obj):
        request = self.context.get('request')
        branch = ProductBranch.objects.filter(active=True, category__id=obj.id)
        return GetBranchSlz(branch, many=True, context={'request': request}).data
        
    class Meta:
        model = ProductCatalogue
        fields = ["id","title","description","content","products"]

# 
# -------------------------------------------------------------------------------------

class GetPrdSerializer(GetProductsSlz):
    name = serializers.SerializerMethodField('get_name')
    label = serializers.SerializerMethodField('get_label')
    reference = serializers.SerializerMethodField('get_reference')
    price = serializers.SerializerMethodField('get_price')
    price_sale = serializers.SerializerMethodField('get_price_sale')
    description_short = serializers.SerializerMethodField('get_description_short')
    description_detail = serializers.SerializerMethodField('get_description_detail')
    cleaning = serializers.SerializerMethodField('get_cleaning')
    id_cate = serializers.SerializerMethodField('get_id_cate')
    title_cate = serializers.SerializerMethodField('get_title_cate')

    def get_name(self,obj):
        name = ProductBranch.objects.get(id=obj.parent_branch.id).name
        return name
    def get_label(self,obj):
        label = ProductBranch.objects.get(id=obj.parent_branch.id).label
        return label
    def get_reference(self,obj):
        reference = ProductBranch.objects.get(id=obj.parent_branch.id).reference
        return reference
    def get_price(self,obj):
        price = ProductBranch.objects.get(id=obj.parent_branch.id).price
        return price
    def get_price_sale(self,obj):
        price_sale = ProductBranch.objects.get(id=obj.parent_branch.id).price_sale
        return price_sale
    def get_description_short(self,obj):
        description_short = ProductBranch.objects.get(id=obj.parent_branch.id).description_short
        return description_short
    def get_description_detail(self,obj):
        description_detail = ProductBranch.objects.get(id=obj.parent_branch.id).description_detail
        return description_detail
    def get_cleaning(self,obj):
        cleaning = ProductBranch.objects.get(id=obj.parent_branch.id).cleaning
        return cleaning
    def get_id_cate(self,obj):
        id_cate = ProductBranch.objects.get(id=obj.parent_branch.id).category.id
        return id_cate
    def get_title_cate(self,obj):
        title_cate = ProductBranch.objects.get(id=obj.parent_branch.id).category.title
        return title_cate
    class Meta:
        model = ProductItem
        fields = ["id","avatar","avatar_flip","color","style","specs","material","ean13","stock","product_same",
        "name","label","price","price_sale","id_cate","reference","description_short","description_detail","title_cate","album","cleaning"]
    

# -------------------------------------------------------------------------------------

