import { amputationCauses, genders, sides, nozzelOptions } from './enums'

const groupColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `name`, name: `Name`, type: `string` },
  { accessor: `description`, name: `About`, type: `string` }
]

const groupInputs = [
  { accessor: `name`, name: `Group Name`, type: `string`, inputType: `text`, validation: { required: true } },
  { accessor: `description`, name: `About`, type: `string`, inputType: `text` }
]


const usersColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `email`, name: `Email`, type: `string` },
  { accessor: `siteAccess`, name: `Level`, type: `string` },
]

const usersGroupColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `email`, name: `Email`, type: `string` },
  { accessor: `groupAccess`, name: `Level`, type: `string` },
]

//Col headers that show a user's groups
const userGroupsColHeaders =
  [
    { Header: 'Group', accessor: 'name' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Access', accessor: 'groupAccess' },
  ]

const patientColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `firstName`, name: `First Name`, type: `string` },
  { accessor: `lastName`, name: `Last Name`, type: `string` },
  { accessor: `dateOfBirth`, name: `Date of Birth`, type: `date` },
  { accessor: `dateOfAmputation`, name: `Amputation Date`, type: `date` },
  { accessor: `city`, name: `City`, type: `string` },
  { accessor: `country`, name: `Country`, type: `string` },
  { accessor: `gender`, name: `Gender`, type: `string` },
  { accessor: `side`, name: `Side`, type: `string` },
  { accessor: `amputationLevel`, name: `Amputation Level`, type: `string` },
  { accessor: `amputationCause`, name: `Amputation Cause`, type: `string` },
  { accessor: `nozzleSize`, name: 'Nozzle Size', type: `string` }
]

//I am ok with type being type
//Patient Inputs are currently saved int a weaker state than measurements (the accessor matters)
//When building a fully dynamic form, the data will have to be converted to follow the same process as measures.
const patientInputs = [
  { accessor: `firstName`, name: `First Name`, type: `string`, inputType: `text`, validation: { required: true } },
  { accessor: `lastName`, name: `Last Name`, type: `string`, inputType: `text` },
  { accessor: `dateOfBirth`, name: `Date of Birth`, type: `date`, inputType: `date` },
  { accessor: `dateOfAmputation`, name: `Amputation Date`, type: `date`, inputType: `date` },
  { accessor: `city`, name: `City`, type: `string`, inputType: `text` },
  { accessor: `country`, name: `Country`, type: `string`, inputType: `text` },
  { accessor: `gender`, name: `Gender`, type: `string`, inputType: `radio`, options: genders, validation: { required: true } },
  { accessor: `side`, name: `Amputation Side`, type: `string`, inputType: `radio`, options: sides, validation: { required: true } },
  { accessor: `amputationCause`, name: `Amputation Cause`, type: `string`, inputType: `select`, placeholder: 'Select Cause', options: amputationCauses },
  {accessor: `nozzleSize`, name: 'Nozzle Size', type: `string`, inputType: `select`, default: nozzelOptions[0], options: nozzelOptions },
  { accessor: `amputationLevel`, name: `Amputation Level`, type: `string`, inputType: `text`, default: 'Transradial' }
  //TODO deal with any issues with caps Transradial
]

const measurementInputs = []

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