import { useState } from "react";

const TambahMahasiswa = ({ updateData }) => {
  const [dataMahasiswa, setDataMahasiswa] = useState({
    npm: "",
    nama_lengkap: "",
    kelas: "",
    jenis_kelamin: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/mahasiswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMahasiswa),
      });

      if (response.ok) {
        console.log("Data Mahasiswa berhasil ditambahkan");
        // Ambil data baru setelah berhasil ditambahkan
        updateData();
        // Reset form setelah berhasil menambahkan data
        setDataMahasiswa({
          npm: "",
          nama_lengkap: "",
          kelas: "",
          jenis_kelamin: "",
        });
      } else {
        console.log("Gagal Menambahkan data mahasiswa");
      }
    } catch (err) {
      console.log("Not found ", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataMahasiswa({ ...dataMahasiswa, [name]: value });
  };

  return (
    <div className="">
      <h2 className="text-center text-3xl mt-10">Table Data Mahasiswa</h2>
      <form
        className="flex justify-center gap-10 mt-10 border-solid"
        onSubmit={handleSubmit}>
        <input
          className="border-4 rounded-md indent-3"
          type="text"
          name="npm"
          value={dataMahasiswa.npm}
          onChange={handleChange}
          placeholder="NPM"
        />
        <input
          className="border-4 rounded-md indent-3"
          type="text"
          name="nama_lengkap"
          value={dataMahasiswa.nama_lengkap}
          onChange={handleChange}
          placeholder="Nama Lengkap"
        />
        <input
          className="border-4 rounded-md indent-3"
          type="text"
          name="kelas"
          value={dataMahasiswa.kelas}
          onChange={handleChange}
          placeholder="Kelas"
        />
        <input
          className="border-4 rounded-md indent-3 "
          type="text"
          name="jenis_kelamin"
          value={dataMahasiswa.jenis_kelamin}
          onChange={handleChange}
          placeholder="Jenis Kelamin"
        />
        <button
          className="bg-blue-500 p-3 rounded-md text-white "
          type="submit">
          Tambahkan
        </button>
      </form>
    </div>
  );
};

export default TambahMahasiswa;
