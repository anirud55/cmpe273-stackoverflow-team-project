//Author: Unmesh
import { sendRequest } from "../kafka/kafka";
import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
  const { email } = req.body;
  sendRequest('users', { id, action: 'SEARCH' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  sendRequest('users', { id, action: 'GET_USER_PROFILE' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.post('/bookmark', async (req, res) => {
  const { userId, postId } = req.body
  sendRequest('users', { userId, postId, action: 'BOOKMARK_POST' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  })
})

router.get('/bookmark/:id', async (req, res) => {
  console.log(req)
  const { id } = req.params;
  console.log(id)
  sendRequest('users', { id, action: 'GET_BOOKMARKS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  })
})

export default router;