import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";
import api from "../config/api";
import { UserResponse, UserTableProps } from "./types";
import { dataService } from "../config/dataService";
import toast from "react-hot-toast";
import { handleCatchResponse } from "../helper/helper";
import { AxiosError } from "axios";
import { IResponse } from "../helper/interface";
import Loader from "./Loader";
import { useContext } from "react";
import { Context } from "../context/provider";

const UserTable = ({ fetchApi, users, loading }: UserTableProps) => {
  const { setUser } = useContext(Context);

  const deleteUser = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dataService.delete(`${api.deleteUser}/${id}`);
          const res: Required<IResponse<{}>> = response.data;

          if (res.success) {
            toast.success(res.message);
            fetchApi();
          } else {
            toast.error(res.errors);
          }
        } catch (error) {
          handleCatchResponse(error as AxiosError);
        }
      }
    });
  };

  const editUser = async (user: UserResponse) => {
    setUser(user);
  };

  if (loading) {
    return <Loader />;
  }

  if (users?.data.length === 0) {
    return null;
  }

  return (
    <div className="w-[80%] m-auto mb-10">
      <table className="table-fixed w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-start font-semibold py-4 border-b-2 pl-4">Name</th>
            <th className="text-start font-semibold py-4 border-b-2 pl-4">Mobile</th>
            <th className="text-start font-semibold py-4 border-b-2 pl-4">State</th>
            <th className="text-start font-semibold py-4 border-b-2 pl-4">City</th>
            <th className="text-start font-semibold py-4 border-b-2 pl-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user) => {
            return (
              <tr className="border-b-[1px] hover:bg-gray-100" key={user._id}>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.mobile}</td>
                <td className="py-2 px-4">{user.state.state}</td>
                <td className="py-2 px-4">{user.state.city.name}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="text-green-500" onClick={() => editUser(user)}>
                    <MdEdit />
                  </button>
                  <button className="text-red-500" onClick={() => deleteUser(user._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
