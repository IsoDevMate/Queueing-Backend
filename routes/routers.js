const router =require("express").Router()
const { createUser, createTicket }=require('../controllers/RegisterController')    
const { Tklogic } = require("../controllers/ticketlogic")

router.post('/create-user', createUser,createTicket,Tklogic)

module.exports=router