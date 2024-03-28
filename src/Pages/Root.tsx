import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Root() {
  const handleOut = async () => {
    await signOut(auth);
    console.log("del");
  };
  return (
    <>
      <div className="block  relative min-w-full h-full bg-[#f0f0f0]">
        <Header />
        <form
          className="absolute top-[100px]
        left-14"
        >
          <button onClick={handleOut}>
            <span className=" text-[18px] font-[300] ">Log Out</span>
          </button>
        </form>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
