import requests


res = requests.post("http://localhost:3002/api/list", json={
    "title": "test2"
})

# res = requests.delete("http://localhost:3002/api/list/17825988160")

print(res.text)