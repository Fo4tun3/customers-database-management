const env = require("dotenv").config();
const express = require('express');
const app = express();

const morgan = require("morgan");
app.use(morgan("tiny"));

const cors = require("cors");

const registrationsRoutes = require("./routes/auth/register");
const loginRoutes = require("./routes/auth/login");


app.use(express.json());


app.use("/api/v1/auth", cors(), registrationsRoutes);
app.use("/api/v1/auth", cors(), loginRoutes);


app.use(cors());

app.use(express.static('frontend'));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
    res.send("Started running");
})

app.use((req, res, next) =>  {
    let err = new Error("Not Found" );
    err.status = 404;
    return next(err);
});

if (app.get("env") === "development" ) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: err
        });
    });
}

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
