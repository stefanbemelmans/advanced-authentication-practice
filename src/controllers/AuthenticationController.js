import User from "../models/UserModel";
import bcrypt from "bcrypt-nodejs";
import jwt from "jwt-simple";

export function signIn(req, res) {
  res.json({ token: tokenForUser(req.user)});
}
export function signUp(req, res, next) {
  const { username, password } = req.body;
  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: "You must provide an username and password" });
  }
  // Look for a user with the current user name
  User.findOne({ username }).exec()
  .then((existingUser) => {
    // If the user exist return an error on sign up
    if (existingUser) {
      return res.status(422).json({ error: "Username is in use" });
    }
    savePassword(username,password,res,next);
  })
  .catch(err => next(err));
}
function savePassword(username,password,res,next) {
  // If the user does not exist create the user
  // User bcrypt to has their password, remember, we never save plain text passwords!
  bcrypt.genSalt(10, function (salt) {
    bcrypt.hash(password, salt, null, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      // Create a new user with the supplied username, and the hashed password
      const user = new User({ username, password: hashedPassword });
      // Save and return the user
      user.save()
         .then(u => res.json({ token: tokenForUser(u) }));
    });
  });
}
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

