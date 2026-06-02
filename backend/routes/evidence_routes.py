from flask import Blueprint, jsonify

from services.evidence_service import (
    get_all_evidence
)

evidence_bp = Blueprint(
    "evidence_bp",
    __name__
)


@evidence_bp.route("/", methods=["GET"])
def fetch_evidence():

    evidence_list = get_all_evidence()

    result = []

    for evidence in evidence_list:

        result.append({
            "id": evidence.id,
            "file_name": evidence.file_name,
            "file_type": evidence.file_type,
            "uploaded_by": evidence.uploaded_by,
            "status": evidence.status
        })

    return jsonify(result)