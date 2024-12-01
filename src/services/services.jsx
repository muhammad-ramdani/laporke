// Auth Service
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

export const logOut = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/logout`,
            null, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

      
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




// Dashboar admin
export const getChartData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/laporan/get-chart`);
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


// export const laporPengaduan = async (data, id, callback) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/laporan/create`,
//         {
//           name: data.name,
//           title: data.title,
//           description: data.description,
//           photo: data.photo,
//           location: data.location,
//           id: id,  // ID laporan yang disertakan
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'User-Agent': 'insomnia/10.0.0',  // User-Agent bisa disesuaikan
//           }
//         }
//       );

//       if (response.data) {
//         toast.success("Laporan berhasil dimuat!");
//       }

//       callback(response.data);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || error.message);
//         return;
//       }
//       toast.error(error.message);
//     }
//   };


//   export const uploadPhoto = async (photo, id) => {
//     const formData = new FormData();
//     formData.append("photo", photo);
//     formData.append("id", id); // Menggunakan ID dinamis

//     try {
//       const response = await axios.post(
//         "https://laporke-desa-banteran.web.id/laporan/upload-photo",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data; // Mengembalikan data respon, misalnya URL foto
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || "Gagal mengunggah foto";
//       toast.error(`Error: ${message}`);
//       console.error(error);
//       throw error;
//     }
//   };


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
