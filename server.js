import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cards from './dbCards.js';

// app config
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin-1:KYnWplNAWLqJJ35i@cluster0.sv0bb.mongodb.net/tinderdb1?retryWrites=true&w=majority'
// const pass = 'KYnWplNAWLqJJ35i'

// middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
},(err)=>{ 
    if (err) {
        console.log(`db error ${err}`)
    } else {
        console.log('db-connected')
    }
});

// API endpoints
app.get('/', (req,res) => {
    res.status(200).send('this is the 1st endpoint');

});

app.post('/tinder/cards',(req,res) => {
    const dbCard = req.body;

    cards.create(dbCard,(err , data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    });

});

app.get('/tinder/cards',(req,res) => {
    cards.find((err , data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    });
});

// Listener
app.listen(PORT,() => {
    console.log(`listening on localhost on port ${PORT}`);

})