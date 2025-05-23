import { useState } from "react";
import { Menu } from "lucide-react"; 

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Hamburger Button (Hide when sidebar opens) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-50 p-2 border text-black rounded-md transition-opacity ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Menu size={24} />
      </button>

      {/* 🔹 Light Overlay (Prevents Click-Through, No Blackout) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-30" // 👈 Reduced opacity
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 🔹 Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Navigation Links */}
        <nav className="p-6 space-y-4 text-lg font-medium">
          <a href="#" className="block text-gray-700 hover:text-green-600">Home</a>
          <a href="#" className="block text-gray-700 hover:text-green-600">Our Story</a>
          <a href="#" className="block text-gray-700 hover:text-green-600">Key Features</a>
          <a href="#" className="block text-gray-700 hover:text-green-600">Featured Countries</a>
          <a href="#" className="block text-gray-700 hover:text-green-600">Blog</a>
          <a href="#" className="block text-gray-700 hover:text-green-600">Contact</a>
        </nav>
      </div>
    </>
  );
}
