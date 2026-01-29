import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticket.routes.js';
import sequelize from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', ticketRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
