# -*- coding: utf-8 -*-
#
# assets.py
#
# Copyright 2016 Socos LLC
#

from os import path
from flask_assets import Bundle, Environment
from flask import Flask


def init(app=None):
    app = app or Flask(__name__)
    with app.app_context():
        env = Environment(app)
        env.load_path = [path.join(path.dirname(__file__), 'assets')]
        # env.append_path('assets')
        # env.set_directory(env_directory)
        # App Engine doesn't support automatic rebuilding.
        env.auto_build = False
        # This file needs to be shipped with your code.
        env.manifest = 'file'

        css = Bundle(
            "main.css",
            filters="cssmin", output="main.css")
        env.register('css', css)

        js = Bundle(
            "main.js",
            filters="jsmin", output="main.js")
        env.register('js', js)

        bundles = [css, js]
        return bundles


if __name__ == '__main__':
    bundles = init()
    for bundle in bundles:
        bundle.build()