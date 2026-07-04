const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

exports.signup =
async(req,res)=>{

const {name,email,password}
= req.body;

if(!name || !email || !password){
return res.status(400).json({
message:"Name, email and password are required"
});
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
return res.status(400).json({
message:"Please provide a valid email address"
});
}

if(password.length < 6){
return res.status(400).json({
message:"Password must be at least 6 characters"
});
}

const existingUser = await User.findOne({email});
if(existingUser){
return res.status(400).json({
message:"An account with this email already exists"
});
}

const hashedPassword =
await bcrypt.hash(password,10);

const user =
await User.create({

name,
email,
password:hashedPassword

});

// Never send the password hash back to the client
res.json({
_id:user._id,
name:user.name,
email:user.email,
role:user.role
});

};

exports.login =
async(req,res)=>{

const {email,password}
= req.body;

const user =
await User.findOne({email});

if(!user){

return res.status(400)
.json({
message:"User Not Found"
});
}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.status(400)
.json({
message:"Wrong Password"
});
}

const token =
jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({token});

};

// Admin login using the fixed ID/password stored in server/.env
// (ADMIN_EMAIL / ADMIN_PASSWORD). Keeps the admin login separate
// from the normal customer signup/login above.
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid admin credentials",
    });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    admin: { email },
  });
};