import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import banner from "./photos/image.png"
export default function ProductPage() {

  const images = [
    "/products/img1.jpeg",
    "/products/img2.jpeg",
    "/products/img3.jpeg",
    "/products/img4.jpeg",
    "/products/img5.jpeg",
    "/products/img6.jpeg",
    "/products/img7.jpeg",
    "/products/img8.jpeg",
    "/products/img9.jpeg",
    "/products/img10.jpeg",
    "/products/img11.jpeg",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <section className="w-full py-28 px-6 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT – IMAGE GALLERY */}
        <div>

          {/* MAIN IMAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="rounded-3xl overflow-hidden border border-gray-200 mb-4"
          >
            <img
              src={mainImage}
              alt="product"
              className="w-full h-[420px] object-cover"
            />
          </motion.div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-6 gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img || "/products/dummyImg.jpg"}
                loading="lazy"
                onClick={() => setMainImage(img)}
                className={`cursor-pointer rounded-lg h-20 object-cover border ${
                  mainImage === img ? "border-[#9EC07F]" : "border-gray-200"
                }`}
              />
            ))}
          </div>

        </div>

        {/* RIGHT – DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
        >

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-semibold text-[#1F212E] mb-4">
            Aquahari Blackwater IAL Extract 🌿🐟
          </h1>

          {/* PRICE */}
          <p className="text-2xl text-[#9EC07F] font-semibold mb-6">
            ₹250
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed mb-6">
            Bring natural blackwater conditions to your aquarium — the easy way.
            Designed to create a healthy, stress-free aquatic environment using
            natural Indian Almond Leaf extract.
          </p>

          {/* BENEFITS */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-[#1F212E]">Benefits:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✔ Naturally lowers pH</li>
              <li>✔ Reduces stress & boosts immunity</li>
              <li>✔ Enhances fish color</li>
              <li>✔ Releases beneficial tannins</li>
              <li>✔ Supports breeding conditions</li>
              <li>✔ Safe for shrimps & sensitive fish</li>
            </ul>
          </div>

          {/* DETAILS */}
          <div className="mb-6 text-gray-600">
            <p>💧 Net Volume: 200 ml</p>
            <p>🚚 Shipping: ₹100 (All India)</p>
          </div>

          {/* CTA */}
          <div className="flex gap-4 mt-8">

          <Link
  to="/BuyNow"
  className="px-8 py-3 rounded-full bg-[#1F212E] text-white 
             hover:bg-[#2b2e3f] transition inline-block"
>
  Order Now
</Link>

            

            <button className="px-8 py-3 rounded-full border border-gray-300 
                               hover:bg-gray-100 transition">
              Add to Cart
            </button>

          </div>

          {/* NOTE */}
          <p className="text-sm text-red-500 mt-6">
            ⚠ First batch limited stock
          </p>

        </motion.div>

      </div>

    </section>
  );
}