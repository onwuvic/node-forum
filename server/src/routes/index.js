import threadRouter from '../modules/thread/route';
import replyRouter from '../modules/reply/route';
import userRouter from '../modules/user/route';
import channelRouter from '../modules/channel/route';
import favoriteRouter from '../modules/favorite/route';
import profileRouter from '../modules/profile/route';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, threadRouter);
  app.use(apiPrefix, replyRouter);
  app.use(apiPrefix, userRouter);
  app.use(apiPrefix, channelRouter);
  app.use(apiPrefix, favoriteRouter);
  app.use(apiPrefix, profileRouter);
  return app;
};

export default routes;
