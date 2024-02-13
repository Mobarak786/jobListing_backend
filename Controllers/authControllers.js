import registerSchema from "../mongoDB/Models/registerModel";

const registerController = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    if (!email || !mobile || !password) {
      return res.status(500).json({ message: "all fields must be filled" });
    }
    const usersData = await registerSchema.create({
      email,
      mobile,
      password,
    });
    res.status(200).json({ success: true, data: usersData });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
module.exports = {
  registerController,
};
