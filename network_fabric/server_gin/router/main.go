package router

import "github.com/gin-gonic/gin"
import "server_gin/utils/user"

func LoadRouter(e *gin.Engine) {
	router := e.Group("/user")
	{
		router.GET("/params", user.GetParams)
		router.GET("/register", user.Register)
		router.GET("/login", user.Login)
		router.GET("/delete", user.Login)
	}
}
