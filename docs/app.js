const fs = require("fs");

fs.readFile("./wordlist.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
  /*   const lines = data.split("n");
  for (const line of lines) {
    console.log(line);
  } */
});

const content = "something interesting";

fs.writeFile("./test.txt", content, (err) => {
  if (err) {
    console.err;
    return;
  }
});
