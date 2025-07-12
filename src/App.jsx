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

export default function APP({ mockData, refetch,email }) {
  const data =mockData;
  const api=useSecureApi()
  const navigate=useNavigate()

  const columns = [
    columnHelper.accessor("_id", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16}></User>ID
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
          <User className="mr-2" size={16}></User>Image
        </span>
      ),
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16}></User>Name
        </span>
      ),
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16}></User>Category
        </span>
      ),
    }),
    columnHelper.accessor("adopted", {
      cell: (info) => {
        const isAdopted = info.getValue();
        const petId = info.row.original._id;
        const adopted={adopted:true,
          email
        }

        const handleAdopt = async () => {
          try {
            const res = await api.patch(`/status/${petId}`,adopted)
            console.log(res);
            
            if (res.data.modifiedCount
) {
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
          >
            Mark as Adopted
          </button>
        );
      },
      header: () => (
        <span className="flex items-center">
          <div className="mr-2" />
          Status
        </span>
      ),
    }),
columnHelper.display({
  id: "update",
  header: "Update",
  cell: ({ row }) => {
    const id = row.original._id;

    return (
      <button
        onClick={() => navigate(`/update-pet/${id}`)}
        className="btn btn-info btn-xs"
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

    const handleDelete=async(id)=>{
      
      const data={email}
  
      try{

    
const res=await api.delete(`/pets/${id}`,data)
console.log(res.data);
if(res.data.deletedCount===1){
  alert('success')
  refetch()
}}catch(error){
  alert(error)
}
    }

    return (
      <button
        onClick={() => handleDelete(id)}
        className="btn btn-info btn-xs"
      >
        Delete
      </button>
    );
  },
})


  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div>
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
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-sm text-shadow-gray-500"
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
