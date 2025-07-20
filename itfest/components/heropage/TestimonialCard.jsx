import { Star, User } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-80 h-64 flex flex-col flex-shrink-0">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.position}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {renderStars(testimonial.rating)}
      </div>
      
      <p className="text-gray-700 italic flex-1">"{testimonial.message}"</p>
    </div>
  );
};

export default TestimonialCard;
