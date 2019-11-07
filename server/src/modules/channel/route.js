import express from 'express';
import ChannelController from './ChannelController';


const channelRouter = express.Router();

channelRouter.get('/channels', ChannelController.index);

export default channelRouter;
