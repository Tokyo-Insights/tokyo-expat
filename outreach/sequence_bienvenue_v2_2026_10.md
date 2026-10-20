# Séquence de bienvenue, version 2 (chantier F, 20/10/2026) : À VALIDER

Envoyée automatiquement à chaque inscrit de la checklist (liste Brevo 3), par
`scripts/brevo_welcome_drip.py` via `run_daily_watch.bat` (tourne : état mis à jour le 20/10 à 7h13,
25 inscrits suivis). **Rien n'est modifié dans Brevo avant ta validation** ; ensuite je mets à jour
les templates FR (1, 2, 3, 7, 8, 9), puis j'écris les 6 EN (4, 5, 6, 10, 11, 12) sur le même modèle.

## Ce que l'audit a trouvé dans la version actuelle (lue dans Brevo le 20/10)
| Email | Problème | Règle |
|---|---|---|
| J+2 à J+21 | **aucun accent** (« Preparer », « a distance », « proprietaire ») | règle d'écriture |
| J+2 | objet « L'erreur que font **90 %** des expats » : chiffre sans source | [006] une promesse non prouvée décrédibilise tout |
| J+2 | « Lire le guide logement » pointe vers la liste du blog, pas vers un guide | |
| J+21 | « je gère la recherche, les visites, **la négociation et le contrat** » : négocier un bail = courtage | conformité 宅建 |
| J+0 | n'annonce pas qu'une offre payante existe | [195] |
| J+5 à J+21 | pas d'email « problème, aggravation, résolution », pas d'email « objections » | [031] emails 4 et 6 |
| tous | aucune garantie, alors que « remboursé si aucune proposition » existe déjà sur les devis | [029] |

Le calendrier (J0, J2, J5, J9, J14, J21) est gardé : [031] dit d'espacer selon le cycle d'achat, et un
déménagement se décide sur plusieurs semaines.

## Rôle de chaque email en une phrase [031]
- **J+0** : livrer la checklist, poser UNE question, annoncer honnêtement qu'une offre payante existe.
- **J+2** : rendre service (sans garant, c'est possible), sans rien vendre.
- **J+5** : problème, aggravation, résolution ; le lecteur qui veut de l'aide lève la main en un clic [190].
- **J+9** : rendre service (les 3 documents).
- **J+14** : la vue de l'intérieur (pourquoi on refuse), ce qui crédibilise.
- **J+21** : répondre aux objections une par une, garantie, appel.

---

### J+0 · Objet : Votre checklist relocation Japon est ici
Bonjour,

Merci d'avoir téléchargé la Checklist Relocation Japon. Si vous ne l'avez pas encore ouverte, la voici
à nouveau :
[Télécharger la checklist (PDF)]

Je suis Alessandro. Je vis à Tokyo et j'accompagne les francophones qui s'installent au Japon. Cette
checklist rassemble tout ce que j'aurais aimé savoir avant d'arriver : visa, carte de séjour, logement
sans garant, banque, assurance santé.

Dans les trois semaines qui viennent, je vous envoie cinq emails courts sur le logement à Tokyo. Ils
sont utiles même si vous faites tout vous-même. L'un d'eux présentera aussi mon accompagnement payant :
vous saurez à quoi il sert, et vous n'aurez jamais à le prendre.

**Une question, si vous avez trente secondes** : qu'est-ce qui vous bloque le plus en ce moment dans
votre projet ? Répondez-moi en une phrase. Je lis tout moi-même.

À bientôt,
Alessandro

### J+2 · Objet : Sans garant japonais, vous pouvez quand même louer à Tokyo
Bonjour,

C'est l'idée reçue qui fait perdre le plus de temps : croire qu'il faut un garant japonais pour louer à
Tokyo. On attend, on cherche un garant qu'on n'aura jamais, et les refus s'enchaînent.

En réalité, presque tous les baux passent aujourd'hui par une société de garantie, et il existe des
logements accessibles dès votre arrivée (share houses, meublés au mois) sans garant ni frais d'agence
cachés. Tout est expliqué ici :
[Louer à Tokyo sans garant : le guide] → /fr/blog/garantie-loyer-etranger-japon

Si vous voulez un avis sur votre situation, répondez avec vos dates et votre budget.

Alessandro

### J+5 · Objet : Ce qui arrive quand on cherche un logement trop tard
Bonjour,

Beaucoup de personnes qui arrivent à Tokyo commencent à chercher un logement quelques semaines avant
le départ. C'est souvent trop tard.

Les biens qui acceptent les étrangers partent en quelques jours, chaque dossier refusé fait perdre une
semaine, et entre janvier et mars, quand tout le Japon déménage, la concurrence est à son maximum. On finit dans un
logement temporaire hors de prix, ou loin de son travail, en se disant qu'on déménagera plus tard.

Ce qui change tout, c'est d'avoir un dossier complet avant de visiter, et une liste de biens dont on sait
déjà qu'ils acceptent votre profil. C'est exactement ce que je fais pour mes clients : dossier prêt en
48 heures, propositions confirmées avant envoi, bail expliqué en français.

👉 [Je veux qu'Alessandro regarde ma situation] → /fr/contact
Un clic suffit : je vous propose un appel de 30 minutes, gratuit, et vous repartez avec un avis clair
même si vous faites tout seul ensuite.

Alessandro

### J+9 · Objet : Les 3 documents qui font accepter votre dossier à Tokyo
Bonjour,

Quand un propriétaire japonais hésite, ce n'est presque jamais personnel : c'est une question de risque
perçu. Trois documents suffisent souvent à lever ce doute :

1. L'accord d'une société de garantie (à la place d'un garant japonais).
2. Une preuve de revenus (fiche de paie, avis d'imposition ou relevé bancaire).
3. Carte de séjour et passeport, avec un dossier complet présenté en japonais.

Avec ces trois éléments bien préparés, beaucoup de refus disparaissent.
[Voir le guide complet] → /fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers

Alessandro

### J+14 · Objet : Pourquoi les propriétaires disent non (vu de l'intérieur)
Bonjour,

Je travaille dans le marché locatif de Tokyo au quotidien, et je vois passer les dossiers du côté des
bailleurs. La vérité surprend souvent : le propriétaire ne décide pas seul. La société de gestion et la
société de garantie évaluent aussi, et n'importe laquelle peut refuser, sans donner de raison.

Autre surprise : le même profil peut être refusé sur un bien et accepté sur un autre la même semaine. Ce
qui change, c'est rarement le locataire. C'est la façon dont le dossier est présenté.
[Lire l'article complet] → /fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers

Alessandro

### J+21 · Objet : « Je peux le faire seul », et les 3 autres raisons d'hésiter
Bonjour,

Je vous ai promis de vous présenter mon accompagnement. Voici les raisons qu'on me donne pour ne pas le
prendre, et ce que j'y réponds honnêtement.

**« Je peux le faire seul. »** Souvent, oui. Si vous avez du temps, un budget souple et un peu de
japonais, faites-le : les guides de cet email suffisent. L'accompagnement sert quand le temps manque ou
que les refus s'accumulent.

**« Ce n'est pas encore le moment, je n'ai pas mes dates. »** C'est justement le meilleur moment pour
préparer le dossier : c'est lui qui fait gagner les semaines, pas la visite.

**« Pourquoi pas une agence ? »** Une agence est rémunérée quand une location est signée. Moi, je suis
payé par vous seul, quel que soit le bien choisi : mon seul intérêt est que vous soyez bien logé. La location est
signée avec une agence agréée ; mon rôle est le conseil et l'accompagnement, en français.

**« Et si ça ne donne rien ? »** Si je ne vous transmets aucune proposition de logement pendant la
mission, vous êtes remboursé intégralement.

Si votre situation entre dans ce cadre, parlons-en : 30 minutes, gratuit, sans engagement.
[Réserver un appel gratuit] → /fr/contact

Alessandro

---
⚠️ À vérifier par toi avant validation : la garantie J+21 reprend MOT POUR MOT celle de tes devis
(« remboursement intégral si aucune proposition transmise pendant la mission »), pas celle des
entreprises (« dossier complet à la date convenue »), pour ne pas avoir deux garanties différentes pour
les particuliers.
