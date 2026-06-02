from flask import Blueprint
from flask import request
from flask import jsonify

from services.auth_service import (
    register_user,
    login_user
)

auth_bp = Blueprint(
    "auth_bp",
    __name__
)


@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.json

    response = register_user(
        data.get("name", "User"),
        data["email"],
        data["password"]
    )

    return jsonify(response)

@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.json

    response = login_user(
        data["email"],
        data["password"]
    )

    return jsonify(response)