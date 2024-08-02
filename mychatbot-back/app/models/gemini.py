from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import LLMChain
from tkinter import Tk
from dotenv import load_dotenv
load_dotenv()

def create_chain():
    model = ChatGoogleGenerativeAI(
        model='gemini-1.5-flash',
        temperature=0.4
    )

    prompt = ChatPromptTemplate.from_template(
        """
        Answer the user's question:
        chat_history: {chat_history}
        Question: {input}
        """
    )

    chain = LLMChain(
        llm=model,
        prompt=prompt,
        output_parser=StrOutputParser()
    )

    return chain

def process_chat(chain, question, chat_history):
    response = chain.invoke({
        "input": question,
        "chat_history": chat_history
    })
    # print(response)

    return response['text']

def main():
    # Initialize Tkinter
    root = Tk()
    root.withdraw()  # Hide the root window

    chat_history = []

    chain = create_chain()

    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        response = process_chat(chain, user_input, chat_history)
        chat_history.append(HumanMessage(content=user_input))
        chat_history.append(AIMessage(content=response))

        print("Assistant: ", response)

if __name__ == '__main__':
    main()
