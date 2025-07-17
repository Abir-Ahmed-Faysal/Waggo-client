import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckoutForm from "../Payment/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../components/Spinner";
import useApi from "../../Hooks/useApi";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const DonationCardDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const apiPromise = useApi();
  const navigate = useNavigate();

  const [inputAmount, setInputAmount] = useState("");
  const [amount, setAmount] = useState(null);
  const [open, setOpen] = useState(false); // modal state

  const {
    isPending,
    error,
    data: donationDataList = [],
    refetch,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      try {
        const res = await apiPromise(`/donation/${id}`);
        return res.data || [];
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch donations.");
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  const {
    _id,
    petImage,
    petName,
    donatedAmount,
    maxDonation,
    status,
    lastDate,

    createdAt,
  } = donationDataList;

  const donatedValue = parseFloat(donatedAmount);
  const maxDonationNumber = parseFloat(maxDonation);
  const remainingDonation = maxDonationNumber - donatedValue;

  const handleClick = () => {
    const today = new Date();
    const lastDateLimit = new Date(lastDate);
    console.log(today, lastDateLimit);

    if (today > lastDateLimit) {
      toast.warn("Donation time expired");
      return;
    }
    const parsedAmount = parseFloat(inputAmount);

    if (
      isNaN(parsedAmount) ||
      parsedAmount < 1 ||
      parsedAmount > remainingDonation
    ) {
      setAmount(null);
      toast.error(`Enter valid amount between 1 and ${remainingDonation}`);
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

  console.log(donationDataList);

  return (
    <div className="max-w-xl mx-auto my-10 p-6 rounded-2xl shadow-lg bg-base-100">
      <img
        src={petImage}
        alt={petName}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-3xl font-bold mb-2 text-primary">{petName}</h2>
      <p className="text-lg mb-2">
        Donated Amount:{" "}
        <span className="font-semibold text-success">৳{donatedValue}</span>
      </p>
      <p className="text-lg mb-2">
        Maximum Donation Goal:{" "}
        <span className="font-semibold text-warning">৳{maxDonationNumber}</span>
      </p>
      <p className="text-lg mb-2">
        Remaining Donation Possible:{" "}
        <span className="font-semibold text-info">৳{remainingDonation}</span>
      </p>
      <p className="text-sm text-gray-500">
        Created At: {new Date(createdAt).toLocaleString()}
      </p>

      {!status && (
        <p className="text-red-500 mt-4">This donation is not available</p>
      )}

      {status && (
        <div className="mt-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full"
                onClick={() => {
                  if (!user || !user.email) {
                    toast.warn("Please log in first");
                    navigate("/login");
                  }
                }}
              >
                Donate Now
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Donation Amount</DialogTitle>
              </DialogHeader>

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

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleClick}>Proceed to Payment</Button>
              </div>

              {amount && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    _id={_id}
                    refetch={() => {
                      refetch();
                      setOpen(false); // close modal after payment
                      setInputAmount("");
                      setAmount(null);
                    }}
                    amount={amount}
                  />
                </Elements>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default DonationCardDetails;
