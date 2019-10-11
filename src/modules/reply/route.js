import express from 'express';
import ReplyController from './ReplyController';


const replyRouter = express.Router();

replyRouter.get('/replies', ReplyController.index);

export default replyRouter;
