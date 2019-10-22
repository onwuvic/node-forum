- set up thread testing (done)
- add the frontend angular project (done)
- create thread on each test case / use before - beforeAll is better (done)
- use one single layout for header (done)

- destroy after each test (ask efe)
- global error handler in frontend angular
- write test for getting user from reply
- fix running test on circleCI (when done update postgres api generator)

- reply has a owner test
- thread has a reply
- thread has a owner

- A class that:
a. create a normal user
b. create an authenticated user
c. create a thread
d. create a reply
e. a get method to get any of these
f. a set method to set any of these

API

Mock.createUser();
Mock.createAuthUser();
Mock.setUser(); Mock.getUser();
Mock.setAuthUser(); Mock.getAuthUser();

Mock.createThread(userId); Mock.setThread(userId); Mock.getThread(userId);

Mock.createReply(userId, threadId);