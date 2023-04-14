"use client";
import useCart from "@/store/store";
import Link from "next/link";
import { FaShoppingCart, FaInstagram } from "react-icons/fa";

const Header = () => {
  const cartItems = useCart((state) => state.cart);
  const toggleModal = useCart((state) => state.toggleModal);

  return (
    <header className="sticky top-0 p-6 bg-white border-b border-solid border-blue-900 shadow-md z-50 text-2xl sm:text-3xl md:text-4xl sm:p-8 justify-between flex">
      <Link href="/">
        <h1 className="text-3xl font-bold hover:scale-105 transition duration-200 uppercase">
          Fruit Shop
        </h1>
      </Link>

      {/* shopping cart */}
      <div
        onClick={toggleModal}
        className="relative grid place-items-center group"
      >
        {cartItems.length > 0 && (
          <div className="absolute h-5 aspect-square sm:h-6 grid place-items-center top-0 bg-red-500 text-white rounded-full right-0 translate-x-1/2 -translate-y-1/2">
            <p className="text-xs sm:text-sm font-bold">{cartItems.length}</p>
          </div>
        )}
        <FaShoppingCart className="cursor-pointer group-hover:text-slate-500" />
      </div>
    </header>
  );
};

export default Header;
