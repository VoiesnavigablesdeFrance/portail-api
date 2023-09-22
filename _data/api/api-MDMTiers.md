---
title: MDM Tiers
tagline: Cette API permet les échanges avec le MDM Tiers
is_open: 1
external_site: 
partners:
producer: vnf
keywords:
    - échanges
rate_limiting_resume: 
rate_limiting_description: |
themes: Administratif  
content_intro: | 
   
contact_link: 
doc_tech_link: /yaml/MDMTiers.yaml
doc_tech_external: 
uptime: 100
visits_2019: 
last_update: 26/12/2022
---
*Cette API permet les échanges avec le MDM Tiers*.

---
### <font color=#28005F>L'API est composée de différentes routes permettant de  :</font>
---
1. Réaliser le CRUD d'un tiers 
2. Réaliser le CRUD sur les sous objets du Tiers (Adresse, Email, Activité et Télephone) en mode delta 
4. Rerchercher des tiers selon plusieurs critères 

### <font color=#28005F>Securité</font>

Pour pouvoir effectuer des appels à l'API, il est nécessaire de s'authentifier en Basic auth.
Cependant, pour l'API exposé en externe, l'authentification se fait via une clé API gérée par l'API Manager (InterSystems API Manager : KONG).

Cette authentification est liée à un consommateur qui est lui-même lié à une source dans le MDM Tiers (ROWIDSystem). \
*Par exemple*: **GEDO**, **PAMI**