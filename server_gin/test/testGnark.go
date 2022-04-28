package main

import (
	"bytes"
	"fmt"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
)

type ExpCircuit struct {
	Y frontend.Variable `gnark:",public"`
	G frontend.Variable `gnark:",public"`

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
	api.AssertIsEqual(circuit.Y, output)

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

	var buf bytes.Buffer
	pk.WriteRawTo(&buf)
	vk.WriteRawTo(&buf)

	fmt.Println(buf.Len())
}
