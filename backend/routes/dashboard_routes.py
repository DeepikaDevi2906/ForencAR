from flask import Blueprint, jsonify

from services.dashboard_service import (
    get_dashboard_stats
)

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)


@dashboard_bp.route("/stats", methods=["GET"])
def dashboard_stats():

    stats = get_dashboard_stats()

    return jsonify(stats)