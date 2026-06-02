from langchain.tools import Tool

from services.rag_service import (
    retrieve_context
)


# -----------------------------------
# TOOL FUNCTION
# -----------------------------------
def analyze_autopsy_report(
    query
):

    context_list = retrieve_context(
        query
    )

    context = "\n\n".join(
        context_list
    )

    return context


# -----------------------------------
# LANGCHAIN TOOL
# -----------------------------------
