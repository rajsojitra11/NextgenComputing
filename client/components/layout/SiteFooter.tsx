import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
        <div>
          <h3 className="text-white text-lg font-semibold">
            Nextgen Computing
          </h3>
          <p className="mt-3 text-sm text-slate-400 max-w-sm">
            Your trusted partner in technology — computers, laptops, and expert
            repair services with a commitment to quality and speed.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                className="hover:text-white transition-colors"
                to="/products"
              >
                Shop Products
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white transition-colors"
                to="/services"
              >
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white transition-colors"
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Phone: +91 8469283448</li>
            <li>Email: nextgencomputing01@gmail.com</li>
            <li>Address: Bopal, Ahmedabad, Gujarat</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Nextgen Computing. All rights reserved.
      </div>
    </footer>
  );
}
