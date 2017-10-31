const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
//middleware
const checkForSession = require('./middlewares/checkForSession');
//controllers
const auth_controller = require('./controllers/auth_controller');
const swag_controller = require('./controllers/swag_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controllers');

//
const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: 'ghost',
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../public/build`));

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);
//cart controller endpoints
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);
//search section
app.get('/api/search', search_controller.search);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
