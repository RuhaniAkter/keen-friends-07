import { Link } from "react-router";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import x from "../assets/twitter.png";

export default function Footer() {
  return (
    <footer className="bg-[#243d30] text-white px-6 md:px-10 pt-14 pb-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">KeenKeeper</h1>
        <p className="text-white/70 text-sm max-w-md mx-auto px-4 md:px-0">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <p className="mt-6 mb-3 text-sm">Social Links</p>
        <div className="flex justify-center gap-3">
          <a
            href="#"
            className="bg-[#1a2e22] rounded-full p-2.5 hover:bg-white/10 transition"
          >
            <img src={instagram} alt="Instagram" className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="bg-[#1a2e22] rounded-full p-2.5 hover:bg-white/10 transition"
          >
            <img src={facebook} alt="Facebook" className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="bg-[#1a2e22] rounded-full p-2.5 hover:bg-white/10 transition"
          >
            <img src={x} alt="X" className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* রেসপনসিভ বটম বার */}
      <div className="border-t border-white/15 pt-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-xs text-white/50 text-center md:text-left">
        <span>© 2026 KeenKeeper. All rights reserved.</span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
