import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const COOKIE_KEY = "cookieConsent";
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  // Check if consent cookie exists
  useEffect(() => {
    const consent = Cookies.get(COOKIE_KEY);
    if (!consent) {
      setOpen(true);
      setTimeout(() => setShow(true), 10);
    }
  }, []);

  // Save user choice in cookie
  function save(choice) {
    Cookies.set(COOKIE_KEY, choice, { expires: 365, path: "/" }); // 1 year
    setShow(false);
    setTimeout(() => setOpen(false), 300);
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-50 flex justify-center transition-all duration-300 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="w-[min(900px,92%)] rounded-2xl border border-blue-200 bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-700">
            We use cookies to enhance your experience, analyze usage, and
            deliver relevant content. Manage preferences anytime in Cookie
            Settings.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => save("accepted")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transform transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Accept
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
