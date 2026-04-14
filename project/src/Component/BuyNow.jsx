import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function BuyNow() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const location = useLocation();
  const navigate = useNavigate();

  const isCartCheckout = Boolean(location.state?.cart);
  const product = location.state;
  const cartItems = location.state?.cart || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    quantity: product?.qty || 1,

    fullAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("aqua_user"));

    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phoneNumber || "",
      }));

      const savedAddresses = user.addresses || [];
      setAddresses(savedAddresses);

      if (savedAddresses.length > 0) {
        setSelectedAddressIndex(0);
      }
    }
  }, []);

  const calculateDeliveryCharge = (qty, item) => {
    const quantity = Math.max(1, Number(qty) || 1);
    const base = Number(item?.baseDeliveryPrice || 0);
    const perBottle = Number(item?.deliveryPricePerBottle || 0);

    return base + (quantity - 1) * perBottle;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleAddAddress = () => {
    if (
      !form.fullAddress.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {
      toast.error("Please fill full shipping address");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    console.log("city" , form.city);
    console.log("pincode" , form.pincode);

    if (
      form.city.trim().toLowerCase() === "bhopal" &&
      form.pincode.trim() === "461775"
    ) {
      toast.error("City and pincode do not match. 461775 is not Bhopal.");
      return;
    }

    const newAddress = {
      fullAddress: form.fullAddress.trim(),
      landmark: form.landmark.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      country: "India",
    };

    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    setSelectedAddressIndex(updatedAddresses.length - 1);

    const user = JSON.parse(localStorage.getItem("aqua_user")) || {};
    user.addresses = updatedAddresses;
    localStorage.setItem("aqua_user", JSON.stringify(user));

    setForm((prev) => ({
      ...prev,
      fullAddress: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    }));

    toast.success("Address saved");
  };

  const normalizedItems = useMemo(() => {
    if (isCartCheckout) {
      return cartItems.map((item) => ({
        productId: item.productId,
        productName: item.name,
        image: item.image,
        capacity: item.capacity,
        price: Number(item.price || 0),
        originalPrice: Number(item.originalPrice || 0),
        discount: Number(item.discount || 0),
        qty: Number(item.qty || 1),
        baseDeliveryPrice: Number(item.baseDeliveryPrice || 0),
        deliveryPricePerBottle: Number(item.deliveryPricePerBottle || 0),
        deliveryCharge: calculateDeliveryCharge(Number(item.qty || 1), item),
      }));
    }

    return [
      {
        productId: product.productId,
        productName: product.name,
        image: product.image,
        capacity: product.capacity,
        price: Number(product.price || 0),
        originalPrice: Number(product.originalPrice || 0),
        discount: Number(product.discount || 0),
        qty: Number(form.quantity || 1),
        baseDeliveryPrice: Number(product.baseDeliveryPrice || 0),
        deliveryPricePerBottle: Number(product.deliveryPricePerBottle || 0),
        deliveryCharge: calculateDeliveryCharge(Number(form.quantity || 1), {
          baseDeliveryPrice: product.baseDeliveryPrice,
          deliveryPricePerBottle: product.deliveryPricePerBottle,
        }),
      },
    ];
  }, [isCartCheckout, cartItems, product, form.quantity]);

  const subTotal = normalizedItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const totalDelivery = normalizedItems.reduce(
    (acc, item) => acc + item.deliveryCharge,
    0,
  );

  const total = subTotal + totalDelivery;

  const selectedAddress =
    selectedAddressIndex !== null ? addresses[selectedAddressIndex] : null;

  const buildAddressString = (addressObj) => {
    if (!addressObj) return "";

    return [
      addressObj.fullAddress,
      addressObj.landmark,
      addressObj.city,
      addressObj.state,
      addressObj.pincode,
      "India",
    ]
      .filter(Boolean)
      .join(", ");
  };

  const handlePayment = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill name and phone");
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select or save a shipping address");
      return;
    }

    const token = localStorage.getItem("aqua_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setPaymentLoading(true);

      const { data } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: total
          // amount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const razorpayOrder = data.order;

      const options = {
        key: import.meta.env.VITE_APP_RAZORPAY_KEY,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Aquahari",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          console.log("✅ Razorpay success response:", response);

          const verifyPayload = {
            ...response,
            orderData: {
              name: form.name,
              phone: form.phone,
              address: buildAddressString(selectedAddress),
              shippingAddress: {
                fullAddress: selectedAddress.fullAddress,
                landmark: selectedAddress.landmark,
                city: selectedAddress.city,
                state: selectedAddress.state,
                pincode: selectedAddress.pincode,
                country: selectedAddress.country || "India",
              },
              items: normalizedItems,
            },
          };

          console.log("Sending verify-payment payload:", verifyPayload);

          try {
            const verifyRes = await axios.post(
              `${API_URL}/api/payment/verify-payment`,
              verifyPayload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            console.log("✅ verify-payment response:", verifyRes.data);

            if (verifyRes.data.success) {
              if (isCartCheckout) {
                localStorage.removeItem("aqua_cart");
              }

              window.dispatchEvent(new Event("userChanged"));
              toast.success("Order placed successfully");
              navigate("/order_successful");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.log("❌ verify-payment API error:", error);
            console.log(
              "❌ verify-payment API error response:",
              error?.response?.data,
            );
            toast.error("Payment succeeded but verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("⚠️ Razorpay modal closed by user");
            toast.error("Payment popup closed");
          },
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: {
          color: "#1F212E",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("❌ Razorpay payment.failed event:", response);
        console.log("❌ Error code:", response.error.code);
        console.log("❌ Error description:", response.error.description);
        console.log("❌ Error source:", response.error.source);
        console.log("❌ Error step:", response.error.step);
        console.log("❌ Error reason:", response.error.reason);
        console.log("❌ Metadata:", response.error.metadata);

        toast.error(response.error.description || "Payment failed");
      });

      rzp.open();
    } catch (err) {
      console.log("Payment error:", err);
      toast.error(err?.response?.data?.message || "Payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen py-28 px-6 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-5">
            {isCartCheckout ? "Cart Summary" : "Product Summary"}
          </h2>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {normalizedItems.map((item, i) => (
              <div key={i} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-xl border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.capacity || "Bottle"} × {item.qty}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-green-600">
                      ₹{item.price * item.qty}
                    </p>

                    {item.discount > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice * item.qty}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Delivery: ₹{item.deliveryCharge}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!isCartCheckout && (
            <div className="mt-5">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                className="mt-2 w-full p-4 border rounded-xl"
              />
            </div>
          )}

          <div className="mt-6 space-y-2 bg-gray-50 rounded-2xl p-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery</span>
              <span>₹{totalDelivery}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-black border-t pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Enter Details</h2>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Full Name"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="p-4 border rounded-xl"
              maxLength={10}
            />

            {addresses.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Saved Addresses</p>
                <div className="space-y-3">
                  {addresses.map((addr, i) => (
                    <label
                      key={i}
                      className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition ${
                        selectedAddressIndex === i
                          ? "border-black bg-gray-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="savedAddress"
                        checked={selectedAddressIndex === i}
                        onChange={() => setSelectedAddressIndex(i)}
                        className="mt-1"
                      />
                      <div className="text-sm text-gray-700">
                        <p>{addr.fullAddress}</p>
                        {addr.landmark && <p>{addr.landmark}</p>}
                        <p>
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <textarea
                name="fullAddress"
                placeholder="House no, street, area"
                value={form.fullAddress}
                onChange={handleChange}
                className="sm:col-span-2 p-4 border rounded-xl min-h-[110px]"
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={form.landmark}
                onChange={handleChange}
                className="p-4 border rounded-xl"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="p-4 border rounded-xl"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="p-4 border rounded-xl"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="p-4 border rounded-xl"
                maxLength={6}
              />
            </div>

            <button
              type="button"
              onClick={handleAddAddress}
              className="text-left text-blue-600 font-medium"
            >
              + Save Address
            </button>

            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full py-4 rounded-full bg-black text-white font-semibold cursor-pointer hover:bg-gray-800 transition disabled:opacity-60"
            >
              {paymentLoading ? "Processing..." : `Pay ₹${total}`}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
