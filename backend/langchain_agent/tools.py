from langchain.tools import Tool
from services.rag_service import retrieve_context
from tools.autopsy_tools import analyze_autopsy_report
from tools.evidence_tools import analyze_evidence
from tools.timeline_tools import reconstruct_timeline
from tools.risk_tools import analyze_risk
from tools.summary_tool import summarize_case


autopsy_tool = Tool(
    name="Autopsy Analysis Tool",

    func=analyze_autopsy_report,

    description="""
Use this tool for:
- cause of death analysis
- injury analysis
- toxicology analysis
- autopsy report interpretation
- forensic medical findings
"""
)

evidence_tool = Tool(

    name="Evidence Analysis Tool",

    func=analyze_evidence,

    description="""
Use this tool for:
- forensic evidence analysis
- fingerprints
- blood evidence
- weapons
- recovered items
- evidence interpretation
"""
)

timeline_tool=Tool(
    name="Timeline Reconstruction Tool",

    func=reconstruct_timeline,

    description="""
Use this tool for:
- sequence of events
- chronology reconstruction
- incident timelines
- CCTV event flow
- forensic timelines
- event ordering
"""
)

risk_tool = Tool(

    name="Risk Assessment Tool",

    func=analyze_risk,

    description="""
Use this tool for:
- threat analysis
- homicide risk assessment
- suspect danger analysis
- suspicious behavior detection
- forensic anomaly analysis
- violence severity assessment
"""
)

summary_tool = Tool(

    name="Case Summary Tool",

    func=summarize_case,

    description="""
Use this tool for:
- case summaries
- forensic report summaries
- investigation overviews
- executive summaries
- incident summarization
"""
)

all_tools=[
    autopsy_tool,
    evidence_tool,
    timeline_tool,
    risk_tool,
    summary_tool
]