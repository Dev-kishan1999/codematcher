const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(
  cors({
    allowedHeaders: "*",
    origin: "*",
    methods: "*",
  })
);

app.use(express.json());
app.use(require("./routes/routes"));
app.use(require("./routes/docRoutes"));

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}.`);
});
