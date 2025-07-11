import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useSecureApi from "../../Hooks/useSecureApi";

const petCategories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
];

const AddPet = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const apiPromise = useSecureApi();
  const {user}=useAuth()

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
      <h1 className="text-center text-2xl font-bold mb-4">Add Pet</h1>

      <Formik
        initialValues={{
          name: "",
          age: "",
          category: null,
          location: "",
          shortDescription: "",
          longDescription: "",
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
        onSubmit={async (values, { resetForm }) => {
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
            email:user.email
          };

          try {
            setLoading(true);
              if (petData.email) {
            setImageError("Pet added user is required");
            return;
          }
            const res = await apiPromise.post("/pets", petData)
            console.log(res.data);

            if (res.data.insertedId ) {
             alert("Pet added successfully!");
              resetForm();
              setImageUrl("");
              setImageError("");
            } else {
              toast.error("Failed to add pet.");
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
            {/* Pet Image */}
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
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
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
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
              )}
            </div>

            {/* Pet Category */}
            <div>
              <Label className="mb-1 block">Pet Category</Label>
              <Select
                options={petCategories}
                value={formik.values.category}
                onChange={(option) => formik.setFieldValue("category", option)}
                onBlur={() => formik.setFieldTouched("category", true)}
                placeholder="Select a category"
              />
              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label>Pickup Location</Label>
              <Input
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location && (
                <p className="text-red-500 text-sm">{formik.errors.location}</p>
              )}
            </div>

            {/* Short Description */}
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

            {/* Long Description */}
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
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPet;
