import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return (
    <div className="flex justify-center flex-col mt-10">
      <h1 className="text-2xl font-bold p-10 bg-red-300 rounded">
        Something went wrong, cannot process order now.
      </h1>
      <div className="mt-5">
        <Link href="/">HOME</Link>
      </div>
    </div>
  );
};

export default CancelPage;
