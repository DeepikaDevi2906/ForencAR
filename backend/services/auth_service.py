from extensions import db, bcrypt
from flask_jwt_extended import create_access_token

from models.user_model import User


def register_user(name, email, password):

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.session.add(user)

    db.session.commit()

    return {
        "success": True,
        "message": "User registered successfully"
    }


def login_user(email, password):

    user = User.query.filter_by(email=email).first()

    if not user:
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    is_valid = bcrypt.check_password_hash(user.password, password)

    if not is_valid:
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    access_token = create_access_token(identity=str(user.id))

    return {
        "success": True,
        "token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }