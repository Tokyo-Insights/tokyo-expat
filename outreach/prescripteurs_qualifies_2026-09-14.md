# Trois prescripteurs qualifies — 14/09/2026

Cible: reproduire le SEUL schema qui a converti, celui d'InternationalSchools. Pas un
« guest post », pas un echange de liens: **une section invitee, ecrite par nous, avec une
donnee que le site ne peut pas produire lui-meme**, sur une page qui existe deja chez lui.

Croisement fait sur les DEUX registres (`outreach_contacts.json`, 77 contacts / 76 domaines,
et les 10 domaines suivis par `warm_threads_watch.py`). Aucun des trois n'y figure.

⚠️ Rappel de la base elle-meme: a froid, le pitch DONNEE est mesure a 1/6, le « guest post »
a 0/35, le corporate a 0/12. **Les deux seules conversions etaient CHAUDES ou ENTRANTES.**
Ces trois-la sont froids. L'angle comptera plus que le canal.

---

## 1. japan-dev.com — le meilleur des trois

**Contact:** contact@japan-dev.com
**Ce que c'est:** job board pour ingenieurs logiciels etrangers au Japon, double d'une
bibliotheque de guides d'installation. Verifie: ils publient bien « Average Cost of Living
in Japan: A Realistic Guide & Breakdown », « Japanese Tenant Law: Who's Responsible for
What? », des guides visa et carte de residence.
**Ils ne logent personne** (verifie sur leur blog et par le filtre concurrent).

**Pourquoi c'est le meilleur:** leur audience est exactement celle qui paie. Un ingenieur
recrute depuis l'etranger arrive avec un salaire, une date d'entree, et zero idee du loyer
reel par ward. Leur guide cout de la vie est le trou naturel: il parle budget sans donnee
de loyer par quartier, et c'est precisement ce que l'indice produit.

**Angle:** le meme qu'avec Engin. Une section de ~450 mots « what rent actually costs by
ward », mediane par ward pour un 1K, calculee sur les annonces actives, plus la regle du
meuble (le meuble varie moins que le standard, donc la prime explose des qu'on s'eloigne).
Rien a leur demander en echange dans le premier message.

**Piege a ne pas repeter:** la section part en PIECE JOINTE, zero URL dans le corps
(Gmail et Brevo reecrivent les liens dans le message stocke). Et verifier le `href` REEL
sur leur page une fois publiee.

## 2. world-schools.com — le clone du partenariat qui marche

**Contact:** info@world-schools.com (boite generique, aucun nom d'editeur trouve)
**Ce que c'est:** annuaire international d'ecoles, World Schools Sarl, cree en 2016.
Modele: les ecoles paient pour la visibilite aupres des familles.

**Reserve honnete:** contrairement a internationalschools.net, **ils n'ont pas de contenu
editorial de type guide de ville**. Le succes avec Engin reposait sur une section inseree
DANS son guide des quartiers familiaux de Tokyo. Ici, cette page d'accueil n'existe pas.
Il faudrait leur proposer de la creer, ce qui est un engagement plus lourd pour eux.

**Angle si on y va:** la page Japon de leur annuaire, avec les quartiers ou les familles
se logent reellement autour des grandes ecoles internationales, et le loyer median 2LDK/3LDK
par ward. C'est l'argument que les ecoles elles-memes ne fournissent jamais.

## 3. jobsinjapan.com — qualifie, angle NON verifie

**Contact:** info@jobsinjapan.com
**Etat:** leur section « living in Japan » renvoie un 403 a toute lecture automatique, donc
**je n'ai pas pu verifier ce qu'ils publient**. Je ne sais pas si le trou editorial existe.
A ouvrir a la main avant d'ecrire quoi que ce soit.

---

## Ce qui n'a pas passe le filtre

| Domaine | Verdict | Raison |
|---|---|---|
| gogonihon.com | CONCURRENT | organise lui-meme le logement etudiant |
| tokyodev.com | sans canal | aucun email public ni formulaire trouve |
| retirejapan.com | sans canal | idem |
| japan-guide.com | sans canal | idem |
| internationalschoolsdatabase.com | injoignable | le site ne repond pas a la lecture automatique |

## Deux defauts de l'outil corriges au passage

1. **`.lstrip("www.")` ne retire pas un prefixe**, il retire tous les caracteres de
   l'ensemble {w, .} en tete. `world-schools.com` devenait `orld-schools.com` et
   `wise.com` devenait `ise.com`. Un domaine deja en base commencant par w n'etait donc
   plus reconnu: l'outil pouvait proposer de re-demarcher quelqu'un de deja engage, le
   risque exact que le croisement des registres est cense supprimer.

2. **Le filtre concurrent se declenchait sur `listings` et `vacanc`.** Teste sur
   internationalschools.net, LE partenariat qui marche: verdict CONCURRENT. Le filtre
   rejetait le profil meme qui a converti. Chaque motif porte desormais le logement.
   Verifie apres correction: oakhouse.jp reste CONCURRENT, gogonihon.com aussi,
   internationalschools.net et world-schools.com passent.

## Prochain geste

Rien n'a ete ecrit dans la base et **aucun email n'est parti**. Pour verser les trois en
`to_contact`: `python scripts/prospect_finder.py --scan <fichier> --add`. Je ne l'ai pas
fait, parce que `email_sender.py` pioche dans `to_contact` et fabriquerait des brouillons
de demarchage vers eux chaque semaine sans que tu aies tranche.
