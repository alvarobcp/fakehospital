# One Click Appointment - fakeHospital

One Click Appointment is a system that permits hospital workers or patients to get or edit an appointment with a doctor, and it permits doctors to see their appointments, delete it and create new ones.

It is developed to practise with React, javaScript, CSS, databases and Node.js with Express.

The database is hosted on [Supabase](https://supabase.com/).
The backend server is deployed on [Render](https://render.com/).
The login autentification uses [Auth0](https://auth0.com/).

It is a personal project developed just to practise and improve my skills.

You can visit the web at the Firebase [link](https://hospital-eb247.web.app).

## Login and data description

The database contains some hospital users and doctors.

To login as a doctor you can use the following usernames: [77911, 48726, 36988, 47058, 18726] and the password is the username plus "Fake!"

Example:
Username: 77911
Password: 77911Fake!

Each doctor has a name, surname, credential, speciality, phone, mail and a profile pic which is from [DiceBear](https://www.dicebear.com/).

To login as a hospital user you can use the following usernames: [martaper, guillermogar] and the password is the username plus "Fake!"

Example:
Username: martaper
Password martaperFake!

Each user has a name, surname, adress, phone, mail and a profile pic which is from [DiceBear](https://www.dicebear.com/).

The connexion between the data is established through the appointments, which contains the date and time.

## About me

You can see more projects in my [GitHub](https://github.com/alvarobcp) profile. I finished my Full-Stack Course and now I am developing some projects by my own. Hope you like it!