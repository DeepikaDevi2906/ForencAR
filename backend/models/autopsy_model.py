from datetime import datetime

from extensions import db


class AutopsyReport(db.Model):

    __tablename__ = "autopsy_reports"

    id = db.Column(db.Integer, primary_key=True)

    report_text = db.Column(db.Text)

    ai_summary = db.Column(db.Text)

    probable_cause_of_death = db.Column(db.String(255))

    extracted_injuries = db.Column(db.Text)

    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("cases.id"),
        nullable=False
    )