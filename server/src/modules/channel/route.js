import express from 'express';


const channelRouter = express.Router();

channelRouter.get('/channels', ReplyController.index);

export default channelRouter;
