import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Target, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const RatingsAndReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const performanceMetrics = {
    overall: 4.8,
    totalReviews: 47,
    metrics: {
      engagement: 4.9,
      contentQuality: 4.7,
      professionalism: 4.8,
      deadlines: 4.6
    },
    achievements: [
      "Top Beauty Influencer 2024",
      "100% Campaign Completion Rate",
      "Best ROI Performance Q1 2024"
    ],
    recentCampaigns: 12,
    successfulCollaborations: 35
  };

  const testimonials = [
    {
      id: 1,
      brand: "Nike",
      brandLogo: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg",
      campaign: "Summer Athletic Collection",
      rating: 5,
      review: "Exceptional performance! The campaign exceeded our engagement targets by 180%. Creative content and professional approach throughout.",
      metrics: {
        engagement: "+180%",
        reach: "2.1M",
        conversion: "12.5%"
      },
      date: "March 2024"
    },
    {
      id: 2,
      brand: "Zomato",
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      campaign: "Spring Beauty Launch",
      rating: 4.8,
      review: "Outstanding creativity in showcasing our products. The tutorial format resonated perfectly with our target audience.",
      metrics: {
        engagement: "+150%",
        reach: "1.8M",
        conversion: "10.2%"
      },
      date: "February 2024"
    },
    {
      id: 3,
      brand: "Samsung",
      brandLogo: "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$",
      campaign: "Galaxy S24 Launch",
      rating: 4.9,
      review: "Brilliant tech review content that highlighted our key features perfectly. Engagement rates were well above industry standards.",
      metrics: {
        engagement: "+165%",
        reach: "2.3M",
        conversion: "11.8%"
      },
      date: "January 2024"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Rest of the component remains the same until the testimonials section
  return (
    <div className="p-6 bg-white rounded-xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Performance & Recognition</h2>
        <div className="flex items-center space-x-2 text-blue-600">
          <Award className="w-5 h-5" />
          <span className="font-medium">Top 5% Creator</span>
        </div>
      </div>

      {/* Overall Rating Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
          <div className="flex items-center space-x-6">
            <div>
              <div className="text-6xl font-bold text-blue-600">{performanceMetrics.overall}</div>
              <div className="text-gray-600 mt-1">Overall Rating</div>
            </div>
            <div className="flex-1">
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6"
                    fill={i < Math.floor(performanceMetrics.overall) ? 'currentColor' : 'none'}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <p className="text-gray-600">{performanceMetrics.totalReviews} Brand Reviews</p>
              <p className="text-sm text-blue-600 mt-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Top performer in your category
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(performanceMetrics.metrics).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{value}</div>
              <div className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="flex flex-wrap gap-3">
          {performanceMetrics.achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              {achievement}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Testimonials Carousel */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Brand Testimonials</h3>
        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-gray-50 p-6">
            <div 
              className={`flex items-start space-x-4 transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <img
                src={testimonials[currentSlide].brandLogo}
                alt={testimonials[currentSlide].brand}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{testimonials[currentSlide].brand}</h4>
                    <p className="text-sm text-gray-600">{testimonials[currentSlide].campaign}</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={i < Math.floor(testimonials[currentSlide].rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonials[currentSlide].review}</p>
                <div className="grid grid-cols-3 gap-4 bg-white p-3 rounded-lg">
                  {Object.entries(testimonials[currentSlide].metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-bold text-blue-600">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-3">{testimonials[currentSlide].date}</div>
              </div>
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Slide indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">
                {performanceMetrics.recentCampaigns}
              </div>
              <div className="text-sm text-green-600">Recent Campaigns</div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {performanceMetrics.successfulCollaborations}
              </div>
              <div className="text-sm text-blue-600">Successful Collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsAndReviews;