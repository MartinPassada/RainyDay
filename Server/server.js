const express = require('express');
const app = express();
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path');


// JS propios
const mongoDatabase = require('./mongodb.js');
const hash = require('./hash.js');


//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Recursos estaticos
app.use(express.static(path.join(__dirname, '../Client')));

// Configuracion Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'moviePageLayout',
    layoutsDir: path.join(__dirname, '/layouts')
}));
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'));

// Session

var userName = "Usuario Anonimo";
var sessionStatus = false;



// GET API's //

app.get('/checkSessionStatus', (req, res) => {
    if (sessionStatus){
        res.send(`${userName}`);
    }else{
        res.status(403).send(`${userName}`);
    }
});

app.get('/logOut', (req, res) => {
    sessionStatus = false;
    userName = "Usuario Anonimo";
    res.redirect('/');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/home.html'));
});

app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/welcome.html'));
});

app.get('/latestmovies', (req, res) => {
    mongoDatabase.getLatestMovies(moviesCollection => {
        res.json(moviesCollection);
    });
});

app.get('/genres', (req, res) => {
    mongoDatabase.getGenres(genres => {
        res.json(genres);
    });
});

app.get('/searchbygenre', (req, res) => {
    let searchparameter = req.query.genre
    mongoDatabase.searchByGenres(filteredsearch => {
        res.json(filteredsearch);
    }, searchparameter);
});

app.get('/mostviewed', (req, res) => {
    mongoDatabase.getMostWievedMovies(mostViewedMovies => {
        res.json(mostViewedMovies);
    });
});

app.get('/movies/:id', (req, res) => {
    let searchparameter = req.params.id;
    mongoDatabase.getMovieInfo(movieInfo => {
        console.log(movieInfo);
        res.render('moviePage', { movieInfo: movieInfo });
    }, searchparameter);
    
});


app.get('/ranked', (req, res) => {
    mongoDatabase.getRankedMovies(rankedMovies => {
        res.json(rankedMovies);
    });
});

// POST API's //

//LOGIN

app.post('/login', (req, res) => {
    let loginData = req.body;
    loginData.password = hash.SHA1(loginData.password);
    mongoDatabase.validateLogin(loginData, cbOK => {
        if(`${cbOK}` == 403){

            res.sendStatus(403);

        }else if (`${cbOK}` !== 403){

            userName = (`${cbOK}`);
            sessionStatus = true;
            res.redirect('/');
        }; 
    })}
);

//SIGNUP

  app.post('/signUp', (req, res) => {
    let userData = req.body;
    userData.password1 = hash.SHA1(userData.password1);
    mongoDatabase.addNewUser(userData, cbOK => {
        if(`${cbOK}` == 403){

            res.sendStatus(403);

        }else if (`${cbOK}` == 999){

            res.sendStatus(999);

        }else if (`${cbOK}` !== 403 && `${cbOK}` !== 999){

            userName = (`${cbOK}`);
            sessionStatus = true;
            res.redirect('/');
            
        }
      }); 
    }
  );
 
app.listen(8000);
console.log('listening in port 8000');
