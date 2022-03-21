const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;



app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.krqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {

        await client.connect()
        console.log('db connected');

        const database = client.db('skilline');
        const newsCollection = database.collection('News')
        const testimonialsCollection = database.collection('Testimonials')


        // get api for recommended news
        app.get('/news', async (req, res) => {
            const result = await newsCollection.find({}).toArray()
            res.send(result)
        })
        // get api for  testimonials
        app.get('/testimonials', async (req, res) => {
            const result = await testimonialsCollection.find({}).toArray()
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send("hello from server");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})