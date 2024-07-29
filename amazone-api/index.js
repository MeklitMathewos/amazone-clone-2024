
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total);
    if (total > 0) {
      console.log("payment recived ", total);
      // res.send(total);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      console.log(paymentIntent.client_secret);
      res.status(201).send({ clientSecret: paymentIntent.client_secret });
    } else {
      res.status(403).send({
        massage: "total must be greater than 0",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, (err)=>{
if(err) throw err
console.log("Amazon server Running on port:5000, http://localhost:5000")
} )

