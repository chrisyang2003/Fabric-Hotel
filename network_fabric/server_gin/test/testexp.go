package main

import (
	"fmt"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"math/big"
)

type ExpCircuit struct {
	Y frontend.Variable `gnark:",public"`
	G frontend.Variable `gnark:",public"`
	R frontend.Variable `gnark:",public"`

	X frontend.Variable
}

func (circuit *ExpCircuit) Define(curveID ecc.ID, api frontend.API) error {
	//number of bits of exponent
	const bitSize = 256

	// specify constraints
	output := api.Constant(1)
	bits := api.ToBinary(circuit.X, bitSize)
	multiply := circuit.G

	for i := 0; i < len(bits); i++ {
		output = api.Select(bits[i], api.Mul(output, multiply), output)
		multiply = api.Mul(multiply, multiply)
	}
	api.AssertIsEqual(circuit.Y, api.Mul(circuit.R, output))

	return nil
}

func main() {

	var expCircuit ExpCircuit
	r1cs, err := frontend.Compile(ecc.BN254, backend.GROTH16, &expCircuit)
	if err != nil {
		fmt.Printf("Compile failed : %v\n", err)
		return
	}
	pk, vk, err := groth16.Setup(r1cs)
	if err != nil {
		fmt.Printf("Setup failed\n")
		return
	}

	g := big.NewInt(3)
	//
	x := new(big.Int)
	y := new(big.Int)
	r := new(big.Int)
	p := new(big.Int)

	x.SetString("123123", 10)
	r.SetString("123123", 10)
	p, ok := p.SetString("109441214359196376111232028726286375442741822002080171718491020932879042478085", 10)
	if !ok {
		fmt.Println("SetString: error")
		return
	}
	tmp := new(big.Int)
	tmp.Exp(g, x, p)
	tmp.Mul(tmp, r)
	y.Mod(tmp, p)

	witness := &ExpCircuit{
		Y: frontend.Value(y),
		G: frontend.Value(g),
		R: frontend.Value(r),
		X: frontend.Value(x),
	}
	proof, err := groth16.Prove(r1cs, pk, witness)
	if err != nil {
		fmt.Printf("Prove failed： %v\n", err)
		return
	}

	fmt.Println(y);

	publicWitness := &ExpCircuit{
		Y: frontend.Value(y),
		G: frontend.Value(g),
		R: frontend.Value(r),
	}

	err = groth16.Verify(proof, vk, publicWitness)

	if err == nil {
		fmt.Println("good proof")
	} else {
		fmt.Println("proof error")
	}

}
