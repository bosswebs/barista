-- ====================================================================
-- Beyond Barista Academy - Seed 24 Modules for Barista Course
-- Execute in Supabase SQL Editor to populate PostgreSQL tables
-- ====================================================================

-- 1. Ensure Barista Course exists
INSERT INTO public.courses (id, title, description, image_url)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Professional Barista Mastery & Coffee Ecosystem',
  'The complete 24-module professional barista program covering Coffee Origins, Brewing Science, Roasting, Sensory Skills, Green Coffee Grading, Barista Skills, Operations, Mixology, Food Safety, POS, and Entrepreneurship.',
  '/images/barista.jpg'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- 2. Insert 24 Modules
INSERT INTO public.modules (id, course_id, title, order_index) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 01: Introduction to Coffee', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 02: Brewing Science', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 03: Roasting Science', 3),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 04: Sensory Skills Fundamentals & Flavor Development', 4),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000005', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 05: Green Coffee Grading & Quality Control', 5),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000006', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 06: Barista Skills & Espresso Mechanics', 6),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000007', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 07: Coffee Shop Operations', 7),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000008', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 08: Customer Service and Barista Professionalism', 8),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000009', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 09: Menu and Recipe Development', 9),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000010', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 10: Prepare Iced and Specialty Drink', 10),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000011', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 11: Basic Cooking Skills for Café Baristas', 11),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000012', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 12: Prepare Ice Cream & Affogato Specialties', 12),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000013', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 13: Prepare and Understand Drink Water', 13),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000014', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 14: Prepare Welcoming Drink and Food Pairing', 14),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000015', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 15: Prepare Hot and Cold Beverages', 15),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000016', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 16: Cleaning and Maintenance of Espresso Machine and Grinder', 16),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000017', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 17: Tobacco and Cigar Service', 17),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000018', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 18: POS | Point of Sales Operations', 18),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000019', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 19: Coffee Mixology', 19),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000020', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 20: Home Barista', 20),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000021', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 21: Interview Performance and Public Speaking', 21),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000022', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 22: Personal Branding', 22),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000023', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 23: Rwandan Barista and Coffee Culture', 23),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000024', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Module 24: Beverage Entrepreneurship', 24),
  ('a0eebc99-9c0b-4ef8-bb6d-000000000025', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Final Examination: Comprehensive Barista Certification Exam', 25)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;

-- 3. Insert Lessons
INSERT INTO public.lessons (id, module_id, title, content, video_url, order_index) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-000000010101', 'a0eebc99-9c0b-4ef8-bb6d-000000000001', '1.1 History and Origins of Coffee', 'Discover Kaldi in Ethiopia, trade via Yemen, and the global spread of coffee.', 'https://www.youtube.com/watch?v=J3-wH0tO6wY', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000010102', 'a0eebc99-9c0b-4ef8-bb6d-000000000001', '1.2 Coffee Plant Botany: Arabica vs. Robusta', 'Compare species characteristics, chromosome counts, caffeine, and flavor profiles.', '', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-000000010201', 'a0eebc99-9c0b-4ef8-bb6d-000000000002', '2.1 The 6 Golden Rules of Extraction', 'Master brew ratios, water temp (90-96°C), grind size, and turbulence.', 'https://www.youtube.com/watch?v=1oB1oDrDkHM', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000010301', 'a0eebc99-9c0b-4ef8-bb6d-000000000003', '3.1 Heat Transfer Mechanics in Roasting', 'Learn convective vs conductive heat transfer, drying phase, and Rate of Rise.', 'https://www.youtube.com/watch?v=uK1XW1b2Rlg', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000010401', 'a0eebc99-9c0b-4ef8-bb6d-000000000004', '4.1 SCA Standard Cupping Protocol', 'Set up an official SCA cupping table and evaluate fragrance, aroma, and acidity.', 'https://www.youtube.com/watch?v=83pQc40p-tM', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000010601', 'a0eebc99-9c0b-4ef8-bb6d-000000000006', '6.1 Espresso Extraction Mechanics & Dialing-In', 'Set up 18g dose for 36g yield in 27-30s at 9 bar pressure.', 'https://www.youtube.com/watch?v=g2Wd4e2D3eA', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000010602', 'a0eebc99-9c0b-4ef8-bb6d-000000000006', '6.2 Milk Steaming, Texturing & Latte Art', 'Vortex texturing phase to 60-65°C and pours for Heart, Rosetta, and Tulip.', 'https://www.youtube.com/watch?v=R9_u2wXf398', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-000000011901', 'a0eebc99-9c0b-4ef8-bb6d-000000000019', '19.1 The Science of Shaking the Espresso Martini', 'Shake 45ml Vodka, 30ml fresh espresso, and 20ml coffee liqueur over hard ice.', 'https://www.youtube.com/watch?v=9X4x9X2zW10', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000012301', 'a0eebc99-9c0b-4ef8-bb6d-000000000023', '23.1 Rwandan Specialty Coffee Heritage', 'Explore washing stations in Huye & Kivu and Kigali specialty coffee roasters.', 'https://www.youtube.com/watch?v=2Z4x9X2zW10', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-000000012501', 'a0eebc99-9c0b-4ef8-bb6d-000000000025', '25.1 Comprehensive Final Barista Certification Exam (100% Threshold: 80%)', 'Complete the final certification exam to generate your QR-verified BBA Certificate.', '', 1)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;
