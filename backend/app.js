require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

app.use(require('./middleware/handleErrors'));

app.listen(5000, () => console.log('Server is listening at 5000'));