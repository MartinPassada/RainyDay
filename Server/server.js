const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// JS propios
const mongoDatabase = require('./mongodb.js');
const hash = require('./hash.js');


//Middlewares
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'whatever',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 } //Expira despues de media hora
}))

// Recursos estaticos
app.use(express.static(path.join(__dirname, '../Client')));

// Configuracion Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'moviePageLayout',
    layoutsDir: path.join(__dirname, '/layouts')
}));
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'));


// GET //

app.get('/getUserName', (req, res) => {

    if (req.session.user == undefined) {
        res.send("Usuario Anonimo");


    } else if (req.session.user !== undefined) {
        res.send(req.session.user);

    } else {
        res.sendStatus(500);
    }

});

app.get('/logout', (req, res) => {

    req.session.destroy();
    res.redirect("back");

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
        res.render('moviePage', { movieInfo: movieInfo });
    }, searchparameter);

});


app.get('/ranked', (req, res) => {
    mongoDatabase.getRankedMovies(rankedMovies => {
        res.json(rankedMovies);
    });
});

app.get('/getComments', (req, res) => {
    let searchparameter = req.query.movieID;
    mongoDatabase.getComments(response => {
        res.json(response);
    }, searchparameter);
});

app.get('/getLastComment', (req, res) => {
    let searchparameter = req.query.movieID;
    mongoDatabase.getLastComment(response => {
        res.json(response);
    }, searchparameter);
});

app.get('/getLikesForUser', (req, res) => {

    if (req.session.user !== undefined) {
        let userName = req.session.user;
        let movieID = req.query.movieID;
        mongoDatabase.getLikesForUser(userName, movieID, cbOK => {

            res.json(cbOK);

        });

    } else {

        res.sendStatus(403);

    }

});
app.get('/getUpLikesForComments', (req, res) => {

    if (req.session.user !== undefined) {
        let userName = req.session.user;

        mongoDatabase.getUpLikesForComments(userName, cbOK => {


            res.json(cbOK);

        });

    } else {

        res.status(200).send('Usuario Anonimo');

    }

});
app.get('/getDownLikesForComments', (req, res) => {

    if (req.session.user !== undefined) {
        let userName = req.session.user;

        mongoDatabase.getDownLikesForComments(userName, cbOK => {


            res.json(cbOK);

        });

    } else {

        res.status(200).send('Usuario Anonimo');

    }

});

// POST API's //

//LOGIN

app.post('/login', (req, res) => {
    let loginData = req.body;
    loginData.password = hash.SHA1(loginData.password);
    mongoDatabase.validateLogin(loginData, cbOK => {
        if (`${cbOK}` == 403) {

            req.session.destroy();
            res.sendStatus(403);

        } else if (`${cbOK}` !== 403) {

            req.session.user = (`${cbOK}`);
            res.redirect('back');
        };
    })
});

//SIGNUP

app.post('/signUp', (req, res) => {
    let userData = req.body;
    userData.password1 = hash.SHA1(userData.password1);
    mongoDatabase.addNewUser(userData, cbOK => {
        if (`${cbOK}` == 403) {

            res.sendStatus(403);

        } else if (`${cbOK}` == 999) {

            res.sendStatus(999);

        } else if (`${cbOK}` !== 403 && `${cbOK}` !== 999) {

            req.session.user = (`${cbOK}`);
            res.redirect('/');

        }
    });
});

//COMMENTS

app.post('/postComments', (req, res) => {
    let userCommentary = req.body;
    mongoDatabase.postComment(userCommentary, cbOK => {


        if (`${cbOK}` == 200) {

            res.sendStatus(200);

        }
    });

});

//LIKE

app.post('/postLike', (req, res) => {
    let userData = req.body;
    mongoDatabase.postLike(userData, cbOK => {

        if (cbOK == 'se quito like') {

            res.status(200).send('se quito like');

        } else if (cbOK == 'se agrego like') {

            res.status(200).send('se agrego like');

        } else {
            res.status(500);
        }

    });

});

//LIKE UP

app.post('/postLikeCommentUp', (req, res) => {
    var commentUpData = req.body;

    mongoDatabase.commentUp(commentUpData, cbOK => {

        if (cbOK == 'se quito like') {

            res.status(200).send('se quito like');

        } else if (cbOK == 'se agrego like') {

            res.status(200).send('se agrego like');

        } else if (cbOK == 'Nop...') {

            res.status(200).send('Nop...');

        } else {
            res.status(500);
        }

    });

});

//LIKE DOWN

app.post('/postLikeCommentDown', (req, res) => {
    var commentDownData = req.body;

    mongoDatabase.commentDown(commentDownData, cbOK => {


        if (cbOK == 'se quito like') {

            res.status(200).send('se quito like');

        } else if (cbOK == 'se agrego like') {

            res.status(200).send('se agrego like');

        } else if (cbOK == 'Nop...') {

            res.status(200).send('Nop...');

        } else {
            res.status(500);
        }

    });

});






app.listen(8000);
console.log('listening in port 8000');