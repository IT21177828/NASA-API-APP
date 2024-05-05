import { useNavigate } from "react-router-dom";
import { useState } from "react";

import curve from "../assets/curve.png";
import Navbar from "../components/Navbar/Navbar";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigator = useNavigate();
  const api = process.env.REACT_APP_NASA_API;
  console.log(api);

  return (
    <div className="h-screen lg:backdrop-blur-sm ">
      <Navbar
        openNavigation={openNavigation}
        setOpenNavigation={setOpenNavigation}
      />
      <div
        className={`z-2 pt-32 relative w-full h-full border-b border-n-6 ${
          openNavigation ? "bg-n-8" : "backdrop-blur-sm"
        }`}
      >
        <div
          className={`z-1 mx-auto text-center ${
            openNavigation ? "hidden" : "block"
          }`}
        >
          <div className="">
            <h1 className="h1 mb-6">
              Let the Stars Illuminate&nbsp;Your&nbsp;
              <span className="inline-block relative">
                Journey{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="body-1 mt-8 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
              Embark on a cosmic journey with us. Let the stars guide your
              exploration into the depths of space.
            </p>
            <div className="flex max-[905px]:flex-col items-center justify-center gap-20 pt-10 ">
              <div>
                <div className="relative max-w-sm rounded-lg border border-gray-200 shadow h-64 bg-black">
                  <img
                    className="rounded-lg absolute z-5 opacity-50 h-full"
                    src="https://plus.unsplash.com/premium_photo-1689602858109-956b8d1ae80f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFycyUyMHJvdmVyfGVufDB8fDB8fHww"
                    alt=""
                  />
                  <div className="p-5 flex flex-col items-center justify-around z-50 h-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white z-50">
                      Mars Rover
                    </h5>
                    <p className="mb-3 font-normal text-center text-white z-50">
                      Explore the Red Planet through the lens of our Mars rover,
                      revealing the mysteries of another world.
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigator("/mars-rover");
                      }}
                      className="text-white hover:text-white border hover:scale-105 border-white hover:border-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 duration-200 transition-all uppercase flex flex-row items-center justify-center z-50"
                    >
                      Mars Rover
                      <svg
                        className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative max-w-sm rounded-lg border border-gray-200 shadow h-64 z-50 bg-black">
                  <img
                    className="rounded-lg absolute z-5 opacity-50 h-full"
                    src="https://media.istockphoto.com/id/1422030468/photo/couple-stargazing-together-with-a-astronomical-telescope.webp?b=1&s=170667a&w=0&k=20&c=XUwkwyhbt8tRag81RbWtko6VmEJO0Vau5isHRjPIDy4="
                    alt=""
                  />
                  <div className="p-5 flex flex-col items-center justify-around z-50 h-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white z-50">
                      Astronomy Picture of the Day
                    </h5>

                    <p className="mb-3 font-normal text-center text-white z-10">
                      Every day, journey through the cosmos with awe-inspiring
                      snapshots of our universe, illuminating the wonders of
                      astronomy.
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigator("/apod");
                      }}
                      className="text-white hover:text-white hover:border-purple-600 border hover:scale-105 border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 duration-200 transition-all uppercase flex flex-row items-center justify-center z-10"
                    >
                      APOD
                      <svg
                        className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
