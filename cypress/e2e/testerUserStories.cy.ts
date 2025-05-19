describe('Récits utilisateur', () => {
  const API_URL = 'http://127.0.0.1:3000'
  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
  const user = {
    email: 'mon@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    role: 'tester',
    karma: 10
  }

  const lead = {
    email: 'test@test.com',
    password: '$2a$10$/U4TD6TdllwpkXLdBzoagepGDpOGcRFTS6VHAnYGNeCKsuhpEWmX2',
    name: 'Emmett Brown',
    role: 'lead',
    karma: 0,
    id: 1
  }

  const bug = {
    userId: 1,
    title: 'titre',
    description: 'description',
    steps: 'étapes',
    categoryId: 1,
    platform: 'plateforme',
    priority: 3,
    solved: false,
    solvedBy: '',
    img: 'https://imgur.com/boScIn1.png',
    id: 1
  }

  const category = {
    name: 'Visuel',
    id: 1
  }

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

    // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
    cy.request('POST', `${API_URL}/register`, {
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      karma: user.karma
    })
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
    cy.visit('/bugs/tester')

    cy.contains('h1', /Gestion des bogues/i)
  })

  it('je peux créer un bogue', () => {
    cy.login(user.email, user.password)

    cy.visit('/bugs/tester')

    cy.get('input[name=title-input]').type(bug.title)
    cy.get('textarea[name=description-input]').type(bug.description)
    cy.get('textarea[name=steps-input]').type(bug.steps)
    cy.get('input[name=priority-input]').type(bug.priority.toString())
    cy.get('input[name=platform-input]').type(bug.platform)
    cy.get('select[name=category-input]').select(category.name)
    cy.get('input[name=img-input]').type(bug.img)

    cy.get('button[type=submit]').click()
    cy.wait(500)
    cy.contains(`${bug.title}`)
  })

  it("je peux voir l'image du bogue après sa création", () => {
    cy.login(user.email, user.password)

    cy.visit('/bugs/tester')

    cy.get('input[name=title-input]').type(bug.title)
    cy.get('textarea[name=description-input]').type(bug.description)
    cy.get('textarea[name=steps-input]').type(bug.steps)
    cy.get('input[name=priority-input]').type(bug.priority.toString())
    cy.get('input[name=platform-input]').type(bug.platform)
    cy.get('select[name=category-input]').select(category.name)
    cy.get('input[name=img-input]').type(bug.img)

    cy.get('button[type=submit]').click()
    cy.wait(500)

    cy.get('[data-bs-target="#collapse-0"]').click()
    cy.get('img').should('have.attr', 'src', bug.img).and('be.visible')
  })

  it('je peux accorder du karma à un développeur', () => {
    cy.login(user.email, user.password)
    cy.visit('/bugs/tester')

    cy.get('select[name=email-input]').select(lead.email)
    cy.get('button[name=give-karma]').click()

    cy.contains(/déconnecter/i).click()
    cy.login(lead.email, lead.password)
    cy.visit('/profile')
    cy.contains(`${lead.karma + 10}`)
  })

  it('je peux retirer du karma à un développeur', () => {
    cy.login(user.email, user.password)
    cy.visit('/bugs/tester')

    cy.get('select[name=email-input]').select(lead.email)
    cy.get('button[name=take-karma]').click()

    cy.contains(/déconnecter/i).click()
    cy.login(lead.email, lead.password)
    cy.visit('/profile')
    cy.contains(`${lead.karma - 10}`)
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

    cy.contains(user.name)
    cy.contains(user.email)
    cy.contains(user.role)
    cy.contains(user.karma)
  })
})
