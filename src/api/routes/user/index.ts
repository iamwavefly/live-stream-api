import { Router } from "express";
import ensureAuth from "../../../middlewares/ensureAuth";
import passport from "passport";
import {
  all,
  user,
  newUser,
  loginUser,
  updateUser,
  updateUserPassword,
  googleCallback,
} from "../../controllers/user/";

const router = Router();

//get all user
router.get("/", all);
//get single user
router.get("/me", ensureAuth, user);
// new user
router.post("/new", newUser);
// login user
router.post("/login", loginUser);
// login user
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);
// login user
router.get("/auth/google/callback", googleCallback);

// login user
router.put("/update", ensureAuth, updateUser);
// login user password
router.put("/update/password", ensureAuth, updateUserPassword);

export default router;
