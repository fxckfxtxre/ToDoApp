import requests


# res = requests.post("http://localhost:3002/api/list", json={
#     "title": "посливать бездарным хуесосам"
# })

res = requests.delete("http://localhost:3002/api/list/17825988160")

print(res.text)