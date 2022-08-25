import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./CheckoutForm.scss";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LYOZnSED7zxlOa8AeKxrASo8lDN3hHB3MlUnmlJ90mUp6LQw6Y5FRxielPdZYbXe0CqOg7klNprMv0dQcaK3eFd00pcuZRnmI");

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "Rain Attorney" }] }),
    })
      .then((res) => {
        console.log("res:",res)
        return res.json()})
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="page-content d-flex justify-content-center">
    <div className="paymentcontent"> 
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
      </div>
  );
}