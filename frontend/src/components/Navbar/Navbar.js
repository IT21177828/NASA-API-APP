import React from "react";
import { useLocation } from "react-router-dom";
import { HamburgerMenu } from "../design/Header";
import MenuSvg from "../../assets/svg/MenuSvg";
import NasaLogo from "../../assets/nasaLogo.png";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar({ openNavigation, setOpenNavigation }) {
  const pathname = useLocation();

  const { logout } = useLogout();

  const navigation = [
    {
      id: "0",
      title: "Home",
      url: "/",
    },
    {
      id: "1",
      title: "Mars Rover",
      url: "/mars-rover", // Add '/' before the URL
    },
    {
      id: "2",
      title: "APOD",
      url: "/apod", // Add '/' before the URL
    },
    {
      id: "3",
      title: "About",
      url: "/about", // Add '/' before the URL
    },

    {
      id: "4",
      title: "Sign out",
      url: "/", // Add '/' before the URL
      onlyMobile: true,
    },
  ];

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <div className="fixed top-0 left-0 z-50 bg-black/70 w-full shadow-md shadow-black/40">
      <div className="flex items-center justify-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="w-[12rem] flex flex-row justify-center max-md:justify-start" href="/">
          <img
            src={NasaLogo}
            alt="NasaLogo"
            className="invert opacity-85 hover:opacity-80 h-8"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={toggleNavigation}
                className={`block relative font-montserrat uppercase text-xl text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold ${
                  item.url === pathname.pathname
                    ? "text-color-1"
                    : "text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <button
          href="#sign-out"
          className="hidden lg:flex"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Sign out
        </button>

        <button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </button>
      </div>
    </div>
  );
}
