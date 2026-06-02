import os


class Config:

    SECRET_KEY = "secretkey"

    JWT_SECRET_KEY = "jwtsecretkey"

    SQLALCHEMY_DATABASE_URI = "sqlite:///forensic.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")