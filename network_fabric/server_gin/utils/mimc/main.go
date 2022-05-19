package mimc

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"github.com/consensys/gnark-crypto/ecc"
	bn254 "github.com/consensys/gnark-crypto/ecc/bn254/fr/mimc"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"github.com/consensys/gnark/std/hash/mimc"
	"github.com/gin-gonic/gin"
	"math/big"
	"net/http"
)

var b64pk, b64vk string
var r1cs frontend.CompiledConstraintSystem
var vk groth16.VerifyingKey
var pk groth16.ProvingKey
var expCircuit Circuit

type Circuit struct {
	PreImage frontend.Variable
	Hash     frontend.Variable `gnark:",public"`
}

func (circuit *Circuit) Define(curveID ecc.ID, api frontend.API) error {
	mimc, _ := mimc.NewMiMC("seed", curveID, api)
	mimc.Write(circuit.PreImage)
	api.AssertIsEqual(circuit.Hash, mimc.Sum())
	return nil
}

func mimcHash(data []byte) string {
	f := bn254.NewMiMC("seed")
	f.Write(data)
	hash := f.Sum(nil)
	hashInt := big.NewInt(0).SetBytes(hash)
	return hashInt.String()
}

func init() {
	fmt.Println("user zkp init ...")
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

func proof(c *gin.Context) {
	preimage := c.Query("preimage")
	hash := c.Query("hash")

	witness := &Circuit{
		PreImage: frontend.Value(preimage),
		Hash:     frontend.Value(hash),
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

	publicWitness := &Circuit{
		Hash: frontend.Value(hash),
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
