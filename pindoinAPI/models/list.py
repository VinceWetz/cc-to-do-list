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
    listId = StringField(db_field="listId", default=generate_list_id, unique=True)
    createTimestamp = IntField(db_field="createTimestamp", default=time_ns)
cd pindoin