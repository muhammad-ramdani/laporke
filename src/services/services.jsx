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
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

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


  export const getImage = async () => {
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
