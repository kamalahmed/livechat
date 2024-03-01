import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profile picture free api : https://avatar.iran.liara.run/public/boy?username=anyname
    const boyProfilePicture = "https://avatar.iran.liara.run/public/boy?username=" + username;
    const girlProfilePicture = "https://avatar.iran.liara.run/public/girl?username=" + username;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    if (!newUser) {
      return res.status(400).json({error: "Error happened in signup: Invalid user data"});
    }

    await newUser.save(); // save the new user to the database

    generateTokenAndSetCookie(newUser._id, res); // generate a token and set it as a cookie

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      gender: newUser.gender,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log("Error happened in signup: auth controller: ", error.message);
    res.status(500).send({ error: error.message });
  }
};

export const login = async (req, res) => {

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      gender: user.gender,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error happened in login: auth controller: ", error.message);
    res.status(500).send({ error: error.message });
  }
  
};
export const logout = (req, res) => {
  res.send("Logout Page");
};
