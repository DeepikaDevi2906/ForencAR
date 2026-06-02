import os
import fitz
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")

class RAGService:
    def __init__(self):
        self.embeddings=OpenAIEmbeddings(api_key=OPENAI_API_KEY)
        self.vector_store=None

    def extract_text_from_pdf(self,file_path):
        doc=fitz.open(file_path)
        text=""
        for page in doc:
            text+=page.getText()
        return text
    
    def split_text(self,text):
        splitter=RecursiveCharacterTextSplitter(
            chunk_size=1000,

        )
        chunks=splitter.split_text(text)
        return chunks
    
    def create_vector_store(self,chunks):
        self.vector_store=FAISS.from_texts(chunks,self.embeddings)
        return self.vector_store
    
    def process_pdf(self,file_path):
        text=self.extract_text_from_pdf(file_path)
        chunks=self.split_text(text)
        vector_store=self.create_vector_store(chunks)
        return{
            "success": True,
            "message":
            "PDF processed successfully",
            "total_chunks": len(chunks),
            "vector_store": vector_store
        }
    
    def retrieve_context(self,query,k=5):
        if not self.vector_store:
            return []
        docs=self.vector_store.similarity_search(query,k=k)
        context=[]
        for doc in docs:
            context.append(doc.page_content)

        return context