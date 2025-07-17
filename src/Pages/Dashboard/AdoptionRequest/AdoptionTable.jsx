import React from "react";
import Swal from "sweetalert2";

const AdoptionTable = ({ data, api, user, refetch }) => {
  const handleClick = (req) => {
    if (req.status !== false) return;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You can either confirm or delete this request.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Delete",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await api.patch(
              `/adoption?id=${req._id}&email=${user.email}`,
              { status: true, petId: req.petId }
            );
            if (res.data.modifiedCount > 0) {
              refetch();
              swalWithBootstrapButtons.fire(
                "Confirmed!",
                "The adoption request has been confirmed.",
                "success"
              );
            }
          } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to confirm the request", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          try {
            const res = await api.patch(
              `/adoption?id=${req._id}&email=${user.email}`,
              { status: "rejected" }
            );

            if (res.data.deletedCount > 0) {
              refetch();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "The adoption request has been deleted.",
                "error"
              );
            }
          } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to delete the request", "error");
          }
        }
      });
  };

  return (
    <tbody>
      {data.map((req) => (
        <tr key={req._id}>
          <td>
            <div className="flex items-center gap-2">
              <img
                src={req.petImage}
                alt={req.petName}
                className="w-12 h-12 object-cover rounded"
              />
              <span>{req.petName}</span>
            </div>
          </td>
          <td>
            <div>
              <p className="font-semibold">{req.userName}</p>
              <p className="text-xs text-gray-500">{req.email}</p>
            </div>
          </td>
          <td>{req.phone}</td>
          <td>{req.address}</td>
          <td
            onClick={() => handleClick(req)}
            className={`capitalize font-medium cursor-pointer ${
              !req.status
                ? "text-blue-500 hover:underline"
                : "text-green-500 cursor-not-allowed"
            }`}
          >
            {req?.status ? "confirmed" : "pending"}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AdoptionTable;
