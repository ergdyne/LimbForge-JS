import {amputationCauses,genders, sides, } from './enums'
import {measurements} from '../testData'

const groupColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `name`, label: `Name`, type: `string` },
  { accessor: `description`, label: `About`, type: `string` }
]

const groupInputs = [
  { accessor: `name`, label: `Group Name`, type: `string`, inputType: `text`, default: '' },
  { accessor: `description`, label: `About`, type: `string`, inputType: `text`, default: '' }
]


const userColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `email`, label: `Email`, type: `string` },
  { accessor: `siteAccess`, label: `Level`, type: `string` },
]

const userGroupColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `email`, label: `Email`, type: `string` },
  { accessor: `groupAccess`, label: `Level`, type: `string` },
]


const patientColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `firstName`, label: `First Name`, type: `string` },
  { accessor: `lastName`, label: `Last Name`, type: `string` },
  { accessor: `dateOfBirth`, label: `Date of Birth`, type: `date` },
  { accessor: `dateOfAmputation`, label: `Amputation Date`, type: `date` },
  { accessor: `city`, label: `City`, type: `string` },
  { accessor: `country`, label: `Country`, type: `string` },
  { accessor: `gender`, label: `Gender`, type: `string` },
  { accessor: `side`, label: `Side`, type: `string` },
  { accessor: `amputationLevel`, label: `Amputation Level`, type: `string` },
  { accessor: `amputationCause`, label: `Amputation Cause`, type: `string` }
]

//I am ok with type being type
//Patient Inputs are currently saved int a weaker state than measurements (the accessor matters)
//When building a fully dynamic form, the data will have to be converted to follow the same process as measures.
const patientInputs = [
  { accessor: `firstName`, label: `First Name`, type: `string`, inputType: `text`, default: '' },
  { accessor: `lastName`, label: `Last Name`, type: `string`, inputType: `text`, default: '' },
  { accessor: `dateOfBirth`, label: `Date of Birth`, type: `date`, inputType: `date`, default: new Date() },
  { accessor: `dateOfAmputation`, label: `Amputation Date`, type: `date`, inputType: `date`, default: new Date() },
  { accessor: `city`, label: `City`, type: `string`, inputType: `text`, default: '' },
  { accessor: `country`, label: `Country`, type: `string`, inputType: `text`, default: '' },
  { accessor: `gender`, label: `Gender`, type: `string`, inputType: `radio`, default: genders[0], options: genders },
  { accessor: `side`, label: `Amputation Side`, type: `string`, inputType: `radio`, default: sides[0], options: sides },
  { accessor: `amputationCause`, label: `Amputation Cause`, type: `string`, inputType: `select`, default: amputationCauses[0], options: amputationCauses },
  { accessor: `amputationLevel`, label: `Amputation Level`, type: `string`, inputType: `text`, default: 'Transradial' }
//TODO deal with any issues with caps Transradial
]

const measurementInputs = measurements.map(m => {
  return ({
    accessor: m.name.toLowerCase(),
    label: m.name,
    type: 'number',
    inputType: 'text',
    placeholder: "XX.X cm",
    validation: {
      min: m.min,
      max: m.max
    },
    instruction: m.instruction
  })
})

export {
  userColHeaders,
  userGroupColHeaders,
  groupColHeaders,
  groupInputs,
  patientColHeaders,
  patientInputs,
  measurementInputs
}