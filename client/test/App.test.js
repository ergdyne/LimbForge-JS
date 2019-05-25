import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {configure,shallow} from 'enzyme'
import {expect} from 'chai'
import App from '../src/App'

configure({adapter: new Adapter()})

describe("App component",()=>{
  it("renders a div", ()=>{
    const divs = shallow(<App/>).find("div")
    expect(divs.length).to.be.above(0)
  })
})