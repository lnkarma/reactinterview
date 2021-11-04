const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

https.get("https://coderbyte.com/api/challenges/json/age-counting", (resp) => {
  let data = "";
  resp.on("data", (chunk) => {
    data += chunk;
  });

  resp.on("end", () => {
    if (resp.statusCode === 200) {
      data = JSON.parse(data);
    }
    const splitData = data.data
      .split(", ")
      .map((tuple) => tuple.split("="))
      .reduce((acc, item, index) => {
        if (index % 2 === 0) {
          return [...acc, [item[1]]];
        }
        acc[acc.length - 1].push(item[1]);
        return [...acc];
      }, [])
      .filter((tuple) => parseInt(tuple[1]) === 32)
      .map((tuple) => tuple[0] + "\n")
      .join("");

    var stream = fs.createWriteStream("output.txt");
    stream.write(splitData, function () {
      // Now the data has been written.
      const fileBuffer = fs.readFileSync("output.txt");
      const hashSum = crypto.createHash("sha1");
      hashSum.update(fileBuffer);

      const hex = hashSum.digest("hex");
      console.log(hex);
    });

    stream.end();
  });
});
