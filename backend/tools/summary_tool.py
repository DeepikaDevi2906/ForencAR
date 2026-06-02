from services.rag_service import (
    retrieve_context
)


# -----------------------------------
# SUMMARY TOOL
# -----------------------------------
def summarize_case(
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
        "summary_context": context,
        "sources": context_list
    }