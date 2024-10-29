export const Host = import.meta.env.VITE_BACKEND_API;

const api = {
  createUser: "/create-user",
  getUsers: "/get-users",
  deleteUser: "/delete-user",
  updateUser: "/update-user",
  getLocations: "/get-locations",
} as const;

export default api;
