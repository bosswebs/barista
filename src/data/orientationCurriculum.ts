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
        content: `Dear Student,

On behalf of Beyond Barista Academy (BBA), I am delighted to welcome you to the Barista & Beverage Mastery Program.

Thank you for choosing BBA as your partner in your professional development. By enrolling in this program, you have taken an important step toward building a successful career in the coffee and beverage industry.

At BBA, we believe that preparing an excellent cup of coffee or creating an outstanding beverage is more than learning techniques. It requires knowledge, discipline, professionalism, creativity, consistency, and a genuine passion for serving others.

Our goal is not simply to train baristas - we aim to develop hospitality professionals, entrepreneurs, and future industry leaders who are capable of creating opportunities for themselves and others.

I encourage you to approach every lesson with curiosity, commitment, and a willingness to practice continuously. Ask questions, complete every activity, and challenge yourself to improve each day. Remember that excellence is achieved through consistency and dedication.

Thank you once again for becoming part of the BBA family. We are honoured to be part of your learning journey and look forward to celebrating your success.

Welcome to Beyond Barista Academy, where attitude and skills create opportunities, opportunities create careers, our courses changing lives.

I wish you every success.

"Welcome to Beyond Barista Academy. I believe you have the potential to become a world-class hospitality professional. Let us begin this exciting journey together."

Coach Egide
Founder & Lead Trainer | Food & Beverage Consultant | Hospitality Business Coach | Curriculum Developer | Opportunity & Talent Developer | Alcohol Service Specialist`
      },
      {
        id: 'orient-les-0-2',
        title: '0.2 About Beyond Barista Academy',
        duration: '8 mins',
        type: 'reading',
        content: `Who is BBA?
Beyond Barista Academy (BBA) is Rwanda's premier hospitality training institution, offering hybrid (online theory + in-person/on-site practical) certification programs in Barista, Bartending, Sommelier, Culinary Arts, Domestic Hospitality, Food Safety, Herbalism, and specialty short courses.

History
BBA was founded from a simple observation: talented, hard-working people in Rwanda were being held back not by lack of ability, but by lack of access to world-class, practical hospitality training. BBA was built to close that gap - training born in today's reality, aware of youth employment struggles, and built to solve them.

Vision
To proudly offer high-end, globally relevant skills in barista, bartender, and sommelier training.

Mission
We train our people to always exceed company expectations.

Core Values - AI-RP
Attitude. Integrity. Responsibility. Professionalism.

Why BBA Exists
BBA exists to turn skills and problems into opportunities - solving the "no experience" challenge for freshers, awakening coffee, mixology, and alcohol appreciation in the Rwandan community, and enabling students to build careers at home and abroad through skill plus proper documentation.`
      },
      {
        id: 'orient-les-0-3',
        title: '0.3 Meet Your Trainer',
        duration: '6 mins',
        type: 'reading',
        content: `Students learn best when they know who is teaching them.

Coach Egide
Founder & Lead Trainer at Beyond Barista Academy
- Food & Beverage Consultant
- Hospitality Business Coach
- Curriculum Developer
- Opportunity & Talent Developer
- Alcohol Service Specialist

With over 15 years of experience across luxury hotels, bars, and coffee shops in Rwanda and internationally, Coach Egide has trained hundreds of students and built BBA's entire curriculum from real, on-the-job hospitality experience - not theory alone. Throughout your program you will also meet BBA's wider team of specialist instructors, each an expert in their own craft.`
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
        content: `Presented by Bosco, BBA's IT Lead.

This lesson walks you through exactly how to use the Beyond Barista Academy online platform, step by step:
- How to watch your video lessons
- How to download your notes (PDF manuals and handouts)
- How to submit assignments
- How to ask questions and get support
- How to take your quizzes
- How to receive your certificate once you pass

By the end of this lesson, you should be fully comfortable navigating your student dashboard and moving through your course without confusion.`
      },
      {
        id: 'orient-les-0-5',
        title: '0.5 Learning Rules',
        duration: '7 mins',
        type: 'reading',
        content: `To keep your learning on track and fair to every student, please follow these rules:

1. Watch lessons in order - do not skip ahead.
2. Complete every quiz before moving to the next module.
3. Respect copyright - all BBA course content is original and protected.
4. Do not share course materials, videos, or notes outside the platform.
5. Participate actively in live sessions and discussions.
6. Complete all practical assignments - theory alone is not enough to graduate.`
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
        content: `Every BBA student is expected to uphold the following standards:

Professionalism - conduct yourself as the hospitality professional you are training to become.
Respect - for trainers, staff, and fellow students at all times.
Integrity - do your own work and represent yourself honestly.
Positive Attitude - approach every lesson and practical session with energy and openness.
Time Management - arrive on time and meet every deadline.
Academic Honesty - no plagiarism, no cheating, no shortcuts.

Violations of this code may result in a warning, suspension, or removal from the program depending on severity.`
      },
      {
        id: 'orient-les-0-7',
        title: '0.7 How to Succeed at BBA',
        duration: '10 mins',
        type: 'video',
        videoUrl: '',
        content: `Practical habits from top-performing BBA graduates:

- Take notes while watching every lesson.
- Practice every single day, not just before assessments.
- Ask questions - don't wait, don't guess.
- Learn from your mistakes instead of being discouraged by them.
- Complete every assignment, even the ones that feel small.
- Never skip a practical session - this is where real skill is built.`
      },
      {
        id: 'orient-les-0-8',
        title: '0.8 Equipment Needed',
        duration: '6 mins',
        type: 'reading',
        content: `The equipment you need depends on which program you are enrolled in. For theory lessons, all you need is a smartphone, tablet, or computer with a stable internet connection.

For practical sessions, equipment is provided at the training site or simulator. For example, Barista students will work with:
- Espresso machine
- Grinder
- Milk pitcher
- Scale
- Thermometer
- Coffee beans

Program-specific equipment lists are shared at the start of each course's practical module.`
      },
      {
        id: 'orient-les-0-9',
        title: '0.9 Assessment System',
        duration: '8 mins',
        type: 'video',
        videoUrl: '',
        content: `Presented by Bosco, BBA's IT Lead.

Your progress at BBA is measured through:
- Quizzes - completed online after each module.
- Assignments - practical tasks and written work.
- Practical Assessments - hands-on skills evaluated in person or on simulator.
- Final Examination - a comprehensive theory and practical exam.
- Certificate Requirements - a minimum overall score of 80% across all components is required to graduate and receive your official, QR-verified BBA certificate.`
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
        content: `If you ever need help, BBA support is reachable through:

- WhatsApp
- Email
- Phone
- Office Hours (in person, at our Kigali training center)

Our team responds to student questions promptly - never hesitate to reach out.`
      },
      {
        id: 'orient-les-0-11',
        title: '0.11 Community',
        duration: '5 mins',
        type: 'reading',
        content: `Learning at BBA doesn't happen alone. As a student, you're invited to join:

- Our Facebook Group
- Our WhatsApp Group
- Our Telegram channel
- Our LinkedIn community
- The BBA Alumni Community, once you graduate

These spaces connect you with classmates, graduates, job opportunities, and ongoing hospitality industry updates.`
      },
      {
        id: 'orient-les-0-12',
        title: '0.12 Graduation',
        duration: '5 mins',
        type: 'reading',
        content: `Graduation at BBA is earned, not automatic. To graduate you must meet:

Requirements - complete all modules, quizzes, assignments, and practical sessions, and pass the final examination with a minimum of 80%.
Certificates - your official, QR-verified digital certificate is issued automatically once you pass.
Awards - top-performing students are recognized for excellence.
Career Support - graduates gain access to BBA's job board and placement network.`
      },
      {
        id: 'orient-les-0-13',
        title: '0.13 The BBA Success Mindset',
        duration: '10 mins',
        type: 'video',
        videoUrl: '',
        content: `Why attitude is more important than talent. Professional image and grooming. Keep learning and work smarter, not harder. Turning skills and problems into opportunities.

As I often tell you: "Without attitude, everything is nothing."

This is BBA's identity: before you learn how to make an espresso, mix a cocktail, or serve wine, you should first understand what it means to show a positive attitude in the hospitality industry. This lesson sets BBA apart from academies that teach techniques but overlook character.`
      },
      {
        id: 'orient-les-0-14',
        title: '0.14 Final Orientation Message',
        duration: '4 mins',
        type: 'video',
        videoUrl: '',
        content: `At Beyond Barista Academy, we do not simply teach beverage skills - we develop professionals, entrepreneurs, and future industry leaders. Your commitment to learning, discipline, and continuous improvement will determine your success.

Welcome to the BBA school of barista and beverage mastery, the family where attitude + skills create opportunities, and opportunities create success.

You are now ready to begin. Select your program from the Course Catalog and start Module 01.`
      }
    ]
  }
];
