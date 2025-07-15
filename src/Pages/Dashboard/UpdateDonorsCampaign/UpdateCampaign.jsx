import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import useSecureApi from "../../../Hooks/useSecureApi";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../../components/Spinner";

const UpdatePet = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const apiPromise = useSecureApi();
  const { user } = useAuth();
  const { id } = useParams();

  const { isPending, error, data,refetch } = useQuery({
    queryKey: ["my-donation-campaign", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      try {
        const res = await apiPromise(
          `/my-donation-id?id=${id}&email=${user.email}`
        );
        return res.data;
      } catch (error) {
        console.error(error);
        alert("something went wrong");
      }
    },
  });

  useEffect(() => {
    if (data?.petImage) {
      setImageUrl(data.petImage);
    }
  }, [data]);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">
        Something went wrong: {error.message}
      </p>
    );
  }
  console.log(data);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setImageError("");
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBBKEY}`,
        formData
      );
      setImageUrl(res.data.data.url);
    } catch (error) {
      setImageError("Image upload failed, please try again.");
      console.error("Image Upload Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 shadow rounded bg-white">
      <h1 className="text-center text-2xl font-bold mb-4">Update Pet</h1>

      <Formik
        initialValues={{
          petName: data.petName || "",
          maxDonation: data.maxDonation || "",
          lastDate: data.lastDate || "",
          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",
        }}
        validationSchema={Yup.object({
          petName: Yup.string().required("Pet name is required"),
          maxDonation: Yup.number()
            .typeError("Max donation must be a number")
            .required("Max donation is required"),
          lastDate: Yup.date().required("Last date is required"),
          shortDescription: Yup.string().required(
            "Short description is required"
          ),
          longDescription: Yup.string().required(
            "Long description is required"
          ),
        })}
        onSubmit={async (values) => {
          if (!imageUrl) {
            setImageError("Pet image is required");
            return;
          }

          const myAdoption = {
            petName: values.petName,
            lastDate: values.lastDate,
            maxDonation: values.maxDonation,
            petImage: imageUrl,
            shortDescription: values.shortDescription,
            longDescription: values.longDescription,
            createdAt: new Date().toISOString(),
            email: user?.email,
          };

          

          try {
            setLoading(true);
            if (!myAdoption.email) {
              setImageError("Pet added user is required");
              return;
            }

            const res = await apiPromise.patch(`/my-campaign-update/${data._id}`, myAdoption);
            if (res.data.modifiedCount) {
              refetch()
              alert("Pet updated successfully!");
            } else {
              toast.error("Failed to update pet.");
            }
          } catch (error) {
            toast.error("Server error. Try again later.");
            console.error("Submit Failed:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label>Pet Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
              {imageError && <span className="text-red-500">{imageError}</span>}
            </div>

            <div>
              <Label>Pet Name</Label>
              <Input
                name="petName"
                value={formik.values.petName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.petName && formik.errors.petName && (
                <p className="text-red-500 text-sm">{formik.errors.petName}</p>
              )}
            </div>

            <div>
              <Label>Last Date</Label>
              <Input
                type="date"
                name="lastDate"
                value={formik.values.lastDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastDate && formik.errors.lastDate && (
                <p className="text-red-500 text-sm">{formik.errors.lastDate}</p>
              )}
            </div>

            <div>
              <Label>Max Donation Amount</Label>
              <Input
                name="maxDonation"
                type="number"
                value={formik.values.maxDonation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.maxDonation && formik.errors.maxDonation && (
                <p className="text-red-500 text-sm">
                  {formik.errors.maxDonation}
                </p>
              )}
            </div>

            <div>
              <Label>Short Description</Label>
              <Input
                name="shortDescription"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.shortDescription &&
                formik.errors.shortDescription && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.shortDescription}
                  </p>
                )}
            </div>

            <div>
              <Label>Long Description</Label>
              <textarea
                name="longDescription"
                value={formik.values.longDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded"
              />
              {formik.touched.longDescription &&
                formik.errors.longDescription && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.longDescription}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePet;
