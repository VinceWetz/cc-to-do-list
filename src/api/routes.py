from api.product import ProductApi

def create_routes(api):
    api.add_resource(ProductApi, '/product/')