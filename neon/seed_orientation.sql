-- ====================================================================
-- Beyond Barista Academy - Seed Orientation Course (0.1 - 0.14)
-- Matches the LIVE Neon schema: courses/modules/lessons use integer
-- auto-increment ids (courses.slug, price/instructor as text, etc.)
--
-- Safe to re-run: re-running replaces this course's modules/lessons.
-- Run with: node scripts/run-sql-seed.mjs neon/seed_orientation.sql
-- ====================================================================

DO $$
DECLARE
  v_course_id integer;
  v_mod1 integer;
  v_mod2 integer;
  v_mod3 integer;
  v_mod4 integer;
BEGIN
  -- 1. Ensure Orientation course exists
  INSERT INTO public.courses (slug, title, level, duration, description, image, price, instructor, capacity, status, created_at)
  VALUES (
    'orientation-welcome-to-bba',
    'Orientation: Welcome to Beyond Barista Academy',
    'Beginner',
    '1 week',
    'Start here. Welcome message from Coach Egide, how the hybrid online academy works, learning rules, student code of conduct, assessment system, support, community, and graduation - required before starting any BBA program.',
    '/images/wood1.jpg',
    'Free',
    'Coach Egide HATEGEKIMANA',
    500,
    'active',
    to_char(now(), 'YYYY-MM-DD HH24:MI:SS')
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description
  RETURNING id INTO v_course_id;

  -- 2. Clear any previous modules for this course (cascades to lessons) so this script is idempotent
  DELETE FROM public.modules WHERE course_id = v_course_id;

  -- 3. Insert 4 Modules
  INSERT INTO public.modules (course_id, title, sort_order) VALUES (v_course_id, '0.1-0.3: Welcome & About Beyond Barista Academy', 1) RETURNING id INTO v_mod1;
  INSERT INTO public.modules (course_id, title, sort_order) VALUES (v_course_id, '0.4-0.5: How the Online Academy Works', 2) RETURNING id INTO v_mod2;
  INSERT INTO public.modules (course_id, title, sort_order) VALUES (v_course_id, '0.6-0.9: Conduct, Success & Assessment', 3) RETURNING id INTO v_mod3;
  INSERT INTO public.modules (course_id, title, sort_order) VALUES (v_course_id, '0.10-0.14: Support, Community & Graduation', 4) RETURNING id INTO v_mod4;

  -- 4. Insert 14 Lessons
  INSERT INTO public.lessons (module_id, title, body, video_url, minutes, sort_order) VALUES
    (v_mod1, '0.1 Welcome Message from Coach Egide', 'A personal welcome from Coach Egide HATEGEKIMANA, founder and Senior Trainer at Beyond Barista Academy. Learn why the academy exists and the mindset needed to succeed: discipline, curiosity, and genuine hospitality.', '', 5, 1),
    (v_mod1, '0.2 About Beyond Barista Academy', 'BBA is a Rwandan hospitality training institution offering hybrid (online theory + in-person/on-site practical) certification in Barista, Bartending, Sommelier, Culinary Arts, Domestic Hospitality, Food Safety, Herbalism, and specialty short courses.', '', 8, 2),
    (v_mod1, '0.3 Meet Your Trainer', 'Meet Coach Egide HATEGEKIMANA, Jean Claude NIKOLA (Sommelier & wine researcher), and the wider BBA training team.', '', 6, 3),
    (v_mod2, '0.4 How the Online Academy Works', 'Walk through the full student journey: register, create your account, pay fees, watch lessons, download notes, complete quizzes, attend weekly live Zoom/Google Meet sessions, sit the final assessment, and receive your digital certificate.', '', 10, 1),
    (v_mod2, '0.5 Learning Rules', 'Complete lessons in order, finish each module quiz before unlocking the next module, attend or catch up on the weekly live session, and submit assignments by their deadline.', '', 7, 2),
    (v_mod3, '0.6 Student Code of Conduct', 'Treat trainers and classmates with respect, submit only original work, arrive on time to in-person/simulator sessions, and represent the academy professionally.', '', 8, 1),
    (v_mod3, '0.7 How to Succeed at BBA', 'Study strategies from top BBA graduates: set a weekly schedule, take notes while watching, attempt every quiz honestly, and use live sessions to ask questions.', '', 10, 2),
    (v_mod3, '0.8 Equipment Needed', 'A smartphone, tablet, or computer with stable internet is all you need for theory. Practical equipment is provided at the training site or simulator per program.', '', 6, 3),
    (v_mod3, '0.9 Assessment System', 'Your grade combines module quizzes, practical assessments, and a final comprehensive exam. A minimum 80% overall score is required to pass and receive your certificate.', '', 8, 4),
    (v_mod4, '0.10 Student Support', 'Get help via the weekly live Q&A session, the student community group, or BBA support contact details listed on the website.', '', 5, 1),
    (v_mod4, '0.11 Community', 'Join your program cohort group, then the BBA alumni network after graduating, for job opportunities, national program updates, and peer support.', '', 5, 2),
    (v_mod4, '0.12 Graduation', 'Pass the final assessment (theory + practical) with a minimum 80% score to receive your digital, QR-verified certificate.', '', 5, 3),
    (v_mod4, '0.13 The BBA Success Mindset', 'Show up prepared, keep learning after certification, and treat every guest interaction as a chance to represent your professionalism.', '', 6, 4),
    (v_mod4, '0.14 Final Orientation Message', 'You are ready. Select your program from the Course Catalog and begin Module 01. Welcome to Beyond Barista Academy.', '', 4, 5);
END $$;
