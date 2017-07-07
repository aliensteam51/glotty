import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { createMockStore } from 'redux-test-utils'
import 'jest-enzyme'

import store from '../store'
import ProjectPage from './ProjectPage'
import LocaleContainer from './LocaleContainer'

chai.use(chaiEnzyme())

describe('<ProjectPage />', () => {
  const project = {
    name: 'Project1',
    description: 'This is a project',
    localeCodes: ['nl', 'en'],
    deleted: false
  }

  const entries = [
    {
      name: 'Entry1',
      description: 'This is an entry',
      group: 'entries',
      tags: ['entries'],
      platforms: [
        {
          platformCode: 'default',
          keyId: 'something',
          translations: [
            {
              localeCode: 'nl',
              translation: 'iets'
            }
          ]
        }
      ]
    }
  ]

  const state = {
    currentProject: project,
    entries: entries,
  }

  const mockStore = createMockStore(state)

  const page = mount(
    <Provider store={mockStore}>
      <ProjectPage
        currentProject={project}
        entries={entries}
        params={{projectId: '3'}}
        getProject={jest.fn()}
        fetchEntries={jest.fn()}
      />
    </Provider>,
    { context: { store: store } }
  )

  it('has a wrapping div tag', () => {
    expect(page).to.have.tagName('div')
  })

  it('has project name as title', () => {
    expect(page.find('h1')).to.have.text(project.name)
  })

  it('has project description', () => {
    expect(page.find('p')).to.have.text(project.ddescription)
  })

  it('contains the LocaleContainer', () => {
    expect(page).to.have.descendants(LocaleContainer)
  })
})
