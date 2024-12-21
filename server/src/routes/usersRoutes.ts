import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/user/:id", userController.getUserId);
router.get("/users", userController.getUsers);
router.post("/user", userController.postUser);
router.put("/user/:id", userController.putUser);
router.delete("/user/:id", userController.deleteUser);

export default router;
