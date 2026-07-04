import { useEffect, useState } from "react";
import axios from "axios";

function CustomerDashboard() {

const [bookings,setBookings] =
useState([]);

useEffect(()=>{

axios.get(
"http://localhost:5000/api/booking/my"
)
.then(res=>{

setBookings(res.data);

});

},[]);

return(

<div className="container mx-auto py-10">

<h1 className="text-4xl font-bold">
My Bookings
</h1>

<div className="mt-6">

{bookings.map((booking)=>(

<div
key={booking._id}
className="bg-white shadow p-4 rounded mb-4"
>

<h2>{booking.service}</h2>

<p>{booking.status}</p>

</div>

))}

</div>

</div>

);

}

export default CustomerDashboard;