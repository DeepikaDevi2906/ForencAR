from datetime import datetime

from extensions import db


class TimelineEvent(db.Model):

    __tablename__ = "timeline_events"

    id = db.Column(db.Integer, primary_key=True)

    event_time = db.Column(db.String(100))

    description = db.Column(db.Text)

    source = db.Column(db.String(100))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("cases.id"),
        nullable=False
    )