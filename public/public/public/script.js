async function register() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const plan = document.getElementById("plan").value;

  const res = await fetch("/register-member", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, plan })
  });

  const data = await res.json();
  alert(data.message);
}

async function pay() {
  const phone = document.getElementById("mpesaPhone").value;
  const amount = document.getElementById("amount").value;

  const res = await fetch("/stkpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, amount })
  });

  const data = await res.json();
  alert("STK Push Sent to Phone");
}
