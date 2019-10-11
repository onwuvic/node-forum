import threadRouter from '../modules/thread/route';
import replyRouter from '../modules/reply/route';
import userRouter from '../modules/user/route';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, threadRouter);
  app.use(apiPrefix, replyRouter);
  app.use(apiPrefix, userRouter);
  return app;
};

export default routes;
