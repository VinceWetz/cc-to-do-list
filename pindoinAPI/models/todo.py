from mongoengine import *
from time import time_ns
from random import randint

creation_timestamp = IntField(default=time_ns)

def generate_todo_id():
    return randint(10000000000000, 199999999999999)

class ToDo(Document):
    """TODO object

    :param todo_id: unique 16-digit number as identifier
    :param list_id: referenced list
    :param category: type of task
    :param task: task itself - what is to do?
    :param checked: marker if task is already done
    :param check_timestamp: timestamp it got checked
    :param creation_timestamp: creation date in ns of this object
    """

    # params
    todoId = IntField(unique=True)
    listId = StringField(required=True)
    category = StringField(required=True)
    task = StringField(required=True)
    checked = BooleanField(default=False)
    checkTimestamp = IntField(default=0)
    createTimestamp = IntField(default=time_ns)
