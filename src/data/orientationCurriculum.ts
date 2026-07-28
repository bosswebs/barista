export interface OrientationLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'exam';
  videoUrl?: string;
  content: string;
}

export interface OrientationModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  lessons: OrientationLesson[];
}

export const ORIENTATION_CURRICULUM: OrientationModule[] = [
  {
    id: 'orient-01',
    moduleNumber: 1,
    title: '0.1-0.3: Welcome & About Beyond Barista Academy',
    description: 'Meet Coach Egide, learn the story behind Beyond Barista Academy, and get introduced to the trainers who will guide you through your hospitality journey.',
    lessons: [
      {
        id: 'orient-les-0-1',
        title: '0.1 Welcome Message from Coach Egide',
        duration: '5 mins',
        type: 'video',
        videoUrl: '',
        content: 'A personal welcome from Coach Egide HATEGEKIMANA, Senior Trainer and founder of the Beyond Barista Academy hospitality program. Coach Egide shares why the academy exists, what he expects from every student, and the mindset needed to succeed: discipline, curiosity, and genuine hospitality. Watch this first before starting any module.'
      },
      {
        id: 'orient-les-0-2',
        title: '0.2 About Beyond Barista Academy',
        duration: '8 mins',
        type: 'reading',
        content: 'Beyond Barista Academy (BBA) is a Rwandan hospitality training institution offering hybrid (online theory + in-person/on-site practical) certification programs in Barista skills, Bartending, Sommelier training, Culinary Arts, Domestic Hospitality, Food Safety, Herbalism, and specialty short courses. Learn about the academy\'s mission to raise the standard of hospitality professionals across Rwanda and East Africa, our accreditation approach, and how theory-online plus practical-in-person keeps training affordable, flexible, and job-ready.'
      },
      {
        id: 'orient-les-0-3',
        title: '0.3 Meet Your Trainer',
        duration: '6 mins',
        type: 'reading',
        content: 'Introduce yourself to the BBA training team: Coach Egide HATEGEKIMANA (Senior Trainer, bartender and beverage specialist with 15+ years of hospitality experience across luxury hotels, bars and coffee shops), Jean Claude NIKOLA (Sommelier and wine researcher), and the wider team of specialist instructors in mixology, barista craft, and customer service. Each program module names its lead trainer so you always know who is teaching you and how to reach them.'
      }
    ]
  },
  {
    id: 'orient-02',
    moduleNumber: 2,
    title: '0.4-0.5: How the Online Academy Works',
    description: 'Understand the hybrid learning model, the tools you will use every week, and the rules that keep the learning community fair and effective.',
    lessons: [
      {
        id: 'orient-les-0-4',
        title: '0.4 How the Online Academy Works',
        duration: '10 mins',
        type: 'video',
        videoUrl: '',
        content: 'BBA uses a hybrid model: theory is delivered online (5-15 minute HD video lessons, downloadable PDF notes, and quizzes after every module) while hands-on practical skills are trained in person or on-site simulators. Walk through the full student journey: register online, create your account, pay fees, watch lessons at your own pace, download notes, complete quizzes, attend weekly live Q&A sessions on Zoom or Google Meet, sit the final assessment, and receive your digital certificate.'
      },
      {
        id: 'orient-les-0-5',
        title: '0.5 Learning Rules',
        duration: '7 mins',
        type: 'reading',
        content: 'House rules for the online classroom: complete lessons in order within each module, finish the module quiz before unlocking the next module, attend or catch up on the weekly live session, submit assignments (photos or documents) by the stated deadline, and keep your login credentials private. Lessons remain accessible for the full duration of your enrollment so you can revisit material at any time.'
      }
    ]
  },
  {
    id: 'orient-03',
    moduleNumber: 3,
    title: '0.6-0.9: Conduct, Success & Assessment',
    description: 'Know what is expected of you as a BBA student, how to get the most out of the program, what equipment you need, and how you will be graded.',
    lessons: [
      {
        id: 'orient-les-0-6',
        title: '0.6 Student Code of Conduct',
        duration: '8 mins',
        type: 'reading',
        content: 'Every BBA student agrees to: treat trainers, staff, and fellow students with respect in live sessions and community groups; submit only original assignment work; give honest feedback during practicals; arrive on time to in-person/simulator sessions; and represent the academy professionally when using the BBA name, logo, or certificate. Violations may result in a warning, suspension, or removal from the program depending on severity.'
      },
      {
        id: 'orient-les-0-7',
        title: '0.7 How to Succeed at BBA',
        duration: '10 mins',
        type: 'video',
        videoUrl: '',
        content: 'Practical study strategies from top-performing BBA graduates: set a fixed weekly schedule for video lessons, take notes while watching (don\'t just passively watch), attempt every quiz before checking the answer key, ask questions in the weekly live class instead of waiting, and treat the in-person practical sessions as your chance to fix mistakes safely before the final assessment.'
      },
      {
        id: 'orient-les-0-8',
        title: '0.8 Equipment Needed',
        duration: '6 mins',
        type: 'reading',
        content: 'What you need to follow the online theory: a smartphone, tablet, or computer with a stable internet connection, and an app to open PDF notes. For practical/on-site sessions, program-specific equipment is provided at the training site or simulator (espresso machines and grinders for Barista, bar tools for Bartending, tasting glassware for Sommelier, kitchen stations for Culinary Arts). Any items you should bring yourself are listed at the start of each program\'s practical module.'
      },
      {
        id: 'orient-les-0-9',
        title: '0.9 Assessment System',
        duration: '8 mins',
        type: 'reading',
        content: 'Your grade combines module quizzes (theory, completed online after each module), practical assessments (hands-on skills evaluated in person or on simulator), and a final comprehensive exam covering both theory and practice. A minimum overall score of 80% is required to pass and receive your certificate. Grades are reported as Distinction, Merit, or Pass, and your score percentage is printed on your certificate.'
      }
    ]
  },
  {
    id: 'orient-04',
    moduleNumber: 4,
    title: '0.10-0.14: Support, Community & Graduation',
    description: 'Learn where to get help, how to join the BBA community, what graduation looks like, and the mindset that carries successful graduates into their careers.',
    lessons: [
      {
        id: 'orient-les-0-10',
        title: '0.10 Student Support',
        duration: '5 mins',
        type: 'reading',
        content: 'If you get stuck: ask during the weekly live Zoom/Google Meet Q&A session, post your question in the student community group, or contact BBA support directly through the contact details listed on the website. Trainers also review and respond to assignment feedback so you know exactly what to improve before the final exam.'
      },
      {
        id: 'orient-les-0-11',
        title: '0.11 Community',
        duration: '5 mins',
        type: 'reading',
        content: 'Join your program\'s cohort group to connect with classmates, share practice photos, and get peer feedback. After graduating, students move into the BBA alumni network, which shares job opportunities, national program updates (including championships), and continuing education content. Follow all official BBA social media channels — links are available on the website footer and the BBA YouTube channel.'
      },
      {
        id: 'orient-les-0-12',
        title: '0.12 Graduation',
        duration: '5 mins',
        type: 'reading',
        content: 'Graduation happens once you pass the final assessment (both theory and practical) with a minimum score of 80%. Your digital certificate is generated automatically with a unique certificate number and QR code that anyone can use to verify your qualification online. You may also be invited to an in-person or livestreamed graduation/recognition event depending on your program and cohort.'
      },
      {
        id: 'orient-les-0-13',
        title: '0.13 The BBA Success Mindset',
        duration: '6 mins',
        type: 'video',
        videoUrl: '',
        content: 'Hospitality is a craft built on consistency, humility, and genuine care for guests. Coach Egide closes this section with the mindset every BBA graduate should carry forward: show up prepared, keep learning after certification, treat every guest interaction as a chance to represent your professionalism, and use setbacks in practice as fuel for improvement, not discouragement.'
      },
      {
        id: 'orient-les-0-14',
        title: '0.14 Final Orientation Message',
        duration: '4 mins',
        type: 'video',
        videoUrl: '',
        content: 'You are now ready to begin. This closing message confirms you have completed Orientation and outlines the next step: select your program (Barista, Bartender, Sommelier, Culinary Arts, Domestic Hospitality, Food Safety, Workplace Skills Recognition, Herbalism, or a Bonus/Specialty course) from the Course Catalog and begin Module 01. Welcome to Beyond Barista Academy.'
      }
    ]
  }
];
