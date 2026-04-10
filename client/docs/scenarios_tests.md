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

## 🎯 4. Scénarios Experts (Critères CDA)
Ces scénarios démontrent la robustesse technique et métier de l'application.

### 🛡️ Sécurité & RBAC (Role Based Access Control)
*   **Objectif** : Vérifier que les rôles sont strictement respectés.
*   **Parcours** : Un collaborateur tente d'accéder manuellement à `/admin/users`.
*   **Attente** : Le système doit le rediriger immédiatement vers la page de login (ou erreur 403).

### 🔄 Cycle de Vie Métier E2E
*   **Objectif** : Vérifier la chaîne de valeur complète.
*   **Parcours** : 
    1.  **Admin** crée un projet et une tâche assignée.
    2.  **Collaborateur** se connecte et marque la tâche comme "Done" via le nouveau bouton de complétion.
    3.  **Admin** vérifie sur son dashboard que les statistiques de progression ont bien été mises à jour.

### 📱 Responsive Design (Mobile First)
*   **Objectif** : Vérifier l'ergonomie sur smartphone.
*   **Parcours** : Navigation en vue `iphone-6`.
*   **Attente** : Vérifier que l'interface reste lisible et que le Header s'adapte correctement.

### 💾 Persistance des données
*   **Objectif** : Vérifier que les modifications survivent au rafraîchissement.
*   **Parcours** : Modification du profil -> Page Reload -> Vérification des données.

---

## 💡 Lexique pour Débutants
*   **`cy.visit`** : "Ouvre le navigateur à cette adresse".
*   **`cy.login` (Custom)** : "Utilise notre commande maison pour se connecter rapidement".
*   **`cy.viewport`** : "Change la taille de l'écran" (pour tester mobile vs desktop).
*   **`cy.reload`** : "Rafraîchis la page".
*   **`should('contain', ...)`** : "Vérifie que le texte affiché est le bon". C'est l'étape où on confirme que le test a réussi.

---

> [!TIP]
> **Pourquoi ces tests sont utiles ?**
> Ils évitent de retester manuellement chaque bouton à chaque fois qu'on modifie le code. Si une modification casse la connexion ou la sécurité, Cypress nous préviendra immédiatement !
