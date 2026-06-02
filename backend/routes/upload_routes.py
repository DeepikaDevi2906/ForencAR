from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required

from services.upload_service import (
    upload_autopsy_report
)

upload_bp = Blueprint(
    "upload_bp",
    __name__
)


@upload_bp.route(
    "/autopsy/<int:case_id>",
    methods=["POST"]
)
@jwt_required()
def upload_autopsy(case_id):

    if "file" not in request.files:
        return jsonify({
            "success": False,
            "message": "No file uploaded"
        }), 400

    file = request.files["file"]

    response = upload_autopsy_report(
        file,
        case_id
    )

    return jsonify(response)