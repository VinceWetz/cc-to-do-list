# flask packages
from flask import request
from flask_restful import Resource

# project resources
from models.list import List
from tools.utils import *


class GetList(Resource):
    @error_handler
    def get(self, list_id):
        output = List.objects(list_id=list_id)
        return generate_json_response(result=output)

class CreateList(Resource):
    @error_handler
    def post(self):
        #data = request.get_json()
        post_user = List().save()
        output = post_user
        return generate_json_response(result=output)

class DeleteList(Resource):
    @error_handler
    def post(self, list_id):
        output = {'list_id': List.objects(list_id=list_id).delete()}
        return generate_json_response(result=output)
