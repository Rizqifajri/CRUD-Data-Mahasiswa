import React, { useState, useEffect } from "react";
import TambahMahasiswa from "./TambahMahasiswa";
import EditMahasiswa from "./EditMahasiswa";

const TableMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  const handleEdit = (id) => {
    const selected = mahasiswa.find((item) => item.id === id);
    if (selected) {
      setSelectedMahasiswa(selected);
      setShowPopUp(true);
    } else {
      console.log("Tidak ada mahasiswa dengan ID tersebut");
    }
  };

  const closePopUp = () => {
    setShowPopUp(false);
    setSelectedMahasiswa(null);
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/mahasiswa/${updatedData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Data mahasiswa berhasil diubah");
        alert("Update Successfull!")
        closePopUp(); // Tutup popup setelah berhasil
        updateMahasiswa(); // Refresh data setelah pengubahan berhasil
      } else {
        console.log("Gagal mengubah data mahasiswa");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/mahasiswa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Data berhasil dihapus");
        // Refresh data setelah penghapusan berhasil
        updateMahasiswa();
      } else {
        console.log("Gagal menghapus data mahasiswa");
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    }
  };

  const fetchDataMahasiswa = async () => {
    try {
      const response = await fetch("http://localhost:3000/mahasiswa");
      if (response.ok) {
        const data = await response.json();
        const formattedData = data[0].payload.data || [];
        setMahasiswa(formattedData);
        console.log(data);
      } else {
        console.log("Gagal mengambil data mahasiswa");
      }
    } catch (err) {
      console.log("Not found ", err);
    }
  };

  const updateMahasiswa = async () => {
    await fetchDataMahasiswa();
  };

  useEffect(() => {
    fetchDataMahasiswa();
  }, []);

  return (
    <>
      {showPopUp && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <EditMahasiswa
            showPopUp={showPopUp}
            closePopUp={closePopUp}
            selectedMahasiswa={selectedMahasiswa}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
      )}
      <TambahMahasiswa updateData={updateMahasiswa} />
      <table className="min-w-full divide-y divide-gray-200 mt-10">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NPM
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Lengkap
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kelas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jenis Kelamin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mahasiswa.map((item, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.npm}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.nama_lengkap}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.kelas}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.jenis_kelamin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    handleEdit(item.id);
                  }}>
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    handleDelete(item.npm);
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableMahasiswa;
