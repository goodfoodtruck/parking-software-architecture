# 001. Plateformes dédiées pour chaque type d'utilisateur
## Contexte:
On a 3 utilisateurs avec chacun un besoin différent concernant la réservation des places de parking.
Est-ce que les 3 doivent utiliser la même application qui répond à tous les besoins en même temps,
ou plutot 3 applications distinctes qui répondent à chacun des besoins respectivement. 


## Décision:
Les règles métiers concernent les 3 types d'utilisateurs. Elles sont encapsulées dans 
un coeur métier commun (réservation, places, utilisateurs, ...). En revanche, les fonctionnalités sont
spécfiques à chaque type d'utilisateur, et nécessitent donc de les isoler les unes des autres. 

Dans l'idéal on aurait fait le choix de développer 3 applications distinctes : 
- Une application mobile pour les salariés. Le processus de réservation doit être intégré à leur
  quotidien, et séparé de leur environnement de travail.

- Un back-office web pour le secrétariat. Pour que ce soit intégré dans leur environnement de
  travail (workflow). La gestion requiert une taille d'écran plus large pour mieux contrôler les données.

- Un dashboard web pour le management. La visualisation de données (graphiques, statistiques),
  s'applique sur une taille d'écran plus large.

Le temps de développement étant imparti (1 semaine). Nous convenons de plutôt faire une seule
application web, mobile friendly pour la partie employés, et on la sépare avec rôles.

## Conséquences:
#### Positives (+) :

Le développement d'une feature pour un type d'utilisateur n'impacte pas ceux qui ne sont
pas concernés.

#### Négatives (-) :

Déploiement plus lourd. Implique une séparation des équipes.