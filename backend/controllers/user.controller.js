import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: {
        $ne: loggedInUserId, // exclude the logged in user
      },
    }).select("-password");

    if (filteredUsers) {
      res.status(200).json(filteredUsers);
    } else {
      res.status(404).json({ error: "No Users Found" });
    }
  } catch (error) {
    console.log("Error happened in getting users: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
