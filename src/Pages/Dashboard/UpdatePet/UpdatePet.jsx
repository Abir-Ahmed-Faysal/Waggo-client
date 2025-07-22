import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import useSecureApi from "../../../Hooks/useSecureApi";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import { Editor } from "@tinymce/tinymce-react";

const petCategories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
];

const UpdatePet = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const apiPromise = useSecureApi();
  const { user } = useAuth();
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["myPet", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      try {
        const res = await apiPromise(`/update?id=${id}&email=${user?.email}`);
        return res.data;
      } catch (error) {
        console.error(error);
        alert("something went wrong");
      }
    },
  });

  useEffect(() => {
    if (data?.image) {
      setImageUrl(data.image);
    }
  }, [data]);

  if (isPending) return <Spinner />;

  if (error) {
    return (
      <p className="text-red-500 text-center">
        Something went wrong: {error.message}
      </p>
    );
  }

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
    <div className="max-w-4xl mx-auto mt-10 overflow-auto p-8 shadow-md rounded-2xl bg-white pb-5 h-full">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">
        Update Pet
      </h1>
      <Formik
        initialValues={{
          name: data.name || "",
          age: data.age || "",
          category:
            petCategories.find((cat) => cat.value === data?.category) || null,
          location: data.location || "",
          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Pet name is required"),
          age: Yup.string().required("Pet age is required"),
          category: Yup.object()
            .nullable()
            .required("Pet category is required"),
          location: Yup.string().required("Pickup location is required"),
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

          const petData = {
            name: values.name,
            age: values.age,
            category: values.category.value,
            image: imageUrl,
            location: values.location,
            shortDescription: values.shortDescription,
            longDescription: values.longDescription,
            createdAt: new Date().toISOString(),
            email: user?.email,
          };

          try {
            setLoading(true);
            if (!petData.email) {
              setImageError("Pet added user is required");
              return;
            }

            const res = await apiPromise.patch(`/status/${data._id}`, petData);
            if (res.data.modifiedCount) {
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
          <form onSubmit={formik.handleSubmit} className="space-y-6 h-full pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
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
                      className="mt-3 w-40 h-40 object-cover rounded  border"
                    />
                  )}
                  {imageError && (
                    <p className="text-red-500 text-sm mt-1">{imageError}</p>
                  )}
                </div>

                <div>
                  <Label>Pet Name</Label>
                  <Input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Pet Age</Label>
                  <Input
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.age && formik.errors.age && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.age}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label>Pet Category</Label>
                  <Select
                    options={petCategories}
                    value={formik.values.category}
                    onChange={(option) =>
                      formik.setFieldValue("category", option)
                    }
                    onBlur={() => formik.setFieldTouched("category", true)}
                    placeholder="Select a category"
                  />
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Pickup Location</Label>
                  <Input
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.location}
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
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.shortDescription}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Long Description */}
            <div>
              <Label>Long Description</Label>
              <div className="border rounded overflow-hidden focus-within:ring-2 ring-blue-500">
                <Editor
                  apiKey={import.meta.env.VITE_TYNEMCE}
                  value={formik.values.longDescription}
                  onEditorChange={(content) =>
                    formik.setFieldValue("longDescription", content)
                  }
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      "lists link image media table wordcount",
                      "code visualblocks",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | code",
                  }}
                />
              </div>
              {formik.touched.longDescription &&
                formik.errors.longDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.longDescription}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePet;
