// Auth Service
import axios from "axios";
import { toast } from "react-toastify";

// Buat instance Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});


// Tambahkan interceptor untuk menangani respons
api.interceptors.response.use(
    (response) => {
        // Jika respons sukses, kembalikan data
        return response;
    },
    (error) => {
        // Jika respons gagal, cek apakah statusnya 401
        if (error.response && error.response.status === 401) {
            // Token sudah kadaluwarsa atau tidak valid
            toast.error("Sesi Anda telah berakhir. Silakan login kembali.");

            // Hapus token dari localStorage
            localStorage.removeItem("token");

            // Arahkan pengguna ke halaman login
            window.location.href = "/login";
        }

        // Lempar error agar bisa ditangani lebih lanjut
        return Promise.reject(error);
    }
);



export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      username,
      password,
    });

    if (response.data && response.data.access_token) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: "Login gagal, token tidak ditemukan.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Kesalahan server, silakan coba lagi.",
      };
    }
    return {
      success: false,
      message: "Terjadi kesalahan jaringan.",
    };
  }
};



export const logOut = async () => {
    try {
        const response = await api.post("/auth/logout", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Logout failed");
    }
};


export const getProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal memuat data profil");
    }
};


export const changePassword = async (old_password, new_password) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/change-password`,
            {
                old_password,
                new_password,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Gagal mengubah kata sandi"
        );
    }
};


export const getChartData = async () => {
    try {
        const response = await api.get("/laporan/get-chart");
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal mengambil data chart");
    }
};


export const getLaporan = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/laporan/get-all`);
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal memuat data laporan");
    }
};


export const deleteLaporan = async (id) => {
    try {

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token tidak ditemukan');
        }


        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/laporan/delete`, {
            data: { id },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting laporan:', error);
        throw error;
    }
};


// Public
export const laporPengaduan = async (data) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/laporan/create`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error saat mengirim laporan:", error);
        throw error;
    }
};


export const daftarAduan = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/laporan/get-all`);
        toast.success('Daftar aduan berhasil dimuat!');
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'Gagal memuat daftar aduan'}`);
            } else if (error.request) {
                toast.error('Error: Tidak ada respons dari server. Periksa koneksi Anda.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        } else {
            toast.error(`Error: ${error.message}`);
        }
        console.error(error);
        throw error;
    }
};


export const updateLaporanStatus = async (id, status) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Error: Token autentikasi tidak ditemukan. Silakan login kembali.");
            throw new Error("Token tidak ditemukan");
        }

        const response = await axios.put(
            `${import.meta.env.VITE_BASE_URL}/laporan/update-status`,
            { id, status }, // Body permintaan
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Jika permintaan berhasil
        toast.success(`Status laporan berhasil diperbarui.`);
        return response.data;
    } catch (error) {
        // Penanganan berbagai error
        if (error.response) {
            // Error dari server
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.message || "Terjadi kesalahan pada server.";

            switch (statusCode) {
                case 400:
                    toast.error(`Bad Request: ${errorMessage}`);
                    break;
                case 401:
                    toast.error("Unauthorized: Token autentikasi tidak valid atau telah kedaluwarsa. Silakan login kembali.");
                    break;
                case 403:
                    toast.error("Forbidden: Anda tidak memiliki izin untuk melakukan aksi ini.");
                    break;
                case 404:
                    toast.error("Not Found: Laporan tidak ditemukan atau endpoint tidak tersedia.");
                    break;
                case 500:
                    toast.error("Internal Server Error: Terjadi kesalahan pada server. Silakan coba lagi nanti.");
                    break;
                default:
                    toast.error(`Error ${statusCode}: ${errorMessage}`);
            }
        } else if (error.request) {
            // Error dari jaringan
            toast.error("Network Error: Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
        } else {
            // Error lainnya
            toast.error(`Error: ${error.message || "Terjadi kesalahan yang tidak diketahui."}`);
        }

        // Lempar error untuk penanganan lebih lanjut di komponen pemanggil
        throw error;
    }
};
