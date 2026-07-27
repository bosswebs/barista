import Layout from '../components/layout/Layout';
import HeroSection from '../components/ui/HeroSection';
import SectionTitle from '../components/ui/SectionTitle';
import TrainerCard from '../components/ui/TrainerCard';

const Trainers = () => {
  // Trainer Data
  const trainers = [
    {
      name: "Egide HATEGEKIMANA",
      role: "Senior trainer, instructor, bartender and beverage enthusiast",
      image: "images/wood1.jpg",
      bio: "The man of integrity ,He has seen all ,with Rwandan nationality  Egide has 0ver 15 years of working experience on both national and international level, worked in luxurious hotels, bars and coffee shops, good story telling in hospitality industry, he has completed university studies in hospitality management specialization F&B operations, three years as operations manager in 3*** hotel and resort, 3years as senior bartender at one of high-end lodges in Rwanda also worked as barista, waiter, online content creator(tutorials), 4 years as TSS (technical secondary schools) trainer in culinary arts in fact he has seen all."
    },
    {
      name: "Jean Claude NIKOLA",
      role: "A sommelier by professional, senior trainer and wine researcher",
      image: "images/wood1.jpg",
      bio: "The man of ambitious, With Rwandan nationality claude combines technical coffee, spirit and wines knowledge with exaptational mixology skills, has completed university studies in hospitality management from Uganda kampala, worked as peace keeping agent at international level (darri-fur) Sudan, claude known for his innovative cocktail creations and deep knowledge of wines, traveled extensively throughout wine regions in France (Beaurdaux), Italy, Spain, California as well as south Africa."
    },
    {
      name: "SHUBHAM GARG",
      role: "Head Mixology Trainer & Hospitality Expert",
      image: "images/trainers/shubham-garg.jpg",
      bio: "Passionate and dedicated hospitality professional with over 6 years of experience in Bar, Restaurant, and overall food and beverage service. Proven ability to deliver exceptional customer service, manage operations, and contribute to smooth and efficient service delivery. Adept at working in fast-paced environments, with strong focus on quality and guest satisfaction"
    },
    {
      name: "Christine Mugisha",
      role: "Barista & Customer Service Trainer",
      image: "images/wood1.jpg",
      bio: "Christine combines technical coffee knowledge with exceptional customer service skills. She previously managed several coffee shops in Kigali and specializes in coffee bean selection."
    },
    {
      name: "Robert Ndungutse",
      role: "Mixology Specialist",
      image: "images/wood1.jpg",
      bio: "Robert is known for his innovative cocktail creations and deep knowledge of spirits. He has won several regional bartending competitions and brings a creative approach to mixology."
    },
    {
      name: "Sarah Mutesi",
      role: "Wine Education Specialist",
      image: "images/wood1.jpg",
      bio: "Sarah has traveled extensively throughout wine regions in France, Italy, and South Africa. She specializes in wine tasting techniques and sensory evaluation."
    }
  ];

  return (
    <Layout>
      <HeroSection
        backgroundImage="/images/wood1.jpg"
        title="Meet Our Trainers"
        subtitle="Learn from the best in the industry"
      />

      {/* Trainers Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Our Expert Trainers" 
            subtitle="Our trainers bring years of real-world experience to the classroom"
            center={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <TrainerCard
                key={index}
                name={trainer.name}
                role={trainer.role}
                image={trainer.image}
                bio={trainer.bio}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Join Our Team of Trainers" 
                subtitle="Are you passionate about hospitality education? We're always looking for talented trainers to join our team."
              />
              <p className="text-lg mb-6">
                If you have extensive experience in bartending, barista skills, or as a sommelier, we'd love to hear from you. Beyond Barista Academy offers a supportive and dynamic environment where you can share your knowledge and help shape the next generation of hospitality professionals.
              </p>
              <a href="/career" className="btn-primary inline-block">
                View Career Opportunities
              </a>
            </div>
            <div>
              <img
                src="images/herosection.jpg"
                alt="Join our team"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trainers;
