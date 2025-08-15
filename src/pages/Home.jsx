import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import RewardsStats from "./homepage/RewardsStats";
import HowItWorks from "./homepage/HowItWorksPage";
import ServiceCards from "./homepage/ServiceCards";
import ImageSection from "./homepage/ImageSection";
import AboutUs from "./homepage/aboutus";
import WhyChooseUs from "./homepage/WhyUs";
import StepJoinSection from "./homepage/StepJoinSection";

const Home = ({ t, user }) => {
  const location = useLocation();

  // When coming from another page with { state: { scrollTo: 'id' } }
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // small delay to ensure DOM is ready
      }
    }
  }, [location]);

  return (
    <div>
      {/* Hero Section */}
      <ImageSection t={t} className="relative min-h-screen flex items-center">
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl text-left text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Get rewarded with your quality and right opinion.
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed">
              Your honest opinion will help to choose the world's industries to
              take right decisions for their businesses
            </p>

            {user && (
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-blue-300">
                {t.hi} {user.fullName}
              </h4>
            )}

            <Link
              to={
                user
                  ? user.role === "admin"
                    ? "/admin"
                    : "/Dashboard"
                  : "/login"
              }
            >
              <button className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                {user ? t.dashboard : "Join Us Today"}
                <svg
                  className="ml-2 w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </ImageSection>

      {/* Service Cards */}
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 z-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <ServiceCards t={t} user={user}/>
      </div>

      {/* Sections with IDs for smooth scroll */}
      <div className="mt-8 sm:mt-12 md:mt-16">
        <section id="about" className="scroll-mt-24">
          <AboutUs t={t} user={user} />
        </section>

        <section id="how-it-works" className="scroll-mt-24">
          <HowItWorks t={t} />
        </section>

        <section id="why-us" className="scroll-mt-24">
          <WhyChooseUs t={t} />
        </section>

        <section id="steps-to-join" className="scroll-mt-24">
          <StepJoinSection t={t} user={user}/>
        </section>

        {/* Optional Rewards section if needed in navbar */}
        <section id="rewards" className="scroll-mt-24">
          <RewardsStats t={t} />
        </section>
      </div>
    </div>
  );
};

export default Home;
