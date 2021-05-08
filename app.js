require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express")
const {db} = require('./config/db')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
    limit: "100mb"
  })
)

app.use(express.json())

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db");
});

// Set the Route to Department
const departmentRoute = require("./routes/department")
app.use("/api/department", departmentRoute)

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});