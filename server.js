const express = require("express");
const cors = require("cors");
const bp = require('body-parser');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var corsOptions = {
    origin: ['http://localhost:8081','http://localhost:3000']
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require("./app/routes/poem.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});