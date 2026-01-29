import {
  SectionTitle
} from "@/components";
import { Loader } from "@/components/Loader";
import { CartModule } from "@/components/modules/cart";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h1>
          <p className="text-gray-500 text-sm mt-1">Beranda / Keranjang</p>
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <Suspense fallback={<Loader />}>
          <CartModule />
        </Suspense>
      </div>
    </div>
  );
};

export default CartPage;
