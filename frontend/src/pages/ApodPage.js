import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Navbar from "../components/Navbar/Navbar";
import Loading from "../components/design/Loading";
import { Lightbox } from "yet-another-react-lightbox";
import { Fullscreen } from "yet-another-react-lightbox/plugins";

export default function ApodPage() {
  const [apiData, setApiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [open, setOpen] = useState(false);

  const apiKey = process.env.REACT_APP_NASA_API

  const formatDate = (date) => {
    return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
  };

  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formatDate(
    currentDate
  )}`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setApiData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentDate]);

  const handleNext = () => {
    const nextDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    );
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    setCurrentDate(nextDate);
    setIsToday(new Date().toDateString() === nextDate.toDateString());
  };

  const handlePrev = () => {
    const prevDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    );
    prevDate.setUTCDate(prevDate.getUTCDate() - 1);
    setCurrentDate(prevDate);
    setIsToday(new Date().toDateString() === prevDate.toDateString());
  };

  const openLightbox = () => {
    const images = [{ src: apiData.url, caption: apiData.title }];
    setLightboxImages(images);
    setOpen(true);
  };

  const renderMedia = () => {
    if (apiData.media_type === "video") {
      return (
        <iframe
          className="md:w-1/3 md:h-80 rounded-lg shadow-lg"
          src={apiData.url}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="NASA Video of the Day"
        ></iframe>
      );
    } else {
      return (
        <LazyLoadImage
          className="w-auto md:h-96 rounded-lg mx-auto shadow-lg border border-slate-300 cursor-pointer"
          effect="blur"
          src={apiData.url}
          alt={apiData.title}
          onClick={() => openLightbox()}
        />
      );
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Navbar
        openNavigation={openNavigation}
        setOpenNavigation={setOpenNavigation}
      />

      <div className="h-screen overflow-y-scroll backdrop-blur-sm text-white flex flex-col items-center justify-start p-4 ">
        <h1 className="h1 mb-4 mt-20">Astronomy Picture of the Day</h1>

        <Lightbox
          plugins={[Fullscreen]}
          open={open}
          close={() => handleClose()}
          slides={lightboxImages}
          render={{
            buttonNext: () => {
              return null;
            },
            buttonPrev: () => {
              return null;
            },
          }}
        />

        {!isLoading ? (
          <>
            {apiData.title && (
              <h2 className="body-1 mb-2 text-white">{apiData.title}</h2>
            )}

            {renderMedia()}
            {apiData.date && (
              <span className="text-sm text-gray-200 mt-2">{apiData.date}</span>
            )}
            {apiData.explanation && (
              <p className="text-sm mt-4 py-2 px-8 leading-relaxed text-justify">
                <span className="font-bold text-lg">Explanation:</span>{" "}
                {apiData.explanation}
              </p>
            )}
            {apiData.url && (
              <div className="flex flex-col justify-center items-center p-12">
                <div className="xs:mt-0 mt-2 flex flex-row items-center justify-between gap-2">
                  <button
                    className="flex h-8 items-center justify-center rounded-lg bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={handlePrev}
                  >
                    Prev
                  </button>

                  <button
                    className={`flex h-8 items-center justify-center rounded-lg border-0 border-s border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white ${
                      isToday
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                    onClick={handleNext}
                    disabled={isToday}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </div>
  );
}
