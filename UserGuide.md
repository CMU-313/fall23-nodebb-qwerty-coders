# Team Qwerty Coders User Guide

## Post Endorsement

## Private Topic

User story: As a student, I want to be able to privately post so that I can ask questions that are private to my own work and only instructors should see.

### How to use / test
1. Login or sign up as a student account.
2. Navigate to any category (eg. General Discussion) by clicking on the category.
3. Click the "New Topic" button to create a new topic.
<img width="800" alt="newtopic" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/a5436c4c-a5f8-435f-9c89-a441e505503a">
4. In the composer, you can switch on or off a toggle switch that has the label "Private". Turn on the switch and submit the topic to create a private topic.
<img width="800" alt="composer" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/7925662a-943d-4858-bbb0-5cb238004777">
5. After submit, you can see a "Private" label under the topic title.
<img width="800" alt="privatetopiclabel" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/82d02ab5-4902-4ae6-9009-af2244b9fd23">
6. Navigate back to the list of topics, you can see a "Private" label under the title of the private topics.
<img width="800" alt="privatetopicincat" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/7d18b888-29e8-4aae-bed3-54fd724bfb21">
7. Similarly, create another topic with the switch turned off results in a public post. No labels are marked for public posts.
<img width="800" alt="publicnolabel" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/e13233df-8150-4262-a482-0dcc36a9cc5b">
8. Logout from you current account, and login or sign up as another student account.
9. At the categories page, if the last post/reply is from a private post you have no access, it would be hidden.
<img width="800" alt="student2nolastpost" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/f81e1b1a-1b22-4278-abe0-3982187f57da">
10. Navigate to the category you posted before.
11. You should not see any topic that is not yours with a private label.
<img width="800" alt="privatetopicliststudent2" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/9a174880-7f8b-45ed-aaf7-a327e9f2243f">
12. In unread, recent, and popular pages, private topics that you have no access to are also hidden.
<img width="800" alt="unread" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/da5dab6a-ac38-42f1-9376-750320959dc4">
<img width="800" alt="recent" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/5b4b25dc-c415-435f-8756-f2180aa62ba4">
<img width="800" alt="popular" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/cfe64ad2-be6b-4119-b086-ff6bf25cad5d">
13. If you navigate to a user's profile, it would only show posts under topics that you have access to.
<img width="800" alt="userprofile" src="https://github.com/CMU-313/fall23-nodebb-qwerty-coders/assets/124016473/d821ae21-49cd-4797-a756-ae52b72696c3">

### How to run test suite
1. Open terminal.
2. Navigate to the root directory of the application.
3. Run `npm run test` in the terminal.

### New automated test
We added tests regarding this feature in the `test/topics.js` file in the repository.
* Added `isPrivate` field in "create a new topic with proper parameters" test
* Added test of creating a new private topic with `isPrivate` as `true`
* Tested if topics are created with `isPrivate` as `false` by default
* Check if `accessible` field is `true` when a user reads their own topic

These tests are sufficient because the view restriction is built upon existing conditions and restriction is achieved via hiding topics/posts in the UI/views of the application rather than direct filtering in the backend. 

## Instructor and TA

