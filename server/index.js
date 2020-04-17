const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const app = express();
const http = require('http')


// PORT
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Import Router
const router = require('./router')
const simpleRouter = require('./routes/simple')
const mediumRouter = require('./routes/medium')

//Middleware 
app.use(express.json())
app.use(cors());
app.use(fileUpload());

app.use(router)
app.use('/simple', simpleRouter)
app.use('/medium', mediumRouter)


server.listen(PORT, () => {
    console.log('Server up and running')
})
