const User = require("../models/user");
const jwt=require("jsonwebtoken")
exports.userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.send({
        success: false,
        message: "All field required",
      });
    }

    const alreadyExits = await User.findOne({ email });
    console.log(alreadyExits);
    if (alreadyExits) {
      res.send({
        success: false,
        message: "already email present",
      });
    }
    const createUser = await User.create({ name, email, password });
    if (createUser) {
      res.send({
        success: true,
        message: "User createed",
        data: createUser,
      });
    }
  } catch (err) {
    console.log("user signup error");
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({
        success: false,
        message: "All field required",
      });
    }

    const emailPresent = await User.findOne({ email });
    console.log(emailPresent);
    if (emailPresent) {
      if (emailPresent.password !== password) {
        res.send({
          success: false,
          message: "Invalid credentails",
        });
      } else {
        const token = jwt.sign(
          { email: emailPresent.email, id: emailPresent._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        emailPresent.token = token;
        emailPresent.password = undefined;

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          emailPresent,
          message: `User Login Success`,
        });
      }
    }else{
      res.send({
        status:400,
        message:"email not exits",
        success:false
      })
    }
  } catch (err) {
    console.log("user Login error");
    console.log(err);
  }
};
