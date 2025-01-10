import axiosInstance from "./common";

export const fetchAllStarlinkData = async () => {
  try {
    const response = await axiosInstance.get("/starlink");
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
