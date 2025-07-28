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
import { Editor } from "@tinymce/tinymce-react";

const petCategories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
  { value: "Hamster", label: "Hamster" },
];

const AddPet = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const apiPromise = useSecureApi();
  const { user } = useAuth();
 

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
    <div className="max-w-4xl mx-auto dark:bg-dark   mt-10 p-8 shadow-md rounded-2xl  h-full">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">
        Add a New Pet
      </h1>

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
            category: values.category.value.toLowerCase(),
            image: imageUrl,
            location: values.location,
            shortDescription: values.shortDescription,
            longDescription: values.longDescription,
            createdAt: new Date().toISOString(),
            email: user.email,
          };

          try {
            setLoading(true);
            if (!petData.email) {
              setImageError("Pet added user is required");
              return;
            }

            const res = await apiPromise.post("/pets", petData);
            if (res.data.insertedId) {
              toast.success("Pet added successfully!");
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
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 h-full overflow-auto pb-10"
          >
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
                      className="mt-3 w-40 h-40 object-cover rounded border"
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
                    height: 150,
                    menubar: false,
                    plugins: [
                      "lists link image media table wordcount",
                      "code visualblocks",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | code",
                       skin: "oxide-dark",
    content_css: "dark",
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

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700  font-medium px-6 py-2 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPet;
