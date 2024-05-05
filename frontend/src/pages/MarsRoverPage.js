import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Lightbox } from "yet-another-react-lightbox";
import { Fullscreen } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { TypeAnimation } from "react-type-animation";
import Navbar from "../components/Navbar/Navbar";
import Loading from "../components/design/Loading";

export default function MarsRoverPage() {
  const [apiData, setApiData] = useState([]);
  const [openNavigation, setOpenNavigation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [index, setIndex] = useState(0);
  const headerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_NASA_API


  const API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}&page=${currentPage}`);
      if (response) {
        setIsLoading(false);
      }
      setApiData(response.data.photos);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const openLightbox = (index) => {
    const images = apiData.map((item) => ({
      src: item.img_src,
      caption: item.camera.full_name,
    }));
    setIndex(index);
    setLightboxImages(images);
    setOpen(true);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollToHeader(); // Scroll to the header section when next page is clicked
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const scrollToHeader = () => {
    headerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setOpen(false);
    setIndex(0);
  };

  return (
    <div>
      <Navbar
        openNavigation={openNavigation}
        setOpenNavigation={setOpenNavigation}
      />
    <div className="flex flex-col h-screen overflow-y-scroll backdrop-blur-sm">
      <div className="mt-20 relative h-fit bg-cover bg-top z-0 mb-10 p-6 shadow-lg">
        <div className="relative flex items-center justify-center h-full">
          <header className="pb-10 opacity-100  " ref={headerRef}>
            <h1 className="mb-4 text-3xl font-extrabold opacity-100 text-white dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">
                <TypeAnimation
                  sequence={["Mars Rover ", 2000]}
                  wrapper="span"
                  cursor={false}
                  repeat={Infinity}
                  speed={40}
                />
              </span>
              <span className="text-white">
                <TypeAnimation
                  sequence={["Photo Lab.", 2000]}
                  wrapper="span"
                  cursor={false}
                  repeat={Infinity}
                  speed={40}
                />
              </span>
            </h1>

            <TypeAnimation
              className="text-sm text-white"
              sequence={[
                1000,
                "The Mars Rover Photo Lab is an interactive web application that provides users with access to a vast collection of images captured by NASA's Mars rovers.",
              ]}
              wrapper="span"
              speed={80}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </header>
        </div>
      </div>

      <div className="relative">
        <Lightbox
          plugins={[Fullscreen]}
          open={open}
          index={index}
          close={() => handleClose()}
          slides={lightboxImages}
        />

        {!isLoading ? (
          <>
            <div className="md:columns-3 lg:columns-4 space-y-3 md:px-20">
              {apiData.map((item, index) => (
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.01] duration-300">
                  <LazyLoadImage
                    className="cursor-pointer rounded-md border border-gray-400 shadow-md shadow-black"
                    effect="blur"
                    key={index}
                    src={item.img_src}
                    alt={item.full_name}
                    onClick={() => openLightbox(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center p-12">
              <div className="xs:mt-0 mt-2 flex flex-row items-center justify-between gap-2">
                <button
                  className="flex h-8 items-center justify-center rounded-lg bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <svg
                    className="me-2 h-3.5 w-3.5 rtl:rotate-180"
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
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <span className="font-bold ">{currentPage}</span>
                <button
                  className="flex h-8 items-center justify-center rounded-lg border-0 border-s border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={nextPage}
                >
                  Next
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
          </>
        ) : (
          <div>
            <Loading placement={""} />
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
