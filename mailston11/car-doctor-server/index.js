const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

const app = express()
const cors = require('cors');
// midway 
app.use(express.json())
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.of9yj28.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        

        const serviceCollection = client.db("car").collection('service')
        const bookingCollection = client.db('car').collection('booking')

        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const options = {
                // Include only the `title` and `imdb` fields in the returned document
                projection: { title: 1, price: 1,img: 1, service_id:1, email:1,name:1  },
            };
            const result = await serviceCollection.findOne(query, options);
            res.send(result)
        })

        // booking || checkOUT
        app.get('/bookings', async(req,res)=>{
            console.log(req.query.email)
            let query={}
            if(req.query?.email){
                query={email: req.query.email}
            }
            const result= await bookingCollection.find(query).toArray();
            res.send(result)
        })
        app.post('/booking', async(req,res)=>{
            const book = req.body;
            // console.log('book', book);
            const result = await bookingCollection.insertOne(book);
            res.send(result);
        })

        // update
        app.patch('/bookings/:id', async (req,res)=>{
            const id = req.params.id;
            const filter={_id: new ObjectId(id)}
            const updateBookings= req.body
            console.log(updateBookings);
            const updateDoc = {
                $set: {
                  status:updateBookings.status
                },
              };
              const result= await bookingCollection.updateOne(filter,updateDoc)
              res.send(result);
        })

        // bookings,delete
        app.delete('/bookings/:id', async(req,res)=>{
            const id=req.params.id;
            const query= {_id: new ObjectId(id)}
            const result= await bookingCollection.deleteOne(query)
            res.send(result)

        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) =>
    res.send('Car Doctor server is running'))

app.listen(port, () =>
    console.log(`Car Doctor is running on port ${port}`))