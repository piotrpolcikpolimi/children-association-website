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

INSERT INTO thumbnail (title, thumbnail, thumbnail_desc) VALUES
('Health', '/assets/images/services/1/thumb.jpg', 'Knowledge is power, especially when it comes to getting and staying healthy. So our health programs focus on two important things:</br>1) developing healthy habits</br>2) connecting kids with services when they need help.'),
('Education', '/assets/images/services/2/thumb.jpg', 'Education doesn''t have a one-size-fits-all solution. Your support is invested in helping kids complete secondary school using a wide range of tools to make it happen: providing school fees, uniforms, supplies, tutoring and scholarships.'),
('Empowerement', '/assets/images/services/3/thumb.jpg', 'Through empowerment programs that build leadership, teamwork and confidence, you''re not only making a brighter future possible, but you''re also creating a positive ripple effect on kids'' communities.'),
('Employment', '/assets/images/services/4/thumb.jpg', 'Mock interviews, résumé writing, connecting with jobs, earning scholarships for college or vocational training, developing workplace and technical skills to help them change their lives for good.'),
('Christmas Charity Event To Arrange Clothes And Food For Children', '/assets/images/events/1/thumb.jpg', 'We have planned a special charity event which is about helping the poor kids by providing them food and clothes.'),
('Cycle For Charity To Benefit Children''s Education','/assets/images/events/2/thumb.jpg','Cycling has become one of our favourite national sports. If you have access to a bike, then you can take on a cycle for charity.'),
('Adele Concert To Benefit Children''s Empowerment From Tickets', '/assets/images/events/3/thumb.jpg', 'Programme includes works by Scriabin / Blumenfeld / Reinecke / Bach / Alice Charbonnet and others.'),
('Treks For Charity To Benefit Children''s Health', '/assets/images/events/4/thumb.jpg', 'If you want to do something a little different, then taking on a trek for charity could be exactly what you are looking for.'),
('Susana Eshleman', '/assets/images/persons/1/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Danielle Mitchel', '/assets/images/persons/2/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Jack Maccanna', '/assets/images/persons/3/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Laura Thornton', '/assets/images/persons/4/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Mariafernanda Corral', '/assets/images/persons/5/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Bill Brewster', '/assets/images/persons/6/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Joachim Labiotech', '/assets/images/persons/7/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Menaa Bouzid Gemaco', '/assets/images/persons/8/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.'),
('Tracey Cain', '/assets/images/persons/9/thumb.jpg', 'Leading global staff at Children Association (CA) who change childre''s lives. Jack''s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:</br>Bringing people together to end poverty for good.');

INSERT INTO location (name, country, country_flag_icon, latitude, longitude) VALUES
('Mumbai', 'India', '/assets/images/location/1/flag.png', 19.075983, 72.877655),
('Gorgan', 'Iran', '/assets/images/location/2/flag.png', 36.826090, 54.433480),
('Bogota', 'Colombia', '/assets/images/location/3/flag.png', 4.624335, -74.063644),
('Dodoma', 'Tanzania', '/assets/images/location/4/flag.png', -6.161184, 35.745426);

INSERT INTO service (id_thumbnail, name, center_activities, description, practical_info, header_photo, cta) VALUES
(1, 'Health', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances. What is sponsorship? Find out more.</br></br>Here are some of the ways your support helps to reinforce healthy habits:</br></br>1. Sharing information (presentations, pamphlets, posters and one-on-one counseling) about critical health topics tailored to children or caregivers</br></br>2. Working to identify health-related attitudes and influence them with comprehensive communications</br></br>3. Creating learning opportunities where kids can practice skills in a supportive environment</br></br>4. Fostering individual support for kids and families with health challenges</br></br>5. Using peer modeling to demonstrate healthy behavior</br></br>6. Reducing barriers to healthy behaviors.', 'We bring health care to Children and Families wherever they are, whatever their circumstances or income, we go where disadvantaged kids are to give them the care they won''t get from anyone else. Our network of medical teams bring care to vulnerable children in disadvantaged communities.', '</br>1. Operating Medical And Dental Clinics And Pharmacies At CI Community Centers When Services Are Not Otherwise Accessible Or Affordable</br></br>2. Helping Kids And Their Families Access And Enroll In Existing Government/Public Health Insurance Programs</br></br>3. Providing Subsidies For Out-Of-Pocket Expenses Where Support Doesn''t Exist</br></br>4. Creating Partnerships With Local Hospitals, Clinics And Pharmacies To Reduce Costs</br></br>5. Mapping Services To Bring Services Closer To Sponsored Communities', '/assets/images/services/1/header.jpg', 'To help curb the spread of coronavirus, Children Association is investing $650,000 toward handwashing education. Join us in this important effort to create healthy behaviors that prevent the spread of disease!'),
(2, 'Education', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances. What is sponsorship? Find out more.</br></br>Here are some of the ways your support helps to reinforce healthy habits:</br></br>1. Sharing information (presentations, pamphlets, posters and one-on-one counseling) about critical health topics tailored to children or caregivers</br></br>2. Working to identify health-related attitudes and influence them with comprehensive communications</br></br>3. Creating learning opportunities where kids can practice skills in a supportive environment</br></br>4. Fostering individual support for kids and families with health challenges</br></br>5. Using peer modeling to demonstrate healthy behavior</br></br>6. Reducing barriers to healthy behaviors.', 'We bring health care to Children and Families wherever they are, whatever their circumstances or income, we go where disadvantaged kids are to give them the care they won''t get from anyone else. Our network of medical teams bring care to vulnerable children in disadvantaged communities.', '</br>1. Operating Medical And Dental Clinics And Pharmacies At CI Community Centers When Services Are Not Otherwise Accessible Or Affordable</br></br>2. Helping Kids And Their Families Access And Enroll In Existing Government/Public Health Insurance Programs</br></br>3. Providing Subsidies For Out-Of-Pocket Expenses Where Support Doesn''t Exist</br></br>4. Creating Partnerships With Local Hospitals, Clinics And Pharmacies To Reduce Costs</br></br>5. Mapping Services To Bring Services Closer To Sponsored Communities', '/assets/images/services/2/header.jpg', 'To help curb the spread of coronavirus, Children Association is investing $650,000 toward handwashing education. Join us in this important effort to create healthy behaviors that prevent the spread of disease!'),
(3, 'Empowerement', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances. What is sponsorship? Find out more.</br></br>Here are some of the ways your support helps to reinforce healthy habits:</br></br>1. Sharing information (presentations, pamphlets, posters and one-on-one counseling) about critical health topics tailored to children or caregivers</br></br>2. Working to identify health-related attitudes and influence them with comprehensive communications</br></br>3. Creating learning opportunities where kids can practice skills in a supportive environment</br></br>4. Fostering individual support for kids and families with health challenges</br></br>5. Using peer modeling to demonstrate healthy behavior</br></br>6. Reducing barriers to healthy behaviors.', 'We bring health care to Children and Families wherever they are, whatever their circumstances or income, we go where disadvantaged kids are to give them the care they won''t get from anyone else. Our network of medical teams bring care to vulnerable children in disadvantaged communities.', '</br>1. Operating Medical And Dental Clinics And Pharmacies At CI Community Centers When Services Are Not Otherwise Accessible Or Affordable</br></br>2. Helping Kids And Their Families Access And Enroll In Existing Government/Public Health Insurance Programs</br></br>3. Providing Subsidies For Out-Of-Pocket Expenses Where Support Doesn''t Exist</br></br>4. Creating Partnerships With Local Hospitals, Clinics And Pharmacies To Reduce Costs</br></br>5. Mapping Services To Bring Services Closer To Sponsored Communities', '/assets/images/services/3/header.jpg', 'To help curb the spread of coronavirus, Children Association is investing $650,000 toward handwashing education. Join us in this important effort to create healthy behaviors that prevent the spread of disease!'),
(4, 'Employment', 'Kids enrolled in our sponsorship program have access to the just-right mix of resources, based on location, age and life circumstances. What is sponsorship? Find out more.</br></br>Here are some of the ways your support helps to reinforce healthy habits:</br></br>1. Sharing information (presentations, pamphlets, posters and one-on-one counseling) about critical health topics tailored to children or caregivers</br></br>2. Working to identify health-related attitudes and influence them with comprehensive communications</br></br>3. Creating learning opportunities where kids can practice skills in a supportive environment</br></br>4. Fostering individual support for kids and families with health challenges</br></br>5. Using peer modeling to demonstrate healthy behavior</br></br>6. Reducing barriers to healthy behaviors.', 'We bring health care to Children and Families wherever they are, whatever their circumstances or income, we go where disadvantaged kids are to give them the care they won''t get from anyone else. Our network of medical teams bring care to vulnerable children in disadvantaged communities.', '</br>1. Operating Medical And Dental Clinics And Pharmacies At CI Community Centers When Services Are Not Otherwise Accessible Or Affordable</br></br>2. Helping Kids And Their Families Access And Enroll In Existing Government/Public Health Insurance Programs</br></br>3. Providing Subsidies For Out-Of-Pocket Expenses Where Support Doesn''t Exist</br></br>4. Creating Partnerships With Local Hospitals, Clinics And Pharmacies To Reduce Costs</br></br>5. Mapping Services To Bring Services Closer To Sponsored Communities', '/assets/images/services/4/header.jpg', 'To help curb the spread of coronavirus, Children Association is investing $650,000 toward handwashing education. Join us in this important effort to create healthy behaviors that prevent the spread of disease!');

INSERT INTO person (id_location, id_thumbnail, name, picture, role, description, joining_date, experience) VALUES
(1, 9, 'Susana Eshleman', '/assets/images/persons/1/image.jpg', 'Managing Director', '', '2016-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(2, 10, 'Danielle Mitchell', '/assets/images/persons/2/image.jpg', 'Managing Director', '', '2016-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(4, 11, 'Jack Maccanna', '/assets/images/persons/3/image.jpg', 'Managing Director', '', '2018-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(3, 12, 'Laura Thornton', '/assets/images/persons/4/image.jpg', 'Event Manager', '', '2017-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(1, 13, 'Mariafernanda Corral', '/assets/images/persons/5/image.jpg', 'Event Manager', '', '2017-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(2, 14, 'Bill Brewster', '/assets/images/persons/6/image.jpg', 'Event Manager', '', '2018-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(3, 15, 'Joachim Labiotech', '/assets/images/persons/7/image.jpg', 'Operations Manager', '', '2019-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(4, 16, 'Menaa Bouzid Gemaco', '/assets/images/persons/8/image.jpg', 'Operations Manager', '', '2019-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.'),
(1, 17, 'Tracey Cain', '/assets/images/persons/9/image.jpg', 'Operations Manager', '', '2020-06-01', 'Ironically, Jack''s first job after graduating was as a field representative for CI. He went on to work for the Diocese of Rumbek in Sudan, USAID in Nairobi, then Pact in Zambia and Namibia. All these organizations also fight global poverty. He moved back to the United States to be the executive director at the YMCA in Geneva, New York, before returning to CI. Jack holds a bachelor’s degree in history from Marquette University and an MBA from the Thunderbird School of Global Management.');

INSERT INTO event (id_person, id_location, id_thumbnail, name, description, price, date_time) VALUES
(5, 1, 5, 'Christmas Charity Event To Arrange Clothes And Food For Children', 'Take on this iconic challenge and trek from the South-West side of the National Park through the dense rainforest before reaching the summit to contribute to children''s health.', 50.00, '2020-07-16'),
(6, 2, 6, 'Cycle For Charity To Benefit Children''s Education', 'Take on this iconic challenge and trek from the South-West side of the National Park through the dense rainforest before reaching the summit to contribute to children''s health.', 70.00, '2020-08-16'),
(4, 3, 7, 'Adele Concert To Benefit Children''s Empowerment From Tickets', 'Take on this iconic challenge and trek from the South-West side of the National Park through the dense rainforest before reaching the summit to contribute to children''s health.', 100.00, '2020-09-16'),
(3, 4, 8, 'Children''s Health Charity Kilimanjaro Challenge', 'Take on this iconic challenge and trek from the South-West side of the National Park through the dense rainforest before reaching the summit to contribute to children''s health.', 200.00, '2020-10-16');

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
('Frank N., CA World-changer </br>Contributed in 2019 Trek event', '“I love supporting your cause. I have been where these children are, and I feel everyone on this earth should have a heart to serve and give to each other. I enjoyed this event, amazing experience .”', '/assets/images/testimonials/6/thumb.jpg');


INSERT INTO person_service (id_person, id_service) VALUES
(1,1),(1,2),(2,3),(2,4),(3,4),(4,1),(5,3),(5,4),(6,2),(7,2),(8,3),(8,1),(9,4),(9,2);

INSERT INTO event_service VALUES 
(1,4),(1,2),(2,3),(2,1),(3,2),(3,3),(4,1),(4,4);

INSERT INTO event_testimonial (id_testimonial, id_event) VALUES
(2,2),(3,1),(4,3),(5,4),(6,4);

INSERT INTO person_testimonial (id_testimonial, id_person) VALUES 
(1,1),(2,3),(3,4),(4,4),(5,6),(6,8);

insert into service_testimonial (id_testimonial, id_service) VALUES
(1,1),(2,1),(3,2),(4,3),(5,4),(6,3);











 





