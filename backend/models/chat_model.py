from datetime import datetime

from extensions import db


class ChatHistory(db.Model):

    __tablename__ = "chat_history"

    id = db.Column(db.Integer, primary_key=True)

    user_message = db.Column(db.Text)

    ai_response = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("cases.id"),
        nullable=False
    )