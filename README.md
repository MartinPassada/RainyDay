# Changelog
## Update #20

*Client-Side
1. Random fixes
2. Added new messages boxes 
3. Fixed image's size when commentary loads. (just for huge images)

## Update #19

*Client-Side
1. Community section
2. Users can create forums and accept or reject other users
3. Users can now join to others users forums and comments on them
4. Only forum's administrators will see a table of users that requested privileges to enter owned forum
5. Css fixes
6. Added two trailer to watch (Rock of Ages and School of Rock). Subtitles belong to full movies, so dont expect to work properly with these trailers


*Server-Side
1. Community sections will check users status for distinct forums
2. Users can't enter to forums if admin doesn't accept them
3. If users try to get a forum they not belong by pasting url a function will automagically reject them to community section.
4. Others validations and that kind of stuff
5. More javascript files (hurray!)


## Update #18

*Client-Side
New features...

1. Comments now will display as expected 
2. Users can like movies from now on 
3. Users can upload an image with their comments 
4. Upvote and Downvote for comments 
5. Now users will see a message when deactivate Javascript

*Server-Side
1. A function will convert images to text for store them into database
2. Likes (for movies) will display immediately after user's action
3. New comments and likes (for comments) will display immediately after user's action
4. Secret message will display to programmers who try upvoting/downvoting a comment twice


## Update #17

*Client-Side

1. Now you can comment movies if your're logged. Comments will not show up 'till next update.
2. Miscellaneous fixes
3. Username is displayed as expected on comments section

## Update #16

*Server-Side

1. Javascipt code was splitted into more .js files for better organization
2. Handlebars page now sticks navbar and show logged user name
3. Implemented Express-sessions for allow multiuser activity



*Client-Side

1. Comments section on handlebars page now displays a preview of the current image choosed for uploading.
2. Minor Css fixes

## Update #15

*Server-Side

1. Sign Up api is working, checks if user exist, encrypts passwords and more.
2. Log in api works as expected, also encrypts passwords to compare with DB.
3. The server now controls session status.

*Client-Side

1. Sign Up form completed, validations included.
2. Log In form completed also with validations.
3. Added a function that automagically logs you in after sign up.
4. Nav bar displays username when logged, if not, shows "annonymous user".
5. Added button to log off.
6. Some fixes and stuff I don't remember.


## Update #14

*Server-Side

1. Error handling was added when movie doesn't exist.

*Client-Side

1. New welcome screen with sign up box (Work in progress).


## Update #13

*Server-Side

1. minor fixes

*Client-Side

1. Added support for some viewports like 1024x768 - 1280x720 - 1366x768.
2. Navbar now sticks when you scroll down.
3. Login Form now is well displayed.
4. Basic log-in functions were added, use "admin-admin" for log
5. some css fixes

## Update #12

*Server-Side

1. The not-implemented api to sort movies by rank is now working

*Client-Side

1. css fixes
2. links added to social media bar in the footer

## Update #11

*Server-Side

1. Player added to handlebars page
2. Subs (Captions) button added to player, player can now load vtt format subs from folder
3. Default comment input added to handlebars layout (Work in progress, no apis yet or functions)
4. minor css fixes

*Client-Side

1. SignUp button added to home's navbar (Work in progress)
2. LogIn button added to home's navbar (Work in progress)

## Update #10

*Server-Side

No changes

*Client-Side

1. minor css fixes

## Update #9

*Server-Side

1. A brand new not-implemented-yet api to sort movies by rank

*Client-Side

No changes
