---
title: Patrimoine Domanial
tagline: Cette API permet de récupérer les infos Batiments/Lots/Terrains/Equipement d'Observado
is_open: 1
external_site: 
partners:
producer: vnf
keywords:
    - batiments
    - lots
    - terrains
    - equipement
rate_limiting_resume: 
rate_limiting_description: |
themes: Administratif  
content_intro: | 
   
contact_link: 
doc_tech_link: /yaml/Patrimoine.yaml
doc_tech_external: 
uptime: 100
visits_2019: 
last_update: 
---
*Cette API permet de récupérer les infos Batiments/Lots/Terrains/Equipement d'Observado

---
### <font color=#28005F>L'API est composée de différentes routes permettant de  :</font>
---
1. Obtenir les informations d'1 batiment a partir de son ID
2. Obtenir les informations d'1 lot a partir de son ID
3. Obtenir les informations d'1 equipement a partir de son ID
4. Obtenir les informations d'1 terrain a partir de son ID

### <font color=#28005F>Securité</font>

Pour pouvoir effectuer des appels à l'API, il est nécessaire de s'authentifier en Basic auth.
Cependant, pour l'API exposé en externe, l'authentification se fait via une clé API gérée par l'API Manager (InterSystems API Manager : KONG).