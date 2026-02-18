require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 10000;

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Digitech Fitness Lab Server Running ✅");
});

// MEMBER REGISTRATION API
app.post("/register-member", (req, res) => {
  const { name, phone, plan } = req.body;

  if (!name || !phone || !plan) {
    return res.status(400).json({ message: "All fields required" });
  }

  console.log("New Member:", name, phone, plan);

  res.json({
    success: true,
    message: "Member Registered Successfully"
  });
});

// M-PESA STK PUSH
app.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: process.env.PASSKEY,
        Timestamp: "20250101010101",
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "DigitechFitness",
        TransactionDesc: "Gym Payment"
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "STK Push Failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
