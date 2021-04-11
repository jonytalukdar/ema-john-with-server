import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitForm from './SplitCardForm';

const stripePromise = loadStripe(
  'pk_test_51IejRfD0bRJfEs6TtIuwOYhg7gnqkkab83AkaDvidJmlHLNYoQWdrZfE4Y3gYPA8s7rbEk79jdAUBgEtynO283gH00Fbu9VLEq'
);

const ProcessPayemnt = () => {
  return (
    <Elements stripe={stripePromise}>
      {/* <SplitForm></SplitForm> */}
      <SimpleCardForm></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayemnt;
