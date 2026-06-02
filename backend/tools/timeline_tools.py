from services.rag_service import (
    retrieve_context
)


# -----------------------------------
# TIMELINE RECONSTRUCTION TOOL
# -----------------------------------
def reconstruct_timeline(
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
        "timeline_context": context,
        "sources": context_list
    }