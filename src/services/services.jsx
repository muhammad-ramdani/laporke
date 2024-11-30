import axios from "axios";
import { toast } from "react-toastify";

export const loginAdmin = async (username, password, callback) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
            username,
            password
        });


        if (response.data && response.data.access_token) {
            localStorage.setItem("token", response.data.access_token);
            toast.success("Login successful!");
        }

        callback(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return;
        }
        toast.error(error.message);
    }
};
