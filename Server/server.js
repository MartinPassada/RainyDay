const express = require('express');
const app = express();
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path');

// JS propios
const mongoDatabase = require('./mongodb.js');
const login = require ('./login.js');

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


// GET API's //


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/home.html'));
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

app.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body.user !== undefined && req.body.password !== undefined) {
      if (login.validarUsuario(req.body.user, req.body.password)) {
        res.redirect('/');
      } else {
        res.sendStatus(403);
      }
    } else {
      res.status(403).end();
    }
  });
 
    







app.listen(8000);
console.log('listening in port 8000');