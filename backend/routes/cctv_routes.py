from flask import (
    Blueprint,
    request,
    jsonify
)

cctv_bp = Blueprint(
    "cctv",
    __name__
)

# ===================================
# CCTV ANALYSIS
# ===================================

@cctv_bp.route(
    "/analyze",
    methods=["POST"]
)
def analyze_cctv():

    try:

        if "file" not in request.files:

            return jsonify({

                "success": False,

                "message": "No file uploaded"

            }), 400

        file = request.files["file"]

        return jsonify({

            "success": True,

            "result": {

                "summary":
                    "Suspicious activity detected in CCTV footage.",

                "objects": [

                    "person",

                    "vehicle",

                    "bag"
                ],

                "risk_level":
                    "MEDIUM"
            }

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500