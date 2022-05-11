import express from 'express'
const router = express.Router()
import { sendRequest } from "../kafka/kafka";

import { login } from '../services/authService'


router.post('/login', async (req, res) => {
    const response = await login(req.body)
    console.log(response)
    res.status(response.code).json(response.message)
})

router.get('/getuaqs', async (req, res) => {
    sendRequest('admin', { action: 'GET_UA_POSTS' }, (err, data) => {
      console.log("I am here!!!")
      console.log(data);
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(data);
    });
  });

export default router