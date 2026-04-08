# 🧪 Scénarios des Tests Cypress - SkillSync

Ce document explique simplement ce que font les tests automatisés dans l'application. Ces tests simulent le parcours d'un utilisateur réel pour vérifier que tout fonctionne correctement.

## 📁 Fichier de Test : `cypress/e2e/spec.cy.ts`

Nous avons trois grands rôles testés : **Administrateur**, **Manager** et **Collaborateur**.

---

## 👑 1. Scénario : Administrateur
L'administrateur a tous les pouvoirs. Les tests vérifient ses capacités de gestion.

*   **Connexion** : On vérifie qu'il peut se connecter et que le système reconnaît bien son rôle "admin".
*   **Création d'Utilisateur** : Le test crée un nouvel utilisateur avec un email et un pseudo générés aléatoirement pour vérifier que le formulaire fonctionne.
*   **Gestion de Projet** : 
    1.  Crée un nouveau projet (nom et description).
    2.  Ajoute une tâche à ce projet.
*   **Gestion des Compétences** : Crée une nouvelle compétence (ex: "React", "C++") dans la base de données.
*   **Paramètres** : Vérifie que l'administrateur peut accéder à sa page de réglages et voir ses informations.

---

## 💼 2. Scénario : Manager
Le manager s'occupe de la partie opérationnelle des projets.

*   **Connexion** : Vérification de l'accès avec le rôle "manager".
*   **Tableau de Bord** : 
    1.  Vérifie l'affichage du tableau de bord.
    2.  Teste la création d'un projet et l'assignation d'une tâche à un collaborateur.
*   **Paramètres** : Vérifie l'accès aux infos personnelles du manager.

---

## 💻 3. Scénario : Collaborateur
Le collaborateur utilise l'application pour voir son travail.

*   **Connexion** : Vérification de l'accès avec le rôle "collaborator".
*   **Navigation** :
    1.  Consulte la page "Projets & Missions" pour voir ses tâches.
    2.  Consulte sa page "Mon Profil".
*   **Paramètres** : Vérifie l'accès à ses propres réglages.

---

## 💡 Lexique pour Débutants
*   **`cy.visit`** : "Ouvre le navigateur à cette adresse".
*   **`cy.get`** : "Cherche cet élément sur la page" (comme un bouton ou un champ de texte).
*   **`type`** : "Écris ce texte dans le champ".
*   **`click`** : "Appuie sur le bouton".
*   **`should('contain', ...)`** : "Vérifie que le texte affiché est le bon". C'est l'étape où on confirme que le test a réussi.

---

> [!TIP]
> **Pourquoi ces tests sont utiles ?**
> Ils évitent de retester manuellement chaque bouton à chaque fois qu'on modifie le code. Si une modification casse la connexion, Cypress nous préviendra immédiatement !
