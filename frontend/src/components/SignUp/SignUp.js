import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export default function SignUp() {
  //use isLoading to track loading
  const { signup, error} = useSignup();
  const navigator = useNavigate();
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
                <div className="g-0 md:flex md:flex-wrap">
                  <div className="px-4 md:w-1/2 md:px-0">
                    <div className="md:px-10 md:pt-10">
                      <div className="pt-8 text-center md:pt-0 mx-auto">
                        <img
                          className="mx-auto h-32 w-32 rounded-full"
                          src="https://images.unsplash.com/photo-1636614484105-6b199a1fbdca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                            className="inline-block w-fit rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal tracking-widest text-white border focus:outline-none hover:scale-105 duration-300 transition-all py-2.5 me-2 mb-2"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4 pb-6 mt-6">
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

                  <div className="flex items-center border-l rounded-b-lg bg-[url('https://www.nasa.gov/wp-content/uploads/2023/07/iss069e018537-1.jpg?resize=2000,1333')] bg-cover bg-center opacity-70 max-md:h-96 md:w-1/2 md:rounded-e-lg lg:rounded-bl-none">
                    <div className="mx-4 rounded-xl bg-black px-4 py-6 text-white opacity-80 md:mx-6 md:p-12">
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
