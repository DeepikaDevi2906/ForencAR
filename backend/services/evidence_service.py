from models.evidence_model import Evidence
from extensions import db


def save_evidence(data):

    evidence = Evidence(
        case_id=data.get("case_id"),
        file_name=data.get("file_name"),
        file_type=data.get("file_type"),
        file_path=data.get("file_path"),
        uploaded_by=data.get("uploaded_by")
    )

    db.session.add(evidence)
    db.session.commit()

    return evidence


def get_all_evidence():

    return Evidence.query.all()