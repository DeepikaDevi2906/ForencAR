from flask import (
    Blueprint,
    request,
    jsonify
)

import os
import traceback

from services.audio_service import (
    process_file
)

audio_bp = Blueprint(
    "audio",
    __name__
)

# =====================================
# AUDIO ANALYSIS ROUTE
# =====================================

@audio_bp.route(
    "/analyze",
    methods=["POST"]
)

def analyze_audio():

    try:

        # =================================
        # CHECK FILE
        # =================================

        if "file" not in request.files:

            return jsonify({

                "success": False,

                "message":
                    "No file uploaded"

            }), 400

        # =================================
        # GET FILE
        # =================================

        file = request.files["file"]

        # =================================
        # CREATE UPLOAD FOLDER
        # =================================

        os.makedirs(
            "uploads",
            exist_ok=True
        )

        # =================================
        # SAVE FILE
        # =================================

        file_path = os.path.join(
            "uploads",
            file.filename
        )

        file.save(file_path)

        print("\n========== FILE SAVED ==========")
        print(file_path)

        # =================================
        # PROCESS FILE
        # =================================

        result = process_file(
            file_path
        )

        print("\n========== RESULT ==========")
        print(result)

        # =================================
        # RESPONSE
        # =================================

        return jsonify({

            "success": True,

            "result": result

        })

    except Exception as e:

        print("\n========== ERROR ==========\n")

        traceback.print_exc()

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500