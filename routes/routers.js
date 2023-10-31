const router =require("express").Router()
const { createUser, createTicket }=require('../controllers/RegisterController')    
const { Tklogic } = require("../controllers/ticketlogic")
const { callback } = require("../controllers/RegisterController")
router.post('/create-user', createUser,createTicket,Tklogic)
router.post('/callback',callback)
module.exports=router