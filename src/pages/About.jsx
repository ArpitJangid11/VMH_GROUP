import React from "react";

const About = (t) => {
  return <div className="max-w-4xl mx-auto mt-27">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-6">{t.about}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{t.aboutText}</p>
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl mb-3">🌍</div>
                      <h3 className="font-semibold text-blue-900">Global Reach</h3>
                      <p className="text-sm text-gray-600 mt-2">Research across 50+ countries</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl mb-3">📊</div>
                      <h3 className="font-semibold text-blue-900">Data Insights</h3>
                      <p className="text-sm text-gray-600 mt-2">Advanced analytics & reporting</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="text-3xl mb-3">👥</div>
                      <h3 className="font-semibold text-blue-900">Expert Team</h3>
                      <p className="text-sm text-gray-600 mt-2">15+ years of experience</p>
                    </div>
                  </div>
                </div>
              </div>;
};

export default About;
