// src/project-seeds.js

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const organization = [
  {
    name: 'Aliens Are Among Us',
    description: 'Extraordinary Application Development: We help you create solutions that matter!'
  },
  {
    name: 'Codaisseur',
    description: 'We teach you all the skills you need to succeed in your career and we help you land your first developer job!'
  },
]

const project = {
  name: 'My first project',
  description: 'This is a project description',
  localeCodes: ['nl'],
};

const codeProject = {
  name: 'Academy Sign Up',
  description: 'Our landing page for future developers interested in Codaisseur',
  localeCodes: ['en_US'],
}

const codeEntries = [
  {
    name: 'apply header link',
    description: 'Header button for future developers',
    group: 'header',
    tags: ['header', 'apply', 'academy', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'BECOME_A_DEVELOPER_HEADER_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'START A CAREER AS A WEB DEVELOPER'
          }
        ]
      }
    ]
  },
  {
    name: 'hire header lin',
    description: 'Header button for interested companies',
    group: 'header',
    tags: ['header', 'hire', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'HIRE_A_DEVELOPER_HEADER_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'HIRE A WEB DEVELOPER'
          }
        ]
      }
    ]
  },
  {
    name: 'main title',
    description: 'Main title for the landing page',
    group: 'main',
    tags: ['main', 'academy', 'title'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'MAIN_LANDING_TITLE',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Codaisseur Academy'
          }
        ]
      }
    ]
  },
  {
    name: 'main description',
    description: 'Main description for the landing page',
    group: 'main',
    tags: ['main', 'academy', 'description'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'MAIN_LANDING_DESCRIPTION',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Learn modern web development\nHire the best trained developers'
          }
        ]
      }
    ]
  },
  {
    name: 'hire menu link',
    description: 'Hire a developer menu link',
    group: 'menu',
    tags: ['menu', 'hire', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'HIRE_A_DEVELOPER_MENU_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Hire a developer'
          }
        ]
      }
    ]
  },
  {
    name: 'apply menu link',
    description: 'Become a developer menu link',
    group: 'menu',
    tags: ['menu', 'apply', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'BECOME_A_DEVELOPER_MENU_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Become a developer'
          }
        ]
      }
    ]
  },
  {
    name: 'bootcamps menu link',
    description: 'Link to see possible bootcamps',
    group: 'menu',
    tags: ['menu', 'bootcamp', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'BOOTCAMPS_MENU_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Bootcamps'
          }
        ]
      }
    ]
  },
  {
    name: 'blog menu link',
    description: 'Menu link to the codaisseur blog',
    group: 'menu',
    tags: ['menu', 'blog', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'BLOG_MENU_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Blog'
          }
        ]
      }
    ]
  },
  {
    name: 'sign in menu link',
    description: 'Sign in link in the menu',
    group: 'menu',
    tags: ['menu', 'sign-in', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'SIGN_IN_MENU_LINK',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'Sign in'
          }
        ]
      }
    ]
  },
  {
    name: 'apply now button',
    description: 'Green apply now button in menu',
    group: 'menu',
    tags: ['menu', 'apply', 'academy', 'link'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'APPLY_MENU_BUTTON',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'APPLY NOW'
          }
        ]
      }
    ]
  },
  {
    name: 'body header title',
    description: 'Header title for the main body of the page',
    group: 'body',
    tags: ['body', 'header', 'title'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'HOW_IT_WORKS_HEADER_TITLE',
        translations: [
          {
            localeCode: 'en_US',
            translation: 'HOW IT WORKS'
          }
        ]
      }
    ]
  },
]

const entries = [
  {
    name: 'item data',
    description: 'main menu item data',
    group: 'menu',
    tags: ['menu', 'data'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'main_menu_item_data',
        translations: [
          {
            localeCode: 'nl',
            translation: 'DATA'
          }
        ]
      }
    ]
  },
  {
    name: 'item profile',
    description: 'main menu item profile',
    group: 'menu',
    tags: ['menu', 'profile'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'main_menu_item_profile',
        translations: [
          {
            localeCode: 'nl',
            translation: 'PROFIEL'
          }
        ]
      }
    ]
  },
  {
    name: 'item messages',
    description: 'main menu item messages',
    group: 'menu',
    tags: ['menu', 'messages'],
    platforms: [
      {
        platformCode: 'default',
        keyId: 'main_menu_item_messages',
        translations: [
          {
            localeCode: 'nl',
            translation: 'BERICHTEN'
          }
        ]
      }
    ]
  }
];

const users = [
  {
    'name': 'organizationAdmin',
    'email': 'organ@organAdmin.com',
    'password': 'qwerty1',
    'roles': ['admin']
  },
  {
    'name': 'organizationUser',
    'email': 'user@user.com',
    'password': 'qwerty1',
    'roles': ['user']
  },
  {
    'name': 'Wouter',
    'email': 'wouter@codaisseur.com',
    'password': 'qwerty1',
    'roles': ['admin']
  },
  {
    name: 'Arno',
    email: 'arno@codaisseur.com',
    password: 'qwerty1',
    roles: ['user']
  },
  {
    name: 'Mike',
    email: 'mike@codaisseur.com',
    password: 'qwerty1',
    roles: 'user'
  },
  {
    name: 'Mat',
    email: 'mat@codaisseur.com',
    password: 'qwerty1',
    roles: 'user'
  }
]

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.authenticate({
  strategy: 'local',
  email: 'admin@admin.com',
  password: 'qwerty1'
})
  .then(() => {
    feathersClient.service('organizations').create(organization)
      .then((org) => {
        console.log('Organization seeded...', org[0].name);
        console.log('Organization seeded...', org[1].name);
        feathersClient.service('users').create(Object.assign(users[0], {organizationId: org[0]._id}))
        feathersClient.service('users').create(Object.assign(users[1], {organizationId: org[0]._id}))
        feathersClient.service('projects').create(Object.assign(project, {organizationId: org[0]._id}))
          .then((proj) => {
            console.log('Project seeded...', proj.name);
            entries.map((entry) => {
              feathersClient.service('entries').create(Object.assign(entry, {projectId: proj._id}))
                .then((ent) => {
                  console.log('Entry seeded...', ent.name);
                })
                .catch((error) => {
                  console.error('Error seeding entry!', error.message);
                });
            });
          })
          .catch((error) => {
            console.error('Error seeding project!', error.message);
          });
        feathersClient.service('projects').create(Object.assign(codeProject, {organizationId: org[1]._id}))
          .then((proj) => {
            console.log('Project seeded...', proj.name);
            codeEntries.map((entry) => {
              feathersClient.service('entries').create(Object.assign((entry), {projectId: proj._id}))
                .then((ent) => {
                  console.log('Entry seeded...', ent.name);
                })
                .catch((error) => {
                  console.error('Error seeding entry!', error.message);
                });
            });
          })
          .catch((error) => {
            console.log('Error seeding project!', error.message);
          })
      })
      .catch((error) => {
        console.error('Error seeding organization!', error.message);
      });
  })
  .catch(function(error){
    console.error('Error authenticating!', error.message);
  });
