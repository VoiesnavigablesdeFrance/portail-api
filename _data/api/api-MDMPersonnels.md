---
title: API Personnel
tagline: Cette API permet la médiation des données du référentiel personnels
is_open: 1
external_site: 
partners:
producer: vnf
keywords:
    - médiation
    - référentiel
rate_limiting_resume: 
rate_limiting_description: |
themes: Administratif  
content_intro: | 
   
contact_link: 
doc_tech_link: /yaml/MDMPersonnels.yaml
doc_tech_external: 
uptime: 100
visits_2019: 
last_update: 
---
*Cette API permet la médiation des données du référentiel personnels*.

---

### <font color=#28005F>L'API est composée d'une route comportant 3 query parameters différents, correspondant à trois filtrage différents :</font>
---------
1. <b>?rowID={id}</b>: Récupération des informations de personnel par ID MDM
2. <b>?emailPro={email}</b>: Récupération des informations de personnel par email professionnel
3. <b>?matriculePaie={matricule}</b>: Récupération des informations de personnel par matricule de paie

<i>seul l'un des 3 est requis</i>

### <font color=#28005F>Securité</font>

Pour pouvoir effectuer des appels à l'API, il est nécessaire de s'authentifier sour le protocole penId connect