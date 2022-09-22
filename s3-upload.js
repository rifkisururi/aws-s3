import express from "express" 
import aws from "aws-sdk" 
import multer from "multer" 
// import uuid from "uuid/v4" 
import multerS3 from "multer-s3" 
import path from "path" 

const app = express();

const s3 = new aws.S3();
//  Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
var params = {Bucket: 'latihans3bucket', Key: 'latihan/avatar-1663746902875-774373886-rsz_untitled.jpg'};
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'latihans3bucket',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const ext = path.extname(file.originalname);
            cb(null, `latihan/${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        }
    })
});

app.use(express.static('public'))

app.post('/uploadSinggle', upload.single('avatar'), (req, res)=> {
    return res.json({status:'Ok'})
})

app.post('/uploadMultiple', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});

app.get('/gets3', (req, res) => {
    // res.send('gagal');
    s3.getObject(params, function(err, data) {
        if (err){
          console.log(err, err.stack); // an error occurred
          res.send('gagal')
        } 
        else{
            // successful response
          console.log(data);
        //   console.log(data.Body.toString('base64'));
          res.send(data.Body.toString('base64'))
        }
      });
})

app.listen(3001);