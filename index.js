import express from "express" 
import multer from "multer" 
// import uuid from "uuid"
// uuid = uuid.v4
// const uuid = require('uuid').v4

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadFile')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname )
    }
  })

const upload = multer({storage: storage})

const app = express();
app.use(express.static('public'))

app.post('/uploadSinggle', upload.single('avatar'), (req, res)=> {
    return res.json({status:'Ok'})
})

app.post('/uploadMultiple', upload.array('avatar'), (req, res) => {
  return res.json({ status: 'OK', uploaded: req.files.length });
});






app.listen(3001,() => console.log('App is listening ... '))