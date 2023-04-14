"use client";
import useCart from "@/store/store";
import { GrFormClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Modal = () => {
  const router = useRouter();
  const onOpenModal = useCart((state) => state.onOpenModal);
  const onCloseModal = useCart((state) => state.onCloseModal);
  const openModal = useCart((state) => state.openModal);
  const cartItems = useCart((state) => state.cart);

  const checkout = async () => {
    const lineItems = cartItems.map((item) => {
      //console.log("CART ITEM: ", cartItems);
      return {
        price: item.price_id,
        quantity: 1,
      };
    });
    //console.log(lineItems);

    const res = await fetch("/api/checkout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    });
    const data = await res.json();
    console.log(data);
    router.push(data.session.url);
  };

  if (!openModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-screen h-screen z-50">
        <div
          onClick={onCloseModal}
          className="bg-transparent absolute inset-0"
        ></div>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%", transition: { duration: 0.5 } }}
          transition={{ duration: 0.5 }}
          className="flex flex-col bg-white absolute right-0 top-0 h-screen shadow-lg w-screen sm:w-[40%] max-w-screen gap-4"
        >
          <div className="flex items-center p-6 justify-between text-xl relative  border-b-red-300 border-b-2">
            <h1>Cart</h1>
            <GrFormClose className="cursor-pointer" onClick={onCloseModal} />
          </div>

          <div className="p-4 flex-1 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <p className="text-red-300 font-semibold text-xl">
                No Items found
              </p>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex border-1 border-solid border-slate-700 px-2 flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <h2>{item.name}</h2>
                      <p>{item.cost}</p>
                    </div>
                    <p className="text-slate-600 text-sm">Quantity : 1</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            onClick={checkout}
            className="border rounded border-solid border-slate-700 text-xl m-4 p-4 uppercase grid place-items-center hover:opacity-60 cursor-pointer"
          >
            Checkout
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
