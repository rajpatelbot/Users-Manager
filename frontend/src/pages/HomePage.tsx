import AddUserForm from "../components/AddForm";
import { UserResponse } from "../components/types";
import UserTable from "../components/UserTable";
import api from "../config/api";
import useFetch from "../hook/useFetch";

const HomePage = () => {
  const { res: users, fetchApi, loading } = useFetch<UserResponse[]>(`${api.getUsers}`);

  return (
    <div className="flex justify-center flex-col min-h-screen bg-gray-100">
      <div className="my-10">
        <AddUserForm fetchApi={fetchApi} />
      </div>
      <div className="my-10">
        <UserTable fetchApi={fetchApi} users={users} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
