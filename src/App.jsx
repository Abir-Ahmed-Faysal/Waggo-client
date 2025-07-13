import React, { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "lucide-react";

import useSecureApi from "./Hooks/useSecureApi";
import { useNavigate } from "react-router";

const columnHelper = createColumnHelper();

export default function APP({
  mockData,
  refetch,
  order,
  sortBy,
  setSortBy,
  setOrder,
  email,
}) {
  console.log(email);

  const data = useMemo(() => mockData, [mockData]);

  const api = useSecureApi();
  const navigate = useNavigate();

  const handleSort = (name) => {
    setSortBy(name);
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("index", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center cursor-pointer">
            <User className="mr-2" size={16} /> Index{" "}
            <span onClick={() => handleSort("index")}>
              {sortBy === "index" && order === "asc" ? "⬇️" : "⬆️"}
            </span>
          </span>
        ),
      }),
      columnHelper.accessor("image", {
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="h-12 w-12 rounded object-cover"
          />
        ),
        header: () => (
          <span className="flex items-center">
            <User className="mr-2" size={16} /> Image
          </span>
        ),
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center cursor-pointer">
            <User className="mr-2" size={16} /> Name{" "}
            <span onClick={() => handleSort("name")}>
              {sortBy === "name" && order === "asc" ? "⬇️" : "⬆️"}
            </span>
          </span>
        ),
      }),
      columnHelper.accessor("category", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center cursor-pointer">
            <User className="mr-2" size={16} /> Category
            <span onClick={() => handleSort("category")}>
              {sortBy === "category" && order === "asc" ? "⬇️" : "⬆️"}
            </span>
          </span>
        ),
      }),
      columnHelper.accessor("adopted", {
        cell: (info) => {
          const isAdopted = info.getValue();
          const petId = info.row.original._id;
          const adopted = { adopted: true, email };

          const handleAdopt = async () => {
            try {
              const res = await api.patch(`/status/${petId}`, adopted);
              if (res.data.modifiedCount) {
                alert("Pet marked as adopted!");
                refetch();
              } else {
                alert("Failed to update");
              }
            } catch (error) {
              console.error(error);
              alert("Error updating pet");
            }
          };

          return isAdopted ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Adopted
            </span>
          ) : (
            <button
              onClick={handleAdopt}
              className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition"
              aria-label="Mark pet as adopted"
            >
              Mark as Adopted
            </button>
          );
        },
        header: () => <span>Status</span>,
      }),
      columnHelper.display({
        id: "update",
        header: "Update",
        cell: ({ row }) => {
          const id = row.original._id;
          return (
            <button
              onClick={() => navigate(`/dashboard/update-pet/${id}`)}
              className="btn btn-info btn-xs"
              aria-label="Update pet"
            >
              Update
            </button>
          );
        },
      }),
      columnHelper.display({
        id: "delete",
        header: "Delete",
        cell: ({ row }) => {
          const id = row.original._id;

          const handleDelete = async () => {
            try {
              // If email needs to be sent, add as query param or headers
              const res = await api.delete(`/pets?id=${id}&email=${email}`);
              if (res.data.deletedCount === 1) {
                alert("Deleted successfully");
                refetch();
              }
            } catch (error) {
              alert("Error deleting pet");
              console.log(error);
            }
          };

          return (
            <button
              onClick={handleDelete}
              className="btn btn-danger btn-xs"
              aria-label="Delete pet"
            >
              Delete
            </button>
          );
        },
      }),
    ],
    [api, email, navigate, refetch, setSortBy, setOrder]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // You can add initialState to support sort from outside
    // initialState: { sorting: [{ id: sortBy, desc: order === "desc" }] },
  });

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
