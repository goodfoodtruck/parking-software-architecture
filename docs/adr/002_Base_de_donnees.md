# 002. Base de données
## Status:
Proposed

## Contexte:
Le système nécessite de conserver un historique complet, de lier des utilisateurs à des places spécifiques, et de générer des statistiques précises pour le dashboard des managers.

## Decision:
Nous utiliserons PostgreSQL comme base de données relationnelle.

## Consequences:
#### Positive :
Intégrité des données (ACID), requêtes analytiques puissantes, s'intègre parfaitement avec Docker.

#### Negative:
Configuration initiale requise (contrairement à une base embarquée comme H2, qui ne serait pas persistante).
