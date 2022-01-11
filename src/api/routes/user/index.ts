import { Router } from "express";
import { all, user } from "../../controllers/user/"

const router = Router();

//get all user
router.get(
    "/", all
);
//get single user
router.get(
    "/:id", user
);

export default router