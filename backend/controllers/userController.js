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

router.post('/voteQuestion', async (req, res) => {
  const { userId, questionId, value } = req.body;
  sendRequest('users', { userId, questionId, value, action: 'VOTE_QUESTION' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

export default router;