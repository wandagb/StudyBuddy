cd StudyBuddy
cd client
sudo npm i
npm start &
server_pid=$!
cd ..
cd server

if [ ! -e ".env" ]; then
    touch .env
    echo "DB_URI=" >> .env
    echo "PORT=" >> .env
    echo "SECRET=" >> .env
fi

sudo npm i
npm start &
wait
kill $server_pid