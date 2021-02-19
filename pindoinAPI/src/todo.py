# flask packages
from flask import request
from flask_restful import Resource
import random
# project resources
from models.todo import ToDo, generate_todo_id
from tools.utils import *


class GetToDo(Resource):
    @error_handler
    def get(self, list_id):
        output = ToDo.objects(list_id=list_id)
        return generate_json_response(result=output)

class CreateToDo(Resource):
    @error_handler
    def post(self, list_id):
        data = request.get_json()
        data["todo_id"] = random.randint(1, 99999999999)
        data["list_id"] = list_id
        post_user = ToDo(**data).save()
        output = post_user
        return generate_json_response(result=output)

class UpdateToDo(Resource):
    @error_handler
    def post(self, list_id, todo_id):
        data = request.get_json()
        data["list_id"] = list_id
        data["todo_id"] = todo_id
        if "_id" in data:
            del data["_id"]
        post_user = ToDo.objects(todo_id=todo_id, list_id=list_id).update(**data)
        output = post_user
        return generate_json_response(result=output)


class DeleteToDo(Resource):
    @error_handler
    def post(self, list_id, todo_id):
        output = {'list_id': ToDo.objects(todo_id=todo_id, list_id=list_id).delete()}
        return generate_json_response(result=output)
