import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { closeModall, showModall } from "../modall";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function Libary() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<any>([]);
  let count: number = 1;

  const addDocs = async (value1: string, value2: any) => {
    const ref = await addDoc(collection(db, "libary"), {
      title: value1,
      published: value2,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value1 && value2) {
      setLoading(true);
      addDocs(value1, value2);
    }
    setLoading(false);
    getdata();

    closeModall();
  };
  const getdata = async () => {
    let booksArr: any = [];
    setLoading(true);
    const snap = await getDocs(collection(db, "libary"));
    snap.forEach((doc) => {
      booksArr.push({ id: doc.id, ...doc.data() });
    });

    setBooks(booksArr);
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);

  const delDocs = async (e: any) => {
    const del = deleteDoc(doc(db, "libary", e));
    getdata();
  };

  const updateDocs = () => {};
  return (
    <div className="max-w-[85%] relative mx-auto  pt-6">
      <h1 className="font-bold text-[28px] mt-3">Library</h1>
      <button
        onClick={() => showModall()}
        className="py-3 absolute top-6 right-4 rounded-[10px] px-7 bg-blue-500 hover:bg-blue-300 font-[500] text-[18px] text-white"
      >
        add
      </button>

      <div className="overflow-x-auto mt-[96px]  ml-[25px] max-w-[80%] rounded-[0] bg-inherit">
        <table className="table  ">
          {/* head */}
          <thead className="text-inherit font-bold text-[20px]">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Published</th>
              <th>System</th>
            </tr>
          </thead>
          <tbody className="relative">
            {/* row 1 */}

            {loading ? (
              <div className="flex gap-6 pt-[100px] pl-[400px]">
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              books.map((e: any) => (
                <tr key={++count} className=" bg-inherit">
                  <th>{count}</th>
                  <td>{e.title}</td>
                  <td>{e.published}</td>
                  <td className="flex gap-6">
                    <button
                      onClick={updateDocs}
                      className="bg-gray-300 hover:bg-gray-400 hover:translate-y-[-5px]  transition-all px-2 py-2 rounded-[999px]"
                    >
                      <img src="/edit.svg" alt="" />
                    </button>
                    <button
                      onClick={() => delDocs(e.id)}
                      className="bg-gray-300 hover:bg-gray-400 hover:translate-y-[-5px]  transition-all px-2 py-2 rounded-[999px]"
                    >
                      <img src="/del.svg" alt="" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {createPortal(
          <dialog id="my1" className="modal bg-gray-500 bg-opacity-[0.8]">
            <div className="modal-box bg-white">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-md btn-circle text-lg btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold mb-6 text-[28px]">Add Book</h3>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3  gap-2">
                  <span className="text-[18px] ml-1">Title</span>
                  <input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    type="text"
                    className="bg-gray-100  py-3 px-4 text-[20px] rounded-[15px] w-[90%]"
                    required
                    placeholder="O'tgan kunlar"
                  />
                </div>
                <div className="flex flex-col mb-8  gap-2">
                  <span className="text-[18px] ml-1">Published Year</span>
                  <input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    type="number"
                    className={`bg-gray-100  py-3 px-4 text-[20px] rounded-[15px] w-[90%] ${
                      loading ? "disabled:bg-green-200" : ""
                    }`}
                    required
                    placeholder="1996"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full py-4 bg-green-500 hover:bg-green-300 text-white text-[18px] rounded-[15px] font-bold "
                >
                  Submit
                </button>
              </form>
              <div className="modal-action"></div>
            </div>
          </dialog>,
          document.body
        )}
      </div>
    </div>
  );
}

export default Libary;
