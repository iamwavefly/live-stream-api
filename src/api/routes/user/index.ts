import { Router } from "express";
import ensureAuth from "../../../middlewares/ensureAuth";
import {
  all,
  user,
  newUser,
  loginUser,
  updateUser,
  updateUserPassword,
} from "../../controllers/user/";

const router = Router();

//get all user
router.get("/", all);
//get single user
router.get("/:id", user);
// new user
router.post("/new", newUser);
// login user
router.post("/login", loginUser);
// login user
router.put("/update", ensureAuth, updateUser);
// login user password
router.put("/update/password", ensureAuth, updateUserPassword);

export default router;
