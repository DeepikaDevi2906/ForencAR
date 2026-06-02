from langchain_openai import (
    ChatOpenAI
)

from langchain.agents import (
    initialize_agent,
    AgentType
)

from langchain_agent.tools import (
    all_tools
)

from langchain_agent.memory import (
    memory
)
from langchain_agent.prompts.summary_prompt import (
    SUMMARY_SYSTEM_PROMPT
)
import os
llm = ChatOpenAI(

    model="gpt-4.1-mini",

    temperature=0.2,

    openai_api_key=os.getenv("OPENAI_API_KEY")
)


summary_agent = initialize_agent(

    tools=all_tools,

    llm=llm,

    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,

    memory=memory,

    verbose=True,

    agent_kwargs={
    "system_message":
    SUMMARY_SYSTEM_PROMPT
}
)