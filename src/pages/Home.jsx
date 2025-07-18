import { Link } from "react-router-dom";

const Home = ({ t, user}) => {
  return (
     <div className="text-center py-16">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">{t.welcome}</h1>
                  <p className="mt-4 text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t.slogan}</p>
                  
                  {user ? (
                    <div>

                      <h4 className="text-5xl md:text-6xl font-bold capitalize text-gray-500 mb-6 leading-tight">{t.hi}{user.fullName}</h4>
                      
                      <Link to={user.role ==="admin"?"/admin":"/Dashboard"}>
                        <button
                          className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                          {t.dashboard}
                        </button>
                      </Link>
                    </div>
                  ):(
                    <Link to="/login">
                      <button
                        className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {t.joinNow}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
  );
};

export default Home;
