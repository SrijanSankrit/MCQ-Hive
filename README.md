# MCQ Hive

## About
A web platform where experts can share their knowledge in the form of quizzes and students can interact and learn by attempting those quizzes.
The Website is currently in Beta.

This website is developed from this awesome [Django-React BoilerPlate](https://github.com/SrijanSankrit/django-react-boilerplate).

Following Libraries were used for building this project:
- [React](https://reactjs.org), for Interactive User Interface.
- [Material UI](https://material-ui.com), for interactive styling on the Homepage and Profile Page.
- [Redux](https://redux.js.org), for maintaining global states, useful for authentication.
- [Django REST Framework](https://www.django-rest-framework.org), for hosting the APIs and backend models.
- [Djoser](https://djoser.readthedocs.io/en/latest/), for implementing JWT Authentication in the backend.

This project was developed when I was learning and building my Web Technology Stack during summer 2020.

## How to use the project locally?

```
git clone https://github.com/SrijanSankrit/django-react-boilerplate.git
```

Now, open the project folder in terminal (for **Linux/ Mac** users) or CMD(**Windows** users)

### Backend setup

```
cd backend/
virtualenv venv
source venv/bin/activate (for Linux/Mac Users)  OR  \venv\Scripts\activate.bat(Windows Users)
pip3 install -r reqirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

The backend server will start running on **http://localhost:8000** (by default). 

Now, open another window on your terminal/ CMD.

### Frontend setup

```
cd frontend/
npm i
npm run start
```

The frontend server will start running on **http://localhost:3000** (by default).
This link will show the actual website.


