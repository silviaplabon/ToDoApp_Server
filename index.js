const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 4200;
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcsxh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ToDoCollection = client.db('ToDoList').collection("ToDoCollection");
  
  app.get('/all_ToDo_List', (req, res) => {
   ToDoCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.delete('/deleteProduct/PopularIngredients/:id', (req, res) => {
    PopularIngredientsCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







