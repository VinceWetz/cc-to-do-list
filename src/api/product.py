# flask packages
from flask import Response, request, jsonify
from flask_restful import Resource

# project resources
from models.product import Product
from api.errors import forbidden
from tools.utils import *


class ProductApi(Resource):
    @error_handler
    def get(self):
        output = Product.objects()
        return generate_json_response(result=output)

    @error_handler
    def post(self):
        data = request.get_json()
        post_user = Product(**data).save()
        output = {'id': str(post_user.id)}

        return generate_json_response(result=output)

    @error_handler
    def delete(self):

        output = {'list_id': Product.objects(list_id=1).delete()}
        return generate_json_response(result=output)

