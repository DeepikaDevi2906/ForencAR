from typing import TypedDict

from langgraph.graph import (
    StateGraph,
    END
)

from services.rag_service import (
    retrieve_context
)

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


# =========================================
# GRAPH STATE
# =========================================
class ForensicState(
    TypedDict
):

    question: str

    answer: str


# =========================================
# ROUTER
# =========================================
def route_question(
    state
):

    question = (
        state["question"]
        .lower()
    )

    # =====================================
    # AUTOPSY
    # =====================================
    if any(word in question for word in [

        "death",
        "cause of death",
        "body",
        "injury",
        "autopsy",
        "toxicology",
        "victim"

    ]):

        return "autopsy"


    # =====================================
    # EVIDENCE
    # =====================================
    elif any(word in question for word in [

        "evidence",
        "weapon",
        "blood",
        "fingerprint",
        "dna",
        "proof"

    ]):

        return "evidence"


    # =====================================
    # TIMELINE
    # =====================================
    elif any(word in question for word in [

        "timeline",
        "sequence",
        "events",
        "chronology",
        "when"

    ]):

        return "timeline"


    # =====================================
    # RISK / THREAT
    # =====================================
    elif any(word in question for word in [

        "risk",
        "threat",
        "danger",
        "serious",
        "severity",
        "violent",
        "murder",
        "homicide",
        "assault"

    ]):

        return "risk"


    # =====================================
    # DEFAULT
    # =====================================
    return "summary"


# =========================================
# AUTOPSY NODE
# =========================================
def autopsy_node(
    state
):

    context = retrieve_context(
        state["question"]
    )

    combined_context = "\n".join(context)

    final_prompt = f"""
    FORENSIC CONTEXT:
    {combined_context}

    USER QUESTION:
    {state["question"]}
    """

    result = autopsy_agent.run(
        final_prompt
    )

    return {
        "answer": result
    }


# =========================================
# EVIDENCE NODE
# =========================================
def evidence_node(
    state
):

    context = retrieve_context(
        state["question"]
    )

    combined_context = "\n".join(context)

    final_prompt = f"""
    FORENSIC CONTEXT:
    {combined_context}

    USER QUESTION:
    {state["question"]}
    """

    result = evidence_agent.run(
        final_prompt
    )

    return {
        "answer": result
    }


# =========================================
# TIMELINE NODE
# =========================================
def timeline_node(
    state
):

    context = retrieve_context(
        state["question"]
    )

    combined_context = "\n".join(context)

    final_prompt = f"""
    FORENSIC CONTEXT:
    {combined_context}

    USER QUESTION:
    {state["question"]}
    """

    result = timeline_agent.run(
        final_prompt
    )

    return {
        "answer": result
    }


# =========================================
# RISK NODE
# =========================================
def risk_node(
    state
):

    context = retrieve_context(
        state["question"]
    )

    combined_context = "\n".join(context)

    final_prompt = f"""
    FORENSIC CONTEXT:
    {combined_context}

    USER QUESTION:
    {state["question"]}
    """

    result = risk_agent.run(
        final_prompt
    )

    return {
        "answer": result
    }


# =========================================
# SUMMARY NODE
# =========================================
def summary_node(
    state
):

    context = retrieve_context(
        state["question"]
    )

    combined_context = "\n".join(context)

    final_prompt = f"""
    FORENSIC CONTEXT:
    {combined_context}

    USER QUESTION:
    {state["question"]}
    """

    result = summary_agent.run(
        final_prompt
    )

    return {
        "answer": result
    }


# =========================================
# BUILD GRAPH
# =========================================
graph = StateGraph(
    ForensicState
)


# =========================================
# ADD NODES
# =========================================
graph.add_node(
    "autopsy",
    autopsy_node
)

graph.add_node(
    "evidence",
    evidence_node
)

graph.add_node(
    "timeline",
    timeline_node
)

graph.add_node(
    "risk",
    risk_node
)

graph.add_node(
    "summary",
    summary_node
)


# =========================================
# ROUTER ENTRY
# =========================================
graph.set_conditional_entry_point(
    route_question
)


# =========================================
# END EDGES
# =========================================
graph.add_edge(
    "autopsy",
    END
)

graph.add_edge(
    "evidence",
    END
)

graph.add_edge(
    "timeline",
    END
)

graph.add_edge(
    "risk",
    END
)

graph.add_edge(
    "summary",
    END
)


# =========================================
# COMPILE GRAPH
# =========================================
forensic_graph = graph.compile()