const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static("public"));

let members = [];

// Register Member
app.post("/register", (req, res) => {
  const { name, phone, clientId } = req.body;

  const member = {
    name,
    phone,
    clientId,
    status: "inactive",
    expiry: null,
    lastPayment: null
  };

  members.push(member);
  res.json({ message: "Member Registered Successfully" });
});

// Record Payment
app.post("/pay", (req, res) => {
  const { clientId, amount } = req.body;

  const member = members.find(m => m.clientId === clientId);

  if (!member) {
    return res.json({ message: "Member not found" });
  }

  const today = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(today.getDate() + 30);

  member.status = "active";
  member.lastPayment = today;
  member.expiry = expiryDate;

  res.json({ message: "Payment Recorded Successfully" });
});

// Get All Members
app.get("/members", (req, res) => {
  res.json(members);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
