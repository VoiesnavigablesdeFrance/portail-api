---
title: Adresse
tagline: Encapsulation de l'API Adresse du gouvernement
is_open: 1
external_site: 
partners:
producer: vnf
keywords:
  - adresse
  - gouvernement
rate_limiting_resume: Limite de 20 appels /secondes
rate_limiting_description: | 
  L'API est disponible à hauteur de 20 appels par secondes et par jeton d'accès.
themes: Géographie
content_intro: | 
  description de l'api adresse
   
contact_link: vnf@vnf.fr
doc_tech_link: /yaml/adresse.yaml
doc_tech_external:
uptime: 100
visits_2019: 
last_update: 
---

*Encapsulation de l'API Adresse du gouvernement*. \
https://adresse.data.gouv.fr/api-doc/adresse


### A quoi ça sert ?

### Les données disponibles via l'API

Schéma de fonctionnement de FranceConnect pour test d'image :
![test d'image](/images/divers/franceConnect.png)


### <font color=#28005F>L'API est composée des routes suivantes :</font>
---------
1. Point d’entrée pour le géocodage
2. Point d’entrée pour le géocodage de masse à partir d’un fichier CSV.
3. Point d’entrée pour le géocodage inverse
4. Point d’entrée pour le géocodage inverse de masse à partir d’un fichier CSV.

### <font color=#28005F>Securité</font>

Pour pouvoir effectuer des appels à l'API, il est nécessaire de s'authentifier en Basic authentification