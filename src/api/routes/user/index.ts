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
  verifySocialAuthent,
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
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// login user
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://live-snap-front-end.herokuapp.com/login",
  }),
  (req, res) => {
    const user = req.user as any;
    const { auth_id } = user;
    res
      .status(201)
      .redirect(
        `https://live-snap-front-end.herokuapp.com/login/social/?auth_id=${auth_id}/`
      );
  }
);
// verify user social login
router.post("/auth/verify", verifySocialAuthent);

// login user
router.put("/update", ensureAuth, updateUser);
// login user password
router.put("/update/password", ensureAuth, updateUserPassword);

export default router;
