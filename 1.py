

from Crypto.Util.number import *


print(getPrime(100))

p = 1133261442823444443917138265631

def commit(v, r):
    return pow(3,v,p) * pow(5,r,p) % p

a = commit(2
, 6) * commit(5, 9)
b = commit(7, 15)

print(a, b)