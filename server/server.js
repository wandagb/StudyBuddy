const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flashcardRoutes  = require('./routes/router')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
require('dotenv/config')

//NOTE: Must create a .env with DB_URI and PORT variables

const app = express()

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/api/items', flashcardRoutes)
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB connected!'))
.catch(err => console.log(err))


const port = process.env.PORT || 4000

const server = app.listen(port, () => {
     console.log(`Server starting on port ${port}`) 
});
