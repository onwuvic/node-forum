import threadRouter from '../modules/thread/route';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, threadRouter);
  return app;
};

export default routes;
