package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"server_gin/router"
)

func setHearder() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("chris", "yy")

		if c.Request.Method == "OPTIONS" {
			c.JSON(http.StatusOK, gin.H{
				"msg": "ok",
			})
		}

		c.Next()
	}
}

func main() {

	r := gin.Default()

	// 中间件
	r.Use(setHearder())

	// 加载路由
	router.LoadRouter(r)
	if err := r.Run(":7070"); err != nil {
		fmt.Printf("startup service failed, err: %v", err)
	}
}
