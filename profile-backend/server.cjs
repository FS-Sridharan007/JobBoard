// server.cjs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.cjs');
const authRoutes = require('./routes/authRoutes.cjs');
const profileRoutes = require('./routes/profileRoutes.cjs');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', profileRoutes);

app.get('/', (req, res) => res.send('Welcome to the Jobboard backend!'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
