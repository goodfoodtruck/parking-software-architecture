# 006. Notification service
## Status:
Proposed

## Contexte:
Quand l'application de réservation de parking envoie un message
lorsqu'une réservation est effectuée, une autre application doit lire ces messages pour envoyer un mail de confirmation aux utilisateurs correspondants.
Ce service doit-il vivre au sein du backend ou plutôt être externe ? 

## Décision:
Nous avons fait le choix de découpler le service de notification de notre logique métier, tout ce qui concerne les notifications n'a pas de lien avec la logique métier et doit donc vivre en dehors.

## Conséquences:
#### Positives (+) :
Développement indépendant, logique métier pas impactée.

#### Négatives (-) :
Coût en infrastructure, nécessite un service tierce à déployer et à connecter au reste de l'infrastructure.
