# SEPIA — Script narratif

> **Source de vérité** pour la présentation. Chaque slide doit être vérifiable contre ce document. Toute modification de l'histoire passe ici en premier.

## Cadre éditorial

- **Étude présentée** : SEPIA — *Sepsis Early Prediction by Intelligence Artificielle*
- **Audience Module 01** : cliniciens qui découvrent le projet — chefs de service, médecins prescripteurs, comité scientifique local. *Pas de jargon informatique*. *Pas de mention de l'infrastructure technique*.
- **Tonalité** : éditoriale, posée, factuelle. Style d'un édito médical (le *NEJM* plutôt que la *plaquette commerciale*). Pas d'enthousiasme appuyé, pas de superlatifs.
- **Durée cible** : 10-12 minutes en présentation orale (≈ 1 minute par slide).
- **Vocabulaire à éviter** : "data warehouse", "Nano Warehouse", "infrastructure", "stack technique", "pipeline" (sauf une fois si nécessaire), "open-source". Ce sont les modules 02-03 qui les portent.

## Promesse en une phrase

> Le sang qui est déjà passé dans l'automate contient la réponse de l'hémoculture *12 à 24 heures avant qu'elle ne tombe* — et nous avons un moyen technique d'aller l'y lire.

## Arc narratif en 5 actes — 16 slides

| Acte | Slides | Tension dramatique |
|---|---|---|
| **I — Le mur** | 02-05 | Qu'est-ce que le sepsis · chaque heure compte · hémoculture lente · 5 étapes CO₂ |
| **II — Le mécanisme** | 06-08 | Voici ce que mesure l'automate, comment, et à quoi ça ressemble en direct |
| **III — Le levier** | 09-11 | La donnée existe et dort sur nos disques ; et elle change quand la cellule s'active |
| **IV — Le pari SEPIA** | 12 | Si la signature bascule avant la fièvre, on peut la lire ; gain de 12-24 h |
| **V — La main tendue** | 13-16 | Pour qui ça compte, quand, ce qu'on ne promet pas, où aller ensuite |

**Principe pédagogique** : expliquer **ce qu'est le sepsis** avant de dire qu'il faut accélérer la décision ; expliquer le **mécanisme de mesure** avant de montrer le **résultat** (les scattergrams). L'audience doit avoir le vocabulaire (cellules, FSC/SSC/SFL, scattergram, signature) **avant** la slide-punchline "la donnée existe sur nos disques" (slide 09).

---

## Slide-par-slide

### 01 · Cover SEPIA *(slide-pivot d'ouverture)*

- **Titre** : Vue d'ensemble.
- **Sous-titre** : SEPIA — étude pilote de prédiction précoce du sepsis
- **Eyebrow** : Module 01 / 03 · Pour qui découvre le projet
- **Visuel** : composition sépia minimale (logo "SEP·IA" + tagline)
- **Voix** : *"SEPIA est une étude pilote conduite au CHI André Grégoire. L'idée tient en une phrase : prédire le résultat d'une hémoculture, à l'heure où la NFS est rendue, à partir des données déjà mesurées par l'automate. Ce module est une vue d'ensemble pour ceux qui découvrent le projet."*

### 02 · Qu'est-ce que le sepsis ? *(définition Sepsis-3 — pré-requis · animée)*

- **Beat** : poser la définition formelle (Singer et al., *JAMA* 2016) avant de parler de mortalité. Le sepsis = **syndrome**, pas une bactérie.
- **Visuel** : iframe `explorations/animation-sepsis.html` — cascade animée en 3 phases :
  - **Panneau 1 — Foyer infectieux** : bactérie franchit la barrière épithéliale d'un alvéole, multiplication en colonie, halos d'inflammation.
  - **Panneau 2 — Cascade systémique** : section de vaisseau, leucocytes (PNN, mono, lymph) qui affluent et s'activent (glow alert), libération de cytokines (TNF-α, IL-6, IL-1β, IL-8, PAF, NO), vasoplégie (dilatation du vaisseau).
  - **Panneau 3 — Dysfonction d'organe** : silhouette avec 6 organes (cerveau, poumons, cœur, foie, reins, coagulation) s'illuminant en rouge un par un avec leur syndrome (confusion, ARDS, choc, cytolyse, IRA, CIVD), puis pop-up du badge SOFA ≥ 2.
- **Voix** : *"Le sepsis n'est pas une bactérie qui circule, c'est l'emballement de notre propre réponse immunitaire face à une infection. Définition Sepsis-3 : dysrégulation potentiellement mortelle de la réponse de l'hôte, entraînant une dysfonction d'organe — SOFA ≥ 2. C'est ce qui en fait une cible diagnostique difficile : on ne le voit qu'à travers ses conséquences sur les organes — voici l'animation qui le montre, foyer → cascade → organes."*
- **Transition** : "Et c'est précisément pourquoi le délai compte."

### 03 · Sepsis : chaque heure compte *(le mur — accroche)*

- **Beat** : poser l'enjeu vital, sans phrase compassée, avec un chiffre canonique
- **Visuel** : grande stat +7,6 % / heure (Kumar 2006) + 3 bullets
- **Voix** : *"Le sepsis est une urgence où le délai d'antibiothérapie adaptée pèse directement sur la mortalité. Chaque heure de retard coûte 7,6 % de mortalité supplémentaire — c'est la référence Kumar 2006, l'une des plus citées en réanimation. La question n'est pas s'il faut accélérer la décision, mais comment."*
- **Transition** : "Or, justement, qu'est-ce qui ralentit la décision aujourd'hui ?"

### 03 · L'hémoculture, gold standard mais lente *(le mur — diagnostic)*

- **Beat** : nommer le goulot, sans réquisitoire (l'hémoculture est utile, elle est lente *par nature*)
- **Visuel** : timeline T0 → T+1h → T+24h → T+5j
- **Voix** : *"L'hémoculture reste la référence pour confirmer une bactériémie. Mais elle est lente par construction : 12 à 24 heures pour positiver, jusqu'à 5 jours pour être déclarée négative. Pendant ce temps, on traite à l'aveugle."*
- **Transition** : "Pourquoi ce délai ? Parce que l'automate ne détecte pas la bactérie — il détecte le CO₂ qu'elle produit en se multipliant."

### 04 · Détecter une bactériémie : cinq étapes *(le mur — détail biologique)*

- **Beat** : rendre tangible le délai (ce n'est pas une lenteur logistique, c'est de la biologie)
- **Visuel** : 5 étapes illustrées (prélèvement / inoculation / incubation / croissance CO₂ / détection)
- **Voix** : *"Prélèvement, inoculation, incubation à 37°C, multiplication bactérienne, détection optique du CO₂ produit. Ce délai est incompressible : on ne peut pas accélérer la biologie d'une culture."*
- **Transition** : "Si ce délai est incompressible, peut-être qu'on regarde au mauvais endroit. Revenons au tube qu'on a déjà prélevé."

### 05 · Quatre populations, cellule par cellule *(installer le vocabulaire)*

- **Beat** : pédagogie minimale sur les 4 populations (lymphocytes, monocytes, neutrophiles, éosinophiles)
- **Visuel** : 4 photos microscope + nom + sigle + 1 ligne de description
- **Voix** : *"L'automate classe chaque cellule en quatre populations principales selon sa signature optique. Lymphocytes pour l'immunité adaptative, monocytes pour la phagocytose, neutrophiles en première ligne anti-bactérienne, éosinophiles pour l'allergie et la parasitose. Ce sont ces quatre signatures qu'on va apprendre à lire ensemble."*
- **Transition** : "Comment l'automate les distingue exactement ?"

### 06 · Comment les scattergrams sont formés *(le mécanisme expliqué AVANT le résultat)*

- **Beat** : 3 signaux mesurables — FSC (taille), SSC (granularité), SFL (ADN). Glose WDF.
- **Visuel** : photo banc optique + 3 blocs FSC/SSC/SFL
- **Voix** : *"Chaque cellule traverse un faisceau laser. Trois signaux sont mesurés : la diffusion frontale FSC donne la taille, la diffusion latérale SSC donne la granularité interne, la fluorescence SFL donne le contenu en ADN. Croisez deux de ces signaux et chaque population forme un nuage — un scattergram. Le canal WDF (Wide Differential) est celui qui sépare les cinq populations leucocytaires."*
- **Transition** : "Pour le voir vraiment, voici l'animation."

### 07 · Animation interactive *(illustration vivante du mécanisme)*

- **Beat** : laisser parler le visuel. Au présentateur de cliquer "Lancer".
- **Visuel** : iframe `animation-scattergram.html`
- **Voix** : *"À gauche, la chambre de mesure. Au centre, le scattergram qui se construit. Chaque cellule devient un point. Au bout de quelques milliers de cellules, les nuages forment la signature de ce tube."*
- **Transition** : "Maintenant qu'on sait lire un scattergram, regardons ce qui dort sur nos disques."

### 08 · La NFS contient bien plus *(le pivot d'opportunité — punchline visuel)*

- **Beat** : *le* moment de bascule. Révéler que la donnée existe déjà — le public sait maintenant lire ce qu'on lui montre.
- **Visuel** : scattergrams B1 (normal) vs B2 (anormal) côte à côte + chiffre "≈ 600 paramètres"
- **Voix** : *"Le même prélèvement passe par notre Sysmex XN-10. On y lit 5 à 10 chiffres : leucocytes, hémoglobine, plaquettes. L'automate en a mesuré six cents. Et pour chaque tube, il a généré 30 000 à 50 000 mesures individuelles. Voici ce que ça donne — à gauche un profil normal, à droite un profil anormal avec apparition de granulocytes immatures. Ces données sont archivées sur disque. Elles ne sont pas exploitées."*
- **Transition** : "Et ce sont précisément ces nuages qui bougent quand le neutrophile s'active."

### 09 · Lymphocyte activé *(la signature change — première illustration)*

- **Beat** : la morphologie change en inflammation → le scattergram change
- **Visuel** : planche lymphocytes activés vs. lymphocyte normal en référence
- **Voix** : *"En cas d'inflammation, le lymphocyte adopte des formes activées et réactionnelles. Taille augmentée, cytoplasme abondant et basophile, contours irréguliers. Ces modifications changent la signature optique — et donc la position du nuage lymphocytaire sur le scattergram."*

### 10 · Le polynucléaire neutrophile activé *(deuxième illustration, plus spécifique de la bactérie)*

- **Beat** : la signature neutrophilique a une marque bactérienne spécifique
- **Visuel** : neutrophile normal vs. 4 vignettes d'activation
- **Voix** : *"Face à une infection bactérienne, le neutrophile présente des signes d'activation : granulations toxiques, corps de Döhle, vacuolisation. Ces modifications décalent la position du nuage neutrophile sur le scattergram XN-10 — c'est précisément ce signal qu'on veut apprendre à lire."*
- **Transition** : "C'est ici qu'arrive l'hypothèse SEPIA."

### 10 · Hypothèse SEPIA *(le pari — slide-pivot de l'acte III)*

- **Beat** : formuler l'hypothèse comme une équation lisible
- **Visuel** : flow Entrée (NFS XN-10 à T+1h) → Modèle (signature cellulaire) → Sortie (label hémoculture anticipé) + stat "−24 h"
- **Voix** : *"L'hypothèse SEPIA est la suivante : la signature cellulaire d'une NFS contient déjà l'information d'une bactériémie en train de se développer. Si cette hypothèse tient, on dispose d'une prédiction de l'hémoculture à T+1h au lieu de T+24h. Vingt-quatre heures gagnées sur la fenêtre décisionnelle d'antibiothérapie."*

### 11 · Pour qui, pour quoi *(la main tendue — bénéfices)*

- **Beat** : trois piliers — patient / laboratoire / établissement — sans grandiloquence
- **Visuel** : 3 colonnes
- **Voix** : *"Pour le patient : antibiothérapie potentiellement plus précoce et mieux ciblée. Pour le laboratoire : valorisation scientifique d'une donnée dormante, sans surcoût opérationnel. Pour l'établissement : positionnement IA médicale et démarche de recherche autonome, dans un cadre réglementaire MR-004 entièrement documenté."*

### 12 · Une démarche en deux phases *(calendrier — recaler sur les dates réelles)*

- **Beat** : timeline réaliste, *recalée* à la date actuelle (mai 2026)
- **Visuel** : roadmap été 2026 → automne 2026 → hiver 2026-2027 → 2027
- **Voix** : *"La démarche se déroule sur environ 18 mois. Le squelette du pipeline est cadré au printemps 2026. Été 2026 : preuve de concept sur les paramètres standards. Automne 2026 : validation interne. Hiver 2026-2027 : développement sur les six cents paramètres research-only. 2027 : évaluation comparative et communications."*

### 13 · Ce que ce projet ne fera pas *(honnêteté scientifique)*

- **Beat** : poser les limites, sans dramatiser
- **Visuel** : 4 limites en liste
- **Voix** : *"Quatre limites assumées d'emblée. Le modèle visera les patients chez qui une hémoculture a été demandée, pas la population générale. L'hémoculture positive n'est pas le sepsis stricto sensu — c'est un proxy biologique. Le volume reste modéré, les résultats sont à confirmer à plus large échelle. Les différences inter-instruments sont à valider en contrôle qualité."*
- **Transition** : "Voilà pour la vue d'ensemble. Si vous voulez aller plus loin :"

### 14 · Pour aller plus loin *(sortie ouverte — slide nouvelle)*

- **Beat** : ouvrir vers les deux autres modules
- **Visuel** : 2 cartes côte à côte — Module 02 (Pipeline technique) / Module 03 (Cadre réglementaire)
- **Voix** : *"Deux modules complémentaires. Module 02 détaille la méthodologie technique, pour ceux qui veulent voir le tuyau. Module 03 documente le cadre réglementaire MR-004, la pseudonymisation et la gouvernance — pour les comités d'éthique et le DPO."*

---

## Règles de cohérence (à respecter pour toute édition future)

1. **Le mot "SEPIA"** doit apparaître au moins sur la cover, sur la slide 10 (hypothèse), sur la slide 12 (bénéfices), et sur le footer de chaque slide.
2. **Aucune mention** des termes "Nano Warehouse", "data warehouse", "infrastructure data", "stack technique" dans Module 01. C'est l'objet de Module 02.
3. **MR-004** est mentionné sur la slide 11 (bénéfices) en une phrase de réassurance, et renvoyé pour le détail au Module 03.
4. **Le footer de chaque slide** : `SEPIA · Module 01 · NN / 14`.
5. **Toujours préférer un chiffre canonique à un superlatif** (Kumar +7,6 %/h ; 600 paramètres ; 30 000-50 000 cellules ; −24 h).
6. **Transitions** : la dernière phrase d'une slide doit téléguider la suivante (cf. "Voix" + "Transition" dans chaque entrée).

---

*Document tenu à jour : 2026-05-30 · Dr Ahmed Ashrin*
