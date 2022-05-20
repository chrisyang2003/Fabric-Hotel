
let pow = Math.pow

function commit(v, r){
  p = 1133261442823444443917138265631

  return (BigInt(3) ** BigInt(v) % BigInt(p)) * (BigInt(5) ** BigInt(r) % BigInt(p)) % BigInt(p)
}

const r = Math.floor(Math.random() * 1000)


console.log(commit(5, r));

