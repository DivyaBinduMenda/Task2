const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/auth-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'User already exists!' });
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ message: 'Login successful!' });
    } else {
        res.status(400).json({ message: 'Invalid email or password!' });
    }
});

app.listen(5001, () => console.log('Server running on port 5001'));
