

from Crypto.Util.number import *



p = 1133261442823444443917138265631

def commit(v, r):
    return pow(3,v,p) * pow(5,r,p) % p

    #     v1, r1         v2, r2
a = commit(2, 6) * commit(5, 9)
b = commit(7, 15)
assert(a == b)

print(a, b)