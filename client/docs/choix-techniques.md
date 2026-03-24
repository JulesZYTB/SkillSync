# Choix Techniques - SkillSync

## Introduction
Ce document détaille les technologies choisies pour le développement de **SkillSync** et les raisons de ces choix. L'objectif est d'assurer une base solide, performante et maintenable.

## 🏗️ Architecture Globale
SkillSync est structuré sous forme de **Monorepo**, séparant le `client` (interface utilisateur) et le `server` (logique métier et API). Cette structure facilite la gestion du projet et assure une cohérence globale.

## 💻 Frontend (Client)

### 1. React 19 & Vite
- **React 19** : Utilisation de la dernière version majeure pour bénéficier des dernières optimisations et fonctionnalités.
- **Vite** : Un outil de build ultra-rapide qui remplace avantageusement Create React App, offrant un temps de démarrage et un rafraîchissement (HMR) quasi instantanés.

### 2. 🎨 Tailwind CSS 4
- **Pourquoi ?** Permet de construire des interfaces personnalisées rapidement sans quitter le code HTML/JSX.
- **Bénéfices** : Réduction drastique de la taille des fichiers CSS, design system cohérent et maintenance simplifiée.

### 3. 🗺️ React Router 7
- Utilisé pour une navigation fluide et dynamique entre les différentes pages de l'application (Dashboard, Projets, Profil).

### 4. 📊 Visualisation et Icônes
- **Recharts** : Pour l'affichage de graphiques clairs illustrant l'évolution des compétences.
- **Lucide React** : Une collection d'icônes modernes, légères et facilement personnalisables.

## 🧠 Backend (Serveur)

### 1. Node.js & Express
- Un environnement d'exécution JavaScript côté serveur rapide et une bibliothèque minimaliste pour construire des API REST performantes.

### 2. 💾 MySQL
- Choix d'une base de données relationnelle robuste pour garantir l'intégrité des données des utilisateurs et des projets via des schémas structurés.

### 3. 🔒 Sécurité
- **JWT (JSON Web Tokens)** : Pour une authentification sécurisée, permettant aux utilisateurs de rester connectés de manière fluide.
- **Bcryptjs** : Pour le hachage sécurisé des mots de passe, assurant la protection des données sensibles.

## 🛠️ Outils et Qualité de Code

### 1. TypeScript
- L'ensemble du projet est développé en **TypeScript**. Cela apporte une sécurité supplémentaire grâce au typage statique, permettant de détecter les erreurs avant même l'exécution du code.

### 2. 🧹 Biome
- Utilisé pour le formatage et le "linting" du code. **Biome** est une alternative moderne qui remplace avantageusement Prettier et ESLint par sa simplicité et sa vitesse d'exécution.

### 3. 🧪 Testing (Jest & Supertest)
- Assurance qualité via des tests unitaires et d'intégration pour garantir la stabilité des fonctionnalités critiques.

---
*Ce document sert de référence technique pour l'équipe de développement et les parties prenantes du projet.*
