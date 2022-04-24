# Adin's Kona Dashboard

Hi!  Thanks for the opportunity to interview!  This is my Kona dashboard.  A link to a Loom description of the project can be [found here](https://www.loom.com/share/e3d51e4ceeb447d68769f43c8ee35829)

This project uses npm and pip for package management.

## Running the code 

For the frontend, simply install packages and run a dev server:

    cd kona-dash
    npm install
    npm start
    
For the backend, I prefer pipenv for virtual environment management:

    pipenv install
    pipenv shell
  
But I've included a `requirements.txt` in case you prefer `venv` or something similar

    pip install -r requirements.txt
  
Finally, you can run the backend server 
    
    cd kona-dash/server
    export FLASK_APP=app.py
    flask run
    
You should see a dashboard at `http://localhost:3000`!  Feel free to email akvashi24@gmail.com with any questions.
