from models.entry import *

class Product(Entry):
    """Product to add to a list.

    :param name: Name of the product
    :param amount: Amount of this product
    :param unit: Unit of this product
    """
    # params
    amount = FloatField()
    unit = StringField()
