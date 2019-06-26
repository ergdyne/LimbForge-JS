import { expect } from 'chai'
import { measureStatesToMeasures,listToValidationObject } from '../../src/functions/convertView'

const measureInput = [
  { measureId: 1, attribute: 'name', value: 'L1', type: 'string' },
  { measureId: 1, attribute: 'accessor', value: 'l1', type: 'string' },
  { measureId: 1, attribute: 'instruction', value: 'Measure from elbow to wrist.', type: 'string' },
  { measureId: 1, attribute: 'step', value: '1.0', type: 'number' },
  { measureId: 1, attribute: 'validation-min', value: '18', type: 'number' },
  { measureId: 1, attribute: 'validation-max', value: '32', type: 'number' }
]

const measureOutput = [{
  name: 'L1',
  accessor: 'l1',
  instruction: 'Measure from elbow to wrist.',
  step: 1.0,
  validation: {
    min: 18,
    max: 32
  }

}]

//TODO expand out cases as added to validation
const validationInput = [
  { attribute: 'validation-min', value: '18', type: 'number' },
  { attribute: 'validation-max', value: '32', type: 'number' }
]
const validationOutput = {
  min: 18,
  max: 32
}

describe("convertView", () => {
  it("measureStatesToMeasures generates expected object", () => {
    expect(measureStatesToMeasures(measureInput)).to.eql(measureOutput)
  })
  it("listToValidationObject generates expected object", () => {
    expect(listToValidationObject(validationInput)).to.eql(validationOutput)
  })
})

//TODO delete this comment when moved to correct location or addressed.
//Building our own validation framework here...
//Which is a weird thing to do, so try to keep it simple.
//validation is an object rather than a list