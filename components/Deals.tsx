import React from 'react';
import { Timer } from 'lucide-react';

const deals = [
  {
    id: '1',
    location: 'Santorini, Greece',
    discount: '40% OFF',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    location: 'Kyoto, Japan',
    discount: '25% OFF',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop'
  }
];

const Deals: React.FC = () => {
  return (
    <section id="deals" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <span className="text-gold font-bold tracking-wider uppercase">Limited Time Offer</span>
            <h2 className="text-4xl font-bold text-primary mt-2">Exclusive Deals</h2>
          </div>
          <div className="flex items-center gap-4 bg-red-50 text-red-500 px-6 py-3 rounded-2xl mt-4 md:mt-0">
            <Timer />
            <span className="font-mono text-xl font-bold">23:15:09</span>
            <span className="text-sm">Remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="relative h-80 md:h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <img 
                src={deal.image} 
                alt={deal.location} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute top-6 left-6">
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-pulse">
                  {deal.discount}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-bold mb-1">{deal.location}</h3>
                  <p className="text-gray-300">All Inclusive • 5 Days</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-lg line-through">$2,500</p>
                  <p className="text-3xl font-bold text-gold">${deal.price}</p>
                  <button className="mt-2 bg-white text-primary px-6 py-2 rounded-full font-semibold text-sm hover:bg-gold hover:text-white transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;