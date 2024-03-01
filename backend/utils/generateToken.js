import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds DxHxMxSxMS
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export default generateTokenAndSetCookie;
