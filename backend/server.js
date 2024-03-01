import express from 'express';
import dotenve from 'dotenv';

const app = express()
dotenve.config();
const PORT = process.env.PORT || 8000;


app.get('/', (req, res) => {
// home page
res.send('Hello World!');

});


app.listen(PORT, () => {  
    console.log(`Example app listening on port http://localhost:${PORT}`);
});