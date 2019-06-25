import {amputationCauses,genders, sides, } from './enums'
import {measurements} from '../testData'

const groupColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `name`, label: `Name`, type: `string` },
  { accessor: `description`, label: `About`, type: `string` }
]

const groupInputs = [
  { accessor: `name`, label: `Group Name`, type: `string`, inputType: `text`},
  { accessor: `description`, label: `About`, type: `string`, inputType: `text`}
]


const usersColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `email`, label: `Email`, type: `string` },
  { accessor: `siteAccess`, label: `Level`, type: `string` },
]

const usersGroupColHeaders = [
  { accessor: `id`, label: ``, type: `id` },
  { accessor: `email`, label: `Email`, type: `string` },
  { accessor: `groupAccess`, label: `Level`, type: `string` },
]

//Col headers that show a user's groups
const userGroupsColHeaders =
[
  {Header: 'Group', accessor: 'name'},
  {Header: 'Description', accessor: 'description'},
  {Header: 'Access', accessor: 'groupAccess'},
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
  { accessor: `firstName`, label: `First Name`, type: `string`, inputType: `text` },
  { accessor: `lastName`, label: `Last Name`, type: `string`, inputType: `text` },
  { accessor: `dateOfBirth`, label: `Date of Birth`, type: `date`, inputType: `date` },
  { accessor: `dateOfAmputation`, label: `Amputation Date`, type: `date`, inputType: `date` },
  { accessor: `city`, label: `City`, type: `string`, inputType: `text` },
  { accessor: `country`, label: `Country`, type: `string`, inputType: `text` },
  { accessor: `gender`, label: `Gender`, type: `string`, inputType: `radio`, options: genders },
  { accessor: `side`, label: `Amputation Side`, type: `string`, inputType: `radio`, options: sides },
  { accessor: `amputationCause`, label: `Amputation Cause`, type: `string`, inputType: `select`, placeholder:'Select Cause', options: amputationCauses },
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
  groupColHeaders,
  groupInputs,
  patientColHeaders,
  patientInputs,
  measurementInputs,
  usersColHeaders,
  usersGroupColHeaders,
  userGroupsColHeaders
}