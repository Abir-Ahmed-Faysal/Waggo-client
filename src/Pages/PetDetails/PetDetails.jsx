import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import useApi from "../../Hooks/useApi";

const PetDetails = () => {
  const { user, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const apiPromise = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isPending,
    error,
    data: details = [],
    refetch,
  } = useQuery({
    queryKey: ["PetDetails", id],
    queryFn: async () => {
      try {
        const res = await apiPromise(`https://waggo.vercel.app/pets/${id}`);
        return res.data || [];
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch donations.");
      }
    },
  });

  if (isPending) {
    return Spinner;
  }
  if (error) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (details.length === 0 || loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const {
    _id,
    name,
    category,
   
    age,
    gender,
    longDescription,
    image,
    adopted,
  } = details;

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email || user) {
      toast.warn("Log in first");
      return navigate("/login");
    }
    if (user.email === details.email) {
      return alert("you can not Adopt your own pet");
    }

    const adoptionData = {
      petId: _id,
      petName: name,
      petImage: image,
      userName: user.displayName,
      email: user.email,
      phone,
      address,
    };

    try {
      const res = await apiPromise.post("/adoption", adoptionData);
      if (res.data.insertedId) {
        setOpen(false);
        refetch();
        toast.success("Adoption request submitted successfully!");
        setPhone("");
        setAddress("");
      }
    } catch (error) {
      console.error("Error submitting adoption request:", error);

      if (error.response && error.response.status === 409) {
        toast.error(
          error.response.data.message ||
            "You've already submitted a request for this pet."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl font-bold">{name}</h2>
          <p className="text-lg">
            <strong>Type :</strong> {category}
          </p>
          <p className="text-lg">
            {/* <strong>Breed:</strong> {breed || "Unknown"} */}
          </p>
          <p className="text-lg">
            <strong>Age:</strong> {age}
          </p>
          <p className="text-lg">
            <strong>Gender:</strong> {gender || "Unknown"}
          </p>
          <p className="text-base mt-2">{longDescription}</p>
          <div className="card-actions justify-end mt-4">
            {!adopted ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="btn btn-primary">Adopt {name}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Adopt {name}</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to request the adoption of {name}.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAdoptSubmit} className="space-y-4 mt-2">
                    <div>
                      <Label>User Name</Label>
                      <Input value={user?.displayName || "empty"} disabled />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={user?.email || "empty"} disabled />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Textarea
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Adoption Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Button className="btn btn-disabled" disabled>
                Already Adopted
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
