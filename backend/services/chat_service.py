from services.rag_service import process_pdf,retrieve_context
from services.openai_service import generate_ai_response
from langchain_agent.agents.autopsy_agent import (
    autopsy_agent
)

from langchain_agent.agents.evidence_agent import (
    evidence_agent
)

from langchain_agent.agents.timeline_agent import (
    timeline_agent
)

from langchain_agent.agents.risk_agent import (
    risk_agent
)
from langchain_agent.agents.summary_agent import (
    summary_agent
)
from langchain_agent.graphs.forensic_graph import (
    forensic_graph
)
def load_pdf(file_path):
    result=process_pdf(file_path)
def ask_question(question):

    result = forensic_graph.invoke({

        "question": question

    })

    return {

        "success": True,

        "answer": result["answer"]
    }
