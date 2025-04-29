const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const menuRoutes = require('./routes/menuRoutes');
app.use('/', menuRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Menu service running on port ${PORT}`));
