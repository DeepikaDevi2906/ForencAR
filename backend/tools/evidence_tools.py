from services.rag_service import (
    retrieve_context
)


# -----------------------------------
# EVIDENCE ANALYSIS TOOL
# -----------------------------------
def analyze_evidence(
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
        "evidence_context": context,
        "sources": context_list
    }