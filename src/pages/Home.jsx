import { Link } from "react-router-dom";
import RewardsStats from "./homepage/RewardsStats";
import HowItWorks from "./homepage/HowItWorksPage";
import ServiceCards from "./homepage/ServiceCards";
import ImageSection from "./homepage/ImageSection";
import AboutUs from "./homepage/aboutus";
import WhyChooseUs from "./homepage/WhyUs";
import StepJoinSection from "./homepage/StepJoinSection";

const Home = ({ t, user }) => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <ImageSection className="relative min-h-screen flex items-center">
        {/* Hero Content - Responsive */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl text-left text-white">
            {/* Responsive Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Get rewarded with your quality and right opinion.
            </h1>
            
            {/* Responsive Paragraph */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed">
              Your honest opinion will help to choose the world's industries to take 
              right decisions for their businesses
            </p>
            
            {user && (
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-blue-300">
                {t.hi} {user.fullName}
              </h4>
            )}
            
            <Link to={user ? (user.role === "admin" ? "/admin" : "/Dashboard") : "/login"}>
              <button className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                {user ? t.dashboard : "Join Us Today"}
                <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </ImageSection>

      {/* Service Cards - Responsive Overlapping */}
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 z-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <ServiceCards />
      </div>
      
      {/* Other Sections with Responsive Spacing */}
      <div className="mt-8 sm:mt-12 md:mt-16">
        <RewardsStats />
        <HowItWorks />
        <AboutUs></AboutUs>
        <WhyChooseUs></WhyChooseUs>
        <StepJoinSection></StepJoinSection>
      </div>
    </div>
  );
};

export default Home;
