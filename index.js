import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

const usuarios = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  usuarios.push(user);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTenTweets = [];
  if (tweets.length > 0) {
    for (let i = tweets.length - 1; i > tweets.length - 11 && i >= 0; i--) {
      const name = tweets[i].username;
      const user = usuarios.find((item) => item.username === name);
      const body = {
        username: name,
        avatar: user.avatar,
        tweet: tweets[i].tweet,
      };
      lastTenTweets.push(body);
    }
  }
  res.send(lastTenTweets);
});

app.listen(5000, () => {
  console.log("estou no ar");
});
