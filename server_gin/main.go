package main

import (
	"fmt"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type Circuit struct {
	// struct tags on a variable is optional
	// default uses variable name and secret visibility.
	X frontend.Variable `gnark:"x"`
	Y frontend.Variable `gnark:",public"`
}

func (circuit *Circuit) Define(curveID ecc.ID, api frontend.API) error {
	api.AssertIsLessOrEqual(circuit.X, circuit.Y)
	return nil
}

func compare(x int) bool {
	var cubicCircuit Circuit
	var requireAge = 18

	r1cs, err := frontend.Compile(ecc.BN254, backend.GROTH16, &cubicCircuit)
	if err != nil {
		return false
	}

	pk, vk, err := groth16.Setup(r1cs)
	if err != nil {
		return false
	}

	witness := &Circuit{
		X: frontend.Value(x),
		Y: frontend.Value(requireAge),
	}
	proof, err := groth16.Prove(r1cs, pk, witness)
	if err != nil {
		return false
	}

	publicWitness := &Circuit{
		Y: frontend.Value(requireAge),
	}

	err = groth16.Verify(proof, vk, publicWitness)
	if err == nil {
		return true
	}
	return false
}

type LoginForm struct {
	age string `json:"user" binding:"required"`
}

func main() {
	r := gin.Default()

	r.GET("/hello", func(c *gin.Context) {
		c.String(200, "Hello world")
	})

	r.GET("/addons/booking/order/add", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Query("lodger_ids"))
		fmt.Println(id)
		var age int
		if id == 1 {
			age = 18
		} else {
			age = 22
		}
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")

		var msg string
		var data bool
		if compare(age) {
			msg = "下单成功"
			data = true
		} else {
			msg = "年龄不合法"
			data = false
		}
		c.JSON(http.StatusOK, gin.H{
			"code": http.StatusOK,
			"msg":  msg,
			"data": data,
		})

	})

	r.OPTIONS("/addons/booking/order/add", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Query("lodger_ids"))
		fmt.Println(id)
		var age int
		if id == 1 {
			age = 18
		} else {
			age = 22
		}
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.JSON(http.StatusOK, gin.H{
			"code": http.StatusOK,
			"msg":  compare(age),
		})

	})
	r.Run("0.0.0.0:7000") // listen and serve on 0.0.0.0:8080
}
