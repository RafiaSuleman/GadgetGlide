import Link from "next/link";
import SubscribeForm from "./subscribeForm";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black tracking-tighter text-blue-500">
            TECH<span className="text-white">PULSE</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop destination for the latest laptops, smartphones, and high-performance accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
            <li><Link href="/category/laptops" className="hover:text-blue-500 transition">Laptops</Link></li>
            <li><Link href="/category/mobiles" className="hover:text-blue-500 transition">Mobiles</Link></li>
            <li><Link href="/admin" className="hover:text-blue-500 transition">Admin Panel</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-blue-500 cursor-pointer">Help Center</li>
            <li className="hover:text-blue-500 cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-500 cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and news.</p>
          <SubscribeForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-xs">
        <p>© 2026 TechPulse Store. All rights reserved. Designed with ❤️ for BSCS Project.</p>
      </div>
    </footer>
  );
};

export default Footer;