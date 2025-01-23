const { userRegister, login, getAllUsers } = require("../controllers/usersController")

const userRouter=require("express").Router()

userRouter.post("/register",userRegister)
userRouter.post("/login",login)
userRouter.get("/register",getAllUsers)


module.exports=userRouter