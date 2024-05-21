const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

const loginRoutes = require('./routes/login.routes');
const clientesRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const paypalRoutes = require('./routes/payment.routes');

const app = express();

//Port
const port = 3000;

//Middlewire
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Configuración del middleware de sesiones
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
  }));

app.use(loginRoutes);
app.use(clientesRoutes);
app.use(productosRoutes);
app.use(pedidosRoutes);
app.use(paypalRoutes);

app.use((err, req, res, next) =>{
    return res.json({message: err.message});
});

app.listen(port);
console.log(`Server on port ${port}`);