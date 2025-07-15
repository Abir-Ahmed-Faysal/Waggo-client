import React, { useMemo, } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "lucide-react";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSecureApi from "../../../Hooks/useSecureApi";

const columnHelper = createColumnHelper();

export default function DonationTable({
  mockData,
  refetch,
  email,
}) {
  const data = useMemo(() => mockData, [mockData]);
  const api = useSecureApi();
  const navigate = useNavigate();



  const columns = useMemo(
    () => [
      columnHelper.accessor("petName", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center cursor-pointer">
            <User className="mr-2" size={16} /> Pet Name
          </span>
        ),
      }),
      columnHelper.accessor("maxDonation", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center cursor-pointer">
            <User className="mr-2" size={16} /> Max Donation
          </span>
        ),
      }),
      columnHelper.accessor("lastDate", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center cursor-pointer">
            <User className="mr-2" size={16} /> End Date
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        cell: (info) => {
          const status = info.getValue();
          const petId = info.row.original._id;
          const data = { status: !status, email };

          const handleToggleStatus = async () => {
            try {
              const res = await api.patch(`/campaign-status/${petId}`, data);
              if (res.data.modifiedCount) {
                alert("Donation status updated!");
                refetch();
              } else {
                alert("Failed to update");
              }
            } catch (error) {
              console.error(error);
              alert("Error updating status");
            }
          };

          return (
            <button
              onClick={handleToggleStatus}
              className={`btn btn-xs ${
                status ? "btn-success" : "btn-warning"
              }`}
            >
              {status ? "Active" : "Paused"}
            </button>
          );
        },
        header: () => <span>Status</span>,
      }),

      
      columnHelper.display({
        id: "view-donors",
        header: "View Donors",
        cell: ({ row }) => {
          const donors = row.original.donner || [];
          return (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="btn btn-sm btn-info"
              
                >
                  View
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Donor List</DialogTitle>
                </DialogHeader>
                {donors.length === 0 ? (
                  <p className="text-sm text-gray-500">No donors yet.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 max-h-64 overflow-y-auto">
                    {donors.map((donor, index) => (
                      <li key={index}>[{donor.email}=={donor.amount}]</li>
                    ))}
                  </ul>
                )}
              </DialogContent>
            </Dialog>
          );
        },
      }),

      columnHelper.display({
        id: "edit",
        header: "Edit",
        cell: ({ row }) => {
          const id = row.original._id;
          return (
            <button
              onClick={() => navigate(`/dashboard/my-donation/${id}`)}
              className="btn btn-xs btn-primary"
            >
              Edit
            </button>
          );
        },
      }),
    ],
    [api, email, navigate, refetch]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto py-12 px-4">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    scope="col"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50"
                tabIndex={0}
                role="row"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    role="cell"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
