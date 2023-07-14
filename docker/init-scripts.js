db = db.getSiblingDB('prompt');
db.createUser({
    user: 'admin',
    pwd: 'secret',
    roles: [{ role: 'readWrite', db: 'prompt' }]
});
//
// db.createCollection('User');
//
// db.user.insertOne({ username:'test', email: 'test@@gmail.com', picture: 'testst'})