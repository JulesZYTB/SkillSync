describe('Testing login and create user', () => {
  const emailAdmin = "admin@exemple.com";

  const passwordAdmin = '123456!';

  it('First login successfully', () => {
    cy.visit('http://localhost:3000/')

    cy.get('#root a.font-bold').click();

    cy.get('#email').type(emailAdmin);
    cy.get('#password').type(passwordAdmin);

    cy.get('button[type="submit"], #root button.w-full').first().click();

    cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
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
});

