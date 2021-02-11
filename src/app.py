#!/usr/bin/env python
# -*- coding: utf8 -*-

from flask import Flask, app
from pymongo import MongoClient
from flask_restful import Api
from flask_mongoengine import MongoEngine

# local packages
from api.routes import create_routes

client = MongoClient()

# default mongodb configuration
default_config = {
    "MONGODB_SETTINGS": {
        'db': 'list',
        'username': 'api',
        'password': '1CbViFMsxyAuW2Gs',
        'authentication_source': 'admin'
    }
}

mdb_sets = default_config["MONGODB_SETTINGS"]
connection_string = "mongodb+srv://{}:{}@cluster0.qi5d9.mongodb.net/{}" \
                    "?retryWrites=true&w=majority".format(mdb_sets["username"],
                                                          mdb_sets["password"],
                                                          mdb_sets["db"])
default_config["MONGODB_SETTINGS"]["host"] = connection_string


def get_flask_app(config: dict = None) -> app.Flask:
    """
    Initializes Flask app with given configuration.
    Main entry point for wsgi (gunicorn) server.
    :param config: Configuration dictionary
    :return: app
    """
    # init flask
    flask_app = Flask(__name__)

    # configure app
    config = default_config if config is None else config
    flask_app.config.update(config)
    flask_app.config['JSON_AS_ASCII'] = False

    api = Api(app=flask_app)
    create_routes(api=api)
    # init mongoengine
    db = MongoEngine(app=flask_app)
    return flask_app


if __name__ == '__main__':
    # Main entry point when run in stand-alone mode.
    app = get_flask_app()
    app.run(debug=True)