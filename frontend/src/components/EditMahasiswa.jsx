import React from "react";
import { useState } from "react";

const EditMahasiswa = ({
  showPopUp,
  closePopUp,
  selectedMahasiswa,
  handleEditSubmit,
}) => {
  const [editedMahasiswa, setEditedMahasiswa] = useState(selectedMahasiswa);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMahasiswa({
      ...editedMahasiswa,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditSubmit(editedMahasiswa);
    closePopUp();
  };

  return (
    <>
      {showPopUp && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            {selectedMahasiswa && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    NPM
                  </label>
                  <input
                    type="text"
                    name="npm"
                    value={editedMahasiswa.npm}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    value={editedMahasiswa.nama_lengkap}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Kelas
                  </label>
                  <input
                    type="text"
                    name="kelas"
                    value={editedMahasiswa.kelas}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jenis Kelamin
                  </label>
                  <select
                    name="jenis_kelamin"
                    value={editedMahasiswa.jenis_kelamin}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closePopUp}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditMahasiswa;
