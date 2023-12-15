# Queueing-Backend



Use a database like MongoDB to store user and service data. Each user can have a document with fields like name, email, phone number. Each service can have a document with fields like name, description, estimated wait time.
When a user requests a service, create a ticket document with fields like user id, service id, status (queued, in progress, completed), and estimated wait time. Generate a random ticket ID and return that to the user.
To calculate estimated wait time, you can check the number of queued tickets for that service and multiply by the average time per ticket. Update this field as tickets are queued/completed.
For admin authentication, you can use JWT tokens. When admin logs in, generate a token that gets sent on future requests to authenticate them.
For admin verification of users, you can have an OTP code sent to user's email when their ticket is next in line. The user shows this to the admin to verify.
<h3>Set up webhook endpoints</h3> 
 for actions like user booking a ticket, admin beginning a ticket, admin completing a ticket. Use these to update ticket status and send email notifications.
Make sure queues and tickets are locked/serialized when updating to prevent race conditions.


we'll be using square developer as our webhook config 
here is the response data they give us 

{
  "merchant_id": "ML3X49B64V1C4",
  "location_id": "L9R0X9X5SGDBJ",
  "type": "booking.created",
  "event_id": "de33fbac-5b88-4be3-a5cd-104312306342",
  "created_at": "2023-10-31T12:24:50Z",
  "data": {
    "type": "booking",
    "id": "i2id2g3enyspi7:0",
    "object": {
      "booking": {
        "appointment_segments": [
          {
            "duration_minutes": 30,
            "service_variation_id": "T3WUWYFJOVW2EU6XGRU5YG4A",
            "service_variation_version": 1605808735978,
            "team_member_id": "_4GsfYnqGHyurOwzWdKj"
          }
        ],
        "created_at": "2020-12-08T19:56:53Z",
        "customer_id": "SSKBT02ECWZXK6W3VWYC78E52R",
        "customer_note": "",
        "id": "i2id2g3enyspi7",
        "location_id": "L9R0X9X5SGDBJ",
        "seller_note": "",
        "start_at": "2020-12-17T16:00:00Z",
        "status": "ACCEPTED",
        "updated_at": "2020-12-08T19:56:53Z",
        "version": 0
      }
    }
  }
}

create a customer 
create a booking 
setup webhook to notify admin 
add a pub/sub eg Bulljs publish to consumer which in this case maybe socket .io which pushes realtime data to the admin



EAAAEOlvtPdHqDa_Nr1Zvn11UeUumPh2d1nYXOex4YLrasylhnhfeM303vi5i5Bu  =app secret

EAAAEOlvtPdHqDa_Nr1Zvn11UeUumPh2d1nYXOex4YLrasylhnhfeM303vi5i5Bu  =acces token
 =location_id


 ### STILL WORKING ON THE PRODUCER LOGIC 
 producer.js file not fully wrking  it should add a ticket to the queue then chack if completed remove from the queue 
 