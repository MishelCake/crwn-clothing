import React from "react";
import StripeCheckout from "react-stripe-checkout";


const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JrVgYDOdPUhslbUIaV3zj8dWMzoaj7eYnSltxPF8c8VlVW2dIMky7kzuUh8F097VRIP1TnRuMkOlxZ65sBjLbJg00mdUNVsZu";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="http://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
