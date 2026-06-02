from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, bcrypt, jwt

from models.user_model import User
from models.case_model import Case
from models.evidence_model import Evidence
from models.autopsy_model import AutopsyReport
from models.timeline_model import TimelineEvent
from models.risk_model import RiskAssessment
from models.chat_model import ChatHistory

from routes.auth_routes import auth_bp
from routes.case_routes import case_bp
from routes.upload_routes import upload_bp
from routes.evidence_routes import evidence_bp
from routes.dashboard_routes import dashboard_bp
from routes.chat_routes import chat_bp
from routes.audio_routes import audio_bp
from routes.report_routes import (
    report_bp
)

from routes.cctv_routes import cctv_bp
from dotenv import load_dotenv

load_dotenv()
def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    bcrypt.init_app(app)

    jwt.init_app(app)

    # AUTH
    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    # CASES
    app.register_blueprint(
        case_bp,
        url_prefix="/api/cases"
    )

    # UPLOAD
    app.register_blueprint(
        upload_bp,
        url_prefix="/api/upload"
    )

    # EVIDENCE
    app.register_blueprint(
        evidence_bp,
        url_prefix="/api/evidence"
    )
    app.register_blueprint(
    cctv_bp,
    url_prefix="/api/cctv"
)
    # DASHBOARD
    app.register_blueprint(
        dashboard_bp,
        url_prefix="/api/dashboard"
    )
    app.register_blueprint(
    chat_bp,
    url_prefix="/api/ai"
)
    app.register_blueprint(
    audio_bp,
    url_prefix="/api/audio"
)
    app.register_blueprint(
    report_bp,
    url_prefix="/api/report"
)
    @app.route("/")
    def home():

        return {
            "message":
            "Forensic Intelligence System API Running"
        }

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":

    app.run(debug=True)