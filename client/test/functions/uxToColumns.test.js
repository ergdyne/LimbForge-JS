import { expect } from 'chai'
import {uxToColumns} from '../../src/functions/uxConvert'

const record = [
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "accessor", "value": "name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "name", "value": "Name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "type", "value": "string", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "inputType", "value": "text", "type": "string" }
]

const records = [
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "accessor", "value": "date", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "name", "value": "Date", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "type", "value": "date", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "inputType", "value": "select", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "placeholder", "value": "Select Group", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "optionStore", "value": "groupOptions", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 5, "order": 1, "attribute": "validation-required", "value": "true", "type": "boolean" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "accessor", "value": "name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "name", "value": "Name", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "type", "value": "string", "type": "string" },
  { "uXId": 5, "accessor": "patientCols", "recordId": 1, "order": 0, "attribute": "inputType", "value": "text", "type": "string" }
]

const outRecord = [{
  recordId: 1,
  order: 0,
  accessor: 'name',
  name: 'Name',
  type: 'string'
}]

const outRecords = [
  {
    recordId: 1,
    order: 0,
    accessor: 'name',
    name: 'Name',
    type: 'string'
  },
  {
    recordId: 5,
    order: 1,
    accessor: "date",
    name: "Date",
    type: "date"
  }
]

//More test cases are required
describe("uxToColumns", () => {
  it("converts a single record to column", () => {
    expect(uxToColumns(record)).to.eql(outRecord)
  })
  it("converts two records to two columns", () => {
    expect(uxToColumns(records)).to.eql(outRecords)
  })
})