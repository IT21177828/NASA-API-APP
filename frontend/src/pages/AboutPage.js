import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import mars from "../assets/mars.jpg";
import cosmos from "../assets/cosmos.jpg";

export default function AboutPage() {
  const [openNavigation, setOpenNavigation] = useState(false);

  return (
    <div>
      <Navbar
        openNavigation={openNavigation}
        setOpenNavigation={setOpenNavigation}
      />
      <section class="h-screen backdrop-blur-sm mx-auto pt-24 md:px-40 max-md:px-10 overflow-y-scroll">
        <h1 class="h1">About Us</h1>
        <p class="body-2 max-md:mb-10">
          Welcome to NASA API, your ultimate destination for exploring the
          wonders of space. We provide a unique experience through our Mars
          rover photo gallery and Astronomy Picture of the Day feature.
        </p>
        <div className="flex flex-row max-md:flex-col place-content-center text-center m-auto">
          <div className="w-1/2 px-6 flex flex-col items-center justify-center m-auto">
            <div className="order-2 md:order-1">
              <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                id="blobSvg"
                className="h-[350px] "
              >
                <clipPath id="blobClip">
                  <path id="blob" stroke="white" strokeWidth="3">
                    <animate
                      attributeName="d"
                      dur="9000ms"
                      repeatCount="indefinite"
                      values="M436.5,298.5Q418,347,380,378Q342,409,296,425Q250,441,194,442.5Q138,444,100.5,401Q63,358,46,304Q29,250,37,190.5Q45,131,101.5,111Q158,91,204,77Q250,63,306.5,58.5Q363,54,398,99Q433,144,444,197Q455,250,436.5,298.5Z; M444,305Q440,360,399,398.5Q358,437,304,462Q250,487,197.5,459.5Q145,432,112.5,390Q80,348,45,299Q10,250,41.5,199Q73,148,109.5,109.5Q146,71,198,46Q250,21,298.5,51.5Q347,82,403,105.5Q459,129,453.5,189.5Q448,250,444,305Z; M448,297.5Q414,345,388.5,395.5Q363,446,306.5,438Q250,430,203.5,420.5Q157,411,114,382Q71,353,54,301.5Q37,250,62,203Q87,156,115.5,111.5Q144,67,197,39Q250,11,300.5,43Q351,75,384,114Q417,153,449.5,201.5Q482,250,448,297.5Z;M457,301.5Q428,353,400,407Q372,461,311,471Q250,481,200.5,451.5Q151,422,99,394.5Q47,367,26,308.5Q5,250,31,194.5Q57,139,91.5,87.5Q126,36,188,41Q250,46,303,56.5Q356,67,403.5,100.5Q451,134,468.5,192Q486,250,457,301.5Z;M454.5,301.5Q428,353,396,400Q364,447,307,448.5Q250,450,190.5,453Q131,456,114.5,397Q98,338,52.5,294Q7,250,36.5,197Q66,144,107,109Q148,74,199,64.5Q250,55,300.5,65Q351,75,389.5,111Q428,147,454.5,198.5Q481,250,454.5,301.5Z;M436.5,298.5Q418,347,380,378Q342,409,296,425Q250,441,194,442.5Q138,444,100.5,401Q63,358,46,304Q29,250,37,190.5Q45,131,101.5,111Q158,91,204,77Q250,63,306.5,58.5Q363,54,398,99Q433,144,444,197Q455,250,436.5,298.5Z;"
                    ></animate>
                  </path>
                </clipPath>
                <image href={mars} height="100%" clipPath="url(#blobClip)" />
              </svg>
            </div>
            <p className="text-justify body-2 max-w-3xl mx-auto order-1 md:order-2">
              Our Mars rover API offers a captivating glimpse into the Martian
              landscape, showcasing breathtaking images captured by rovers
              exploring the Red Planet. Immerse yourself in the beauty and
              mystery of Mars with our curated photo gallery.
            </p>
          </div>
          <div className="w-1/2 px-6 flex flex-col items-center justify-center m-auto">
            <p className="text-justify body-2 max-w-3xl mx-auto">
              Additionally, don't miss our Astronomy Picture of the Day, where
              we feature stunning images from the cosmos every day. Embark on a
              cosmic journey and marvel at the wonders of our universe.
            </p>
            <div className="h-72">
              <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                id="blobSvg"
                className="h-[350px]"
              >
                <clipPath id="blobClip">
                  <path id="blob" stroke="white" strokeWidth="3">
                    <animate
                      attributeName="d"
                      dur="9000ms"
                      repeatCount="indefinite"
                      values="M436.5,298.5Q418,347,380,378Q342,409,296,425Q250,441,194,442.5Q138,444,100.5,401Q63,358,46,304Q29,250,37,190.5Q45,131,101.5,111Q158,91,204,77Q250,63,306.5,58.5Q363,54,398,99Q433,144,444,197Q455,250,436.5,298.5Z; M444,305Q440,360,399,398.5Q358,437,304,462Q250,487,197.5,459.5Q145,432,112.5,390Q80,348,45,299Q10,250,41.5,199Q73,148,109.5,109.5Q146,71,198,46Q250,21,298.5,51.5Q347,82,403,105.5Q459,129,453.5,189.5Q448,250,444,305Z; M448,297.5Q414,345,388.5,395.5Q363,446,306.5,438Q250,430,203.5,420.5Q157,411,114,382Q71,353,54,301.5Q37,250,62,203Q87,156,115.5,111.5Q144,67,197,39Q250,11,300.5,43Q351,75,384,114Q417,153,449.5,201.5Q482,250,448,297.5Z;M457,301.5Q428,353,400,407Q372,461,311,471Q250,481,200.5,451.5Q151,422,99,394.5Q47,367,26,308.5Q5,250,31,194.5Q57,139,91.5,87.5Q126,36,188,41Q250,46,303,56.5Q356,67,403.5,100.5Q451,134,468.5,192Q486,250,457,301.5Z;M454.5,301.5Q428,353,396,400Q364,447,307,448.5Q250,450,190.5,453Q131,456,114.5,397Q98,338,52.5,294Q7,250,36.5,197Q66,144,107,109Q148,74,199,64.5Q250,55,300.5,65Q351,75,389.5,111Q428,147,454.5,198.5Q481,250,454.5,301.5Z;M436.5,298.5Q418,347,380,378Q342,409,296,425Q250,441,194,442.5Q138,444,100.5,401Q63,358,46,304Q29,250,37,190.5Q45,131,101.5,111Q158,91,204,77Q250,63,306.5,58.5Q363,54,398,99Q433,144,444,197Q455,250,436.5,298.5Z;"
                    ></animate>
                  </path>
                </clipPath>
                <image href={cosmos} height="100%" clipPath="url(#blobClip)" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
