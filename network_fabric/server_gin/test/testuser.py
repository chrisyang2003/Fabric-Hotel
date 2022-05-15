
g = 3
y = 97444002411876298130544283918750258378152496134548429480494475530319735181241
r = 123123
x = 123123
p = 109441214359196376111232028726286375442741822002080171718491020932879042478085


test = r * pow(g, x, p) % p
assert (test == y)

import requests
import base64

r = requests.get('http://127.0.0.1:7070/user/register?passwd=333').json()['data']
proof = r['proof']
userpk = r['userpk']
r = r['r']

print(proof)
print(userpk)
print(r)

r = requests.get('http://127.0.0.1:7070/user/login', params = {
    "r":r,
    "proof":proof,
    "userpk": userpk
})
print(r.text)


