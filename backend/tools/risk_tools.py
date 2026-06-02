from services.rag_service import (
    retrieve_context
)


# -----------------------------------
# RISK ASSESSMENT TOOL
# -----------------------------------
def analyze_risk(
    query
):

    context_list = retrieve_context(
        query
    )

    context = "\n\n".join(
        context_list
    )

    return {
        "query": query,
        "risk_context": context,
        "sources": context_list
    }