import express from 'express';
import paymentsRoutes from './routes/split-payments.js';

// import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(cors())

var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200
  }

// All routes starting with split-payments
app.use('/split-payments', paymentsRoutes);

app.get('/', (req, res) => { res.send('Hello from homepage') })

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));