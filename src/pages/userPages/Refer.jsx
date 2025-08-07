import React, { useState } from "react";

export default function ReferAndEarn() {
  // Simulated referral code (replace with user’s data)
  const referralCode = "ABCD1234";
  const referralLink = `https://vmhgroup.com/signup?ref=${referralCode}`;
  const [copied, setCopied] = useState("");

  // Copy to clipboard logic
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1700);
  };

  // Share logic (using the Web Share API if supported; fallback is alert)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me on YourApp!",
        text: "Sign up with my referral link and we both earn rewards.",
        url: referralLink,
      });
    } else {
      alert("Share feature not supported. Please copy the link manually.");
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-10 justify-center ">
      <div className="w-full max-w-md rounded-3xl shadow-2xl sm:mx-4 p-8 mx-4">
        <h2 className="text-2xl font-extrabold text-blue-600 mb-2 text-center tracking-wide">
          Refer & Earn
        </h2>
        <p className="text-gray-700 text-center mb-3">
          Invite friends and earn rewards!<br className="hidden sm:block"/>
          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-yellow-200 font-semibold text-yellow-900 text-base transition-all hover:scale-105 duration-300 shadow border border-yellow-400">
            You get $10 for every friend’s first transaction!
          </span>
        </p>
        
        {/* Code section */}
        <div className="my-6 flex items-center gap-2 justify-center">
          <span className="bg-white text-blue-600 font-mono px-4 py-2 rounded-lg border border-blue-200 text-base shadow cursor-pointer transition-all hover:scale-105 hover:shadow-md"
                title="Copy referral code"
                onClick={() => handleCopy(referralCode, "code")}>
            {referralCode}
          </span>
          <button
            className="ml-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold transition hover:bg-blue-600 active:bg-blue-800 shadow hover:shadow-lg"
            onClick={() => handleCopy(referralCode, "code")}
            aria-label="Copy code"
          >
            {copied === "code" ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Link section */}
        <div className="flex items-center gap-2 mb-5">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 font-mono text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => handleCopy(referralLink, "link")}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold transition hover:bg-blue-600 active:bg-sky-700 shadow hover:shadow-lg"
            aria-label="Copy link"
          >
            {copied === "link" ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full py-3 mt-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-600 bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
        >
          <span className="transition-all duration-150 group-hover:translate-x-1">Share with Friends</span>
          <svg className="w-5 h-5 text-white group-hover:scale-125 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M16 12l-4-4m0 0l-4 4m4-4v12"/>
          </svg>
        </button>
        
        {/* Terms */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          *Reward credited after your friend completes their first transaction.<br/>
          Terms & conditions apply.
        </p>
      </div>
    </div>
  );
}
