const router = require("express").Router();
const fs = require("fs");
const { exec } = require("child_process");

router.post("/upload", (req, res) => {
  try {
    outputfilename = Date.now() + "output.wav";
    if (!req.files) {
      return res.json("No File Uploaded");
    }
    const file = req.files.file;
    if (file.mimetype !== "audio/mpeg" && file.mimetype !== "audio/mp4") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    exec(
      `ffmpeg -i ${file.tempFilePath} -acodec pcm_s16le -ac 1 -ar 16000 C:\test_file\convert\input.wav`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
