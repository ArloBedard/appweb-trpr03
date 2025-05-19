describe('Récits utilisateur', () => {
  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
  const user = {
    email: 'test@test.com',
    password: 'test',
    name: 'Emmett Brown',
    role: 'lead',
    karma: 0,
    id: 1
  }

  const category = {
    name: 'Test',
    id: 4
  }

  const tester = {
    email: 'tester@test.com',
    password: '$2a$10$YLl4WfgW9IcGT64opHJxgOH5824KS1MXjZHfQxFXjmJ877D3xhI6i',
    name: 'John Doe',
    role: 'tester',
    karma: 10,
    id: 2
  }

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')
  })

  // Les tests sont écrits sous forme de récits utilisateur. Voir les notes de cours à ce sujet.
  it("je peux accéder à la page d'accueil", () => {
    // L'instruction `cy` permet d'exécuter des commandes de Cypress.
    // Ici, on visite la page d'accueil.
    cy.visit('/')

    // On vérifie que la page contient, dans une balise H1, le texte "Accueil"
    cy.contains('h1', /accueil/i)
  })

  it('je peux accéder à la page à propos', () => {
    cy.visit('/about')

    cy.contains('h1', /à propos/i)
  })

  it('je peux accéder à la page de bogues', () => {
    cy.login(user.email, user.password)
    cy.visit('/bugs/lead')

    cy.contains('h1', /Gestion des bogues/i)
  })

  it('je peux créer une catégorie', () => {
    cy.login(user.email, user.password)
    cy.visit('/bugs/lead')

    cy.get('input[name=name-input]').type(category.name)

    cy.get('button[type=submit]').click()
    cy.wait(500)
    cy.contains(`${category.name}`)
  })

  it('je peux changer mon nom', () => {
    cy.login(user.email, user.password)
    cy.visit('/profile')

    cy.get('button[name=modify]').click()
    cy.get('input[name=name-input]').type('nouveau nom', { force: true })

    cy.get('button[type=submit]').click()
    cy.wait(500)
    cy.get('input[name="name-input"]').should('have.value', 'Emmett Brownnouveau nom')
  })

  it('je peux changer mon mot de passe', () => {
    cy.login(user.email, user.password)
    cy.visit('/profile')

    cy.get('button[name=modify]').click()
    cy.get('input[name=password-input]').type('nouveau mot de passe', { force: true })

    cy.get('button[type=submit]').click()
    cy.wait(500)
    cy.get('input[name="password-input"]').should(
      'have.value',
      '$2a$10$/U4TD6TdllwpkXLdBzoagepGDpOGcRFTS6VHAnYGNeCKsuhpEWmX2nouveau mot de passe'
    )
  })

  it('je peux accorder du karma à un testeur', () => {
    cy.login(user.email, user.password)
    cy.visit('/testers')

    cy.get('select[name=email-input]').select(tester.email)
    cy.get('button[name=give-karma]').click()

    cy.contains(`${tester.karma + 10}`)
  })

  it('je peux retirer du karma à un testeur', () => {
    cy.login(user.email, user.password)
    cy.visit('/testers')

    cy.get('select[name=email-input]').select(tester.email)
    cy.get('button[name=take-karma]').click()

    cy.contains(`${tester.karma - 10}`)
  })

  it('je peux me connecter - version 1 ', () => {
    cy.visit('/login')

    // On utilise .get pour sélectionner dans le DOM un élément input dont l'attribut name est email-input. Ensuite, .type est utilisé pour saisir du texte dans cet élément.
    cy.get('input[name=email-input]').type(user.email)
    cy.get('input[name=password-input]').type(user.password)
    // On utilise .get pour sélectionner dans le DOM un élément bonton dont l'attribut type est submit). Ensuite, .click est utilisé pour cliquer sur cet élément.
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
  })

  it('je peux me connecter - version 2', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login(user.email, user.password)
  })

  it('je peux me déconnecter', () => {
    cy.login(user.email, user.password)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('je peux voir mon profil', () => {
    cy.login(user.email, user.password)
    cy.get('input[name="name-input"]').should('have.value', 'Emmett Brown')
    cy.get('input[name="password-input"]').should(
      'have.value',
      '$2a$10$/U4TD6TdllwpkXLdBzoagepGDpOGcRFTS6VHAnYGNeCKsuhpEWmX2'
    )
    cy.contains(user.email)
    cy.contains(user.role)
    cy.contains(user.karma)
  })
})
