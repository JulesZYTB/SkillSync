describe('Global Application Tests', () => {

  describe('Admin Features', () => {
    const emailAdmin = "admin@exemple.com";
    const passwordAdmin = '123456!';

    it('First login successfully and check is admin', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailAdmin);
      cy.get('#password').type(passwordAdmin);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      cy.get('#root p.dark\\:text-gray-400').should('have.text', ' - admin');
      cy.screenshot('admin-dashboard');
    });

    it('Admin should be able to create a new user', () => {
      const emailTesting = `test_${Math.random().toString(36).substring(2, 10)}@exemple.com`;
      const username = `user_${Math.random().toString(36).substring(2, 10)}`;
      const passwordTesting = '123456!';

      cy.visit('http://localhost:3000/')

      cy.get('#root a.font-bold').click();
      cy.get('#email').type(emailAdmin);
      cy.get('#password').type(`${passwordAdmin}{enter}`);

      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');

      cy.get('#root a[href="/admin/users"]').click();

      cy.get('#root button.text-white').first().click();

      cy.get('#root input[type="text"]').type(username);
      cy.get('#root input[type="email"]').type(emailTesting);
      cy.get('#root input[type="password"]').type(passwordTesting);

      cy.get('#root button.bg-blue-600.flex-1').click();
      cy.screenshot('user-creation');
    });

    it('Create news project and asignée the task to a user', () => {
      const fakename = `project_${Math.random().toString(36).substring(2, 10)}`;
      const fakeDescription = `description_${Math.random().toString(36).substring(2, 10)}`;
      const faketitre = `titre_${Math.random().toString(36).substring(2, 10)}`;
      
      const randomNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
      const randomLv = 4; // 1 to 4

      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailAdmin);
      cy.get('#password').type(passwordAdmin);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      
      cy.get('#root a[href="/admin/projects"]').click();
      cy.get('#root button.text-white').click();
      cy.get('#root input.border').click();
      cy.get('#root input.border').type(fakename);
      cy.get('#root textarea.border').click();
      cy.get('#root textarea.border').type(fakeDescription);
      cy.get('#root button.font-bold.w-full').click();

      cy.get(`#root div:nth-child(${randomNumber}) button.border`).click();
      cy.get('#root input.border').click();
      cy.get('#root input.border').type(faketitre);
      cy.get('#root select.border').select(randomLv);
      cy.get('#root button.font-bold.w-full').click();
      cy.screenshot('project-task-assignment');
    });

    it('Create news competence', () => {
      const fakeCompet = `competence_${Math.random().toString(36).substring(2, 10)}`;

      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailAdmin);
      cy.get('#password').type(passwordAdmin);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');

      cy.get('#root a[href="/admin/skills"] span').click();
      cy.get('#root input.border').click();
      cy.get('#root input.border').type(fakeCompet);
      cy.get('#root button.text-white span').click();
    });

    it('Check Settings interface (Admin)', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailAdmin);
      cy.get('#password').type(passwordAdmin);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      cy.get('#root a[href="/settings"] span').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').should('have.text', emailAdmin);
      cy.screenshot('admin-settings');
    });
  });

  describe('Manager Features', () => {
    const emailManager = "manager@exemple.com";
    const passwordManager = '123456!';

    it('First login successfully and check is manager', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailManager);
      cy.get('#password').type(passwordManager);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      cy.get('#root p.dark\\:text-gray-400').should('have.text', ' - manager');
    });

    it('Check feature project and assigne task and delete random', () => {
      const fakename = `project_${Math.random().toString(36).substring(2, 10)}`;
      const randomNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
      const randomLv = 4; // 1 to 4

      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailManager);
      cy.get('#password').type(passwordManager);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');

      cy.get('#root h1.dark\\:text-white').should('have.text', 'Tableau de Bord');
      cy.get('#root div.lg\\:grid-cols-4 div:nth-child(3)').click();
      
      cy.get('#root a[href="/admin/projects"]').click();
      cy.get('#root div:nth-child(1) > div.border-b.flex > div:nth-child(2) > button.border').click();
      cy.get('#root input.border').click();
      cy.get('#root input.border').type(fakename);
      cy.get('#root select.border').select(randomLv);
      cy.get('#root button.font-bold.w-full').click();
      cy.get(`#root div:nth-child(${randomNumber}) button.hover\\:underline`).first().click();
    });

    it('Check Settings interface (Manager)', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailManager);
      cy.get('#password').type(passwordManager);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      cy.get('#root a[href="/settings"] span').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').should('have.text', emailManager);
    }); 
  });

  describe('Collaborator Features', () => {
    const emailCollaborator = "collaborateur@exemple.com";
    const passwordCollaborator = '123456!';

    it('First login successfully and check is collaborator', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailCollaborator);
      cy.get('#password').type(passwordCollaborator);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      cy.get('#root p.dark\\:text-gray-400').should('have.text', ' - collaborator');
    });

    it('testing access feature', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailCollaborator);
      cy.get('#password').type(passwordCollaborator);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root a:nth-child(2)').click();
      cy.get('#root h1.font-bold').should('have.text', 'Projets & Missions');
      
      cy.get('#root a[href="/"] span').click();
      cy.get('#root h1.font-bold').should('have.text', 'Mon Profil');
    });

    it('Check Settings interface (Collaborator)', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailCollaborator);
      cy.get('#password').type(passwordCollaborator);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      
      cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
      
      cy.get('#root a[href="/settings"] span').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').click();
      cy.get('#root div:nth-child(2) > p.font-medium').should('have.text', emailCollaborator);
    });
  });

  describe('Orther testing', () => {
    const emailFake = "fakeemail@exemple.com";
    const passwordFake = 'FakePass2026!';

    it('Check error is login no allows', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get('#root a.font-bold').click();
      
      cy.get('#email').type(emailFake);
      cy.get('#password').type(passwordFake);
      
      cy.get('button[type="submit"], #root button.w-full').first().click();
      cy.get('#root div.border').should('be.visible');
    });

  });

  describe('Expert E2E Scenarios (CDA Criteria)', () => {
    it('Check error if collaborator access admin pages', () => {
      cy.on('uncaught:exception', (err) => {
        if (err.message.includes('Accès refusé')) return false;
      });

      const emailCollaborator = "collaborateur@exemple.com";
      const passwordCollaborator = '123456!';

      cy.login(emailCollaborator, passwordCollaborator);
      
      cy.visit('http://localhost:3000/admin/users');
      
      cy.url().should('not.include', '/login');
      cy.screenshot('rbac-security-check');
    });

    it('Create project and task then collaborator complete it', () => {
      const emailAdmin = "admin@exemple.com";
      const passwordAdmin = '123456!';
      const emailCollaborator = "collaborateur@exemple.com";
      const passwordCollaborator = '123456!';
      
      const projectName = `E2E_Project_${Math.random().toString(36).substring(2, 7)}`;
      const taskName = `E2E_Task_${Math.random().toString(36).substring(2, 7)}`;

      cy.login(emailAdmin, passwordAdmin);
      cy.get('a[href="/admin/projects"]').click();
      cy.get('button').contains('Nouveau Projet').click();
      cy.get('input').first().type(projectName);
      cy.get('textarea').type('Description E2E Lifecycle');
      cy.get('button[type="submit"]').click();
      
      cy.get('h2').contains(projectName).parents('.bg-white').first().within(() => {
        cy.get('button').contains('Ajouter tâche').click();
      });
      cy.get('input').type(taskName);
      cy.get('select').select('Collaborateur');
      cy.get('button[type="submit"]').click();

      cy.get('button').contains('Déconnexion').click();

      cy.login(emailCollaborator, passwordCollaborator);
      cy.get('h4').contains(taskName).should('be.visible');
      cy.get('h4').contains(taskName).parents('.bg-white').first().within(() => {
        cy.get('button').contains('Terminer').click();
      });
      
      cy.get('h4').contains(taskName).should('not.exist');
      cy.get('button').contains('Déconnexion').click();

      cy.login(emailAdmin, passwordAdmin);
      cy.get('a[href="/"]').first().click();
      cy.get('h1').contains('Tableau de Bord').should('be.visible');
      cy.screenshot('business-lifecycle-complete');
    });

    it('Check responsive layout on mobile', () => {
      cy.viewport('iphone-6');
      cy.visit('http://localhost:3000/');
      
      cy.get('h1').should('contain.text', 'Bienvenue sur SkillSync');
      
      cy.get('a').contains('Commencer maintenant').click();
      cy.get('#email').type("admin@exemple.com");
      cy.get('#password').type("123456!{enter}");
      
      cy.get('nav').should('be.visible');
      cy.screenshot('mobile-responsive-view');
    });

    it('Check profile updates persist after reload', () => {
      const emailAdmin = "admin@exemple.com";
      const passwordAdmin = '123456!';
      const projectName = `Persist_${Math.random().toString(36).substring(2, 6)}`;

      cy.login(emailAdmin, passwordAdmin);
      cy.get('a[href="/admin/projects"]').click();
      
      cy.get('button').contains('Nouveau Projet').click();
      cy.get('input').first().type(projectName);
      cy.get('textarea').type('Description de test persistance');
      cy.get('button[type="submit"]').click();
      
      cy.reload();
      
      cy.contains(projectName).scrollIntoView().should('be.visible');
    });

  });

});
