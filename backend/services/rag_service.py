import os

import fitz

from dotenv import load_dotenv

from langchain.text_splitter import (
    RecursiveCharacterTextSplitter
)

from langchain_openai import (
    OpenAIEmbeddings
)

from langchain_community.vectorstores import (
    FAISS
)


import os

OPENAI_API_KEY = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


# GLOBAL VECTOR STORE
vector_store = None


# -----------------------------------
# EXTRACT PDF TEXT
# -----------------------------------
def extract_text_from_pdf(
    file_path
):

    document = fitz.open(file_path)

    text = ""

    for page in document:

        text += page.get_text()

    return text


# -----------------------------------
# SPLIT TEXT
# -----------------------------------
def split_text(text):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_text(text)

    return chunks


# -----------------------------------
# CREATE VECTOR STORE
# -----------------------------------
def create_vector_store(chunks):

    global vector_store

    embeddings = OpenAIEmbeddings(
        api_key=OPENAI_API_KEY
    )

    vector_store = FAISS.from_texts(
        chunks,
        embeddings
    )

    return vector_store


# -----------------------------------
# PROCESS PDF
# -----------------------------------
def process_pdf(file_path):

    text = extract_text_from_pdf(
        file_path
    )

    chunks = split_text(text)

    create_vector_store(chunks)

    return {
        "success": True,
        "chunks": len(chunks)
    }


# -----------------------------------
# RETRIEVE CONTEXT
# -----------------------------------
def retrieve_context(
    query,
    k=4
):

    global vector_store

    if not vector_store:

        return []

    docs = vector_store.similarity_search(
        query,
        k=k
    )

    context = []

    for doc in docs:

        context.append(
            doc.page_content
        )

    return context