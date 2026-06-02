from langchain_agent.agents.summary_agent import (
    summary_agent
)

from services.rag_service import (
    process_pdf,
    retrieve_context
)

# ===================================
# SUMMARIZE REPORT
# ===================================

def summarize_report(
    file_path
):

    # PROCESS PDF

    process_pdf(
        file_path
    )

    # RETRIEVE CONTEXT

    context = retrieve_context(
        "summarize forensic report"
    )

    # PROMPT

    prompt = f"""

    Analyze this forensic report
    and generate:

    - executive summary
    - key findings
    - risk assessment
    - recommendations
    - conclusion

    Context:

    {context}
    """

    # RUN SUMMARY AGENT

    result = summary_agent.run(
        prompt
    )

    return result