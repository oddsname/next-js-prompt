db = db.getSiblingDB('prompt');
db.createUser({
    user: 'admin',
    pwd: 'secret',
    roles: [{ role: 'readWrite', db: 'mydatabase' }]
});