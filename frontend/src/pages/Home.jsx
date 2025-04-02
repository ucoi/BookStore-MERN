import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AioutlineEdit } from "react-icons/ai";
import { BsinfoCircle } from "react-icons/bs";
import { MdoutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [Books, setBooks] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://localhost:5173/books")
      .then((Response) => {
        setBooks(Response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className=" text-3xl my-8"> Boooks List</h1>
        <Link to="/books/create">
          <MdoutlineAddBox className="text-sky-800 text-4x1" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className=" border border-slate600 rounded-md">No</th>
              <th className=" border border-slate600 rounded-md">Title</th>
              <th className=" border border-slate600 rounded-md max-md:hidden">
                Author
              </th>
              <th className=" border border-slate600 rounded-md max-md:hidden">
                Publiosh year
              </th>
              <th className=" border border-slate600 rounded-md ">
                operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <td className="border border-slate700 rounded-md text-center">
                {index + 1}
              </td>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
