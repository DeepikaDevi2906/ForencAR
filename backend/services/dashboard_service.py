from models.case_model import Case
from models.evidence_model import Evidence


def get_dashboard_stats():

    total_cases = Case.query.count()

    total_evidence = Evidence.query.count()

    critical_cases = Case.query.filter_by(
        status="Critical"
    ).count()

    return {
        "total_cases": total_cases,
        "total_evidence": total_evidence,
        "critical_cases": critical_cases,
        "active_agents": 11
    }