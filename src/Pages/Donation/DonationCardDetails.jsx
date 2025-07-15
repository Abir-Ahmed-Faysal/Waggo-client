import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CheckoutForm from '../Payment/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const DonationCardDetails = () => {
   
  
  const donationDataList = useLoaderData();
  const { _id, petImage, petName, donatedAmount, maxDonation, createdAt } = donationDataList;

  const donatedValue = parseFloat(donatedAmount);
  const maxDonationNumber = parseFloat(maxDonation);
  const remainingDonation = maxDonationNumber - donatedValue;

  const [inputAmount, setInputAmount] = useState("");
  const [amount, setAmount] = useState(null);

  const handleClick = () => {
    const parsedAmount = parseFloat(inputAmount);

    if (isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > remainingDonation) {
      setAmount(null);
      alert(`Please enter a valid amount between 1 and ${remainingDonation}`);
      return;
    }

    setAmount(parsedAmount);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setInputAmount("");
      setAmount(null);
      return;
    }

    const numericValue = parseFloat(value);

    if (numericValue > remainingDonation) {
      setInputAmount(remainingDonation.toString());
    } else if (numericValue < 1) {
      setInputAmount("");
    } else {
      setInputAmount(value);
    }

    setAmount(null);
  };

  const isButtonDisabled = () => {
    const val = parseFloat(inputAmount);
    return isNaN(val) || val < 1 || val > remainingDonation;
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 rounded-2xl shadow-lg bg-base-100">
      <img
        src={petImage}
        alt={petName}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-3xl font-bold mb-2 text-primary">{petName}</h2>
      <p className="text-lg mb-2">
        Donated Amount: <span className="font-semibold text-success">৳{donatedValue}</span>
      </p>
      <p className="text-lg mb-2">
        Maximum Donation Goal: <span className="font-semibold text-warning">৳{maxDonationNumber}</span>
      </p>
      <p className="text-lg mb-2">
        Remaining Donation Possible: <span className="font-semibold text-info">৳{remainingDonation}</span>
      </p>
      <p className="text-sm text-gray-500">Created At: {new Date(createdAt).toLocaleString()}</p>

      <div className="mt-6 space-y-4">
        <label htmlFor="amount" className="block font-semibold mb-1">Amount of Donation (৳)</label>

        <Input
          id="amount"
          type="number"
          placeholder="Enter donation amount"
          value={inputAmount}
          onChange={handleInputChange}
          min={1}
          max={remainingDonation}
          required
        />

        <Button
          onClick={handleClick}
          disabled={isButtonDisabled()}
          className="w-full mt-2"
        >
          Donate Now
        </Button>

        {amount && (
          <Elements stripe={stripePromise}>
            <CheckoutForm _id={_id} amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default DonationCardDetails;
