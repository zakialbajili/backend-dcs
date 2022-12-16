const express = require('express')
// const FileUpload = require('express-fileupload')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(FileUpload())

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Welcome to Backend SI DCS'
    })
})

routes(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})