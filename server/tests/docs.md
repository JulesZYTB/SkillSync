# 🛠️ Documentation des Tests - SkillSync

Cette documentation explique simplement l'utilité et le fonctionnement des tests automatisés dans ce projet. Les tests permettent de s'assurer que chaque fonctionnalité marche comme prévu et d'éviter de casser le code quand on fait des modifications.

---

## 🏗️ 1. Installation et Configuration (`install.test.ts`)

### Pourquoi ?
Avant de lancer l'application, on doit être sûr que tout le "matériel" est prêt. Si le serveur n'a pas ses réglages ou ne peut pas parler à la base de données, rien ne marchera.

### Comment ?
- **Fichiers de réglages** : Le test vérifie que tu as bien créé ton fichier `.env` (tes réglages secrets) à partir du modèle `.env.sample`.
- **Connexion à la base** : Il tente de "toquer à la porte" de ta base de données pour voir si elle répond.
- **Préparation des tables** : Il vérifie que les scripts de création (migrations) ont bien été lancés en regardant si la table `users` existe.

---

## 🔑 2. Authentification (`auth/routes.spec.ts`)

### Pourquoi ?
C'est la porte d'entrée. On veut être sûr que seuls les gens inscrits peuvent entrer et que leurs informations sont protégées.

### Comment ?
- **Connexion (Login)** : On simule un utilisateur qui donne son email et son mot de passe. Le test vérifie que le serveur renvoie les bonnes infos et crée un "badge de session" (cookie JWT).
- **Identité (Me)** : On vérifie que si quelqu'un a un badge, le serveur le reconnaît bien. Si le badge est absent, le serveur doit dire "Stop, tu n'as pas le droit".
- **Déconnexion (Logout)** : On vérifie que le serveur détruit bien le badge quand l'utilisateur veut sortir.

---

## 📂 3. Gestion des Projets (`project/routes.spec.ts`)

### Pourquoi ?
Le cœur de SkillSync est de gérer des projets. Il faut vérifier que les bonnes personnes peuvent les voir ou les modifier.

### Comment ?
- **Lecture** : On vérifie qu'un utilisateur peut voir la liste et le détail des projets.
- **Sécurité (Rôles)** : On teste qu'un simple collaborateur **ne peut pas** créer de projet, alors qu'un **Manager** le peut.
- **Modification/Suppression** : On s'assure que le Manager peut mettre à jour un titre ou supprimer un vieux projet.

---

## ⚡ 4. Compétences (`skill/routes.spec.ts`)

### Pourquoi ?
On veut savoir qui sait faire quoi. Ces tests valident le catalogue de compétences.

### Comment ?
- **Liste globale** : On vérifie qu'on peut récupérer toutes les compétences disponibles (ex: Javascript, React).
- **Mes compétences** : On teste que l'utilisateur peut voir sa propre liste et mettre à jour son niveau (ex: passer de niveau 2 à 4 sur une compétence).
- **Administration** : Seul l'Admin peut ajouter une nouvelle compétence au catalogue général.

---

## ✅ 5. Tâches et Travail (`task/routes.spec.ts`)

### Pourquoi ?
Un projet sans tâches ne bougera pas. On teste l'organisation du travail.

### Comment ?
- **Attribution** : On vérifie qu'un Manager peut créer une tâche et l'assigner à quelqu'un.
- **Mon travail** : On teste que l'utilisateur voit bien uniquement les tâches qui lui ont été confiées.
- **Mise à jour** : On s'assure qu'on peut changer le statut d'une tâche quand elle avance.

---

## 👥 6. Administration des Utilisateurs (`user/routes.spec.ts`)

### Pourquoi ?
L'Admin doit pouvoir gérer les comptes pour que l'équipe reste à jour.

### Comment ?
- **Liste des membres** : On vérifie que seul l'Admin a accès à la liste complète de tous les utilisateurs.
- **Stats** : On teste le calcul des statistiques globales (combien de projets, d'utilisateurs, etc.) pour le tableau de bord des managers.
- **Gestion de compte** : On teste la création, la modification et la suppression d'un compte utilisateur par l'Admin.

---

## 🧪 7. Tests Unitaires (`tests/unit/`)

### Pourquoi ?
Contrairement aux tests d'intégration qui testent tout le système (avec la base de données), les tests unitaires isolent une petite partie du code (une fonction, un middleware) pour vérifier sa logique pure. Ils sont très rapides et aident à trouver des bugs précis.

### Comment ?
- **Mocks** : On utilise des "doublures" (mocks) pour remplacer les dépendances complexes comme la base de données ou les services externes.
- **Middlewares (`middlewares/`)** : On teste que `verifyToken` et `checkRole` bloquent bien les accès non autorisés en simulant différents scénarios de jetons et de rôles.
- **Repositories (`repositories/`)** : On teste `userRepository` en simulant les réponses de la base de données pour vérifier que les requêtes SQL sont bien construites.

---

## 🚀 Comment lancer les tests ?

Pour lancer tous ces tests d'un coup, utilise cette commande dans ton terminal (dans le dossier `server`) :

```bash
npm run test
```

Si tout est vert, c'est que ton code est solide ! ✅
