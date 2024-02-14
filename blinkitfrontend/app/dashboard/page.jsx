"use client";
import Navbar from "../Navbar";
import Image from "next/image";
import Card from "../card";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState([]);
  const fetchImages = async () => {
    try {
      let response = await fetch(
        "http://localhost:5000/api/images/fetchallimages",
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log(response);
      response = await response.json();
      console.log(response);

      if (response) {
        // console.log(response.data);

        const urls = response.map((image) => image.url);
        setImageUrls(urls);
      } else {
        console.error("Failed to fetch images:", response.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/");
    }
    fetchImages();
    console.log("useeffect", imageUrls);
  }, []);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      if (!file) {
        console.error("Please select a file");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/images/addimage",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Image uploaded successfully");
        setFile(null);
        document.getElementById("file_input").value = "";
        // Handle success
      } else {
        console.error("Failed to upload image");
        // Handle error
      }
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Navbar />

      <form method="POST" action="#" className="" onSubmit={handleSubmit}>
        <label
          className="block mb-2   text-gray-900 dark:text-black text-center text-3xl "
          htmlFor="file"
        >
          Upload Your files here
        </label>
        <div className="flex justify-center">
          <input
            onChange={handleFileChange}
            className="w-1/4 text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            name="file"
            type="file"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-4 py-2 text-center w-1/5 items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>

      <h1 className="text-center text-3xl font-bold mt-8">
        Your Uploads Appears here
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 px-8 py-8">
        {imageUrls.map((imageUrl, index) => (
          <Card key={index} image={imageUrl} />
        ))}
      </div>
    </>
  );
}
