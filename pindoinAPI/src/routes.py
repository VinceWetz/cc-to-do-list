from src.todo import *
from src.list import *

def create_routes(api):
    api.add_resource(GetToDo, '/list/<string:list_id>/todos')
    api.add_resource(CreateToDo, '/list/<string:list_id>/todos/create')
    api.add_resource(UpdateToDo, '/list/<string:list_id>/todo/<int:todo_id>/update')
    api.add_resource(DeleteToDo, '/list/<string:list_id>/todo/<int:todo_id>/delete')

    api.add_resource(GetList, '/list/<string:list_id>')
    api.add_resource(CreateList, '/lists/create')
    api.add_resource(DeleteList, '/list/<string:list_id>/delete')

