// src/project-seeds.js

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const organization = [
  {
    name: 'Aliens Are Among Us',
    description: 'Extraordinary Application Development: We help you create solutions that matter! Apps for iOS and Android and much more!'
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
        console.log('Organization seeded...', org.name);
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
      })
      .catch((error) => {
        console.error('Error seeding organization!', error.message);
      });
  })
  .catch(function(error){
    console.error('Error authenticating!', error.message);
  });
