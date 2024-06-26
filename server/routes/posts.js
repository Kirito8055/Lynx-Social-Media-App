import express from "express";
import {  getFeedPosts, getUserPosts, likePost, commentPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:userId/feed", verifyToken, getFeedPosts);
// router.get("/:userId", verifyToken, getNotUserPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comments", verifyToken, commentPost);

export default router;