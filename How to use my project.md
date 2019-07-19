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

## 7. Make sure service "mongoDB database server" is started


# Follow the steps

..*Extract folder "repo-master"
..*Open Visual Studio Code and Add the "repo-master" folder, you'll see the files and now you'll be able to navigate through the code.
..*Go to Terminal --> New Terminal
A terminal will open showing the default path for the folder you added. Something like this --> PS C:\Program Files (x86)\YOUR PATH\Repo-master>
..*Write and the end of the path this "cd Server", without quotes to change de directory path. now the path would be displayed like this --> C:\Program Files (x86)\YOUR PATH\Repo-master\Server>
..*Write on the terminal, in a new line "npm start" without quotes. A message will show up saying "listening in port 8000"
..*Open Mongo Compass
..*Create a new default connection (localhost 127.0.0.1), if connection fails you didn't do right the point number 7. Start the service manually.
..*Once you created the connection go to Admin and click the plus button + "create collection" and name it "moviesdatabase" without quotes and in lowercase
..*Now go to your new "moviesdatabase" tag (you'll find it inside Admin, dropdown it if necessary) and click in the "collection" button from the menu-bar and import Data
..*Browse "Repo-master/Server/moviesdatabse.json" folder and import it
..*For a better view click in the "table" button.

..*Now open your browser and put this on the url bar "http://localhost:8000" without quotes.



