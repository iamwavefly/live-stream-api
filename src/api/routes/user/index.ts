import { Router } from "express";
import { all, user, newUser } from "../../controllers/user/";

const router = Router();

//get all user
router.get("/", all);
//get single user
router.get("/:id", user);
// new user
router.post("/new", newUser);

export default router;
