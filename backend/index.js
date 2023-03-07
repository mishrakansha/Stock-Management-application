const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
app.use(express.json());

app.use("/auth", require("./routes/authentication"));
app.listen(3000, () => {
  console.log("server started at port 3000");
});
