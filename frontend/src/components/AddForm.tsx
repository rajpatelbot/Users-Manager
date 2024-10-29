import { useForm, SubmitHandler } from "react-hook-form";
import useFetch from "../hook/useFetch";
import api from "../config/api";
import { FormValues, LocationDataResponse } from "./types";
import { useContext, useEffect, useMemo, useState } from "react";
import { dataService } from "../config/dataService";
import { IResponse } from "../helper/interface";
import toast from "react-hot-toast";
import { handleCatchResponse } from "../helper/helper";
import { AxiosError } from "axios";
import Loader from "./Loader";
import { Context } from "../context/provider";

const initialValues: FormValues = {
  name: "",
  mobile: "",
  stateId: "",
  cityId: "",
};

const AddForm = ({ fetchApi }: { fetchApi: (updatedUrl?: string, loading?: boolean) => void }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(Context);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  const { res: locations } = useFetch<LocationDataResponse[]>(`${api.getLocations}`);

  const selectedStateId = watch("stateId");

  useEffect(() => {
    if (user) {
      setValue("name", user.name, { shouldValidate: true, shouldTouch: true });
      setValue("stateId", user.state._id, { shouldValidate: true, shouldTouch: true });
      setValue("mobile", user.mobile, { shouldValidate: true, shouldTouch: true });
      if (selectedStateId) {
        setValue("cityId", user.state.city._id, { shouldValidate: true, shouldTouch: true });
      }
    }
  }, [user, selectedStateId]);

  const cities = useMemo(() => {
    if (locations && locations?.data.length > 0 && selectedStateId) {
      return locations.data.find((location) => location._id === selectedStateId)?.cities || [];
    }
    return [];
  }, [locations, selectedStateId]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      const response = await dataService.post(api.createUser, data);
      const res: Required<IResponse<{}>> = response.data;

      if (res.success) {
        toast.success(res.message);
        fetchApi(`${api.getUsers}`);
        setValue("name", "");
        setValue("mobile", "");
        setValue("stateId", "");
        setValue("cityId", "");
      } else {
        toast.error(res.errors);
      }
    } catch (error) {
      handleCatchResponse(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registration Form</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
          <select
            {...register("stateId", { required: "State is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option>Select a state</option>
            {locations?.data?.map((lc) => (
              <option value={lc._id}>{lc.state}</option>
            ))}
          </select>
          {errors.stateId && <p className="text-red-500 text-sm">{errors.stateId.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
          <select
            {...register("cityId", { required: "City is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            disabled={!selectedStateId}
          >
            <option>Select a city</option>
            {cities?.map((city) => (
              <option value={city._id}>{city.name}</option>
            ))}
          </select>
          {errors.cityId && <p className="text-red-500 text-sm">{errors.cityId.message}</p>}
        </div>

        <button
          className="w-full h-12 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
          disabled={!isValid}
        >
          {!loading ? "Register" : <Loader />}
        </button>
      </form>
    </div>
  );
};

export default AddForm;
