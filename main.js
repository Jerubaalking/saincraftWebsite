const express = require('express');
const { engine } = require('express-handlebars');
// const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const app = express();


dotenv.config({ path: './config/config.env' });

const whitelist = ['http://saincrafttechnologies.com', 'http://www.saincrafttechnologies.com', 'https://saincrafttechnologies-static-public-2023.fra1.cdn.digitaloceanspaces.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error())
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']

}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.resolve(__dirname + process.env.D_PUBLIC)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs', engine({
    defaultLayout: 'layout',
    layoutsDir: 'views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: require('./backend/helpers/handle_bar').helpers,
    registerPartial: "home",
    extname: '.hbs',
    registerPartial: 'settings'
}));
app.use('/', (req, res) => {
    res.render('index');
})

const port = process.env.PORT || 3001;
const _env = process.env.NODE_ENV;


app.listen(port, () => {
    console.log(`server running in ${_env} mode on port ${port}`);
})