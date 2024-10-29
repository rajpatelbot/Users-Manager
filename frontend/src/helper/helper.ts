import { AxiosError } from "axios";
import { UNAUTHORIZE_STATUS_CODE } from "./constant";
import toast from "react-hot-toast";

export const handleCatchResponse = (error: AxiosError, setErrMessage?: any) => {
  const message = "Something is wrong please try again!";
  for (const key in error) {
    if (key === "request") {
      const responseMessage = JSON.parse(error[key].response);
      setErrMessage
        ? setErrMessage({ message: responseMessage.message, severity: "error" })
        : toast.error(responseMessage.errors);
      return;
    }
  }
  setErrMessage ? setErrMessage({ message, severity: "error" }) : toast.error(message);
};

export const handleErrorForFetch = async (
  error: AxiosError,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  let message = "Something went wrong!";
  for (const key in error) {
    if (key === "request") {
      if (error[key].status === UNAUTHORIZE_STATUS_CODE) {
        window.location.reload();
      }
      const responseMessage = await JSON.parse(JSON.stringify(error[key].response));
      message = responseMessage.message ?? "Something went wrong!";
    }
  }
  setError(message);
};
