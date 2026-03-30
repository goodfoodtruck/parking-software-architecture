# 005. Technologie queueing
## Status:
Proposed

## Contexte:
L'application de réservation de parking doit envoyer un message
lorsqu'une réservation est effectuée afin qu'une autre application
envoie un email de confirmation.

Le système doit donc utiliser une file de messages (message queue)
pour permettre une communication asynchrone entre les services.

Plusieurs solutions sont possibles : RabbitMQ, Kafka, AWS SQS, Redis Queue.

## Décision:
Dans ce contexte, utiliser une solution de streaming distribuée comme Kafka
serait trop complexe par rapport aux besoins.

Nous choisissons d'utiliser RabbitMQ comme technologie de queueing.
RabbitMQ semble être le plus simple à déployer avec Docker.

## Conséquences:
#### Positives (+) :
Facile à déployer

#### Négatives (-) :
