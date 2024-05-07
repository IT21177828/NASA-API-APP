import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import NasaLoginIcon from "../../assets/nasaLoginIcon.jpg";

export default function SignUp() {
  const navigator = useNavigate();
  const { signup, error, isLoading } = useSignup();
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleNavigation = () => {
    navigator("/sign-in");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(formField, setFormField, navigator);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="h-screen mx-auto backdrop-blur-sm overflow-auto">
        <div className="container h-full w-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-200">
            <div className="h-full lg:w-4/5 mx-auto">
              <div className="block rounded-lg bg-neutral-800/80 shadow-lg border">
                <div className="gap-0 md:flex md:flex-row">
                  <div className="px-4 md:w-1/2 md:px-0 order-2">
                    <div className="md:px-10 md:pt-10">
                      <div className="pt-8 text-center md:pt-0 mx-auto">
                        <img
                          className="mx-auto h-32 w-32 rounded-full"
                          src={NasaLoginIcon}
                          alt="logo"
                        />
                      </div>

                      <form method="post" onSubmit={handleSubmit}>
                        <p className="mb-4 mt-3 pb-1 text-xl font-semibold">
                          Create a new account
                        </p>
                        <div className="flex flex-col items-start mb-3">
                          <label
                            htmlFor="text"
                            className="block mb-2 text-sm font-medium text-white "
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="text"
                            value={formField.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Jon Doe"
                            required
                          />
                        </div>
                        <div className="flex flex-col items-start mb-3">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-white "
                          >
                            Your email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formField.email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required
                          />
                        </div>
                        <div className="flex flex-col items-start mb-6">
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-white"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formField.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div className="text-red-600">
                          <span>{error}</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 mb-2 pb-1 pt-1 text-center">
                          <button
                            className="flex flex-row gap-1 items-center justify-center w-fit rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal tracking-widest text-white border focus:outline-none hover:scale-105 duration-300 transition-all py-2.5 me-2 mb-2 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                          >
                            Sign up
                            {isLoading && (
                              <div className="flex flex-ro h-fit text-center">
                                <div className="w-6 h-6 flex items-center justify-center animate-spin">
                                  <svg
                                    className="w-6 h-6 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 1V3M12 21V23M4.92929 4.92929L7.05025 7.05025M16.9497 16.9497L19.0707 19.0707M1 12H3M21 12H23M4.92929 19.0707L7.05025 16.9497M16.9497 7.05025L19.0707 4.92929"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        </div>

                        <div className="flex flex-row max-sm:flex-col items-center justify-center gap-4 pb-6 mt-6">
                          <p className="mb-0">Already have an account?</p>
                          <button
                            type="button"
                            onClick={handleNavigation}
                            className="inline-block w-fit rounded px-3 py-1 tracking-widest text-xs font-medium uppercase leading-normal text-white border focus:outline-none hover:scale-105 delay-200 transition-all"
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="flex items-center border-r max-md:border-t rounded-lg bg-[url('https://www.nasa.gov/wp-content/uploads/2023/07/iss069e018537-1.jpg?resize=2000,1333')] bg-cover bg-center opacity-70 max-md:h-96 md:w-1/2 md:rounded-e-lg lg:rounded-bl-none">
                    <div className="mx-4 rounded-xl bg-black px-4 py-6 text-white opacity-80 md:mx-6 md:p-12 max-sm:max-h-80 overflow-auto ">
                      <h4 className="mb-6 text-xl font-semibold opacity-100">
                        Explore the Universe
                      </h4>
                      <p className="text-justify text-sm opacity-100">
                        NASA, boldly navigating the realms of air and space,
                        pioneers exploration into the unknown. Through
                        groundbreaking innovation, it drives technological
                        advancements that serve the greater good of humanity.
                        Inspiring awe and wonder with each discovery, NASA's
                        endeavors transcend borders, captivating the imagination
                        of the world. With a steadfast commitment to discovery,
                        NASA continues to push the boundaries of human
                        understanding, shaping the future of space exploration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
