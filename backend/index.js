const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/stock", require("./routes/stockRoutes"));
// app.use("/auth", require("./routes/authentication"));
app.listen(5000, () => {
  console.log("server started at port 5000");
});
