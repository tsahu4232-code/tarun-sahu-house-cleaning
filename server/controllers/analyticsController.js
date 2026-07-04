exports.getAnalytics = async (req,res)=>{
try{

res.status(200).json({
totalBookings:120,
totalRevenue:85000,
totalCustomers:78,
totalReviews:35
});

}catch(error){

res.status(500).json({
message:error.message
});

}
};
