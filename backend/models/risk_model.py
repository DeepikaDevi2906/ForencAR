from datetime import datetime

from extensions import db


class RiskAssessment(db.Model):

    __tablename__ = "risk_assessments"

    id = db.Column(db.Integer, primary_key=True)

    risk_score = db.Column(db.Float)

    anomaly_detected = db.Column(db.Boolean, default=False)

    findings = db.Column(db.Text)

    confidence_score = db.Column(db.Float)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("cases.id"),
        nullable=False
    )