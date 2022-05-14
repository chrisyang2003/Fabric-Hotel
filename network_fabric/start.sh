
cd  ./network/test-network/

./network.sh down
./network.sh up createChannel -ca -s couchdb

sudo chmod -R 777 ./organizations

./network.sh deployCC -ccp ../../chaincode/ -ccl javascript -ccv 1.0 -ccn hotel

cd ../../explorer
./start.sh


