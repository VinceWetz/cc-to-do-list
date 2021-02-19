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
        output = ToDo.objects(listId=list_id)
        return generate_json_response(result=output)

class CreateToDo(Resource):
    @error_handler
    def post(self, list_id):
        data = request.get_json()
        data["todoId"] = random.randint(1, 99999999999)
        data["listId"] = list_id
        post_user = ToDo(**data).save()
        output = post_user
        return generate_json_response(result=output)

class UpdateToDo(Resource):
    @error_handler
    def post(self, list_id, todo_id):
        data = request.get_json()
        data["listId"] = list_id
        data["todoId"] = todo_id
        del data["_id"]
        post_user = ToDo.objects(todoId=todo_id, listId=list_id).update(**data)
        output = post_user
        return generate_json_response(result=output)


class DeleteToDo(Resource):
    @error_handler
    def post(self, list_id, todo_id):
        output = {'listId': ToDo.objects(todoId=todo_id, listId=list_id).delete()}
        return generate_json_response(result=output)
