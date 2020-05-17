- set up thread testing (done)
- add the frontend angular project (done)
- create thread on each test case / use before - beforeAll is better (done)
- use one single layout for header (done)
- destroy after each test (ask efe) (done)
- global error handler in frontend angular (done)
- user name when loggined (done)
- rename auth to isLogged (done)
- logout (done)
- add sign in for unauth user (done)
- when sign in redirect back to the forum (done)
- add functionality to adding a reply frontend (done)
- add all threads nav link (done)
- move please to center (done)
- add created at time (done)
- user can create a thread BACKEND functionality and test (done)
- user can create thread frontend (done)
- create form for thread basic validation required (done)
- add auth guard for only auth user (done)
- when created redirect to a single page of the form (done)
- how to check if user has favorite a reply or not (done)
- route back to same page and display the new reply (done)
- Link to see thread from user profile (done)
- get all activity and eager load its subjectType explictly (done)
- use this knowledge to eager it from the user model (done)
- userId in like/favorite table (done)
// all done
Mock.setUser(); Mock.getUser();
Mock.setAuthUser(); Mock.getAuthUser();
Mock.setThread(userId); Mock.getThread(userId);
Mock.createUser(); return a user object
Mock.createAuthUser(); // return a token
Mock.createThread(userId); return a thread object
Mock.createReply(userId, threadId); return a reply object

What to test
- user can login (done)
- test get all thread include its channel too (done)
- thread should have replies (done)
- thread replies should have it creator (done)
- single thread should have it creator / replies / channel (done)
- auth user can create a thread (done)
- unauth user can not create a thread (done)
- auth user can reply a thread (done)
- unauth user ca not reply a thread (done)
- add 404 page (done)
- add catch all route error (done)
- add channel to parameter call (done)
- add backend validation to create thread (done)
- do a look up for channel id before creating thread (done)
- how to add count to all thread api resource (done)
- when deleting a thread (done)
- also delete its thread activity and delete its reply activity (done)

// Activities
- group the subjectType by createdAt date (done/half)
- auto add different component base on the activity type (done)

- Add favorite activity api (done)
- add deleting reply api (done)
- refactor policies to be : ReplyPolicy, ThreadPolicy (done)
- add bulk delete to activity (done)

// refactor frontend
- ordering reply (done) backend 
- auto loading reply (done)
- add reply type to the behaviour subject (done)
- check the new type before adding it. (done)
- contemplate to either make new api call for one thread or do a search all for the thread. (let make api call)
- observable error (done)

// deleting reply | deep look into deleting thread/reply/favorite/activity
- should delete reply activity (done)
- should also delete favoriting a reply activity (done)
- should also delete favorite activity of the reply (done)



// Not yet done
- fix running test on circleCI (when done update postgres api generator)
- channel should be unique
- channel should use the find or create method to create new channel
- fine tune validation error to either array or object
- how to add each count of each eager loader resources

// Activities
- group the subjectType by createdAt date (done/half)

psuedo code
- backend to frontend
- how to paginate in sequelize
- how to paginate an eager loader resource
- complete backend implementation
- start frontend implementation
- hold on on reply pagination (all pagination)


- auto reload
- best way to add check like: isAuth, hasPermit
- add role table
- policies (middleware): role permit (authUser.role === 'user' | 'admin'), 
thread permit (authUser.id === thread.user.id [done])

use for migration
npx sequelize-cli migration:create --name modify_users_add_new_fields