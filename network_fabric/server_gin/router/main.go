package router

import (
	"github.com/gin-gonic/gin"
)
import "server_gin/utils/user"

func LoadRouter(e *gin.Engine) {
	router := e.Group("/user")
	{
		router.GET("/params", user.GetParams)
		router.GET("/register", user.Register)
		router.GET("/login", user.Login)
		router.GET("/delete", user.Login)
	}

	// router2 := e.Group("/balance")
	// {
	// 	router2.GET("/params", balance.GetParams)
	// 	router2.GET("/proof", balance.Proof)
	// }

	// router3 := e.Group("/compare")
	// {
	// 	router3.GET("/params", compare.GetParams)
	// 	router3.GET("/proof", compare.Proof)
	// }

	// router4 := e.Group("/mimc")
	// {
	// 	router4.GET("/params", mimc.GetParams)
	// 	router4.GET("/proof", mimc.Proof)
	// }
}
