- set up thread testing (done)
- add the frontend angular project (done)
- create thread on each test case / use before - beforeAll is better (done)
- use one single layout for header (done)

- destroy after each test (ask efe)
- global error handler in frontend angular (done)
- write test for getting user from reply
- fix running test on circleCI (when done update postgres api generator)

- reply has a owner test
- thread has a reply
- thread has a owner
- an unauth user can not add a reply test

- user name when loggined (done)
- rename auth to isLogged (done)
- logout (done)
- add sign in for unauth user (done)
- when sign in redirect back to the forum (done)
- add functionality to adding a reply frontend (done)
- route back to same page and display the new reply

- add all threads nav link
- move please to center (done)
- add created at time (done)
- user can create a thread
- user can create thread frontend


- A class that:
a. create a normal user
b. create an authenticated user
c. create a thread
d. create a reply
e. a get method to get any of these
f. a set method to set any of these

API



Mock.setUser(); Mock.getUser();
Mock.setAuthUser(); Mock.getAuthUser();
Mock.setThread(userId); Mock.getThread(userId);

Mock.createUser(); return a user object

Mock.createAuthUser(); // return a token

Mock.createThread(userId); return a thread object

Mock.createReply(userId, threadId); return a reply object