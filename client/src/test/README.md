# Tests Unitaires et Fonctionnels (Client)

Ce dossier contient la configuration et les outils pour les tests du frontend. Nous utilisons **Vitest** et **React Testing Library** pour garantir la qualité du code.

## 🛠️ Outils utilisés
- **[Vitest](https://vitest.dev/)** : Framework de test ultra-rapide conçu pour Vite.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** : Pour tester les composants du point de vue de l'utilisateur (DOM).
- **[jsdom](https://github.com/jsdom/jsdom)** : Simule un environnement de navigateur dans Node.js.

## 🧪 Tests Actuels

### 🔑 Page de Connexion (`src/pages/login.test.tsx`)
Ce test vérifie le bon fonctionnement du formulaire de connexion :

1. **Vérification de l'affichage** : On s'assure que le titre "Connexion", les champs "Email" et "Mot de passe", ainsi que le bouton "Se connecter" sont bien présents à l'écran.
2. **Simulation d'erreur** : On simule un échec de connexion (via un "mock" de la fonction `login`) pour vérifier que le message d'erreur "Identifiants invalides" s'affiche correctement à l'utilisateur.
3. **Mocks techniques** : 
   - `vi.mock("../services/AuthContext")` : On remplace le vrai contexte d'authentification par un faux pour tester le composant isolément.
   - `<MemoryRouter>` : On entoure le composant d'un routeur virtuel car il utilise `useNavigate` et `Link`.

---

## 🚀 Commandes disponibles
Depuis le dossier `client/` :
- `npm run test` : Lance les tests en mode interactif (watch).
- `npm run test:run` : Exécute les tests une seule fois.
- `npm run test:ui` : Ouvre une interface graphique dans le navigateur pour visualiser les tests.

## 📁 Structure
- `setup.ts` : Configuré dans `vite.config.ts`. Il s'exécute avant chaque test pour :
  - Nettoyer le DOM (`cleanup`).
  - Ajouter les matchers personnalisés comme `toBeInTheDocument()`.

## 💡 Comment ajouter un test ?
Il suffit de créer un fichier finissant par `.test.tsx` (ou `.test.ts`) n'importe où dans le dossier `src/`. Vitest le détectera automatiquement.

Exemple : `src/pages/login.test.tsx`
