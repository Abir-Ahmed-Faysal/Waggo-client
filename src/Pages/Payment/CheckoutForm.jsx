import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useSecureApi from "../../Hooks/useSecureApi";
import "./payment.css";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const CheckoutForm = ({ _id, amount,refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const api = useSecureApi();
  const { user } = useAuth();

  useEffect(() => {
    if (!amount || !_id) return;

    const createPaymentIntent = async () => {
      try {
        const res = await api.post("/createPayment-instance", {
          amount,email:user.email,

          id: _id,
        });

        if (res?.data?.clientSecret) {
          setClientSecret(res?.data?.clientSecret);
        } else {
          setIsError("Failed to get client secret");
        }
      } catch (err) {
        setIsError(err.response.data.message);
        console.error(err);
       
      }
    };

    createPaymentIntent();
  }, [amount, _id, api]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError("");

    if (!stripe || !elements) {
      setIsLoading(false);
      setIsError("");
      return;
    }

    
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setIsLoading(false);
      setIsError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setIsLoading(false);
    }

    // taka kata

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: "unknown",
        },
      },
    });
    // data patch
    if (result?.paymentIntent?.status === "succeeded") {
      const userData = { email: user.email, amount };
      try {
        const res = await api.patch(`/donation-send/${_id}`, userData);

        console.log(res.data.success===true);
        if (res.data.modifiedCount > 0) {
          alert("payment success");
          refetch()
        }
      } catch (error) {
        toast.warn(error.message);
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {isError && <div ><span className="text-red-500">{isError}</span></div>}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        type="submit"
        disabled={!stripe || IsLoading}
      >
        {IsLoading ? "paying..." : `pay ${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
