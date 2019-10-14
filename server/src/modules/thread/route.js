import express from 'express';
import ThreadController from './ThreadController';

const threadRouter = express.Router();

threadRouter.get('/threads', ThreadController.index);
threadRouter.get('/threads/:id', ThreadController.show);

export default threadRouter;
