var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Sincronizando o Sequelize (em dev)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ force: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
        .then(() => {
            console.log('Banco de dados sincronizado');
        })
        .catch(err => {
            console.error('Erro ao sincronizar o banco de dados:', err);
        });
}

module.exports = app;
