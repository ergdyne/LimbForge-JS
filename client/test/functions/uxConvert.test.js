import { expect } from 'chai'
import { uxToColumns, uxToForm } from '../../src/functions/uxConvert'

const record = [
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "accessor", "value": "name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "name", "value": "Name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "type", "value": "string", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "inputType", "value": "text", "type": "string" }
]

const records = [
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "accessor", "value": "date", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "name", "value": "Date", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "type", "value": "date", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "inputType", "value": "select", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "placeholder", "value": "Select Group", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "optionStore", "value": "groupOptions", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "validation-required", "value": "true", "type": "boolean" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "accessor", "value": "name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "name", "value": "Name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "type", "value": "string", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 2, "attribute": "inputType", "value": "text", "type": "string" }
]

const optionAndValidations = [
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "accessor", "value": "side", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "name", "value": "Amputation Side", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "type", "value": "string", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "inputType", "value": "radio", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "validation-required", "value": "true", "type": "boolean" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "option-0", "value": "Left", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 10, "order": 10, "attribute": "option-1", "value": "Right", "type": "string" }
]

const inFormRecords = records.concat(optionAndValidations)
const inFormAttributes = [
  {"uXId":4,"accessor":"transradialBuild","attribute":"name","value":"Measurements","type":"string"},
  {"uXId":4,"accessor":"transradialBuild","attribute":"button","value":"Save","type":"string"},
  {"uXId":4,"accessor":"transradialBuild","attribute":"preventDefault","value":"true","type":"boolean"}
]
const inFormAccessor = 'tempe'

const outForm = {
  accessor:'tempe',
  name: "Measurements",
  button: "Save",
  preventDefault: true,
  
  inputs:[
    {
      recordId: 5,
      order: 1,
      accessor: "date",
      name: "Date",
      type: "date",
      inputType: "select",
      placeholder: "Select Group",
      optionStore: "groupOptions",
      validation: {
        required: true
      }
    },
    {
      recordId: 1,
      order: 2,
      accessor: 'name',
      name: 'Name',
      type: 'string',
      inputType: "text"
    },
    {
      recordId: 10,
      order: 10,
      accessor: 'side',
      name: 'Amputation Side',
      type: 'string',
      inputType: 'radio',
      validation: {
        required: true
      },
      options: ["Left", "Right"]
    }
  ]
}



const outRecordCol = [{
  recordId: 1,
  order: 2,
  accessor: 'name',
  name: 'Name',
  type: 'string'
}]

const outRecordsCols = [
  {
    recordId: 5,
    order: 1,
    accessor: "date",
    name: "Date",
    type: "date"
  },
  {
    recordId: 1,
    order: 2,
    accessor: 'name',
    name: 'Name',
    type: 'string'
  }
]

//More test cases are required
describe("uxToColumns", () => {
  it("converts a single record to column", () => {
    expect(uxToColumns(record)).to.eql(outRecordCol)
  })
  it("converts two records to two columns with correct order", () => {
    expect(uxToColumns(records)).to.eql(outRecordsCols)
  })
})

describe("uxToForm", () => {
  it("converts a full form", () => {
    expect(uxToForm(inFormAccessor,inFormAttributes,inFormRecords)).to.eql(outForm)
  })
})