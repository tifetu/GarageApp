// components/Footer.jsx
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Twitter,
  Chrome,
} from "lucide-react";

function Footer() {
  const usefulLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Appointment", href: "#contact" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact Us", href: "#contact" },
  ];

  const services = [
    { title: "Performance Upgrade" },
    { title: "Transmission Service" },
    { title: "Break Repair & Service" },
    { title: "Engine Service & Repair" },
    { title: "Tyre & Wheels" },
  ];

  return (
    <footer
      className=" text-white"
      style={{ backgroundColor: "#091436" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info */}
        <div className="space-y-4 flex justify-around">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-red-500 mr-3 mt-1" />
            <div>
              <div className="text-sm text-gray-300">
                548. Talkto! Town $238 MT,
              </div>
              <div className="text-sm text-gray-300">La city, IA $22364</div>
            </div>
          </div>

          <div className="flex items-center">
            <Mail className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <div className="text-sm text-gray-300">Email us :</div>
              <div className="text-sm text-white">contact@autorex.com</div>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <div className="text-sm text-gray-300">Call us on :</div>
              <div className="text-lg font-semibold text-white">
                + 1800 456 7890
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-white py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl w-full px-4">
            {/* Description */}
            <div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs.
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Useful Links
              </h4>
              <ul className="space-y-2">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Our Services
              </h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">
                Newsletter
              </h4>
              <p className="text-sm text-gray-300 mb-4">
                Get latest updates and offers.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Chrome className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
