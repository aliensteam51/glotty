import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import 'jest-enzyme'

import { ProjectsContainer } from './ProjectsContainer'

chai.use(chaiEnzyme())

const projects = [
  {
    name: 'Project1',
    description: 'This is a project',
    localeCodes: ['nl', 'en'],
    deleted: false
  }
]

const renderer = new ShallowRenderer()
renderer.render(<ProjectsContainer fetchProjects={jest.fn()} projects={projects} />)
const result = renderer.getRenderOutput()

it('has wrapping tag name main', () => {
  expect(result.type).to.contain('main')
})
