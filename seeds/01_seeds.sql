INSERT INTO users (name, email, password) VALUES ('Paul Atreides', 'muaddib@fremens.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Gandalf', 'speakfriend@enter.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Hari Seldon', 'foundation@empire.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Martin Silenus', 'deadpoet@hyperion.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Gimli', 'andmy@ax.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Sand Shelter', 'Take refuge from worms and sand in this cosy cave.', 'thumbnail photo', 'cover photo', 42, 1, 0, 23, 'Arrakis', 'Sandyway', 'Oasisville', 'North-Western Desert', 'D1N2U3', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Shire Dwelling', 'Grassy roof and low ceilings', 'thumbnail photo', 'cover photo', 12, 2, 2, 4, 'Middle-Earth', 'Cobbleway', 'Shiretown', 'Shire', 'M3D4F1', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Rivendale Lofts', 'Perfect accomodation if you are visiting for a conference', 'thumbnail photo', 'cover photo', 145, 0, 4, 6, 'Middle-Earth', 'Waterway', 'Rivendale', '', 'M3D4F1', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('3102-08-23', '3102-08-25', 1, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('1160-09-17', '1160-09-15', 3, 5);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('1100-06-08', '1100-06-21', 2, 4);

INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message) VALUES (4, 3, 2, 4, 'Peace and quiet ideal for my poetry');
INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message) VALUES (3, 1, 1, 2, 'Rather uncomfortable');
INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message) VALUES (5, 2, 3, 5, 'Great mead!');