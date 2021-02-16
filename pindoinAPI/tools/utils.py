from flask import jsonify
from mongoengine.errors import *
from mongoengine.queryset.queryset import QuerySet

def generate_json_response(success: bool = True, result: list = list,
                           error: str = None):
    """Generate a consistant API output for an easier frontend handling.

    :param success: Request was successful or not
    :param result: Request result
    :param error: Error string
    :return: flask.Response object
    """
    status_code = 200
    # turn result into a list
    if not isinstance(result, QuerySet):
        print("yes")
        result = [result]

    # add error message to response
    data = {"success": success, "result": result}
    print(data)
    if error:
        error = error.replace('"', "'")
        data["error"] = {"message": error}
        status_code = 400

    res = jsonify(data)
    res.status_code = status_code
    return res


def error_handler(func):
    def inner_function(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except FieldDoesNotExist as e:
            return generate_json_response(success=False, error=str(e))
        except TypeError:
            return generate_json_response(success=False, error="Invalid body")
    return inner_function
