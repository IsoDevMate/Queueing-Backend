const router =require("express").Router()
const { createUser, createTicket }=require('../Controllers/RegisterController')
const { callback } = require("../Controllers/RegisterController")
const { Tklogic } = require("../Controllers/ticketlogic")
router.post('/create-user', createUser, createTicket, Tklogic);
router.post('/callback',callback)
module.exports=router