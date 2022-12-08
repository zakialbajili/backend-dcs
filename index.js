const express = require('express')
//const FileUpload = require('express-fileupload')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(FileUpload())

routes(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})