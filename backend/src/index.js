const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, swaggerDocs } = require('./swagger');
const authRoutes = require('./routes/authRoutes');

const app = express();
const prisma = new PrismaClient();

const port = 3000;

app.use(cors({
  origin: '*',  
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);

 
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger running on http://localhost:${port}/api-docs`);
  });
}

module.exports = app;  
