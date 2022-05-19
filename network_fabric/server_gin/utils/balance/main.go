package balance

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"github.com/gin-gonic/gin"
	"net/http"
)

// 全局变量
var b64pk, b64vk string
var r1cs frontend.CompiledConstraintSystem
var vk groth16.VerifyingKey
var pk groth16.ProvingKey
var expCircuit ExpCircuit

type ExpCircuit struct {
	X frontend.Variable
	Y frontend.Variable
	Z frontend.Variable
}

func (circuit *ExpCircuit) Define(curveID ecc.ID, api frontend.API) error {
	output := api.Add(circuit.X, circuit.Y)
	api.AssertIsEqual(0, api.Sub(circuit.Z, output))
	return nil
}

// init
func init() {
	fmt.Println("balance zkp init ...")
	var err error
	r1cs, err = frontend.Compile(ecc.BN254, backend.GROTH16, &expCircuit)
	if err != nil {
		fmt.Printf("Compile failed : %v\n", err)
		return
	}
	pk, vk, err = groth16.Setup(r1cs)
	if err != nil {
		fmt.Printf("Setup failed\n")
		return
	}

	var buf bytes.Buffer
	pk.WriteTo(&buf)
	b64pk = base64.StdEncoding.EncodeToString(buf.Bytes())
	buf.Reset()
	vk.WriteTo(&buf)
	b64vk = base64.StdEncoding.EncodeToString(buf.Bytes())

}

func GetParams(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"vk": b64vk,
		"pk": b64pk,
	})
}

func Proof(c *gin.Context) {
	x := c.Query("x")
	y := c.Query("y")
	z := c.Query("z")

	witness := &ExpCircuit{
		Y: frontend.Value(y),
		X: frontend.Value(x),
		Z: frontend.Value(z),
	}

	proof, err := groth16.Prove(r1cs, pk, witness)
	if err != nil {
		fmt.Printf("Prove failed： %v\n", err)
		return
	}
	var buf bytes.Buffer
	proof.WriteRawTo(&buf)

	newproof := groth16.NewProof(ecc.BN254)
	newproof.ReadFrom(&buf)
	newproof.WriteRawTo(&buf)

	publicWitness := &ExpCircuit{
		Y: frontend.Value(y),
		G: frontend.Value(g),
		R: frontend.Value(r),
	}

	err = groth16.Verify(newproof, vk, publicWitness)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"data": "verification failed",
		})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": gin.H{
				"proof": base64.StdEncoding.EncodeToString(buf.Bytes()),
			},
		})
		return
	}
}
