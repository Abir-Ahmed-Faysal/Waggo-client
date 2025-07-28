import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useSecureApi from "../../../Hooks/useSecureApi";
import { toast } from "react-toastify";

const DonationCampaignForm = () => {
  const {user}=useAuth()
  const api=useSecureApi()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

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

  const onSubmit = async (data) => {
    if (!imageUrl) {
      setImageError("Please upload a pet image first.");
      return;
    }

    const donationData = {
      petName: data.petName,
      petImage: imageUrl,
      maxDonation: parseFloat(data.maxDonation),
      donatedAmount: 0,
      lastDate: data.lastDate,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      email:user.email,

    };


    
  try {
  const res = await api.post("/donation", donationData);
  
  if (res.data?.insertedId) {
    reset();
    setImageUrl("");
    alert("Donation campaign created successfully!");
    toast.success("Success");
  } else {
    toast.error("Failed to create donation campaign.");
  }

} catch (error) {
  console.error("Error adding campaign:", error);
  toast.error("Something went wrong while creating campaign.");
}

  };

  return (
    <div className="max-w-2xl mx-auto p-4 overflow-scroll   shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Donation Campaign</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  h-[400px]  overflow-auto pb-10">
        {/* Pet Name */}
        <div>
          <label className="block font-medium">Pet Name</label>
          <input
            type="text"
            {...register("petName", { required: "Pet name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.petName && (
            <p className="text-red-500">{errors.petName.message}</p>
          )}
        </div>

        {/* Pet Picture */}
        <div>
          <label className="block font-medium">Pet Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
          {imageError && <p className="text-red-500">{imageError}</p>}
          {loading && <p className="text-blue-500">Uploading image...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 w-40 h-32 object-cover rounded" />
          )}
        </div>

       
        <div>
          <label className="block font-medium">Maximum Donation Amount</label>
          <input
            type="number"
            {...register("maxDonation", {
              required: "Maximum donation is required",
              min: 1,
            })}
            className="w-full border p-2 rounded"
          />
          {errors.maxDonation && (
            <p className="text-red-500">{errors.maxDonation.message}</p>
          )}
        </div>

        {/* Last Date */}
        <div>
          <label className="block font-medium">Last Date of Donation</label>
          <input
            type="date"
            {...register("lastDate", { required: "Last date is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.lastDate && (
            <p className="text-red-500">{errors.lastDate.message}</p>
          )}
        </div>
        
        <div>
          <label className="block font-medium">Short Description</label>
          <input
            type="text"
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.shortDescription && (
            <p className="text-red-500">{errors.shortDescription.message}</p>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label className="block font-medium">Long Description</label>
          <textarea
            rows={4}
            {...register("longDescription", {
              required: "Long description is required",
            })}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.longDescription && (
            <p className="text-red-500">{errors.longDescription.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >{loading?'Creating':'Crete Campaign'}
          
        </button>
      </form>
      <div className="pb-10"></div>
    </div>
  );
};

export default DonationCampaignForm;
