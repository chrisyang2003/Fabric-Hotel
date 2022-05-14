import requests
import base64

r = requests.get('http://127.0.0.1:7070/getParams').json()

vk = r['vk']
print(len(base64.b64decode(vk)))

