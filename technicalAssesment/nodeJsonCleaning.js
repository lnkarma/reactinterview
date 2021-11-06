const https = require("https");
https.get("https://coderbyte.com/api/challenges/json/json-cleaning", (resp) => {
  var data = "";
  resp.on("data", (chunk) => {
    data += chunk;
  });

  resp.on("end", () => {
    if (resp.statusCode === 200) {
      data = JSON.parse(data);
    }
    const cleanedData = cleanObj(data);

    console.log(JSON.stringify(cleanedData));
  });
});

const cleanObj = (obj) => {
  const valuesToDiscard = ["", "N/A", "-"];

  if (typeof obj !== "object") return obj;

  const newObj = Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => [key, cleanObj(value)])
      .filter(([key, value]) => {
        return !valuesToDiscard.includes(value);
      })
  );

  return Array.isArray(obj) ? Object.values(newObj) : newObj;
};
