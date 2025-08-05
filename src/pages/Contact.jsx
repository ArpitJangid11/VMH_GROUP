import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white mt-10 flex flex-col items-center justify-start py-12 md:py-20">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-10 mt-2">
        Contact VMH Market Research
      </h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-start">
        {/* Left Card */}
        <div className="w-full md:w-[390px] bg-blue-50 rounded-2xl shadow-md px-8 py-7">
          <h3 className="flex items-center text-blue-600 text-lg font-semibold mb-6">
            <FaPaperPlane className="mr-2" />
            Get in Touch
          </h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <FaMapMarkerAlt className="mt-1 text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Office:</span>  Jaipur, Rajasthan, India
              </div>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Phone:</span> +91 98765 43210
              </div>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Email:</span> support@vmhgroup.com
              </div>
            </li>
            <li className="flex items-center">
              <FaClock className="text-blue-600 mr-3" />
              <div>
                <span className="font-bold">Hours:</span> Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </li>
          </ul>
          <hr className="my-4 text-blue-600" />
          <p className="text-center text-gray-700 my-8">Follow Us</p>
          <div className="flex justify-center gap-8 px-3 text-gray-700 text-2xl mt-1 mb-30">
            <a href="#" aria-label="Facebook" className="hover:text-blue-700 transform transition-transform duration-200 hover:scale-150">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-600 transform transition-transform duration-200 hover:scale-150">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-900 transform transition-transform duration-200 hover:scale-150">
              <FaLinkedin />
            </a>
          </div>
        </div>
        {/* Right Card */}
        <div className="w-full md:w-[390px] bg-white rounded-2xl shadow-md px-8 py-7">
          <h3 className="flex items-center text-blue-600 text-lg font-semibold mb-6">
            <FaPaperPlane className="mr-2" />
            Send a Message
          </h3>
          <form className="flex flex-col space-y-4">
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Your Name *"
              required
            />
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Your Email *"
              required
            />
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Your Phone *"
              required
            />
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Subject (Optional)"
            />
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
              rows={4}
              placeholder="Your Message *"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 w-full rounded-md font-semibold text-white 
                bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-700 transform transition-transform duration-200 hover:scale-105"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
