# flashcard-app
Flashcard studying app for CS35L

# Running the App
## Client
### Requisites:
- Node 20.11.0
- NPM 10.2.4

### Running the Client
- make sure npm and node are installed 
- cd into client
- `npm start` to run app
- if error with react-router-dom, run "npm install react-router-dom"

## Server
### Requisites:
- Python 3.9
- Pip 24.0

### Running the server
Mac:
- cd into server
- `python3 -m venv venv` to create the virtual environment (venv)
- run `source venv/bin/activate` to enter venv
- `python3 -m pip install --upgrade pip` to make sure your pip is version 24.0
- run `pip3 install Flask`
- run `pip3 install firebase-admin`
- `python3 server.py` to run server

Windows:
- cd into server
- `python -m venv venv` to create the virtual environment (venv)
- run `.\venv\Scripts\activate` to enter venv
- `python -m pip install --upgrade pip` to make sure your pip is version 24.0
- run `pip install Flask`
- run `pip install firebase-admin`
- `python server.py` to run server