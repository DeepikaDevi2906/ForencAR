import os

from flask import (
    Blueprint,
    request,
    jsonify
)

from werkzeug.utils import (
    secure_filename
)

from services.report_service import (
    summarize_report
)

report_bp = Blueprint(
    "report_bp",
    __name__
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# ===================================
# SUMMARIZE REPORT
# ===================================

@report_bp.route(
    "/summarize",
    methods=["POST"]
)

def summarize():

    try:

        if "file" not in request.files:

            return jsonify({

                "success": False,
                "message": "No file uploaded"

            }), 400

        file = request.files["file"]

        filename = secure_filename(
            file.filename
        )

        file_path = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        file.save(file_path)

        result = summarize_report(
            file_path
        )

        return jsonify({

            "success": True,

            "summary": result

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500