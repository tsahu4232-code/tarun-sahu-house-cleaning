const mongoose = require("mongoose");
const dns = require("dns");

// Force Node to use Google's DNS servers.
// Fixes "querySrv ECONNREFUSED" on Windows where Node's internal
// resolver fails even though the OS can resolve the SRV record fine.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;