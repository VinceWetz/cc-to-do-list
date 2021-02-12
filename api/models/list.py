from mongoengine import *
from time import time_ns
from random import choices
import string


def generate_list_id():
    return ''.join(choices(string.ascii_lowercase + string.digits, k=6))


class List(Document):
    """List object

    :param list_id: unique 6-digit string as identifier
    :param creation_timestamp: creation date in ns of this object
    """

    # params
    list_id = StringField(default=generate_list_id, unique=True)
    creation_timestamp = IntField(default=time_ns)
