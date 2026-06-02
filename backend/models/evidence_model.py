from extensions import db
from datetime import datetime


class Evidence(db.Model):

    __tablename__ = "evidence"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("cases.id")
    )

    file_name = db.Column(
        db.String(255)
    )

    file_type = db.Column(
        db.String(100)
    )

    file_path = db.Column(
        db.String(500)
    )

    uploaded_by = db.Column(
        db.String(255)
    )

    upload_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    status = db.Column(
        db.String(50),
        default="Uploaded"
    )