exports.Ticket=async(req,res)=>{
    try{
        const ticket=new Ticket({
            user_id:req.body.id,
            service_id:req.body.service_id,
            ticket_status:req.body.ticket_status
        });
        ticket=await ticket.save();
        return ticket;
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error on ticket creation ');
        return null; // Return null to indicate an error
    }
}