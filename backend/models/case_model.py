from extensions import db
from datetime import datetime


class Case(db.Model):

    __tablename__ = "cases"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    case_number = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    title = db.Column(
        db.String(255),
        nullable=False
    )

    victim_name = db.Column(
        db.String(255)
    )

    location = db.Column(
        db.String(255)
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="Active"
    )

    risk_score = db.Column(
        db.Integer,
        default=0
    )

    ai_summary = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )