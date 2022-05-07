//Sakshi
import express from "express";
import { createPost, getAllPosts } from "../services/postService";
import { sendRequest } from "../kafka/kafka";

const router = express.Router();

router.get('/', async (req, res) => {
  sendRequest('posts', { action: 'GET_POSTS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/', async (req, res) => {
  const { title, body, tags, ownerId } = req.body;
  sendRequest('posts', { title, body, tags, ownerId, action: 'ADD_POST' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

export default router;