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
    });

    it('Create news project and asignée the task to a user', function() {
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
          
    });

    it('Create news competence', function() {
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

    it('Check Settings interface (Admin)', function() {
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
      cy.get(`#root div:nth-child(${randomNumber}) button.hover\\:underline`).click();
    });

    it('Check Settings interface (Manager)', function() {
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

    it('testing access feature', function() {
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

    it('Check Settings interface (Collaborator)', function() {
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

});
