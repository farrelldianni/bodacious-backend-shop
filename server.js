const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//sync models to db then run serv
sequelize.sync({ force: false, alter: true })
    .then(() => {
        app.listen(PORT, () => console.log('listening on port 3001'));
    });