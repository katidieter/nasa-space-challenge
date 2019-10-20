const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose
  .connect("mongodb+srv://nasasun:jeOUG0cHXDSwHJZGwisO@nasa-sun-ywqtd.azure.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening for requestes on port 4000');
});
