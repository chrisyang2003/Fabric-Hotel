package main

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"github.com/consensys/gnark/std/accumulator/merkle"
	"github.com/gin-gonic/gin"
	"math/big"
	"net/http"
)

func setHearder() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("chris", "yy")
	}
}

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

type merkleCircuit struct {
	RootHash     frontend.Variable `gnark:",public"`
	Path, Helper []frontend.Variable
}

func (circuit *merkleCircuit) Define(curveID ecc.ID, api frontend.API) error {
	hFunc, err := mimc.NewMiMC("seed", curveID, api)
	if err != nil {
		return err
	}
	merkle.VerifyProof(api, hFunc, circuit.RootHash, circuit.Path, circuit.Helper)
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
	pk.WriteTo(&buf)
	b64pk := base64.StdEncoding.EncodeToString(buf.Bytes())
	buf.Reset()
	vk.WriteTo(&buf)
	b64vk := base64.StdEncoding.EncodeToString(buf.Bytes())

	r := gin.Default()

	r.Use(setHearder())

	r.GET("/getParams", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"vk": b64vk,
			"pk": b64pk,
		})
	})

	r.GET("/exp/register", func(c *gin.Context) {
		name := c.Query("name")
		passwd := c.Query("passwd")

		if len(name) == 0 || len(passwd) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"data": "error",
			})
			return
		}

		g := big.NewInt(3)
		//
		x := new(big.Int)
		y := new(big.Int)
		p := new(big.Int)

		x.SetBytes([]byte(passwd))
		p, ok := p.SetString("109441214359196376111232028726286375442741822002080171718491020932879042478085", 10)
		if !ok {
			fmt.Println("SetString: error")
			return
		}
		y.Exp(g, x, p)

		witness := &ExpCircuit{
			Y: frontend.Value(y),
			G: frontend.Value(g),

			X: frontend.Value(x),
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
					"name":   name,
					"userpk": y,
					"proof":  base64.StdEncoding.EncodeToString(buf.Bytes()),
				},
			})
			return
		}

	})

	r.GET("/exp/login", func(c *gin.Context) {
		// proof base64

		vk := c.Query("vk")
		proof := c.Query("proof")
		userpk := c.Query("userpk")

		userpkint := new(big.Int)
		userpkint.SetString(userpk, 10)

		publicWitness := &ExpCircuit{
			Y: frontend.Value(userpkint),
			G: frontend.Value(big.NewInt(3)),
		}

		userproof := groth16.NewProof(ecc.BN254)
		proofbytes, _ := base64.StdEncoding.DecodeString(proof)
		userproof.ReadFrom(bytes.NewBuffer(proofbytes))

		finalvk := groth16.NewVerifyingKey(ecc.BN254)
		vkbytes, _ := base64.StdEncoding.DecodeString(vk)
		finalvk.ReadFrom(bytes.NewBuffer(vkbytes))

		err = groth16.Verify(userproof, finalvk, publicWitness)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"data": "error",
			})
			return
		} else {
			c.JSON(http.StatusOK, gin.H{
				"data": "good",
			})
			return
		}
	})

	r.Run(":7070") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
