import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fish from "./photos/fish.jpg";
import { motion } from "framer-motion";
import video from "./photos/video.mp4";
// import video1 from "./photos/video2.MOV";
// import video2 from "./photos/video3.MOV";
// import video3 from "./photos/video4.MOV";
import video4 from "./photos/video5.mp4";
import video5 from "./photos/video6.mp4";
// import video6 from "./photos/video7.mp4";
// import video7 from "./photos/video8.mp4";
import video8 from "./photos/video9.mp4";
import { FaPlay , FaPause  , FaArrowRight , FaInstagram } from "react-icons/fa";
import logo from "./photos/logodesign.png";
import r1 from "./photos/review.jpeg";
import r2 from "./photos/review1.jpeg";
import r3 from "./photos/review2.jpeg";
import r4 from "./photos/review3.jpeg";
import r5 from "./photos/review4.jpeg";
import r6 from "./photos/review5.jpeg";
import r7 from "./photos/review7.jpeg";
const reviews = [r1, r2, r3, r4, r5, r6, r7];
const instagramPosts = [
  "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711658202904-4efd9d1ca9fb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1772718460103-4fb28ce6fc0b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1765464949998-93773ccb6cbf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1763052414019-57e4aa1f0b04?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1759222859663-4df7dbb9761b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Hero() {
  const scrollRef = useRef();
   const videoRefs = useRef([]);
   const navigate = useNavigate();
  const [playingIndex, setPlayingIndex] = useState(null);

  const handleToggleVideo = (index) => {
    const currentVideo = videoRefs.current[index];

    if (!currentVideo) return;

    // pause all other videos
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // toggle current video
    if (playingIndex === index) {
      currentVideo.pause();
      setPlayingIndex(null);
    } else {
      currentVideo.play();
      setPlayingIndex(index);
    }
  };

  const handleVideoEnd = () => {
    setPlayingIndex(null);
  };

  const videos = [
    { src: video4, className: "md:col-span-2 h-[400px] rounded-3xl", iconSize: "w-14 h-14", iconText: "" },
    { src: video5, className: "h-[190px] rounded-2xl", iconSize: "w-10 h-10", iconText: "text-sm" },
    { src: video8, className: "h-[190px] rounded-2xl", iconSize: "w-10 h-10", iconText: "text-sm" },
  ];
  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-br from-[#e6f7f5] via-[#d4f1ee] to-[#c2e9e5] flex flex-col items-center justify-center px-6 text-center">
        {/* LOGO */}
        <div className="text-center">
          <img
            src={logo}
            alt="AquaHari Logo"
            className="w-56 md:w-80 lg:w-96 mx-auto mb-4"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="max-w-4xl text-[#4b6b6a] text-lg md:text-xl leading-relaxed mb-10">
          Where Aquatic Care Meets Passion! We are dedicated to the vibrant
          ecosystem of aquatic life, specializing in fishes and turtles. Our
          commitment extends beyond providing healthy pets; we empower hobbyists
          and pet keepers with essential knowledge on water parameters, tank
          environments, nutrition, and healthcare. Join our community and
          experience expert guidance along with a selection of high-quality
          fishes and turtles to ensure your aquatic pets thrive!
        </p>

        {/* BUTTON */}
        <button onClick={()=> navigate("/all_Products")} className="cursor-pointer flex items-center gap-3 bg-[#8ed1b2] hover:bg-[#7cc5a6] text-[#063d3a] px-8 py-3 rounded-full text-lg font-medium transition duration-300 shadow-md hover:shadow-xl">
          SHOP <FaArrowRight />
        </button>
      </section>

      {/* OUR SERVICES */}
      <section className="w-full bg-gradient-to-br from-[#e6f7f5] via-[#d4f1ee] to-[#c2e9e5] py-28 px-6">
        {/* TOP LINE */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-40 h-[2px] bg-[#6ec1a6] rounded-full opacity-70"></div>
        </div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-5xl font-semibold text-[#063d3a] mb-20 tracking-wide"
        >
          OUR SERVICES
        </motion.h2>

        {/* CARDS */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 perspective">
          {/* CARD 1 */}
          <Link to="/all_blogs">
            <motion.div
              whileHover={{ rotateY: 6, rotateX: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group overflow-hidden rounded-3xl cursor-pointer 
               bg-white/20 backdrop-blur-xl border border-white/30
               shadow-[0_20px_60px_rgba(0,0,0,0.2)]
               hover:shadow-[0_30px_80px_rgba(110,193,166,0.4)]
               transition duration-500"
            >
              <img
                src={fish}
                alt="Fish Care"
                className="w-full h-[300px] object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-semibold tracking-wide">
                  Fish Care Blogs
                </h3>
              </div>
            </motion.div>
          </Link>

          {/* CARD 2 */}
          <Link to="/all_products">
            <motion.div
              whileHover={{ rotateY: -6, rotateX: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group overflow-hidden rounded-3xl cursor-pointer 
               bg-white/20 backdrop-blur-xl border border-white/30
               shadow-[0_20px_60px_rgba(0,0,0,0.2)]
               hover:shadow-[0_30px_80px_rgba(110,193,166,0.4)]
               transition duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1693560561064-54e0552f8f2f?q=80&w=1740&auto=format&fit=crop"
                alt="Turtle"
                className="w-full h-[300px] object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <h3 className="text-white text-2xl font-semibold underline">
                  Order Now
                </h3>

                <p className="text-white text-sm opacity-90 self-end group-hover:translate-x-2 transition">
                  Read More →
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="w-full py-28 px-6 bg-[#FAFAF8]">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1F212E]">
            Video Gallery
          </h2>
          <p className="text-gray-500 mt-2">Real aquarium work & insights</p>
        </div>

        {/* GRID */}
         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
      {/* BIG VIDEO */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative ${videos[0].className} overflow-hidden group`}
      >
        <video
          ref={(el) => (videoRefs.current[0] = el)}
          src={videos[0].src}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onPause={() => {
            if (playingIndex === 0) setPlayingIndex(null);
          }}
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => handleToggleVideo(0)}
            className={`${
              videos[0].iconSize
            } rounded-full bg-white/80 flex items-center justify-center transition duration-300 ${
              playingIndex === 0 ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <FaPlay className="text-[#1F212E]" />
          </button>
        </div>

        {playingIndex === 0 && (
          <button
            onClick={() => handleToggleVideo(0)}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md"
          >
            <FaPause className="text-[#1F212E]" />
          </button>
        )}
      </motion.div>

      {/* SIDE VIDEOS */}
      <div className="flex flex-col gap-6">
        {[1, 2].map((index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`relative ${videos[index].className} overflow-hidden group`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={videos[index].src}
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              onPause={() => {
                if (playingIndex === index) setPlayingIndex(null);
              }}
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => handleToggleVideo(index)}
                className={`${
                  videos[index].iconSize
                } rounded-full bg-white/80 flex items-center justify-center transition duration-300 ${
                  playingIndex === index ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
                }`}
              >
                <FaPlay className={`text-[#1F212E] ${videos[index].iconText}`} />
              </button>
            </div>

            {playingIndex === index && (
              <button
                onClick={() => handleToggleVideo(index)}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md"
              >
                <FaPause className="text-[#1F212E] text-sm" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
      </section>

      {/* INSTAGRAM SECTION  */}
      <section className="relative py-28 mt-28 bg-white overflow-hidden">
        {/* SOFT GREEN GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#9EC07F]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#9EC07F]/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaInstagram className="text-3xl text-[#1F212E]" />
              <span className="text-lg font-semibold text-[#1F212E]">
                Instagram
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#1F212E] mb-6 leading-tight">
              Follow us on <br />
              <span className="text-[#9EC07F]">@AquaHari</span>
            </h2>

            <p className="text-lg text-gray-500 mb-8 max-w-xl">
              Gentle pet care tips, emergency guidance & real stories — shared
              daily by our veterinarians.
            </p>

            {/* BUTTON (NATURE STYLE) */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://www.instagram.com/aquahariofficial?igsh=eXl2cnp4NjlzdDU2&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full 
                 bg-[#1F212E] text-white font-semibold 
                 hover:bg-[#2b2e3f] transition shadow-md"
            >
              Visit Instagram <FaArrowRight />
            </motion.a>
          </motion.div>

          {/* RIGHT – POST GRID */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6"
          >
            <div className="grid grid-cols-3 gap-3">
              {instagramPosts.map((img, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                >
                  {/* IMAGE */}
                  <img
                    src={img}
                    alt={`Instagram ${i + 1}`}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* GREEN OVERLAY */}
                  <div className="absolute inset-0 bg-[#1F212E]/30 opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* ICON */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="bg-[#9EC07F] p-2 rounded-full shadow-md">
                      <FaInstagram className="text-[#1F212E] text-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Follow us for real pet care updates 🐾
            </p>
          </motion.div>
        </div>
      </section>

      {/* REVIEW SECTION */}
      <section className="w-full py-28 bg-[#FAFAF8] overflow-hidden">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1F212E]">
            Customer Reviews 💬
          </h2>
        </div>

        {/* SCROLL */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...reviews, ...reviews].map((img, i) => (
              <div
                key={i}
                className="min-w-[260px] md:min-w-[320px] rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={img}
                  alt="review"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
