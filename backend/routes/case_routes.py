from flask import Blueprint, request, jsonify

from services.case_service import (
    create_case,
    get_all_cases,
    get_case_by_id
)

case_bp = Blueprint(
    "case_bp",
    __name__
)

# -----------------------------------
# CREATE CASE
# -----------------------------------
@case_bp.route(
    "/",
    methods=["POST"]
)
def create_new_case():

    data = request.json

    case = create_case(data)

    return jsonify({
        "success": True,
        "message": "Case created",
        "case_id": case.id
    })


# -----------------------------------
# GET ALL CASES
# -----------------------------------
@case_bp.route(
    "/",
    methods=["GET"]
)
def fetch_cases():

    cases = get_all_cases()

    result = []

    for case in cases:

        result.append({

            "id":
            case.id,

            "case_number":
            case.case_number,

            "title":
            case.title,

            "victim_name":
            case.victim_name,

            "location":
            case.location,

            "description":
            case.description,

            "status":
            case.status,

            "risk_score":
            case.risk_score,

            "created_at":
            case.created_at,
        })

    return jsonify(result)


# -----------------------------------
# GET SINGLE CASE
# -----------------------------------
@case_bp.route(
    "/<int:case_id>",
    methods=["GET"]
)
def fetch_case(case_id):

    case = get_case_by_id(case_id)

    if not case:

        return jsonify({
            "success": False,
            "message": "Case not found"
        }), 404

    return jsonify({

        "id":
        case.id,

        "case_number":
        case.case_number,

        "title":
        case.title,

        "victim_name":
        case.victim_name,

        "location":
        case.location,

        "description":
        case.description,

        "status":
        case.status,

        "risk_score":
        case.risk_score,

        "ai_summary":
        case.ai_summary
    })