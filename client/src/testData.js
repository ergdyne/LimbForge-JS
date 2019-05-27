//TODO move enums to enums
//The label/value concept seems like it might be a waste, but it is easier now and feels right (can't say why). 
const amputationCauses = [
  { label: "Congenital", value: "congenital" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Traffic accident", value: "traffic accident" },
  { label: "Cancer", value: "cancer" },
  { label: "Burn", value: "burn" },
  { label: "Frostbite", value: "frostbite" },
  { label: "Industrial accident", value: "industrial accident" },
  { label: "Electrocution", value: "electrocution" },
  { label: "Natural disaster", value: "natural disaster" },
  { label: "Infection", value: "infection" },
  { label: "Conflict", value: "conflict" },
  { label: "Unknown", value: "unknown" },
  { label: "Other", value: "other" }
]

const genders = [{ label: `Male`, value: `male` }, { label: `Female`, value: `female` }]
const sides = [{ label: `Right`, value: `right` }, { label: `Left`, value: `left` }]
const amputationLevels = [{ label: `Transradial`, value: `transradial` }]

const past = new Date(1950, 1, 1)
const amp = new Date(2012, 2, 2)

function randomFromList(l) {
  return l[(Math.round(Math.random() * (l.length - 1)))]
}

const navData = {
  loggedIn: true,
  home: `patients`,
  menu: [
    { text: `Patients`, link: `patients` },
    { text: `New Patient`, link: `new-patient` }
  ]
}

const fooMeasures = {l1:25, l2:25, l4:18, c1:25, c2:25, c3:25, c4:25}

function patient(first, last, id) {
  return {
    id: id,
    firstName: first,
    lastName: last,
    dateOfBirth: past,
    dateOfAmputation: amp,
    city: `Pittsburgh`,
    country: `USA`,
    gender: randomFromList(genders).label,
    side: randomFromList(sides).label,
    amputationLevel: randomFromList(amputationLevels).label,
    amputationCause: randomFromList(amputationCauses).label,
    measurements: fooMeasures
  }
}



const lastNames = [`Fun`, `Cat`, `Bear`, `Gerry`, `Amith`, `Dill`, `Elsworth`, `Gary`, `Goo`]
const firstNames = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `E`, `F`, `G`, `E`, `F`, `G`, `E`, `F`, `G`, `E`, `F`, `G`, `E`, `F`, `G`, `E`, `F`, `G`]
const patients = firstNames.map((x, i) => patient(x, randomFromList(lastNames), i))

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
const patientInputs = [
  { accessor: `firstName`, label: `First Name`, type: `string`, inputType: `text`, default: '' },
  { accessor: `lastName`, label: `Last Name`, type: `string`, inputType: `text`, default: '' },
  { accessor: `dateOfBirth`, label: `Date of Birth`, type: `date`, inputType: `date`, default: new Date() },
  { accessor: `dateOfAmputation`, label: `Amputation Date`, type: `date`, inputType: `date`, default: new Date() },
  //There is a google library, but we will just feed a default by User and otherwise they can put what they want
  { accessor: `city`, label: `City`, type: `string`, inputType: `text`, default: '' },
  { accessor: `country`, label: `Country`, type: `string`, inputType: `text`, default: '' },
  { accessor: `gender`, label: `Gender`, type: `string`, inputType: `radio`, default: '', options: genders },
  { accessor: `amputationCause`, label: `Amputation Cause`, type: `string`, inputType: `select`, default: amputationCauses[0].value, options: amputationCauses }
  //Amputation level and right/left are something are something special, so not on this
]

const measurements = [
  { name: 'L1', step: 0.5, min: 18, max: 32, default: 25, unit: 'cm', instruction: 'type instruction here' },
  { name: 'L2', step: 0.5, min: 20, max: 28, default: 25, unit: 'cm', instruction: 'type instruction here' },
  { name: 'L4', step: 0.5, min: 14, max: 25, default: 18, unit: 'cm', instruction: 'type instruction here' },
  { name: 'C1', step: 0.5, min: 20, max: 28, default: 25, unit: 'cm', instruction: 'type instruction here' },
  { name: 'C2', step: 0.5, min: 20, max: 28, default: 25, unit: 'cm', instruction: 'type instruction here' },
  { name: 'C3', step: 0.5, min: 20, max: 28, default: 25, unit: 'cm', instruction: 'type instruction here' },
  { name: 'C4', step: 0.5, min: 20, max: 28, default: 25, unit: 'cm', instruction: 'type instruction here' }
]

const measurementInputs = measurements.map(m => {
  return ({
    accessor: m.name.toLowerCase(),
    label:m.name,
    type: 'number',
    inputType:'text',
    default:m.default,
    validation:{
      min:m.min,
      max:m.max
    }
  })
})

export {
  navData,
  patients,
  amputationCauses,
  patientColHeaders,
  patientInputs,
  measurements,
  measurementInputs
}