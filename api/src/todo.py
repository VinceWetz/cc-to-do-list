# flask packages
from flask import request
from flask_restful import Resource

# project resources
from models.todo import ToDo
from tools.utils import *


class ToDoAPI(Resource):
    @error_handler
    def get(self, list_id):
        output = ToDo.objects(list_id=list_id)
        return generate_json_response(result=output)

    @error_handler
    def put(self, list_id, todo_id):
        data = request.get_json()
        data["list_id"] = list_id
        data["todo_id"] = todo_id
        post_user = ToDo.objects(todo_id=todo_id, list_id=list_id).update(**data)
        output = post_user
        return generate_json_response(result=output)

    @error_handler
    def delete(self, list_id, todo_id):
        output = {'list_id': ToDo.objects(todo_id=todo_id, list_id=list_id).delete()}
        return generate_json_response(result=output)

class ToDoCreateAPI(Resource):
    @error_handler
    def post(self, list_id):
        data = request.get_json()
        data["list_id"] = list_id
        post_user = ToDo(**data).save()
        output = post_user
        return generate_json_response(result=output)
