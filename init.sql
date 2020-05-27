CREATE DATABASE children;

\connect children;

CREATE TABLE IF NOT EXISTS thumbnail (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    thumbnail_desc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS location (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    country_flag_icon TEXT NOT NULL,
    latitude FLOAT (6) NOT NULL,
    longitude FLOAT (6) NOT NULL
);

CREATE TABLE IF NOT EXISTS person (
    id SERIAL PRIMARY KEY,
    id_location INTEGER REFERENCES location(id) NOT NULL,
    id_thumbnail INTEGER REFERENCES thumbnail(id) NOT NULL,
    name TEXT NOT NULL,
    picture TEXT,
    role TEXT,
    description TEXT,
    joining_date DATE,
    experience TEXT
);

CREATE TABLE IF NOT EXISTS service (
    id SERIAL PRIMARY KEY,
    id_thumbnail INTEGER REFERENCES thumbnail(id) NOT NULL,
    name TEXT NOT NULL,
    center_activities TEXT,
    description TEXT,
    practical_info TEXT,
    header_photo TEXT,
    cta TEXT
);

CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    id_person INTEGER REFERENCES person(id) NOT NULL,
    id_location INTEGER REFERENCES location(id) NOT NULL,
    id_thumbnail INTEGER REFERENCES thumbnail(id) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price FLOAT (2),
    date_time DATE
);

CREATE TABLE IF NOT EXISTS previous_years_statistics (
    id INTEGER PRIMARY KEY REFERENCES event(id),
    n_children INTEGER,
    n_contributors INTEGER,
    amount FLOAT (2)
);

CREATE TABLE IF NOT EXISTS contact ( 
    id INTEGER PRIMARY KEY REFERENCES person(id),
    email TEXT,
    phone TEXT,
    starting_hours TIME,
    ending_hours TIME
);

CREATE TABLE IF NOT EXISTS donation ( 
    id SERIAL PRIMARY KEY,
    amount FLOAT (2),
    practical_info TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonial (
    id SERIAL PRIMARY KEY,
    person_desc TEXT,
    testimonial TEXT,
    photo TEXT
);

CREATE TABLE IF NOT EXISTS newsletter_signups (
    id SERIAL PRIMARY KEY,
    email TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS person_service (
    id_person INTEGER REFERENCES person(id),
    id_service INTEGER REFERENCES service(id),
    PRIMARY KEY (id_person, id_service)
);

CREATE TABLE IF NOT EXISTS event_service (
    id_event INTEGER REFERENCES event(id),
    id_service INTEGER REFERENCES service(id),
    PRIMARY KEY (id_event, id_service)
);

CREATE TABLE IF NOT EXISTS event_testimonial (
    id_testimonial INTEGER PRIMARY KEY REFERENCES testimonial(id),
    id_event INTEGER REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS person_testimonial (
    id_testimonial INTEGER PRIMARY KEY REFERENCES testimonial(id),
    id_person INTEGER REFERENCES person(id)
);

CREATE TABLE IF NOT EXISTS service_testimonial (
    id_testimonial INTEGER PRIMARY KEY REFERENCES testimonial(id),
    id_service INTEGER REFERENCES service(id)
);


INSERT INTO thumbnail (title,thumbnail,thumbnail_desc) VALUES
	
('Health', '/assets/images/services/1/thumb.jpg', 'Knowledge is power, especially when it comes to getting and staying healthy. So our health programs focus on two important things:</br>1) developing healthy habits</br>2) connecting kids with services when they need help.'),
('Education', '/assets/images/services/2/thumb.jpg', 'Education doesn''t have a one-size-fits-all solution. Your support is invested in helping kids complete secondary school using a wide range of tools to make it happen: providing school fees, uniforms, supplies, tutoring and scholarships.'),
('Empowerement', '/assets/images/services/3/thumb.jpg', 'Through empowerment programs that build leadership, teamwork and confidence, you''re not only making a brighter future possible, but you''re also creating a positive ripple effect on kids'' communities.'),
('Employment', '/assets/images/services/4/thumb.jpg', 'Mock interviews, résumé writing, connecting with jobs, earning scholarships for college or vocational training, developing workplace and technical skills to help them change their lives for good.'),
('Christmas Charity Event To Arrange Clothes And Food For Children', '/assets/images/events/1/thumb.jpg', 'We have planned a special charity event which is about helping the poor kids by providing them food and clothes.'),
('Cycle For Charity To Benefit Children''s Education','/assets/images/events/2/thumb.jpg','Cycling has become one of our favourite national sports. If you have access to a bike, then you can take on a cycle for charity.'),
('Adele Concert To Benefit Children''s Empowerment From Tickets', '/assets/images/events/3/thumb.jpg', 'Programme includes works by Scriabin / Blumenfeld / Reinecke / Bach / Alice Charbonnet and others.'),
('Treks For Charity To Benefit Children''s Health', '/assets/images/events/4/thumb.jpg', 'If you want to do something a little different, then taking on a trek for charity could be exactly what you are looking for.'),
('Susana Eshleman', '/assets/images/persons/1/thumb.jpg', 'Being a champion of “the world’s least and last,” and advocating for children born into poverty to give them the opportunity for better lives. This sense of moral justice has been engrained in Susana for as long as she can remember. Growing up, Susana accompanied her grandfather to the poorest parts of Parana, Argentina, to serve others. At a young age, she realized the children she encountered were just like her — except they were born into different circumstances with fewer opportunities.'),
('Danielle Mitchel', '/assets/images/persons/2/thumb.jpg', 'Protecting the organization’s assets; budgeting, planning and forecasting finances; and maximizing our return on investment. With 22 years of experience at Children International (CA), Danielle continues to be a steady, welcoming presence. She has a knack for seeing the big picture while taking care of the organization’s overall financial health.'),
('Jack Maccanna', '/assets/images/persons/3/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Laura Thornton', '/assets/images/persons/4/thumb.jpg', 'Bringing innovation together with data and technology to engage current and new supporters. At Children Association (CA), Laura oversees global marketing, engagement and fundraising initiatives, including strategic and operational planning, direct response marketing, digital media and donor relationship marketing.'),
('Mariafernanda Corral', '/assets/images/persons/5/thumb.jpg', 'Believing in human potential and the power of connecting people with their talents and passion to build an empowering, high-performance organizational culture. Maria Fernanda is also an expert on developing leaders and coaching them so they can create the right conditions for their teams to succeed. “I believe, as the author Clayton Christen says, that great leaders can change the world,” Maria Fernanda says.'),
('Bill Brewster', '/assets/images/persons/6/thumb.jpg', 'Asking questions to dig deep and find innovative business solutions. Bill sees opportunities to improve quality and service while developing initiatives for growth at Children Association (CA). He manages employees, processes and tools/technology with a global lens. His responsibilities include global IT, constituent understanding and insights (analytics), global finance and business transformation.'),
('Joachim Labiotech', '/assets/images/persons/7/thumb.jpg', 'Joining Children International (CA) in April of 2019, Joachim Labiotech is the Vice President of Global Talent Growth (CA’s new name for HR). This more accurately reflects the organization, as it’s the talented employees whose diverse abilities and ideas make up the collective strength to support the children CA serves.'),
('Menaa Bouzid Gemaco', '/assets/images/persons/8/thumb.jpg', 'Menaa Bouzid Gemaco used to lead a web development team for publishing, entertainment and traditional product-based clients. Now, his sights are set on crafting technology that accelerates a completely different purpose – charity'),
('Tracey Cain', '/assets/images/persons/9/thumb.jpg', 'Tracey Cain joined Children Association after having spent the last decade leading software product teams at The New York Times, Ralph Lauren, goop, and Glossier. She is thrilled to be back in a mission-driven environment.');
	

INSERT INTO location (name, country, country_flag_icon, latitude, longitude) VALUES
('Mumbai', 'India', '/assets/images/location/1/flag.png', 19.075983, 72.877655),
('Gorgan', 'Iran', '/assets/images/location/2/flag.png', 36.826090, 54.433480),
('Bogota', 'Colombia', '/assets/images/location/3/flag.png', 4.624335, -74.063644),
('Dodoma', 'Tanzania', '/assets/images/location/4/flag.png', -6.161184, 35.745426);


INSERT INTO service (id_thumbnail, name, center_activities, description, practical_info, header_photo, cta) VALUES
(1, 'Health', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances.</br></br>Here are some of the ways your support helps to reinforce healthy habits:</br></br>1. Sharing information (presentations, pamphlets, posters and one-on-one counseling) about critical health topics tailored to children or caregivers</br></br>2. Working to identify health-related attitudes and influence them with comprehensive communications</br></br>3. Creating learning opportunities where kids can practice skills in a supportive environment</br></br>4. Fostering individual support for kids and families with health challenges</br></br>5. Using peer modeling to demonstrate healthy behavior</br></br>6. Reducing barriers to healthy behaviors.', 'We bring health care to Children and Families wherever they are, whatever their circumstances or income, we go where disadvantaged kids are to give them the care they won''t get from anyone else. Our network of medical teams bring care to vulnerable children in disadvantaged communities.', '</br>1. Operating Medical And Dental Clinics And Pharmacies At CI Community Centers When Services Are Not Otherwise Accessible Or Affordable</br></br>2. Helping Kids And Their Families Access And Enroll In Existing Government/Public Health Insurance Programs</br></br>3. Providing Subsidies For Out-Of-Pocket Expenses Where Support Doesn''t Exist</br></br>4. Creating Partnerships With Local Hospitals, Clinics And Pharmacies To Reduce Costs</br></br>5. Mapping Services To Bring Services Closer To Sponsored Communities', '/assets/images/services/1/header.jpg', 'To help curb the spread of coronavirus, Children Association is investing $650,000 toward handwashing education. Join us in this important effort to create healthy behaviors that prevent the spread of disease!'),
(2, 'Education', 'When they are enrolled in our sponsorship program, kids gain access to the educational tools they need to succeed, based on age, location and their own unique life circumstances. Keeping young children from falling behind early is critical to their academic success. Providing resources that keep them on track so they can graduate from high school is the next vital step. Then, as they graduate from our program, HOPE is there for them to continue their education.', 'Your support is an investment in the future, helping disadvantaged kids stay in school and complete their education. When you make a gift to our education programs, you provide the resources and opportunities children and youth need, from kindergarten through high school, and beyond.', '</br>1. Providing necessities for school, so students have things like uniforms, shoes or books</br></br>2. Awarding annual, renewable scholarships to attend vocational school, college or other higher education institutions</br></br>3. Working with parents to ensure their kids are enrolled in school</br></br>4. Tutoring in groups with objectives that are aligned to the national curriculum of each country</br></br>5. Partnering with existing educational facilities in the community</br></br>6. Educating parents on how to improve interactions with their kids at home</br></br>7. Creating resources in our community centers like computer labs and libraries, available to local students.', '/assets/images/services/2/header.jpg', 'we need your help to reach our goal of $150,000 by October 1, which will make it possible for hundreds more youth to continue on their path toward independence. Beyond sponsorship, these youth need HOPE – the last best chance we have to prepare them for a successful, financially stable adulthood.'),
(3, 'Empowerement', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances.</br></br>Here are some of the ways we work to empower kids:</br></br>1. Games and sports not only teach the value of teamwork and empathy, they have a positive impact on sponsored children and youth’s ability to stay healthy, get an education and eventually pursue employment.</br></br>2. Through various art forms like dance, singing, music, drawing, painting and theater, sponsored children and youth learn to express their emotions in new and creative ways. </br></br>3. Using proven curriculum from partners like Aflatoun, participants receive social and financial education that empowers them to make a positive change for a sustainable future. </br></br>4. Through journalism, Community Youth Reporters gain important life skills like creative and critical thinking, communication and appreciating diversity. They also have access to new technologies and equipment through channels like digital and radio media. With these tools, sponsored youth not only have a better chance of completing school, getting a good job and living a healthy life ,they bring community issues to light so leaders can help bring about much-needed change.', 'For sponsored children, “empowerment” is a vital tool for escaping poverty.It means confidence in the future. It means harnessing their strength and power to transform themselves and overcome the challenges they face. But empowerment isn’t something we can simply give away.', '</br>Empowerment is helping others to help themselves. Your donation provides the tools and programs that empower youth to build up their own local community through civic engagement activities, such as vocational training, school repairs and substance abuse workshops, while learning valuable skills that will impact their future employability.</br></br>Potential + power = change.', '/assets/images/services/3/header.jpg', 'The journey toward hope and empowerment</br>starts with one person: YOU'),
(4, 'Employment', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances.</br></br>Here are some of the ways we work to enable employment:</br></br>1. Linking youth to vocational training and university programs in their countries, helping guide them on a path that fits their interests, abilities and the likelihood to find work.</br></br>2. Awarding scholarships to attend vocational school, college or other higher education institutions.</br></br>3. Ensuring that work-readiness activities, soft-skills development and job placement are part of our training programs.</br></br>4. Providing career counselors who teach interview techniques and conduct mock job interviews.</br></br>5. Counseling on résumé creation, lining up letters of recommendation and preparing other necessary documentation.</br></br>6. Guiding teens to resources like online career guidance, assessment in talents and career interests, and job listings.', 'Our HOPE scholarships help kids afford extra education and skills training they need for long-term employment.', '</br>Employability means working to make sure the teens in our program have adequate marketable job skills and that they know how to enter the workforce. We measure the number of teens in our program aged 18–24 who have:</br></br>1. Increased marketable skills, measured by the percent of teens actively developing skills through university or vocational training programs. For younger teens, we measure enrollment. For young adults, we measure completion.</br></br>2. Enhanced access to the local job market, measured by the percent of program youth (18- to 24-year-olds) who demonstrate knowledge and skills to access the job market in their communities. ', '/assets/images/services/4/header.jpg', 'You can give teens and young adults the education they need to change their lives for good.</br>Your gift provides HOPE scholarships for hard-working young people — giving them education they need for stable, long‑term employment.');


INSERT INTO person (id_location, id_thumbnail, name, picture, role, description, joining_date, experience) VALUES
(1, 9, 'Susana Eshleman', '/assets/images/persons/1/image.jpg', 'Managing Director', '', '2016-06-01', 'During a 16-year career with Hallmark, Susana held various marketing, strategy and general management leadership positions. She joined Children Association’s board of directors in 2004, where she served until becoming managing director in 2016. Susana holds an MBA from Harvard Business School, and has a bachelor’s degree in international business and management from the University of Nebraska.'),
(2, 10, 'Danielle Mitchell', '/assets/images/persons/2/image.jpg', 'Managing Director', '', '2016-06-01', 'As a senior accountant at BKD CPAs & Advisors, Danielle mainly worked with nonprofit and health care clients before joining CA. She fell in love with CA’s mission, people and culture, and has been part of the organization ever since. Danielle received her bachelor’s degree in accounting from Kansas State University.'),
(4, 11, 'Jack Maccanna', '/assets/images/persons/3/image.jpg', 'Managing Director', '', '2018-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(3, 12, 'Laura Thornton', '/assets/images/persons/4/image.jpg', 'Event Manager', '', '2017-06-01', 'Right out of the gate, Laura was in the thick of analyzing market data and developing fact-based insights for the newspaper world (Gannett and USA Today) and the agency world (Response Marketing Group). She spent the last two decades at nonprofits, including Christian Children’s Fund and ChildFund International where she directed marketing, strategic insights and philanthropy programs. Laura has a bachelor’s degree in economics and political science from Duke University, and an MBA from the University of Richmond.'),
(1, 13, 'Mariafernanda Corral', '/assets/images/persons/5/image.jpg', 'Event Manager', '', '2017-06-01', 'With more than 20 years of experience, Maria Fernanda’s expertise spans talent management, executive coaching, strategy execution, organizational development and more. Her background includes working for multinational companies in Ecuador and the United States: La Internacional, Ericsson and Chiquita Brands. For the last decade, she has served as partner and general manager in Ecuador for Franklin Covey, a global consulting company that specializes in performance improvement. She received her bachelor’s degree in Industrial Psychology from Pontificia Universidad Catolica del Ecuador.'),
(2, 14, 'Bill Brewster', '/assets/images/persons/6/image.jpg', 'Event Manager', '', '2018-06-01', 'Bill worked at Hallmark for 17 years in different operational roles before opening his own business called Excel Logistics, a freight brokerage business. He ran the business for 10 years and sold it when he decided to tackle poverty. Bill’s first visit to a CA community center in Ecuador was “life changing” and as he looked into the eyes of the kids and the mothers he met, he knew he made the right decision.'),
(3, 15, 'Joachim Labiotech', '/assets/images/persons/7/image.jpg', 'Operations Manager', '', '2019-06-01', 'Joachim''s first job after graduating was as a Founder & Managing Director at Labiotech.eu. While he was studying biotechnology in Paris, he fell in love with CA’s mission, people and culture, and has been part of the organization ever since.'),
(4, 16, 'Menaa Bouzid Gemaco', '/assets/images/persons/8/image.jpg', 'Operations Manager', '', '2019-06-01', 'PhD in chemistry, specialized in bionanotechnology and infection control technology, experienced in quality certification: Medical Device ISO 13485 technical file, expert in business and export development in the healthcare area.'),
(1, 17, 'Tracey Cain', '/assets/images/persons/9/image.jpg', 'Operations Manager', '', '2020-06-01', 'Tracey’s specialty is communications strategy development and advisory roles with Boards and CEOs – applying 30 years of experience in a range of media and communications roles.On the political front, she worked as a journalist in both the NSW and Federal Parliamentary Press Galleries, as a Ministerial media adviser in Australia, and also in the White House during the 1996 Presidential Elections..');


INSERT INTO event (id_person, id_location, id_thumbnail, name, description, price, date_time) VALUES
(5, 1, 5, 'Christmas Charity Event To Arrange Clothes And Food For Children', 'Winters have been started and there are many poor kids on footpaths who don''t even have enough clothes to cover their bodies. They wander all day in search of food on the streets. Sometimes they get food and sometimes they may have to sleep empty-stomached. Their life is full of struggle everyday. We cannot help them financially. But, we can make one day of their life very special. A day when they will get enough food and clothes and a lot of joy through fun activities.</br>Christmas is the day of spreading happiness and that''s what we have planned for this Christmas. We just want to spread happiness. We want to see a smile on the faces of these innocent kids. I request you to make this event a success. A small donation from your end can be a big help to these poor kids.', 50.00, '2020-07-16'),
(6, 2, 6, 'Cycle For Charity To Benefit Children''s Education', 'This event will take place during month of August. All you’ll need to do is cycle a total of 85 miles in the month of August.</br>Please note that based on current Government guidelines we actively discourage anyone from trying to do this all at once. Instead, the event is set up for you to do a little bit each day that all adds up to your total. Remember that this is a time for calm recreation, not for challenging rides.', 70.00, '2020-08-16'),
(4, 3, 7, 'Adele Concert To Benefit Children''s Empowerment From Tickets', 'With the long awaited Adele concert in Colombia finally kicking off, Children Association has announced that it will be stocking Adele concert tickets to buy online.', 100.00, '2020-09-16'),
(3, 4, 8, 'Children''s Health Charity Dodoma Challenge', 'Take on this iconic challenge and trek from the South-West side of the National Park through the dense rainforest before reaching the summit to contribute to children''s health.', 200.00, '2020-10-16');


INSERT INTO contact (id, email, phone, starting_hours, ending_hours) VALUES
(1, 'susana.eshleman@children.association.org', '+49 202-303-404', '08:00', '16:00'),
(2, 'danielle.mitchell@children.association.org', '+49 306-562-156', '12:00', '17:00'),
(4, 'laura.thornton@children.association.org', '+49 809-569-489', '08:00', '12:00'),
(3, 'jack.maccanna@children.association.org', '+49 825-456-236', '09:00', '18:00'),
(5, 'mariafernanda.corral@children.association.org', '+49 569-156-459', '07:00', '11:00'),
(6, 'bill.brewster@children.association.org', '+49 789-456-123', '08:00', '14:00'),
(7, 'joachim.labiotech@children.association.org', '+49 896-562-123', '09:00', '15:00'),
(8, 'menaa.gemaco@children.association.org', '+49 569-894-125', '07:00', '11:00'),
(9, 'tracey.cain@children.association.org', '+49 784-145-896', '09:00', '17:00');

INSERT INTO previous_years_statistics (id, n_children, n_contributors, amount) VALUES
(1, 10000, 40, 80000),
(2, 1000, 60, 60000),
(3, 25000, 200, 250000),
(4, 20000, 80, 100000);


INSERT INTO testimonial (person_desc, testimonial, photo) VALUES
('Joel Lambert, CA World-changer <br> (Also a former navy seal and actor)','“Being a sponsor humbles me. It takes my eyes off of myself for a moment and allows me to do what I can to facilitate another’s journey. Even in such a small way ... It’s a chance to be a bit bigger than myself.”','/assets/images/testimonials/1/thumb.jpg'),
('Amer V., CA World-changer since 2004 </br> (Also world-renowned opera singer)', '“Kids just want to be kids no matter where in the world you are. CI makes a tremendous difference in their lives offering them education, health care, opportunities and a chance to just have fun.”', '/assets/images/testimonials/2/thumb.jpg'),
('Lou L., CA World-changer</br>Contributed in 2019 Trek event', '“I think CI opens the child’s eyes to the possibilities and their true potential, participating in event managed by Jack Mccanna was a nice experience and unforgettable ”', '/assets/images/testimonials/3/thumb.jpg'),
('Patricia D., CA World-changer</br>Contributed in 2019 Trek event', '“CA always makes me feel part of something special. The trek event organized by John was extremely professional, and I''d love to do it again.”', '/assets/images/testimonials/4/thumb.jpg'),
('Shannon D., CA World-changer</br>Contributed in 2019 Trek event', '“Knowing that I have the ability to make life better for somebody else is a powerful thing. I participated in this event beside having fun and finding friends, I think ‘I helped children and I actually made a difference.’ It’s an amazing feeling.”', '/assets/images/testimonials/5/thumb.jpg'),
('Frank N., CA World-changer </br>Contributed in 2019 Trek event', '“I love supporting your cause. I have been where these children are, and I feel everyone on this earth should have a heart to serve and give to each other. I enjoyed this event, amazing experience .”', '/assets/images/testimonials/6/thumb.jpg'),
('Shazara K., CA World-changer</br>Contributed in 2019 Trek event', '“I became a sponsor to reach out to give back. I am not wealthy, but if I can take a little from what I have each month to help a child in need no matter how small to me, it’s worth it.”', '/assets/images/testimonials/7/thumb.jpg');


INSERT INTO person_service (id_person, id_service) VALUES
(1,1),(1,2),(2,3),(2,4),(3,4),(4,1),(5,3),(5,4),(6,2),(7,2),(8,3),(8,1),(9,4),(9,2);

INSERT INTO event_service VALUES 
(1,4),(1,2),(2,3),(2,1),(3,2),(3,3),(4,1),(4,4);

INSERT INTO event_testimonial (id_testimonial, id_event) VALUES
(2,2),(3,1),(4,3),(5,4),(6,4);

INSERT INTO person_testimonial (id_testimonial, id_person) VALUES 
(1,1),(2,3),(3,4),(4,4),(5,6),(6,8);

INSERT INTO service_testimonial (id_testimonial, id_service) VALUES
(1,1),(2,1),(3,2),(4,3),(5,4),(6,3);










 





