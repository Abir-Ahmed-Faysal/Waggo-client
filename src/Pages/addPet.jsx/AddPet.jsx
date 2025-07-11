import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import axios from "axios";
import useApi from "../../Hooks/useApi";
import { toast } from "react-toastify";
import { data } from "react-router";

const petCategories = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "rabbit", label: "Rabbit" },
];

const AddPet = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const apiPromise = useApi();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBBKEY}`,
        formData
      );
      setImageUrl(res.data.data.url);
      setLoading(false);
    } catch (error) {
      setImageError("Image upload failed, please try again.");
      console.error("Image Upload Failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 shadow rounded bg-white">
      <h1 className="text-center text-2xl font-bold mb-4">Add Pet</h1>

      <Formik
        initialValues={{
          pet_name: "",
          pet_age: "",
          pet_category: null,
          pet_location: "",
          short_description: "",
          long_description: "",
        }}
        validationSchema={Yup.object({
          pet_name: Yup.string().required("Pet name is required"),
          pet_age: Yup.string().required("Pet age is required"),
          pet_category: Yup.object()
            .nullable()
            .required("Pet category is required"),
          pet_location: Yup.string().required("Pickup location is required"),
          short_description: Yup.string().required(
            "Short description is required"
          ),
          long_description: Yup.string().required(
            "Long description is required"
          ),
        })}
        onSubmit={async (values, { resetForm }) => {
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // if (!imageUrl) {
          //   setImageError("Pet image is required");
          //   return;
          // }

          const petData = {
            ...values,
            pet_category: values.pet_category.value,
            image: imageUrl,
            createdAt: new Date().toISOString(),
            adopted: false,
          };
          console.log("Submitting Pet:", petData);

          try {
            setLoading(true);
            const res = await apiPromise.post("/pets", petData);
            console.log(res.data);

            if (res.data.insertedId < 0) {
              toast.success("success");
              setLoading(false);
              resetForm();
              setImageUrl("");
            }
          } catch (error) {
            setImageError("Image upload failed, please try again.");
            console.error("Image Upload Failed:", error);
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

            {/* Pet Name */}
            <div>
              <Label>Pet Name</Label>
              <Input
                name="pet_name"
                value={formik.values.pet_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pet_name && formik.errors.pet_name && (
                <p className="text-red-500 text-sm">{formik.errors.pet_name}</p>
              )}
            </div>

            {/* Pet Age */}
            <div>
              <Label>Pet Age</Label>
              <Input
                name="pet_age"
                value={formik.values.pet_age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pet_age && formik.errors.pet_age && (
                <p className="text-red-500 text-sm">{formik.errors.pet_age}</p>
              )}
            </div>

            {/* Pet Category */}
            <div>
              <Label className="mb-1 block">Pet Category</Label>
              <Select
                options={petCategories}
                value={formik.values.pet_category}
                onChange={(option) =>
                  formik.setFieldValue("pet_category", option)
                }
                onBlur={() => formik.setFieldTouched("pet_category", true)}
                placeholder="Select a category"
                classNamePrefix="react-select"
              />
              {formik.touched.pet_category && formik.errors.pet_category && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.pet_category}
                </p>
              )}
            </div>

            {/* Pickup Location */}
            <div>
              <Label>Pickup Location</Label>
              <Input
                name="pet_location"
                value={formik.values.pet_location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pet_location && formik.errors.pet_location && (
                <p className="text-red-500 text-sm">
                  {formik.errors.pet_location}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <Label>Short Description</Label>
              <Input
                name="short_description"
                value={formik.values.short_description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.short_description &&
                formik.errors.short_description && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.short_description}
                  </p>
                )}
            </div>

            {/* Long Description */}
            <div>
              <Label>Long Description</Label>
              <textarea
                name="long_description"
                value={formik.values.long_description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded"
              />
              {formik.touched.long_description &&
                formik.errors.long_description && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.long_description}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "loading" : "Submit"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPet;
