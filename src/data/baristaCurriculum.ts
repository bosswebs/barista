export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'exam';
  videoUrl?: string;
  content: string;
}

export interface BaristaModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  lessons: LessonItem[];
}

export const BARISTA_CURRICULUM: BaristaModule[] = [
  {
    id: 'mod-01',
    moduleNumber: 1,
    title: 'Module 01: Introduction to Coffee',
    description: 'Explore the origin history of coffee, the botanical taxonomy (Arabica vs. Robusta), global coffee belt geography, and the journey from seed to cup.',
    lessons: [
      {
        id: 'les-01-01',
        title: '1.1 History and Origins of Coffee (Ethiopia to the World)',
        duration: '15 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=J3-wH0tO6wY',
        content: 'Discover Kaldi the goat herder in Ethiopia, the early trade routes through Yemen (Mocha), the Ottoman Empire coffee houses, and how coffee conquered Europe and the Americas.'
      },
      {
        id: 'les-01-02',
        title: '1.2 Coffee Plant Botany: Arabica vs. Robusta',
        duration: '20 mins',
        type: 'reading',
        content: 'Deep dive into Coffea Arabica (Bourbon, Typica, Gesha) versus Coffea Canephora (Robusta). Compare chromosome counts, caffeine levels, lipid percentages, altitude requirements, and flavor profiles.'
      },
      {
        id: 'les-01-03',
        title: '1.3 The Global Coffee Belt & Major Producing Regions',
        duration: '18 mins',
        type: 'reading',
        content: 'Learn how terroir, latitude, volcanic soils, rainfall patterns, and shade-grown ecosystems influence body, acidity, and aromatic complexity in Central/South America, East Africa, and Asia-Pacific.'
      }
    ]
  },
  {
    id: 'mod-02',
    moduleNumber: 2,
    title: 'Module 02: Brewing',
    description: 'Master the physics and chemistry of coffee extraction, brew ratios, grind particle size distribution, contact time, water temperature, and manual pour-over devices.',
    lessons: [
      {
        id: 'les-02-01',
        title: '2.1 The 6 Golden Rules of Manual Extraction',
        duration: '22 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=1oB1oDrDkHM',
        content: 'Detailed breakdown of coffee-to-water ratios (1:15 to 1:17), water temperature (90-96°C), grind size consistency, turbulence/agitation, filter media selection, and contact duration.'
      },
      {
        id: 'les-02-02',
        title: '2.2 Manual Pour-Over Devices (V60, Chemex, Kalita Wave)',
        duration: '25 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=AI4ynXzkSQo',
        content: 'Step-by-step pouring techniques for Hario V60 conical filters, thick paper Chemex filtration, and flat-bottom Kalita Wave geometry. Master bloom phase gas release.'
      },
      {
        id: 'les-02-03',
        title: '2.3 Full Immersion vs. Percolation Mechanics',
        duration: '15 mins',
        type: 'reading',
        content: 'Compare French Press and AeroPress full-immersion extraction against gravity percolation. Measure total dissolved solids (TDS) and extraction yield percentages (18-22%).'
      }
    ]
  },
  {
    id: 'mod-03',
    moduleNumber: 3,
    title: 'Module 03: Roasting Science',
    description: 'Understand heat transfer (conduction, convection, radiation), the Maillard reaction, caramelization, first crack, and roast profile curves.',
    lessons: [
      {
        id: 'les-03-01',
        title: '3.1 Heat Transfer Mechanics in Drum & Air Roasters',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=uK1XW1b2Rlg',
        content: 'Examine convective hot-air flow and conductive drum wall contact. Follow moisture evaporation, endothermic drying phases, and Rate of Rise (RoR) management.'
      },
      {
        id: 'les-03-02',
        title: '3.2 Chemical Transformations: Maillard Reaction & First Crack',
        duration: '25 mins',
        type: 'reading',
        content: 'Analyze how amino acids and reducing sugars break down during the Maillard reaction, generating aromatic pyrazines, furans, and organic acids. Pinpoint First Crack acoustic release.'
      },
      {
        id: 'les-03-03',
        title: '3.3 Light, Medium, Dark Roast Profiles & Agtron Scoring',
        duration: '15 mins',
        type: 'reading',
        content: 'Evaluate light cinnamon/city roasts, medium full-city roasts, and dark French/Italian roasts using infrared Agtron spectrophotometer scale numbers.'
      }
    ]
  },
  {
    id: 'mod-04',
    moduleNumber: 4,
    title: 'Module 04: Sensory Skills Fundamentals & Flavor Development',
    description: 'Train your palate with the SCA Flavor Wheel, Le Nez du Café aromas, taste balance (sweet, sour, bitter, salty, umami), and formal cupping protocols.',
    lessons: [
      {
        id: 'les-04-01',
        title: '4.1 SCA Standard Cupping Protocol & Triangulation',
        duration: '30 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=83pQc40p-tM',
        content: 'Set up an official SCA cupping table: 8.25g coffee per 150ml water, 4-minute steep, crust break technique, olfactory fragrance assessment, and scoring sheets.'
      },
      {
        id: 'les-04-02',
        title: '4.2 The SCA Coffee Taster\'s Flavor Wheel & Olfactory Memory',
        duration: '20 mins',
        type: 'reading',
        content: 'Navigate floral, fruity (enzymatic), roasted, caramelized (sugar brown), and dry distillation note categories. Practice identifying sensory references.'
      }
    ]
  },
  {
    id: 'mod-05',
    moduleNumber: 5,
    title: 'Module 05: Green Coffee Grading & Quality Control',
    description: 'Learn green bean inspection, physical defect classification (primary & secondary defects), moisture analysis, and screening sizes.',
    lessons: [
      {
        id: 'les-05-01',
        title: '5.1 SCA Green Coffee Defect Classification',
        duration: '25 mins',
        type: 'reading',
        content: 'Identify primary defects (full black, full sour, pod/cherry, fungus damage) and secondary defects (partial sour, broken/chipped, insect damage, parchment).'
      },
      {
        id: 'les-05-02',
        title: '5.2 Moisture Content, Density & Bean Screen Sizing',
        duration: '20 mins',
        type: 'reading',
        content: 'Utilize digital moisture meters (target 10.5% - 11.5%), water activity meters (aW < 0.60), and brass screen mesh sizes (14/16/18 AA/AB grades).'
      }
    ]
  },
  {
    id: 'mod-06',
    moduleNumber: 6,
    title: 'Module 06: Barista Skills',
    description: 'Master commercial espresso machine operation, grinder calibration, dose distribution, level tamping, microfoam texturing, and latte art execution.',
    lessons: [
      {
        id: 'les-06-01',
        title: '6.1 Espresso Extraction Mechanics & Dialing-In',
        duration: '35 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=g2Wd4e2D3eA',
        content: 'Set up 18g dose in a double portafilter basket for a 36g yield in 27-30 seconds at 9 bar pressure and 93°C temperature. Adjust micro-grind collars.'
      },
      {
        id: 'les-06-02',
        title: '6.2 Milk Steaming, Texturing & Latte Art Foundations',
        duration: '30 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=R9_u2wXf398',
        content: 'Aeration vs. stretching phase, vortex circulation to 60-65°C, pitcher angle, and free-pour techniques for the Heart, Rosetta, and Tulip patterns.'
      }
    ]
  },
  {
    id: 'mod-07',
    moduleNumber: 7,
    title: 'Module 07: Coffee Shop Operations',
    description: 'Organize high-volume workflow, bar ergonomics, stock rotation (FIFO), order station queuing, and peak hour rush throughput.',
    lessons: [
      {
        id: 'les-07-01',
        title: '7.1 Efficient Bar Ergonomics & Workflow Lines',
        duration: '20 mins',
        type: 'reading',
        content: 'Design linear and triangular bar layouts: Order POS -> Grinder -> Espresso Machine -> Milk Station -> Hand-off Counter.'
      },
      {
        id: 'les-07-02',
        title: '7.2 Inventory Control, FIFO & Waste Minimization',
        duration: '18 mins',
        type: 'reading',
        content: 'Implement First-In-First-Out stock rotation for fresh roasts, milk cartons, syrups, and packaging. Track daily waste logs.'
      }
    ]
  },
  {
    id: 'mod-08',
    moduleNumber: 8,
    title: 'Module 08: Customer Service and Barista Professionalism',
    description: 'Deliver hospitable, memorable customer service, handle customer complaints, maintain professional grooming, and uphold hospitality ethics.',
    lessons: [
      {
        id: 'les-08-01',
        title: '8.1 The Art of Genuine Rwandan Hospitality (Ikaze)',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=VnJ5A2e-Z9Q',
        content: 'Welcome guests with warmth, eye contact, and active listening. Create custom beverage suggestions based on preference profiles.'
      },
      {
        id: 'les-08-02',
        title: '8.2 Conflict Resolution & Handling Service Recovery (LAST Method)',
        duration: '15 mins',
        type: 'reading',
        content: 'Apply the Listen, Apologize, Solve, and Thank protocol for remaking incorrect drinks, dietary misunderstandings, or wait-time delays.'
      }
    ]
  },
  {
    id: 'mod-09',
    moduleNumber: 9,
    title: 'Module 09: Menu and Recipe Development',
    description: 'Design profitable coffee menus, calculate food & beverage cost percentages, standardise drink specs, and create seasonal specials.',
    lessons: [
      {
        id: 'les-09-01',
        title: '9.1 Drink Costing Formulas & Profit Margins',
        duration: '22 mins',
        type: 'reading',
        content: 'Calculate Cost of Goods Sold (COGS) per cup: espresso dose cost + milk volume cost + cup/lid cost + syrup cost to maintain 15-22% COGS.'
      },
      {
        id: 'les-09-02',
        title: '9.2 Designing Balanced Classic & Contemporary Coffee Menus',
        duration: '20 mins',
        type: 'reading',
        content: 'Structure menu categories: Espresso Classics, Filter Pour-Overs, Signature Cold Brews, Herbal/Tea Infusions, and Non-Dairy Alternatives.'
      }
    ]
  },
  {
    id: 'mod-10',
    moduleNumber: 10,
    title: 'Module 10: Prepare Iced and Specialty Drink',
    description: 'Craft iced lattes, cold brew extractions, nitro cold brew, frappés, macchiatos, and artisanal flavored signature syrups.',
    lessons: [
      {
        id: 'les-10-01',
        title: '10.1 Cold Brew Immersion vs. Japanese Flash Brew Technique',
        duration: '25 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=Jj4jV7bK3A4',
        content: 'Compare 18-hour cold immersion steeped in Toddy systems vs. direct pour-over over ice (flash brewing) to preserve delicate aromatic top notes.'
      },
      {
        id: 'les-10-02',
        title: '10.2 Craft Syrups & Blended Iced Beverages (Frappés)',
        duration: '20 mins',
        type: 'reading',
        content: 'Cook 1:1 and 2:1 simple syrups infused with vanilla bean, salted caramel, cardamom, or cinnamon. Emulsify blended iced frappes.'
      }
    ]
  },
  {
    id: 'mod-11',
    moduleNumber: 11,
    title: 'Module 11: Basic Cooking Skills',
    description: 'Learn fundamental culinary knife skills, toasties, breakfast sandwiches, egg preparation, and light café food menu items.',
    lessons: [
      {
        id: 'les-11-01',
        title: '11.1 Essential Kitchen Safety, Sanitation & Knife Handling',
        duration: '20 mins',
        type: 'reading',
        content: 'Master chef knife grip, claw position cutting technique, cutting board color coding (raw meat vs. produce vs. dairy), and cross-contamination rules.'
      },
      {
        id: 'les-11-02',
        title: '11.2 Café Breakfast Sandwiches & Gourmet Toasties',
        duration: '25 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=9XW1rA7Q5a8',
        content: 'Prepare avocado sourdough toast with poached eggs, croque monsieur, and toasted panini pairings designed for quick café counter service.'
      }
    ]
  },
  {
    id: 'mod-12',
    moduleNumber: 12,
    title: 'Module 12: Prepare Ice Cream',
    description: 'Understand gelato & ice cream base formulations, churn temperatures, and classic Affogato al Caffè preparation.',
    lessons: [
      {
        id: 'les-12-01',
        title: '12.1 Ice Cream & Gelato Fat-Sugar Balance',
        duration: '18 mins',
        type: 'reading',
        content: 'Differentiate French custard ice cream from Italian gelato (lower butterfat, less overrun air). Maintain ideal scoop temperatures (-12°C).'
      },
      {
        id: 'les-12-02',
        title: '12.2 The Authentic Affogato al Caffè & Artisan Sundaes',
        duration: '15 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=0k5X2N3zV4w',
        content: 'Pour a fresh double espresso shot directly over a dense scoop of vanilla bean gelato. Add crushed hazelnut or amaretto garnishes.'
      }
    ]
  },
  {
    id: 'mod-13',
    moduleNumber: 13,
    title: 'Module 13: Prepare and Understand Drink Water',
    description: 'Analyze water chemistry for coffee: Total Hardness, Calcium/Magnesium ions, Total Alkalinity, pH levels, and Reverse Osmosis (RO) filtration.',
    lessons: [
      {
        id: 'les-13-01',
        title: '13.1 SCA Water Specifications & Chemical Components',
        duration: '22 mins',
        type: 'reading',
        content: 'Target 150 mg/L TDS, 50-70 mg/L total hardness (Ca2+ and Mg2+), 40 mg/L alkalinity, and neutral 7.0 pH for ideal extraction without scale buildup.'
      },
      {
        id: 'les-13-02',
        title: '13.2 Water Filtration Systems (Carbon, Softeners, RO Remineralization)',
        duration: '20 mins',
        type: 'reading',
        content: 'Evaluate activated carbon block filters, ion-exchange softening resins, and Reverse Osmosis with calcifying bypass valves.'
      }
    ]
  },
  {
    id: 'mod-14',
    moduleNumber: 14,
    title: 'Module 14: Prepare Welcoming Drink and Food Pairing',
    description: 'Design non-alcoholic welcome aperitifs, palate cleansers, and harmonize acidity/sweetness between pastry items and specific coffee origins.',
    lessons: [
      {
        id: 'les-14-01',
        title: '14.1 Crafting Sparkling & Herbal Welcome Drinks',
        duration: '15 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=3V4x9X2zW10',
        content: 'Prepare sparkling ginger-lemon waters, hibiscus (Bissap/Karkadeh) coolers, and cold infused herb waters served to arriving café guests.'
      },
      {
        id: 'les-14-02',
        title: '14.2 Complementary & Contrast Food Pairing Principles',
        duration: '20 mins',
        type: 'reading',
        content: 'Pair bright Ethiopian Yirgacheffe (citrus/floral) with lemon tarts, and heavy-bodied Sumatra (earthy/spicy) with dark chocolate desserts.'
      }
    ]
  },
  {
    id: 'mod-15',
    moduleNumber: 15,
    title: 'Module 15: Prepare Hot and Cold Beverages',
    description: 'Master Loose-Leaf Teas, Matcha Lattes, Chai Lattes, Artisan Hot Chocolates, and Golden Turmeric Milk.',
    lessons: [
      {
        id: 'les-15-01',
        title: '15.1 Tea Categorization, Steeping Temperatures & Timing',
        duration: '20 mins',
        type: 'reading',
        content: 'Steep White/Green teas (70-80°C, 2-3 mins), Oolong (85°C), Black Teas (95°C, 4-5 mins), and Rooibos/Herbal infusions (100°C, 5-7 mins).'
      },
      {
        id: 'les-15-02',
        title: '15.2 Ceremonial Grade Matcha & Masala Chai Latte Techniques',
        duration: '22 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=1V4x9X2zW10',
        content: 'Whisk Japanese ceremonial matcha in a Chawan bowl with a bamboo Chasen. Simmer whole-spice Assam black tea for authentic Chai.'
      }
    ]
  },
  {
    id: 'mod-16',
    moduleNumber: 16,
    title: 'Module 16: Cleaning and Maintenance of Espresso Machine and Grinder',
    description: 'Preventative daily, weekly, and monthly maintenance routines for commercial espresso machines, steam wands, and flat/conical grinder burrs.',
    lessons: [
      {
        id: 'les-16-01',
        title: '16.1 Daily Backflushing & Chemical Portafilter Bath Routine',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=5X4x9X2zW10',
        content: 'Perform blind filter basket backflushing using espresso cleaning detergent (Cafiza/Puly Caff). Soak portafilters, shower screens, and steam tips.'
      },
      {
        id: 'les-16-02',
        title: '16.2 Grinder Burr Cleaning, Alignment & Replacement Intervals',
        duration: '18 mins',
        type: 'reading',
        content: 'Vacuum bean hoppers, remove rancid coffee oils with Urnex Grindz pellets, inspect burr wear, and replace flat burrs after 500-800 kg throughput.'
      }
    ]
  },
  {
    id: 'mod-17',
    moduleNumber: 17,
    title: 'Module 17: Tabaco and Cigar Service',
    description: 'Understand premium cigar vitolas, humidor humidity control (70% RH), cigar cutting, lighting etiquette, and coffee/cigar pairings.',
    lessons: [
      {
        id: 'les-17-01',
        title: '17.1 Cigar Anatomy, Vitolas & Humidor Maintenance',
        duration: '20 mins',
        type: 'reading',
        content: 'Identify wrapper (capa), binder (capote), and filler (tripa) leaves. Maintain 68-72% relative humidity and 18-20°C in Spanish cedar humidors.'
      },
      {
        id: 'les-17-02',
        title: '17.2 Elegant Cigar Service, Cutting, Cedar Torch Lighting & Pairings',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=7X4x9X2zW10',
        content: 'Demonstrate guillotine cut vs. V-cutter vs. punch. Toast the foot with odorless butane lighter or cedar spill. Pair full-bodied Habano cigars with dark roasts.'
      }
    ]
  },
  {
    id: 'mod-18',
    moduleNumber: 18,
    title: 'Module 18: POS | Point of Sales Operations',
    description: 'Operate modern cloud POS systems (Square, Lightspeed, Odoo), process card/mobile money payments, manage shift split tills, and end-of-day Z-reports.',
    lessons: [
      {
        id: 'les-18-01',
        title: '18.1 POS Order Entry, Custom Modifiers & Table Management',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=8X4x9X2zW10',
        content: 'Input seat orders quickly, add milk modifications (oat, almond, skim), adjust syrup levels, process split checks, and send tickets to kitchen/bar displays.'
      },
      {
        id: 'les-18-02',
        title: '18.2 Cash Float Balancing, Mobile Money (MTN MoMo) & Z-Report Audits',
        duration: '18 mins',
        type: 'reading',
        content: 'Count opening float cash, reconcile mobile money payments, process refund overrides, and print daily Z-report financial summaries.'
      }
    ]
  },
  {
    id: 'mod-19',
    moduleNumber: 19,
    title: 'Module 19: Coffee Mixology',
    description: 'Combine specialty coffee with spirits, bitters, liqueurs, and citrus. Master the Espresso Martini, Irish Coffee, and Coffee Negroni.',
    lessons: [
      {
        id: 'les-19-01',
        title: '19.1 The Science of Shaking the Perfect Espresso Martini',
        duration: '22 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=9X4x9X2zW10',
        content: 'Shake 45ml Vodka, 30ml fresh hot espresso, 20ml Kahlúa/coffee liqueur, and 10ml simple syrup over hard ice to build a thick, velvety foam head.'
      },
      {
        id: 'les-19-02',
        title: '19.2 Classic Irish Coffee & Layered Cream Float Etiquette',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=0Y4x9X2zW10',
        content: 'Pre-heat glass, dissolve brown sugar into hot filter coffee, add Irish Whiskey, and float lightly whipped double cream gently over the back of a warm spoon.'
      }
    ]
  },
  {
    id: 'mod-20',
    moduleNumber: 20,
    title: 'Module 20: Home Barista',
    description: 'Guide home enthusiasts on single-boiler espresso machines, manual hand grinders, water kettle temperature control, and budget accessories.',
    lessons: [
      {
        id: 'les-20-01',
        title: '20.1 Optimizing Home Espresso Setups (Gaggia, Breville, DeLonghi)',
        duration: '20 mins',
        type: 'reading',
        content: 'Tips for unpressurized baskets, PID temperature controllers, OPV valve adjustments to 9-bar, and precision hand grinders (1Zpresso, Comandante).'
      },
      {
        id: 'les-20-02',
        title: '20.2 Troubleshooting Home Extraction & Steaming Issues',
        duration: '15 mins',
        type: 'reading',
        content: 'Solve channel breakthrough, slow warm-up times, weak single-boiler steam pressure, and scale buildup in home water tanks.'
      }
    ]
  },
  {
    id: 'mod-21',
    moduleNumber: 21,
    title: 'Module 21: Interview Performance and Public Speaking',
    description: 'Prepare for high-level hospitality job interviews, practical barista tryouts, confident body language, and professional speech delivery.',
    lessons: [
      {
        id: 'les-21-01',
        title: '21.1 Crushing the Practical Barista Bench Audition',
        duration: '20 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=1Z4x9X2zW10',
        content: 'What head judges look for during 15-minute bench auditions: station cleanliness, grind calibration speed, beverage consistency, and calm under pressure.'
      },
      {
        id: 'les-21-02',
        title: '21.2 Articulating Coffee Knowledge & Hospitality Storytelling',
        duration: '18 mins',
        type: 'reading',
        content: 'Practice answering behavioral interview questions, explaining processing methods confidently to guests, and speaking clearly in front of panels.'
      }
    ]
  },
  {
    id: 'mod-22',
    moduleNumber: 22,
    title: 'Module 22: Personal Branding',
    description: 'Build your digital barista portfolio on LinkedIn & Instagram, create a stand-out CV, network with industry leaders, and enter competitions.',
    lessons: [
      {
        id: 'les-22-01',
        title: '22.1 Crafting a High-Impact Barista Resume & LinkedIn Profile',
        duration: '20 mins',
        type: 'reading',
        content: 'Highlight SCA certifications, BBA credentials, speed of service metrics, customer satisfaction ratings, and coffee equipment proficiencies.'
      },
      {
        id: 'les-22-02',
        title: '22.2 Coffee Content Creation & Social Media Branding',
        duration: '18 mins',
        type: 'reading',
        content: 'Showcase latte art progress, origin trips, flavor tasting notes, and coffee tutorial reels on Instagram and TikTok to attract premium job offers.'
      }
    ]
  },
  {
    id: 'mod-23',
    moduleNumber: 23,
    title: 'Module 23: Rwandan Barista and Coffee Culture',
    description: 'Celebrate Rwanda\'s coffee heritage — from Huye Mountain & Lake Kivu washing stations to Kigali\'s vibrant specialty coffee house revolution.',
    lessons: [
      {
        id: 'les-23-01',
        title: '23.1 The History of Rwandan Specialty Coffee (CWS & Washing Stations)',
        duration: '25 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=2Z4x9X2zW10',
        content: 'Explore how Rwanda recovered to become a global specialty coffee powerhouse known for clean, sparkling citric acid, floral aromas, and red fruit notes.'
      },
      {
        id: 'les-23-02',
        title: '23.2 Kigali\'s Specialty Coffee Wave & Local Farmers Support',
        duration: '20 mins',
        type: 'reading',
        content: 'Spotlight leading local roasters and cafés in Kigali. Understand fair-trade practices, direct trade models, and supporting women coffee farmers in Rwanda.'
      }
    ]
  },
  {
    id: 'mod-24',
    moduleNumber: 24,
    title: 'Module 24: Beverage Entrepreneurship',
    description: 'Learn how to start, finance, and run your own profitable coffee shop or mobile coffee cart in East Africa.',
    lessons: [
      {
        id: 'les-24-01',
        title: '24.1 Building a Café Business Plan & Financial Feasibility Study',
        duration: '30 mins',
        type: 'reading',
        content: 'Model startup CapEx (espresso machine, grinder, fit-out, licenses) vs. monthly OpEx (rent, wages, beans, utilities, COGS) to reach break-even.'
      },
      {
        id: 'les-24-02',
        title: '24.2 Mobile Coffee Carts & Pop-Up Event Catering Models',
        duration: '22 mins',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=3Z4x9X2zW10',
        content: 'Design low-cost, high-margin mobile espresso setups powered by gas/battery systems for corporate events, weddings, and festivals.'
      }
    ]
  },
  {
    id: 'mod-final',
    moduleNumber: 25,
    title: 'Final Examination: Comprehensive Barista Certification Exam',
    description: 'The ultimate 100% comprehensive theoretical & practical exam testing all 24 modules. Achieve >= 80% to earn your Official QR-Verified BBA Barista Certificate.',
    lessons: [
      {
        id: 'les-final-01',
        title: 'Final Exam Study Guide & Theory Summary',
        duration: '30 mins',
        type: 'reading',
        content: 'Review key formulas, extraction times, water parameters, defect classifications, food safety protocols, and customer service standards before starting the final exam.'
      },
      {
        id: 'les-final-02',
        title: 'Official Final Barista Certification Exam (100% Passing Threshold: 80%)',
        duration: '60 mins',
        type: 'quiz',
        content: 'Launch the final 50-question comprehensive examination. Test your knowledge across all 24 modules. Successful completion generates your downloadable, shareable, QR-verified Beyond Barista Academy Certificate!'
      }
    ]
  }
];
