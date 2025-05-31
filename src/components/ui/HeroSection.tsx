import { ReactNode } from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage = '/images/hero-barista.jpg', 
  children 
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-[length:100%_auto] md:bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        }}
      />
      <div className="container-custom text-white px-4 md:px-6 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          {typeof title === 'string' ? (
            <EditableText 
              text={title} 
              tag="h1" 
              className="text-3xl md:text-5xl font-bold mb-4 leading-tight" 
            />
          ) : (
            title
          )}
          {subtitle && (
            <EditableText 
              text={subtitle} 
              tag="p" 
              className="text-lg md:text-xl mb-6 md:mb-8 opacity-90" 
            />
          )}
          <div className="flex flex-wrap gap-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
