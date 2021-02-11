# flask packages
from flask import Response, jsonify


def unauthorized() -> Response:
    output = {"error":
                  {"msg": "Request unauthorized."}
              }
    resp = jsonify({'result': output})
    resp.status_code = 401
    return resp


def forbidden() -> Response:
    output = {"error":
                  {"msg": "Forbidden."}
              }
    resp = jsonify({'result': output})
    resp.status_code = 403
    return resp


def invalid_route() -> Response:
    output = {"error":
                  {"msg": "Request invalid."}
              }
    resp = jsonify({'result': output})
    resp.status_code = 404
    return resp