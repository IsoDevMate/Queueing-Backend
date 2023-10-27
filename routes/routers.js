const router =require("express").Router()
const { Tklogic }=require('../controllers/ticketlogic')
const { Ticket }=require('../controllers/createTicket')
const { CreateUser }=require('../controllers/RegisterController')    



router.get('/create-ticket',Tklogic,Ticket)
router.post('/create-user',CreateUser)
module.exports=router