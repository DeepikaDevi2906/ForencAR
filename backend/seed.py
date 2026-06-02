from app import app

from extensions import db

from models.case_model import (
    Case
)


# -----------------------------------
# SEED DATABASE
# -----------------------------------
with app.app_context():

    # CLEAR OLD DATA
    Case.query.delete()

    # CASE 1
    case1 = Case(

        case_number="CASE-101",

        title="Warehouse Homicide",

        description="""
        Investigation involving suspected blunt force trauma
        inside abandoned warehouse premises.
        """,

        victim_name="Arun Kumar",

        location="Chennai",

        

        status="Critical",

        risk_score=87,

        ai_summary="""
        AI forensic analysis indicates possible homicide
        with CCTV timeline inconsistencies and blood evidence.
        """
    )

    # CASE 2
    case2 = Case(

        case_number="CASE-102",

        title="Cyber Fraud Investigation",

        description="""
        Digital forensic investigation involving
        cryptocurrency laundering activities.
        """,

        victim_name="N/A",

        location="Bangalore",

       

        status="Active",

        risk_score=62,

        ai_summary="""
        Multiple suspicious wallet transactions identified
        through blockchain tracing.
        """
    )

    # CASE 3
    case3 = Case(

        case_number="CASE-103",

        title="Missing Person Case",

        description="""
        AI-assisted missing person investigation
        using CCTV analytics and mobile metadata.
        """,

        victim_name="Priya Sharma",

        location="Hyderabad",


        status="Active",

        risk_score=74,

        ai_summary="""
        Timeline reconstruction suggests last known
        movement near railway station.
        """
    )

    # ADD TO DB
    db.session.add(case1)
    db.session.add(case2)
    db.session.add(case3)

    # SAVE
    db.session.commit()

    print("\nDATABASE SEEDED SUCCESSFULLY\n")