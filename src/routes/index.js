import threadRouter from '../modules/thread/route';
import replyRouter from '../modules/reply/route';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, threadRouter);
  app.use(apiPrefix, replyRouter);
  return app;
};

export default routes;
