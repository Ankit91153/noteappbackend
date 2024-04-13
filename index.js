const express=require('express');
const app=express();
const cors = require("cors");

const port =process.env.PORT||3000
require("dotenv").config();

const cookieParser = require("cookie-parser");
require("./config/conn");
app.use(express.json())
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)
const userRoutes = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post",postRoute)
app.listen(port,(req,res)=>{
    console.log(`server at ${port}`);
})


