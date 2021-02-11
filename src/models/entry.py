from mongoengine import *
from time import time_ns

class Entry(Document):
    """List entry super class. All list entries have to inherit from
    this object.

    :param list_id: list this entry is for
    :param creation_date: creation date in ns of this object
    """
    # necessary
    meta = {'allow_inheritance': True}

    # params
    list_id = IntField(required=True)
    description = StringField(required=True)
    checked = BooleanField(default=False)
    creation_date = IntField(default=time_ns)
