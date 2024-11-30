import axios from "axios";
import { toast } from "react-toastify";

export const servicesAwal = async (callback) => {
    try {
        const response = await axios.get(`${import.meta.env.URL_ENDPOINT}/`);
        callback(response.data);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return;
        }
        toast.error(error.message);
    }
};
