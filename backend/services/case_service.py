from models.case_model import Case
from extensions import db
import uuid


def create_case(data):

    case = Case(
        case_number=f"CASE-{uuid.uuid4().hex[:6]}",
        title=data.get("title"),
        victim_name=data.get("victim_name"),
        location=data.get("location"),
        description=data.get("description"),
        risk_score=75,
        ai_summary="AI investigation initialized."
    )

    db.session.add(case)
    db.session.commit()

    return case


def get_all_cases():

    return Case.query.order_by(
        Case.created_at.desc()
    ).all()


def get_case_by_id(case_id):

    return Case.query.get(case_id)