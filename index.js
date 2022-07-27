const express = require("express");

const fileUpload = require("express-fileupload");

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api", require("./routes/upload"));

app.get("/", (req, res) => {
  res.json("Hello");
});

app.listen(5000, () => console.log(`Server is running`));
