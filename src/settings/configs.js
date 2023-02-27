const PORT=3000
const CLIENT_ID="e9f6216b9d1d4090b48d418f1617f809"
const CLIENT_SECRET="da853cae1a5b4bcba80b79721cdbaae9"
const REDIRECTURI="http://localhost:3000/.netlify/functions/api/logged"
const CLIENT_REDIRECTURI="http://localhost:3000/.netlify/functions/api/token/"

module.exports = {
    puerto: PORT,
    clienteid: CLIENT_ID,
    clientesecreto: CLIENT_SECRET,
    redirecturi: REDIRECTURI,
    clienteredirect: CLIENT_REDIRECTURI,
}