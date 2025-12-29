import { useEffect, useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-50
            bg-orange-500 hover:bg-orange-600
            text-white
            p-4 rounded-full
            shadow-lg
            animate-bounceUpDown
            transition-all duration-300
            hover:scale-110
          "
          aria-label="Back to top"
          title="Lên đầu trang"
        >
          <i className="fa-solid fa-hand-point-up"></i>
        </button>
      )}
    </>
  );
};

export default BackToTop;
