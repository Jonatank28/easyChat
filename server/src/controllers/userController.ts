import User, { IUser } from "../models/userModel";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  user?: IUser;
}

class UserController {
  async getUserId(req: CustomRequest, res: Response): Promise<void> {
    try {
      if (req.params.id) {
        const user = await User.findById(req.params.id);

        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }
        res.json(user);
      } else {
        res.status(401).json({ error: "user not authorized" });
        return;
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting user" });
      return;
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error getting users" });
      return;
    }
  }

  async postUser(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { name, email, password, photo, status } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ error: "This email is already registered." });
        return;
      }

      if (req.body.status !== "online" && req.body.status !== "offline") {
        res.status(400).json({ error: "Invalid status" });
        return;
      }

      const newUser = await User.create({
        name,
        email,
        password,
        photo,
        status,
      });

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
      return;
    }
  }

  async putUser(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, password, photo, status } = req.body;

      const userUpdate = await User.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password,
          photo,
          status,
        },
        { new: true }
      );

      if (!userUpdate) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({
        message: "User updated successfully",
        user: userUpdate,
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
      return;
    }
  }

  async deleteUser(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userDelete = await User.findByIdAndDelete(id);
      if (!userDelete) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
      return;
    }
  }
}

export default new UserController();
