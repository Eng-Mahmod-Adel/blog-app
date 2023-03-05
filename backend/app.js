const express = require('express');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require('multer')
const path = require('path')
const cors = require('cors')
require('dotenv').config();


const app = express();
const port = 2200;

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL)
.then(result => {
  console.log(`DB is Ready`)
}).catch(err => {
  console.log(err);
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
