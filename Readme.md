# Presentation

## TODO
* [x] EXERCICE 2
    * [x] creation de `webpack.config.js` dans le dossier client
    * [x] creation d'un cible `build` dans `package.json`
    * [x] possibilite d'utiliser le `serveur de development` de `webpack`
    * [x] mode de `production` dans `webpack.config.json`
* [x] EXERCICE 3
    * [x] class `paddle.js` cree
    * [x] raquette ajoute a gauche de l'ecran
    * [x] appuyer sur `espace` pour relancer la balle (ancienne version)
    * [x] la `vitesse de deplacement` de la balle depend du `point de collision` (disable debug)
    * [x] le jeu fonctionne en mode `production` avec le serveur
* [x] EXERCICE 4
    * [x] deuxieme raquette ajoute, collisions geres
    * [x] les deux raquettes sont deplaces en meme temps (ancienne version)
    * [x] la balle s'arrete lors d'un but (ancienne version)
    * [x] autres touches pour controller la deuxieme raquette
    * [x] les scores de chaque joueur sont affiches sur la page
    * [x] le jeu fonctionne en mode `production` avec le serveur
* [x] EXERCICE 5 
    * [x] activation du mode `surveillance` de webpack dans le fichier `webpack.config.js`
    * [x] choisir le dossier `public` comme destination du travail
    * [x] le serveur n'accepte que les `deux premieres` connexions
    * [x] la connextion est etablie `apres` avoir appuyer sur un bouton
    * [x] l'interface signale au joueur s'il est `premier`, `deuxieme` ou si la connexion est refusee
    * [x] le client puisse `se deconnecter` en appuyant sur un bouton
    * [x] le jeu s'arrete lors de l'appuye sur le bouton `deconnecter` 
    * [x] les deux clients sont deconnecte apres l'appuye sur le bouton `deconnecter`
    * [x] l'interface est retablie au debut apres un deconnexion
    * [x] Pour lancer la nouvelle balle le joueur 1 (seulement) appuye sur un bouton
    * [x] le jeu ne commence que apres une connexion de deux joueurs
    * [x] le deplacement du raquette de chaque joueur est envoye a l'autre a travers le serveur
    ###### LE MODE CHOISIS EST D'AVOIR LE MEME POSITIONEMENT POUR LES DEUX INTERFACES DES JOUEURS
    * [x] la position de la raquette est aussi envoyer pas seulement la commande de deplacement
    * [x] `synchronisation` de position de la balle apres chaque `collision` avec les raquettes
    * [x] `synchronisation` de position de la balle apres avoir traverser le `milieu du terrain`
    * [x] modifier les fichiers `client`/`serveur` pour avoir un jeu fonctionel depuis different ordinateurs
* [ ] BONUS
    * [x] apres la deconnexion d'un joueur un message est affiche a l'autre
    * [x] gestion et affichage de scores
    * [ ] declanchement de la partie apres un certain nombre de buts
    * [x] repositionnement des raquettes au centre apres chaque but
    * [ ] zone de discussion entre les joueurs

## Description
L'objectif est de r??aliser une version simplifi??e de l'historique jeu `Pong`. La r??alisation passera par une mise en place progressive et plusieurs versions successives. A terme, on veut disposer d'une version `r??seau` puisque les joueurs pourront d'affronter depuis deux ordinateurs diff??rents.

## les principes aborde??s dans ce projet:
* [x] De g??rer ?? la fois le d??veloppement c??t?? client et c??t?? serveur
* [x] L'utilisation de `Node.js` et `Webpack` pour g??rer le code client
* [x] L'utilisation d'un serveur web r??aliser avec `Node.js`
* [x] L'utilisation de `socket.io` pour g??rer des communications bi-directionnelles entre le client et le serveur et ainsi permettre le jeu en r??seau.

# Mise en route
## Pr??requis
* <img src="https://icon-library.com/images/nodejs-icon/nodejs-icon-7.jpg" width="25">  Node.js - an open source development platform for executing JavaScript code server-side
* <img src="https://seeklogo.com/images/N/npm-logo-01B8642EDD-seeklogo.com.png" width="25">  NPM - the default package manager for the JavaScript runtime environment Node. js

## installation
* r??cup??rer le d??p??t avec:
```console
fayssal@mypc:~$ git clone https://gitlab-etu.fil.univ-lille1.fr/elansari/JSFS4_L3_EL-ANSARI.git
```
* Acceder au directoire du projet:
```console
fayssal@mypc:~$ cd TP3
```
* installer les paquets *Node.js* :
 ```console
 fayssal@mypc:~$ npm install
 fayssal@mypc:~$ npm run build
```
 * D??marrer le serveur a partir de `./server`:
 ```console
 fayssal@mypc:~$ nodemon
 ```
 * Pour ajouter vos propres modifications au client a partir de `./client` en mode hot-reload:
  ```console
 fayssal@mypc:~$ npm run watch
 ```
 * Pour recuperer un version precise de l'application des `tags` on ete ajoute:
    * pour le debut du development
        ```console
        fayssal@mypc:~$ git checkout v0
        ```
    * pour la fin du development
        ```console
        fayssal@mypc:~$ git checkout v4
        ```

# Developement
### Hierarchie

* `/client` est le dossier pour le d??veloppement du code pour le client. Dans cette premi??re version propos??e, le `jeu` consiste simplement en une balle qui rebondit dans les limites d'un terrain.
Le dossier `/client` contient notamment un dossier `src/` avec un certain nombre de ressources : code `HTML`, `feuille de style` et `images`. Mais aussi du code `javascipt` dans le dossier `scripts`:

    *   `scripts/pong.js` est le script principal, il est charg?? par le fichier `index.html`. Ce script cr??e l'objet jeu ?? partir d'un canvas de la page et lance ou arr??te le jeu apr??s un clic sur le bouton `#start`.

    *   `scripts/Game.js` d??finit la classe `Game` qui est la classe principale pour le jeu. Un jeu est caract??ris?? par un `terrain de jeu` qui correspond ?? un objet `canvas` dans lequel le jeu est dessin??. Ce canvas est fourni ?? la construction. A un jeu correspond une animation (`raf`). Un jeu dispose d'un objet balle, initialement plac?? au centre du canvas. Sa m??thode `start()` lance le jeu en d??marrant l'animation (`animate()`).

    *   `scripts/Mobile.js` d??finit la classe Mobile. Un mobile dispose de coordonn??es (`x`, `y`), d'une image (`img`). Il est possible de dessiner (`draw()`) l'image d'un mobile au point correspondant ?? ses coordonn??es. Un mobile est ??galement carat??ris?? par des `vitesses de d??placement` horizontale (`shiftX`) et verticale (`shiftY`), il peut se d??placer (`move()`), ce qui met ?? jour ses coorodonn??es. La largeur (`width`) et hauteur (`height`) d'un mobile sont celles de son image.

    *   `scripts/Ball.js` d??finit la classe Ball. Une balle est un mobile dont le dessin est une balle et qui est plac?? dans un jeu (`theGame`) fourni ?? la construction. Lors de son d??placement, la balle reste dans les limites du terrain de jeu d??fini par le canvas du jeu en rebondissant sur les bords de ce terrain.
    
    *   `/server` est le dossier pour le d??veloppement du code pour le serveur : vous y retrouvez une configuration initiale similaire ?? celle d??j?? rencontr??e et dans laquelle le serveur web mis en place est en mesure de d??livrer, telles qu'elles, les ressources statiques plac??es dans le dossier `server/public`.

# Construit avec
* <img src="https://icon-library.com/images/nodejs-icon/nodejs-icon-7.jpg" width="25">  Node.js - An open source development platform for executing JavaScript code server-side
* <img src="https://webpack.js.org/icon-pwa-512x512.d3dae4189855b3a72ff9.png" width="25">  Webpack - A module bundler for JavaScript files to be used in a browser
* <img src="https://icons-for-free.com/iconfiles/png/512/super+tiny+icons+javascript-1324450741921820748.png" width="25">  Javascript  - A programming language that is one of the core technologies on the Web
* <img src="https://freeiconshop.com/wp-content/uploads/edd/html-flat.png" width="25">  html  - The standard markup language for documents designed to be displayed in a web browser
* <img src="https://cdn-icons-png.flaticon.com/512/29/29088.png" width="25">  css - A style sheet language used for describing the presentation of a document written in html

# Auteur
* Fayssal EL ANSARI

# License
* GNU General Public License v3.0
