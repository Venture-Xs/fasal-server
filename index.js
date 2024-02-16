const app = require('express')();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server running !');
})

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
})