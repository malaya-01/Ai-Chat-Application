import requests

url = 'http://localhost:11434/api/generate'

while True:
    prompt = input("You: ")
    if prompt == '/exit':
        break
    payload = {
        "model": "llama3.1",
        "prompt":prompt,
        "stream":False
        }

    try:
        response = requests.post(url, json=payload)
        print(response)
        response_text = response.text
        # print("Raw response: ", response_text)

        try:
            response_json = response.json()
            actual_response = response_json.get("response", "No response field found")
            print("Response: ", actual_response)
        except requests.exceptions.JSONDecodeError:
            error = 'Error: invald json response.'
            print(error)
            break

    except requests.ConnectionError:
        error = 'Error: failed to connect to the API.'
        print(error)
        break