// components/AboutUs.tsx
export default function AboutUs() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900 text-center rounded-2xl shadow-md my-12 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
          About Waggo 
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          At <strong>Waggo</strong>, we believe that every pet deserves a second chance at life — a loving home, warm meals, and joyful companionship. Our mission is to connect kind-hearted individuals with pets looking for a forever family.
        </p>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          From rescuing abandoned animals to enabling seamless adoptions, Waggo is built to make adoption transparent, trustworthy, and full of hope. Whether you’re here to adopt, donate, or just show love — you’re already part of something beautiful.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src="https://www.sciencealert.com/images/articles/processed/andy-omvik-295479_1024.jpg"
          alt="About Waggo"
          className="w-full max-w-xl rounded-xl shadow-xl"
        />
      </div>
    </section>
  );
}
