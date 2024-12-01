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
          null, // Body kosong karena hanya melakukan logout
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          }
      );

      // Menghapus token dari localStorage setelah logout berhasil
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
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/laporan/get-all`);
      return response.data.data; 
  } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal memuat data laporan");
  }
};



export const deleteLaporan = async (id) => {
  try {
    // Ambil token Bearer dari localStorage
    const token = localStorage.getItem('token'); // Ganti 'token' dengan nama key token yang sesuai

    if (!token) {
      throw new Error('Token tidak ditemukan');
    }

    // Kirim permintaan dengan Bearer Token di header dan ID dalam body
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/laporan/delete`, {
      data: { id }, // Mengirim ID dalam body sebagai JSON
      headers: {
        'Authorization': `Bearer ${token}`, // Menambahkan Bearer token di header
        'Content-Type': 'application/json', 
      },
    });

    return response.data; // Mengembalikan data respons jika berhasil
  } catch (error) {
    console.error('Error deleting laporan:', error);
    throw error; // Menangkap error jika permintaan gagal
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
