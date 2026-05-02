import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-300 px-6 md:px-16 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Company */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">About Us</li>
            <li className="hover:text-white transition cursor-pointer">Jobs</li>
            <li className="hover:text-white transition cursor-pointer">All Rights Reserved</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">For Advertisement</li>
            <li className="hover:text-white transition cursor-pointer">
              Developer: Md Arif Ansari
            </li>
          </ul>
        </div>

        {/* Premium */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Premium</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              Premium for Better Experience
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Premium for Family
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Support Us
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-xs text-zinc-500">
        © 2026 Your Company. Built with passion.
      </div>
    </footer>
  );
};

export default Footer;