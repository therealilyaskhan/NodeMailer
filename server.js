import path from "path";
import express from "express";
import cors from 'cors'
import nodemailer from 'nodemailer'

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 5000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//req body parser: express.json() returns an express's native middleware function that accepts as argument 'req' , 'res' and 'next' objects, the http req object that it accepts, it parses the body of that and attaches it a body property which is also an object, previously when express did have this middleware natively we had to use body parser middleware function from npm;
app.use(express.json());

// For the cors config below, when in production, "http://localhost:5000" should be "http://foo.com"
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'miknodemailer@gmail.com',
            pass: 'mgdcmywoyaoptydw'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'therealilyaskhan@gmail.com',
        subject: `PORTFOLIO ALTERT: Msg from ${req.body.name} using ${req.body.email}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log(error);
            res.send(error);
        } else {
            console.log('Email sent to: ' + info.response);
            res.send('Success');
        }
    });
});

app.get('/', (req, res)=> {
    res.send('Up and running');
});

app.listen(port, () => console.log(`server at https://localhost:${port}`));
