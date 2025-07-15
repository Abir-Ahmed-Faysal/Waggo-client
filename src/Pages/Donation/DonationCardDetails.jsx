import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router';
const stripePromise = loadStripe(import.meta.env.VITE_PK);
const DonationCardDetails = () => {
    const donationDataList = useLoaderData();
    const { petImage, petName, donatedAmount, maxDonation, createdAt } = donationDataList;

    return (
        <div className="max-w-xl mx-auto my-10 p-6 rounded-2xl shadow-lg bg-base-100">
            <img
                src={petImage}
                alt={petName}
                className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h2 className="text-3xl font-bold mb-2 text-primary">{petName}</h2>
            <p className="text-lg mb-2">Donated Amount: <span className="font-semibold text-success">৳{donatedAmount}</span></p>
            <p className="text-lg mb-2">Maximum Donation Goal: <span className="font-semibold text-warning">৳{maxDonation}</span></p>
            <p className="text-sm text-gray-500">Created At: {new Date(createdAt).toLocaleString()}</p>
            <div>
                   <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
            </div>
        </div>
    );
};

export default DonationCardDetails;
