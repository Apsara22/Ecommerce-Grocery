import  { useRef, useState } from "react";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Footer from "../component/Footer";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import CategoryProductsPage from "./CategoryProductsPage";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 👇 create ref for scrolling
  const productRef = useRef<HTMLDivElement | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);

    // 👇 scroll after state update
    setTimeout(() => {
      productRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* CATEGORY */}
        <CategoryPage onCategorySelect={handleCategorySelect} />

        {/* PRODUCTS (scroll target) */}
        <div ref={productRef}>
          {selectedCategory && (
            <CategoryProductsPage categoryId={selectedCategory} />
          )}
        </div>

        <ProductPage />
      </main>

      <Footer />
    </div>
  );
};

export default Home;