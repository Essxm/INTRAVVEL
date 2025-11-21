import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationsProps {
  title: string;
  subtitle: string;
  items: Destination[];
  id?: string;
}

const Destinations: React.FC<DestinationsProps> = ({ title, subtitle, items, id }) => {
  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-primary shadow-sm">
                  <Star size={14} className="fill-gold text-gold" />
                  {item.rating}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-primary/80 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-darkGray group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin size={14} className="mr-1" />
                      {item.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">From</p>
                    <p className="text-xl font-bold text-primary">${item.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mt-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-400">{item.reviewsCount} reviews</span>
                  <button className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;