from src.todo import ToDoAPI, ToDoCreateAPI
from src.list import ListAPI, ListCreateAPI

def create_routes(api):
    api.add_resource(ToDoAPI,
                     '/list/<string:list_id>/todos',
                     '/list/<string:list_id>/todo/<int:todo_id>')
    api.add_resource(ToDoCreateAPI, '/list/<string:list_id>/todos/create')

    api.add_resource(ListAPI, '/list/<string:list_id>')
    api.add_resource(ListCreateAPI, '/lists/create')
