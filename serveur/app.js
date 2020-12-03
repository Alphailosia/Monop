const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server, {
   cors: {
      origin: '*',
   }
})



var joueurs = [];
var index = 0;

// établissement de la connexion
io.on('connection', (socket) => {

   console.log(`Connecté au client ${socket.id}`);
   socket.emit("connection");


   // ecoute du nom  
   socket.on('nom', data => {
      console.log("nom recu %s", data);
      joueurs[index] = {
         nom: data,
         prison: false,
         tourPrison: 0,
         cartePrison: [],
         deplLeft: 150,
         deplTop: 200,
         caseVisitees: 0,
         retDepl: 0,
         inventaire: {
            argent: 1500,
            proprietes: [],
         },
      }
      index++;
      io.emit("envoiNom", joueurs);
   });

   // lancement de la partie
   socket.on('launch', () => {
      io.emit('start');
   });

   // deplacement du joueur
   socket.on('jouer', (data) => {
      io.emit('deplacement', data);
   });

   // effet de la case départ
   socket.on('prison', (data) => {
      io.emit("etatJoueurs", data)
   });

   // etat prison du joueur 
   socket.on('prison', (data) => {
      io.emit("etatJoueurs", data)
   });

   // etat prison du joueur 
   socket.on('sortiPrison', (data) => {
      io.emit("etatJoueurs", data)
   });

   // fin de la partie
   socket.on('end', () => {
      io.emit("finPartie");
   });
});



// on change app par server
server.listen(3000, function () {
   console.log('Votre app est disponible sur localhost:3000 !')
})
