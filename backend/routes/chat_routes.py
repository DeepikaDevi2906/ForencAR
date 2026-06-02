from flask import Blueprint
from flask import request
from flask import jsonify

import traceback

from services.chat_service import (
    ask_question,
    load_pdf
)


chat_bp = Blueprint(
    "chat_bp",
    __name__
)


# -----------------------------------
# CHAT WITH AI
# -----------------------------------
@chat_bp.route(
    "/chat",
    methods=["POST"]
)
def chat_with_ai():

    try:

        data = request.json

        question = data.get(
            "question"
        )

        if not question:

            return jsonify({
                "success": False,
                "message": "Question is required"
            }), 400

        response = ask_question(
            question
        )

        return jsonify(response)

    except Exception as e:

        print("\nCHAT ERROR:\n")

        traceback.print_exc()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# -----------------------------------
# UPLOAD PDF TO RAG
# -----------------------------------
@chat_bp.route(
    "/upload",
    methods=["POST"]
)
def upload_pdf():

    try:

        print("UPLOAD STARTED")

        if "file" not in request.files:

            return jsonify({
                "success": False,
                "message": "No file uploaded"
            }), 400

        file = request.files["file"]

        upload_path = (
            f"uploads/{file.filename}"
        )

        print("SAVING FILE...")

        file.save(upload_path)

        print("FILE SAVED")

        print("PROCESSING RAG...")

        result = load_pdf(
            upload_path
        )

        print("RAG COMPLETE")

        return jsonify(result)

    except Exception as e:

        print("\nUPLOAD ERROR:\n")

        traceback.print_exc()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500