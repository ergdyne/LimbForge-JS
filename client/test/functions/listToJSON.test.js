import { expect } from 'chai'
import { listToJSON,keyStringToJSON } from '../../src/functions/ergJSON'

const inputA = [
  { attribute: 's', value: 'a', type: 'string' },
  { attribute: 'date', value: '2011-04-11T10:20:30Z', type: 'date' },
  { attribute: 'n', value: '34', type: 'number' }
]

const outputA = {
  s: 'a',
  date: '2011-04-11T10:20:30Z',
  n: 34
}

const inputB = [
  { groupId: 1, attribute: "name", value: "2nd", type: "ok" },
  { groupId: 1, attribute: "description", value: "b", type: "ok" }
]
const outputB ={
  name: "2nd",
  description:"b"
}


describe("ergJSON", () => {
  it("listTOJSON generates expected object", () => {
    expect(listToJSON(inputA)).to.eql(outputA)
  }),
  it("keyStringToJSON generates expected object", () => {
    expect(keyStringToJSON('attribute','value',inputB)).to.eql(outputB)
  })
})
