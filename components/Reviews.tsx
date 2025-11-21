import React from 'react';
import { Quote } from 'lucide-react';
import { Review } from '../types';

const reviews: Review[] = [
  {
    id: '1',
    user: 'Sarah Jenkins',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Maldives',
    rating: 5,
    text: "INTRAVVEL made our honeymoon absolutely magical. The AI planner suggested a hidden gem resort we would never have found on our own. Seamless experience from start to finish."
  },
  {
    id: '2',
    user: 'Ahmed Al-Fayed',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Swiss Alps',
    rating: 5,
    text: "The attention to detail is unmatched. I've used many platforms, but the luxury filters and specific weather insights here are game changers. Highly recommended for serious travelers."
  },
  {
    id: '3',
    user: 'Elena Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    location: 'Kyoto',
    rating: 5,
    text: "Booking was incredibly fast. I loved the interactive map feature to visualize my multi-city trip. Customer support was responsive within minutes."
  }
];

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Traveler Stories</h2>
          <p className="text-blue-200 text-lg">Real experiences from our global community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/10 backdrop-blur border border-white/10 p-8 rounded-3xl hover:bg-white/20 transition-colors">
              <Quote className="text-gold mb-6" size={40} />
              <p className="text-lg italic mb-6 text-gray-100 leading-relaxed">"{review.text}"</p>
              
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full border-2 border-gold" />
                <div>
                  <h4 className="font-bold">{review.user}</h4>
                  <p className="text-sm text-blue-300">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;