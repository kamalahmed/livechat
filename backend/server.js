import express from 'express';
import dotenve from 'dotenv';
import authRoutes from './routes/auth.routes.js';
const app = express()
dotenve.config();
const PORT = process.env.PORT || 8000;


app.get('/', (req, res) => {
// home page
res.send('Hello World!');

});


app.use('/api/auth', authRoutes);






app.listen(PORT, () => {  
    console.log(`Example app listening on port http://localhost:${PORT}`);
});