import React, { useState } from "react";
import { useLoaderData } from "react-router";
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

const PetDetails = () => {
  const { user, loading } = useAuth();
  const details = useLoaderData();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);

  if (details.length === 0 || loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const {
    _id,
    name,
    category,
    breed,
    age,
    gender,
    longDescription,
    image,
    adopted,
  } = details;

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();

    const adoptionData = {
      petId: _id,
      petName: name,
      petImage: image,
      userName: user.name,
      userEmail: user.email,
      phone,
      address,
    };

    const res = await fetch("https://your-api.com/adoptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adoptionData),
    });

    if (res.ok) {
      alert("Adoption request submitted successfully!");
      setOpen(false);
    } else {
      alert("Failed to submit request.");
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
            <strong>Type:</strong> {category}
          </p>
          <p className="text-lg">
            <strong>Breed:</strong> {breed || "Unknown"}
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
                      <Input value={user.name || "empty"} disabled />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={user.email || "empty"} disabled />
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
