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
var ordre = [];
var indexOrdre = 0;

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
      io.emit('ordre');
   });

   //ordre joueur
   socket.on('ordreJ', (data) => {
      ordre[indexOrdre]=data;
      indexOrdre++;
      console.log(ordre)
      if(indexOrdre==joueurs.length){
         if(ordreEgal()){
            ordre = [];
            indexOrdre=0;
            io.emit('ordre');
         }
         else{
            joueurs = triJoueur()
            io.emit("start",joueurs)
         }
      }
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

function ordreEgal(){
   let egal = false;
   for(let i=0;i<ordre.length;i++){
      if(i>0){
         egal = ordre[i].lancer==ordre[i-1].lancer;
      }
   }
   return egal;
}

function triJoueur(){
   console.log('appel du tri :)')
   let joue = [];
   for(let i=0;i<ordre.length-1;i++){
      for(let j=0;j<ordre.length;j++){
         if(j>0){
            if(ordre[j].lancer>ordre[j-1].lancer){
               let t = ordre[j];
               ordre[j] = ordre[j-1];
               ordre[j-1]=t
            }
         }
      }
   }
   console.log(ordre)
   for(let k=0;k<ordre.length;k++){
      for(let l=0;l<joueurs.length;l++){
         if(ordre[k].nom===joueurs[l].nom){
            joue[k]=joueurs[l]
         }
      }
   }

   return joue;
}

// on change app par server
server.listen(3000, function () {
   console.log('Votre app est disponible sur localhost:3000 !')
})
