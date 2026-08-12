# Prompt pour Claude Design Labs — Poster scientifique SEPIA

> **Mode d'emploi**
>
> 1. Complète les champs entre chevrons `«…»` (congrès, co-auteurs, contact, financement).
> 2. Copie tout le bloc entre `=== DÉBUT DU PROMPT ===` et `=== FIN DU PROMPT ===`.
> 3. Colle-le dans Claude Design Labs.
>
> **Cadrage retenu — à lire avant de coller.**
> Au 12/08/2026, l'état du dépôt est sans ambiguïté : la phase Bronze est *en cours*, les phases
> Silver, Gold et Release sont *à venir*, et l'ingestion des données patient pseudonymisées est
> *en attente*. **Aucune performance de modèle (AUC, sensibilité, spécificité, courbe ROC)
> n'existe donc encore.** Le prompt l'interdit explicitement à Design Labs.
>
> Ce n'est pas un poster vide pour autant : deux blocs de résultats sont **réels et solides** —
> la caractérisation de la cohorte (49 675 hémocultures sur 7 ans, entièrement décomposée) et
> la faisabilité technique (rétro-ingénierie du format Sysmex, 252/606 mappings, 42/42 tests).
> Le poster est donc cadré comme un **poster de cohorte + protocole**, format parfaitement
> reconnu en congrès, avec un unique emplacement réservé pour les performances du modèle.

---

=== DÉBUT DU PROMPT ===

## Rôle

Tu es designer graphique spécialisé dans le **poster scientifique de congrès médical**. Tu produis des maquettes sobres, denses en information mais respirantes, lisibles à distance, dans les codes de la communication scientifique académique — jamais dans ceux de la plaquette commerciale ou de la slide corporate.

## Mission

Conçois un **poster scientifique** présentant l'étude **SEPIA** (*Sepsis Early Prediction by Intelligence Artificielle*), étude pilote monocentrique conduite au laboratoire de biologie médicale du **CHI André Grégoire** (Montreuil, France), destinée au congrès **«nom du congrès»**.

## Format et livrable

- **Format physique** : **A0 portrait — 841 × 1189 mm**. Conçois à ce ratio (≈ 1:1,414).
- **Livrable** : une page **HTML + CSS autonome**, tout inline, **aucune dépendance externe** (pas de CDN, pas de police distante, pas d'image distante — utilise des polices système et des dégradés/SVG inline). Prévois `@page { size: 841mm 1189mm; margin: 0; }` et une feuille `@media print` propre, pour export **PDF vectoriel** prêt à l'impression.
- **Lisibilité** : titre lisible à 3 m, sous-titres à 2 m, corps de texte à 1,5 m. À l'échelle réelle : titre ≈ 90-110 pt, titres de section ≈ 40-48 pt, corps ≥ 24 pt, légendes ≥ 18 pt. Jamais en dessous.
- **Langue** : **français**, terminologie médicale et biologique rigoureuse.
- **Densité** : vise **30-40 % de blanc**. Un poster n'est pas un article : puces courtes, phrases nominales, aucun pavé de texte.

## Règle de probité scientifique — impérative

**N'invente aucun résultat.** L'étude est en cours. Concrètement :

- **Interdiction absolue** de faire apparaître une performance de modèle : pas d'AUC, pas de courbe ROC, pas de sensibilité/spécificité/VPP/VPN, pas de matrice de confusion, pas de score, pas de « précision de 9x % », pas de graphique de performance même stylisé ou « illustratif ». Un seul **emplacement réservé** est prévu pour cela (section 6), et il doit rester visiblement vide.
- **Interdiction** d'ajouter des effectifs, des dates, des pourcentages ou des références bibliographiques qui ne figurent pas dans ce prompt.
- **Distinction obligatoire** entre trois natures de chiffres, qui doivent rester typographiquement distinguables sur le poster :
  1. les chiffres **issus de la littérature** (toujours accompagnés de leur référence) ;
  2. les chiffres **mesurés par l'étude** (cohorte, volumétrie technique) ;
  3. les objectifs **visés ou attendus** (jamais présentés comme acquis — emploie systématiquement le conditionnel ou la mention « attendu / visé »).

Si une zone te semble vide, **ne la remplis pas avec des données inventées** : agrandis la respiration, ou renforce un schéma explicatif.

---

## CONTENU DU POSTER

### Bandeau titre

- **Titre** : « SEPIA — prédire le résultat d'une hémoculture dès le rendu de la NFS, à partir des données brutes de cytométrie »
- **Sous-titre** : « Constitution d'une cohorte de 49 675 hémocultures et protocole d'une étude pilote de prédiction précoce du sepsis par apprentissage automatique »
- **Auteurs** : A. Ashrin¹ «, co-auteurs éventuels »
- **Affiliation** : 1 — Laboratoire de biologie médicale, CHI André Grégoire, Montreuil, France
- **Contact** : «e-mail» — prévois un emplacement **QR code** (placeholder carré, ~40 × 40 mm) en bas à droite.
- Emplacements **logos** : CHI André Grégoire «+ autres» — placeholders rectangulaires discrets.
- Numéro d'abstract : «à compléter».

### 1 · Contexte

- Le **sepsis** est défini par *Sepsis-3* (Singer et al., **JAMA 2016**) comme une **dysrégulation potentiellement mortelle de la réponse de l'hôte à une infection, entraînant une dysfonction d'organe** (SOFA ≥ 2). Ce n'est pas la bactérie : c'est l'emballement de la réponse immunitaire.
- Chiffre-clé de littérature, à mettre en exergue avec sa source visible : **+7,6 % de mortalité par heure** de retard d'antibiothérapie adaptée — *Kumar A. et al., Crit Care Med 2006;34(6):1589-96*.
- L'**hémoculture** reste la référence pour confirmer une bactériémie, mais elle est lente **par construction** : le système détecte le **CO₂** produit par les bactéries en se multipliant, pas la bactérie elle-même. Délai de positivité **12 à 24 h** ; négativation définitive **jusqu'à 5 jours**. Pendant cette fenêtre, l'antibiothérapie est probabiliste.

**Schéma à dessiner — « la fenêtre aveugle »** (frise horizontale, élément fort de la section) :
`T0 prélèvement` → `T0 + 1 h : NFS rendue et exploitable` → **[zone hachurée « fenêtre aveugle »]** → `T0 + 12-24 h : flacon positif si bactériémie` → `T0 + 5 j : négative définitive`.
La zone hachurée entre T0+1h et T0+12-24h est le cœur du message : c'est le temps que l'étude vise à reconquérir.

### 2 · Le gisement de données inexploité

- Le **même prélèvement** passe par l'automate de NFS **Sysmex XN-10**. En routine, 5 à 10 résultats en sont lus.
- L'automate mesure en réalité **≈ 600 paramètres** dits *research-only* par tube, et **30 000 à 50 000 mesures cellulaires individuelles**.
- **Principe de mesure** (à schématiser) : chaque cellule traverse un faisceau laser et produit **trois signaux** —
  - **FSC** (diffusion frontale) → **taille** de la cellule
  - **SSC** (diffusion latérale à 90°) → **granularité / complexité interne**
  - **SFL** (fluorescence latérale) → **contenu en acide nucléique**
  Croiser deux de ces signaux (ex. **SSC × SFL**) produit un **scattergram** où chaque population cellulaire forme un nuage. Le canal **WDF** (*Wide Differential*) sépare les cinq populations leucocytaires.
- **Rationnel biologique** — l'information recherchée est plausible parce que la morphologie change :
  - **Neutrophile activé** face à une infection bactérienne : **granulations toxiques**, **corps de Döhle**, **vacuolisation** du cytoplasme.
  - **Lymphocyte activé** en inflammation : taille augmentée, cytoplasme abondant et basophile, contours irréguliers.
  Ces modifications **décalent la position des nuages** sur le scattergram XN-10.
- Ces données sont **archivées sur le disque du laboratoire et non exploitées scientifiquement**.

**Schéma à dessiner — banc optique + formation du scattergram** : cellule → faisceau laser → trois photodétecteurs (FSC / SSC / SFL) → nuage de points sur un graphe SSC × SFL, avec les clusters LYMPH / MONO / NEUT / EO annotés. Dessine-le en SVG stylisé, sans prétendre reproduire des données réelles.

### 3 · Hypothèse et objectif

- **Hypothèse** : *la signature cellulaire d'une NFS contient déjà l'information d'une bactériémie naissante*.
- **Objectif principal** : évaluer si un modèle d'apprentissage automatique entraîné sur les paramètres research-only de la NFS peut **prédire le résultat de l'hémoculture prélevée conjointement**, à l'heure où la NFS est rendue.
- **Gain visé** (à présenter comme un objectif, jamais comme un résultat) : **12 à 24 h** gagnées sur la fenêtre de décision d'antibiothérapie.

**Schéma à dessiner — équation lisible** : `Entrée : NFS XN-10 à T0+1h (≈600 paramètres)` → `Modèle d'apprentissage automatique` → `Sortie : prédiction du résultat d'hémoculture` avec un cartouche `objectif : −12 à −24 h`.

### 4 · Matériel et méthodes

**Sources de données — tout préexiste, aucun prélèvement supplémentaire :**

| Instrument / source | Rôle | Volumétrie |
|---|---|---|
| **Sysmex XN-10** (2 têtes, n° 27854 et 27856) | NFS — génère un fichier `.smp` + N fichiers `.fcs` par tube | ≈ 110 tubes/j par tête, ≈ 40 000/an par tête |
| **BACT/ALERT VIRTUO** (bioMérieux) | Incubation des hémocultures, détection optique du CO₂ | ≈ 12 hémocultures/j, ≈ 4 400/an |
| **NAS laboratoire** (Synology) | Miroir des fichiers XN-10, accès SMB en lecture seule | — |
| **SIL — export Kalisil** | Résultats validés : NFS + hémocultures, CSV mensuel | — |

Le pipeline **ne lit jamais un instrument directement** : il consomme des fichiers déjà déposés, sans aucune écriture en retour.

**Accès à la donnée — verrou technique levé (à présenter comme un résultat de faisabilité) :**
- Le format `.smp` est un **binaire propriétaire MFC CArchive non documenté** ; aucune bibliothèque ne le lit.
- Le parseur a été **ré-implémenté intégralement en Python**. Structure : header de **256 octets**, ≈ 25 sections, bloc `CData_ITEM` de **606 records de 22 octets** — un par paramètre mesuré.
- Une table de correspondance versionnée (« Rosetta Stone ») traduit les codes internes en paramètres cliniques : **252 des 606 mappings confirmés**, sous la forme `Item_ID → Parameter_Name → Divisor`. Exemple à afficher : `Item_ID 4097 → HGB, valeur brute 1622, diviseur 100 → 16,22 g/dL`.
- Les **sections contenant des identifiants** (patient, médecin, service) sont **identifiées et jamais lues** par le parseur.

**Architecture de données — pattern *medallion* en trois couches** (schéma à dessiner, flux horizontal) :

| Couche | Grain | Règle |
|---|---|---|
| **Bronze** | 1 ligne / fichier source | Brut parsé, **immuable, append-only**, partitionné par date |
| **Silver** | 1 ligne / tube clinique | Tables typées et reconstructibles, fusion des analyses et re-runs, **pseudonymisation** |
| **Gold** | 1 ligne / tube éligible | Jeu de données prêt pour l'apprentissage, étiquetage cas / contrôle |

- Appariement **tube ↔ hémoculture** par **fenêtre temporelle de 48 h**.
- **Traçabilité** : chaque ligne porte 5 colonnes techniques — fichier source, **empreinte SHA-256**, horodatage d'ingestion, identifiant de run, version du pipeline. Toute ligne est remontable au fichier source exact et à la version de code qui l'a produite.
- **Environnement** : intégralement **local**, sur poste de laboratoire. Stack **100 % open-source** — Python, Polars, DuckDB, Apache Parquet, Apache Arrow, Git, Make, pytest. **Aucun cloud, aucun service externe.** Coût matériel et logiciel : **0 €**.
- **Validation logicielle** : **42 tests automatisés au vert**, dont 9 sur des fichiers `.smp` réels avec contrôles de plausibilité biologique ; **10 fichiers `.smp` réels parsés** avec des valeurs cliniquement cohérentes.

**Définition des groupes :**

| Groupe | Définition |
|---|---|
| **A — sepsis avéré** | Hémoculture positive à germe pathogène strict |
| **B — sans sepsis prouvé** | Hémoculture réalisée et négative |
| **C — non prouvé** | Aucune hémoculture réalisée |

**Règle de classification microbiologique** (à afficher en encadré compact) :
- **Pathogènes stricts** : bacilles à Gram négatif et entérobactéries, *S. aureus* (SARM inclus), streptocoques β-hémolytiques, *S. pneumoniae*, entérocoques, *Listeria*, *Neisseria*, levures, anaérobies stricts.
- **Contaminants** : staphylocoques à coagulase négative, *Micrococcus*, *Kocuria*, *Corynebacterium*, *Cutibacterium*, *Bacillus* sp., *Brevibacterium*.
- **Zone grise en cours d'arbitrage** : streptocoques du groupe viridans, libellés génériques, *Bacillus cereus* (8 cas), anaérobies non identifiés.

### 5 · Résultats — caractérisation de la cohorte

**C'est la section de résultats réels du poster : donne-lui du poids visuel.**

Extraction du SIL sur **2020-2026 (7 ans)** : **49 675 hémocultures**.

| Catégorie | Lignes | % |
|---|---|---|
| Flacons négatifs uniquement | 41 233 | 83,0 |
| Germes contaminants uniquement | 2 608 | 5,3 |
| ≥ 1 germe pathogène strict | 3 039 | 6,1 |
| Zone grise (viridans / libellé générique) | 275 | 0,6 |
| Lignes sans aucun résultat | 2 512 | 5,1 |
| **Total** | **49 675** | **100** |

**Patients distincts** : **21 033** au total (identifiant renseigné), dont **1 775 avec au moins un germe pathogène strict**, soit **8,4 %**.
Note méthodologique à faire figurer en légende : *3 039 lignes pathogènes pour 1 775 patients — certains patients ont plusieurs prélèvements positifs sur un même épisode.*

**Visualisation à produire** : un diagramme de répartition de la cohorte — barre empilée horizontale **ou** diagramme en entonnoir allant de 49 675 hémocultures → 3 039 lignes pathogènes → 1 775 patients. Utilise une teinte d'accent pour la seule catégorie « pathogène strict » et des gris pour le reste : le lecteur doit voir immédiatement que la classe d'intérêt est **minoritaire (6,1 %)**, ce qui pose la question du **déséquilibre de classes** dans l'apprentissage. Fais figurer explicitement cette remarque.

**État d'avancement du pipeline** — à représenter par une frise à 7 jalons avec statut visible :
`Helpers ✅ livré` · `Parseur SMP ✅ livré` · `Import SIL ✅ livré` · `Bronze 🔄 en cours` · `Silver ⏳ à venir` · `Gold ⏳ à venir` · `Release ⏳ à venir`

### 6 · Emplacement réservé — performances du modèle

**Ne remplis pas cette zone.** Crée un **cadre visiblement vide**, bordure en pointillés, occupant une place réelle sur le poster, portant ce libellé :

> **Performances du modèle — analyses en cours.**
> L'ingestion des données patient pseudonymisées et la production du jeu de données d'apprentissage sont en cours. Les métriques de discrimination et de calibration, ainsi que la stratégie de validation, seront présentées lorsqu'elles seront disponibles.

Aucun graphique, aucune courbe, aucun chiffre dans ce cadre. Le vide est le message : il atteste que rien n'est présenté avant d'être mesuré.

### 7 · Cadre réglementaire et éthique

À traiter en encadré latéral compact, avec une série de pastilles de conformité :

- **MR-004** — méthodologie de référence CNIL (*délibération n° 2018-155 du 3 mai 2018, modifiée*), applicable aux recherches **n'impliquant pas la personne humaine** au sens de la loi Jardé.
- **Réutilisation de données de soin déjà collectées** — aucun examen supplémentaire, aucun prélèvement supplémentaire pour le patient.
- Base légale **RGPD article 9.2.j** (recherche scientifique). **Pas de consentement individuel** requis : information collective. **Pas d'avis CPP** (hors RIPH).
- **Pseudonymisation au sens RGPD article 4(5)** : l'identifiant patient est remplacé dès l'ingestion par une **empreinte SHA-256 salée** ; la table de correspondance est conservée séparément, chiffrée, sous la responsabilité du seul porteur. Aucune table du pipeline ne contient d'identifiant en clair.
- **Périmètre strictement hospitalier** : aucun transfert externe, aucun cloud, aucun service tiers. Code source isolé des données.
- **Gouvernance** : DPO, URC, DRCI, DSI et comité d'éthique local — sollicitations engagées.

**Petit schéma à dessiner** : `Identifiant patient` → `SHA-256 + sel` → `patient_id pseudonymisé dans l'entrepôt`, avec un cadenas marquant la frontière du périmètre hospitalier. N'affiche évidemment aucune donnée patient, même fictive et nominative — utilise des libellés neutres du type `IDENTIFIANT` → `a3f2b9e8…`.

### 8 · Limites

À présenter franchement, en liste, sans dramatiser — c'est un gage de sérieux devant un jury :

- La population d'étude est celle des patients **chez qui une hémoculture a été demandée**, et non la population générale : le modèle sera conditionné à cette indication.
- L'**hémoculture positive n'est pas le sepsis** au sens de Sepsis-3 : c'est un **proxy biologique** de bactériémie.
- Les paramètres exploités en phase 1 sont ceux **déjà calculés par l'automate**, donc dépendants de son *gating* : sur certains profils cellulaires anormaux — populations leucocytaires qui se chevauchent ou sortent des fenêtres attendues — ces métriques deviennent peu fiables, voire impossibles à calculer.
- **Classe d'intérêt minoritaire** (6,1 % des lignes) : déséquilibre à traiter méthodologiquement.
- Étude **monocentrique** : robustesse hors site pilote à démontrer.
- **Différences inter-instruments** à valider en contrôle qualité.

### 9 · Perspectives

Frise à quatre jalons :

1. **Confirmation multicentrique** — rejouer pipeline et modèle sur deux autres centres : **CHI de Montfermeil** et **CHI d'Aulnay-sous-Bois**.
2. **Retour aux données brutes `.fcs`** — calculer des métriques originales directement sur les événements cytométriques, en s'affranchissant du *gating* de l'instrument ; apprentissage automatique, voire apprentissage profond.
3. **Étude clinique à deux bras** — comparer la prise en charge avec et sans aide à la décision, pour mesurer l'apport réel au lit du patient.
4. **Infrastructure réutilisable** — la même chaîne s'applique à d'autres signatures cellulaires (paludisme, hémopathies).

### 10 · Références

Affiche uniquement celles-ci, en petit corps, numérotées :

1. Singer M. et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). *JAMA*. 2016.
2. Kumar A. et al. Duration of hypotension before initiation of effective antimicrobial therapy is the critical determinant of survival in human septic shock. *Crit Care Med*. 2006;34(6):1589-96.

### Pied de poster

Sur une bande discrète : affiliation · «financement — préciser ou indiquer "aucun financement spécifique"» · «liens d'intérêt — préciser ou indiquer "les auteurs déclarent n'avoir aucun lien d'intérêt"» · mention **« Étude sur données de soin déjà collectées — cadre MR-004, données pseudonymisées, aucun prélèvement supplémentaire »** · illustrations anatomiques éventuelles : **Servier Medical Art, CC BY 4.0** · QR code.

---

## Direction artistique

Le projet possède déjà une identité visuelle « sépia / encre » qu'il faut **reprendre** pour assurer la continuité avec ses supports existants :

- **Palette** (utilise ces valeurs) :
  - fond crème `#E8E5DD`, surfaces `#FFFFFF` et `#F4F1E8`
  - encre principale `#1A1814`
  - texte secondaire `#6B6358`, filets `#C9C2B6`, bordures `#DDD7C9`
  - **accent unique** — rouge brique `#B83B2A`, à réserver aux éléments porteurs : chiffres-clés, zone « fenêtre aveugle », catégorie « pathogène strict », cadre de l'emplacement réservé
  - vert `#2E7D58` pour les seuls statuts « livré / conforme »
  N'introduis **aucune autre couleur**. Pas de dégradé criard, pas d'arc-en-ciel de catégories.
- **Typographie** : un **serif éditorial** pour les titres (esprit *Newsreader* — fallback `Georgia, 'Times New Roman', serif`), une **sans-serif** pour le corps (esprit *Inter* — fallback `system-ui, 'Helvetica Neue', Arial, sans-serif`), une **monospace** pour les libellés techniques, codes et étiquettes de section (fallback `'Courier New', monospace`). Les intertitres de section en monospace, petites capitales, interlettrage large.
- **Grille** : bandeau titre pleine largeur, puis **3 colonnes** sous le bandeau. Sections numérotées **01 à 10**, filets fins de séparation, lecture en colonnes (haut → bas, puis colonne suivante). Numérote visiblement pour guider le lecteur.
- **Hiérarchie des chiffres** : les chiffres-clés (**+7,6 %/h**, **12-24 h**, **≈600 paramètres**, **49 675**, **6,1 %**) doivent être posés en très grand corps serif, avec leur unité et leur source en petit juste dessous. C'est ce que le passant lira en premier.
- **Figures d'abord** : chaque section porte au moins un élément visuel — schéma, tableau ou cartouche chiffré. Aucune section en texte seul.
- **Cohérence** : mêmes rayons d'angle, mêmes épaisseurs de filet, même style de flèche et d'icône partout. Icônes en trait fin monochrome, jamais d'émoji dans le rendu final imprimé (les statuts ✅/🔄/⏳ doivent devenir des pastilles ou des puces dessinées).
- **Grain** : un très léger bruit de fond (SVG `feTurbulence` inline, opacité ≤ 0,05) est bienvenu pour l'aspect « papier », à condition de ne pas gêner l'impression.

## Ce que tu me rends

1. Le fichier **HTML/CSS autonome** du poster, exportable en PDF A0 portrait.
2. Une **note de synthèse** listant : les emplacements à compléter (`«…»`), la zone réservée aux performances du modèle, et toute zone où tu as manqué de matière — **sans jamais l'avoir comblée par une donnée inventée**.

**Procède en deux temps** : propose-moi d'abord la **structure de la maquette** (découpage en blocs, place et poids de chaque section dans la grille, emplacement des figures) pour validation. Ne passe au style fini qu'après mon accord.

=== FIN DU PROMPT ===
