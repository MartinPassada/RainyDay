## 1. Download and install Node.js from the link below 

https://nodejs.org/dist/v10.16.0/node-v10.16.0-x64.msi

## 2. Download MongoDB Community Server and install it as a service (default option)

https://www.mongodb.com/download-center/community

## 3. Download and install MongoDB Compass Community Tool

https://www.mongodb.com/download-center/compass

## 4. Download Visual Studio Code

https://code.visualstudio.com/

## 5. Download my project from here (github)

## 6. Reboot your system

## 7. Make sure service "mongoDB database server" is running (step N°)


# Follow the steps

1. Extract folder "repo-master"
2. Open Visual Studio Code and Add the "repo-master" folder, you'll see the files and now you'll be able to navigate through the code.
3. Go to Terminal --> New Terminal
A terminal will open showing the default path for the folder you added. Something like this --> **PS C:\Program Files (x86)\YOUR PATH\Repo-master>**
4. Write and the end of the path this "cd Server", without quotes to change de directory path. now the path would be displayed like this --> **C:\Program Files (x86)\YOUR PATH\Repo-master\Server>**
5. Write on the terminal, in a new line "npm start" without quotes. A message will show up saying **"listening in port 8000"**
6. Open Mongo Compass
7. Create a new default connection (localhost 127.0.0.1), if connection fails follow step n°8 and do this step again
8. Start the service manually. (Windows + R) --> type "services.msc" with no quotes and press enter --> search for "MongoDB Server" --> Right click on it --> Execute.
9. Once you created the connection go to Admin and click the plus button + "create collection" and name it "moviesdatabase" without quotes all in lowercase
10. Now step on your new "moviesdatabase" tag (you'll find it inside Admin, dropdown it if necessary) click the "collection" button from the menu-bar and import Data
11. Browse **"Repo-master/Server/"** folder and import **"moviesdatabse.json"** file
12. For a better view click in the "table" button.
13. Now open your browser and put this on the url bar "http://localhost:8000" without quotes.



