# Presentation
## Demonstration En Video
###### TODO

## Description
L'objectif est de réaliser une version simplifiée de l'historique jeu `Pong`. La réalisation passera par une mise en place progressive et plusieurs versions successives. A terme, on veut disposer d'une version `réseau` puisque les joueurs pourront d'affronter depuis deux ordinateurs différents.

## les principes abordeés dans ce projet:
* [ ] De gérer à la fois le développement côté client et côté serveur
* [ ] L'utilisation de `Node.js` et `Webpack` pour gérer le code client
* [ ] L'utilisation d'un serveur web réaliser avec `Node.js`
* [ ] L'utilisation de `socket.io` pour gérer des communications bi-directionnelles entre le client et le serveur et ainsi permettre le jeu en réseau.

# Mise en route
## Prérequis
* <img src="https://icon-library.com/images/nodejs-icon/nodejs-icon-7.jpg" width="25">  Node.js - an open source development platform for executing JavaScript code server-side
* <img src="https://seeklogo.com/images/N/npm-logo-01B8642EDD-seeklogo.com.png" width="25">  NPM - the default package manager for the JavaScript runtime environment Node. js

## installation
* récupérer le dépôt avec:
```console
fayssal@mypc:~$ git clone https://github.com/fayssalElAnsari/ToDo-List-with-Priority-Time-and-Status.git
```
* installer les paquets *Node.js* :
 ```console
 fayssal@mypc:~$ npm install
 fayssal@mypc:~$ npm run build
```
 * démarrer le serveur de développement de *Webpack*
 ```console
 fayssal@mypc:~$ npm run dev-server
 ```

# Developement
## Mise En Place (V0)
### Hierarchie

* `/client` est le dossier pour le développement du code pour le client. Dans cette première version proposée, le `jeu` consiste simplement en une balle qui rebondit dans les limites d'un terrain.
Le dossier `/client` contient notamment un dossier `src/` avec un certain nombre de ressources : code `HTML`, `feuille de style` et `images`. Mais aussi du code `javascipt` dans le dossier `scripts`:

    *   `scripts/pong.js` est le script principal, il est chargé par le fichier `index.html`. Ce script crée l'objet jeu à partir d'un canvas de la page et lance ou arrête le jeu après un clic sur le bouton `#start`.

    *   `scripts/Game.js` définit la classe `Game` qui est la classe principale pour le jeu. Un jeu est caractérisé par un `terrain de jeu` qui correspond à un objet `canvas` dans lequel le jeu est dessiné. Ce canvas est fourni à la construction. A un jeu correspond une animation (`raf`). Un jeu dispose d'un objet balle, initialement placé au centre du canvas. Sa méthode `start()` lance le jeu en démarrant l'animation (`animate()`).

    *   `scripts/Mobile.js` définit la classe Mobile. Un mobile dispose de coordonnées (`x`, `y`), d'une image (`img`). Il est possible de dessiner (`draw()`) l'image d'un mobile au point correspondant à ses coordonnées. Un mobile est également caratérisé par des `vitesses de déplacement` horizontale (`shiftX`) et verticale (`shiftY`), il peut se déplacer (`move()`), ce qui met à jour ses coorodonnées. La largeur (`width`) et hauteur (`height`) d'un mobile sont celles de son image.

    *   `scripts/Ball.js` définit la classe Ball. Une balle est un mobile dont le dessin est une balle et qui est placé dans un jeu (`theGame`) fourni à la construction. Lors de son déplacement, la balle reste dans les limites du terrain de jeu défini par le canvas du jeu en rebondissant sur les bords de ce terrain.
    
    *   `/server` est le dossier pour le développement du code pour le serveur : vous y retrouvez une configuration initiale similaire à celle déjà rencontrée et dans laquelle le serveur web mis en place est en mesure de délivrer, telles qu'elles, les ressources statiques placées dans le dossier `server/public`.

## TODO



# Construit avec
* <img src="https://image.pngaaa.com/896/2507896-middle.png" width="25"> React - A declarative, efficient, and flexible JavaScript library for building user interfaces
* <img src="https://icon-library.com/images/nodejs-icon/nodejs-icon-7.jpg" width="25">  Node.js - An open source development platform for executing JavaScript code server-side
* <img src="https://webpack.js.org/icon-pwa-512x512.d3dae4189855b3a72ff9.png" width="25">  Webpack - A module bundler for JavaScript files to be used in a browser
* <img src="https://ih1.redbubble.net/image.438908244.6144/st,small,507x507-pad,600x600,f8f8f8.u2.jpg" width="25">  Express - A back end web application framework for Node.js
* <img src="https://icons-for-free.com/iconfiles/png/512/super+tiny+icons+javascript-1324450741921820748.png" width="25">  Javascript  - A programming language that is one of the core technologies on the Web
* <img src="https://freeiconshop.com/wp-content/uploads/edd/html-flat.png" width="25">  html  - The standard markup language for documents designed to be displayed in a web browser
* <img src="https://cdn-icons-png.flaticon.com/512/29/29088.png" width="25">  css - A style sheet language used for describing the presentation of a document written in html

# Auteur
* Fayssal EL ANSARI

# License
* GNU General Public License v3.0