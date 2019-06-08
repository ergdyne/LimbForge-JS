//TODO move enums to enums

const amputationCauses = [
  "Congenital",
  "Diabetes",
  "Traffic accident",
  "Cancer",
  "Burn",
  "Frostbite",
  "Industrial accident",
  "Electrocution",
  "Natural disaster",
  "Infection",
  "Conflict",
  "Unknown",
  "Other"
]

const genders = [`Male`, `Female`]
const sides = [`Right`, `Left`]
const amputationLevels = [`Transradial`]

const past = new Date(1950, 1, 1)
const amp = new Date(2012, 2, 2)

function randomFromList(l) {
  return l[(Math.round(Math.random() * (l.length - 1)))]
}

const navData = {
  menu: [
    { text: `Patients`, link: `patients`, access: [`user`, `groupAdmin`, `admin`] },
    { text: `New Patient`, link: `new-patient`, access: [`user`, `groupAdmin`, `admin`] },
    { text: `Users`, link: `users`, access: [`groupAdmin`, `admin`] },
    { text: `Groups`, link: `groups`, access: [`admin`] }
    //Maybe add the measurement stuff too
  ]
}


function randomMeasure(min, max) {
  return (Math.round(Math.random() * (max - min)) + min)
}

function fooMeasures() {
  return ({
    l1: randomMeasure(18, 32),
    l2: 25,
    l4: randomMeasure(13, 19),
    c1: randomMeasure(14.5, 18),
    c2: 25,
    c3: 25,
    c4: randomMeasure(20, 28)
  })
}
function patient(first, last, id) {
  return {
    id: id,
    firstName: first,
    lastName: last,
    dateOfBirth: past,
    dateOfAmputation: amp,
    city: `Pittsburgh`,
    country: `USA`,
    gender: randomFromList(genders),
    side: randomFromList(sides),
    amputationLevel: randomFromList(amputationLevels),
    amputationCause: randomFromList(amputationCauses),
    measurements: fooMeasures()
  }
}



const groups = [
  { id: 0, name: `Lambda`, description: `A mathy group around Egypt` },
  { id: 1, name: `Curry`, description: `Partial application of Ecuador` },
  { id: 2, name: `Alonzo`, description: `Inventive peeps in Croatia` }
]

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

const currentUser = {
  id: 0,
  email: `admin@limbforge.org`,
  loggedIn: true,
  siteAccess: 'admin',
  groups: [{ fkGroup: 1, groupAccess: 'groupAdmin' }], //if admin to site, then ignore this
  home: `users`
}

const userAccessLevels =['user','groupAdmin','admin']

const users = [
  currentUser,
  {
    id: 1,
    email: `groupadmin@limbforge.org`,
    loggedIn: true,
    siteAccess: 'groupAdmin',
    groups: [{ fkGroup: 0, groupAccess: 'groupAdmin' }, { fkGroup: 1, groupAccess: 'user' }], //if admin to site, then ignore this
    home: `patients`
  },
  {
    id: 2,
    email: `user@limbforge.org`,
    loggedIn: true,
    siteAccess: 'user',
    groups: [{ fkGroup: 0, groupAccess: 'user' }, { fkGroup: 1, groupAccess: 'user' }], //if admin to site, then ignore this
    home: `patients`
  },
  {
    id: 3,
    email: `user1@limbforge.org`,
    loggedIn: true,
    siteAccess: 'user',
    groups: [{ fkGroup: 1, groupAccess: 'user' }, { fkGroup: 2, groupAccess: 'user' }], //if admin to site, then ignore this
    home: `patients`
  },
  {
    id: 4,
    email: `user2@limbforge.org`,
    loggedIn: true,
    siteAccess: 'user',
    groups: [{ fkGroup: 2, groupAccess: 'user' }], //if admin to site, then ignore this
    home: `patients`
  },
  {
    id: 5,
    email: `request@limbforge.org`,
    loggedIn: false,
    siteAccess: 'request',
    groups: [{ fkGroup: 0, groupAccess: 'request' }], //if admin to site, then ignore this
    home: `patients`
  },
]

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
  { accessor: `gender`, label: `Gender`, type: `string`, inputType: `radio`, default: genders[0], options: genders },
  { accessor: `side`, label: `Amputation Side`, type: `string`, inputType: `radio`, default: sides[0], options: sides },
  { accessor: `amputationCause`, label: `Amputation Cause`, type: `string`, inputType: `select`, default: amputationCauses[0], options: amputationCauses }

]

const measurements = [
  { name: 'L1', step: 1.0, min: 18, max: 32, unit: 'cm', instruction: 'type instruction here' },
  //{ name: 'L2', step: 0.5, min: 20, max: 28,  unit: 'cm', instruction: 'type instruction here' },
  { name: 'L4', step: 0.5, min: 14, max: 19, unit: 'cm', instruction: 'type instruction here' },
  { name: 'C1', step: 0.5, min: 14.5, max: 18, unit: 'cm', instruction: 'type instruction here' },
  //{ name: 'C2', step: 0.5, min: 20, max: 28,  unit: 'cm', instruction: 'type instruction here' },
  //{ name: 'C3', step: 0.5, min: 20, max: 28,  unit: 'cm', instruction: 'type instruction here' },
  { name: 'C4', step: 0.5, min: 20, max: 28, unit: 'cm', instruction: 'type instruction here' }
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

const forearm = {
  name: 'Forearm r20',
  version: 20,
  creator: 'Limbforge',
  component_type: 'forearm',
  weight: '200-300g',
  description: 'Limbforge forearm.',
  uses: 'transradial',
  folder: 'forearm-QTC',
  print_time: '5-8 hours'
}


//Make terminal device at 0,0. Move and rotate everything else relative to TD.
//It is probably possible to do an auto packing with this based on mesh dimensions or something like that...
const stls = [
  {
    link: "https://s3.amazonaws.com/limbforgestls/TD/mPTD1/r1/build/R/info_C1-150_L4-160.stl",
    name: "TERMINAL DEVICE_r15_C1=15_L4=16",
    type: 'terminalDevice'
  },
  {
    link: "https://s3.amazonaws.com/limbforgestls/forearm-QTC/r20/R/info_C1-150_C4-240_L1-270.stl",
    name: "FOREARM_r20_R_C1=15_C4=24_L1=27_nz=0.4",
    rotation: { x: 0, y: Math.PI, z: 0 },
    type: 'device'
  },
  { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-1.stl", name: "WRIST_COUPLER_VERY_LOOSE", type: 'coupler' },
  { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-2.stl", name: "WRIST_COUPLER_LOOSE", type: 'coupler' },
  { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-3.stl", name: "WRIST_COUPLER_TIGHT", type: 'coupler' },
  { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-4.stl", name: "WRIST_COUPLER_VERY_TIGHT", type: 'coupler' }
]


export {
  navData,
  currentUser,
  users,
  userColHeaders,
  userAccessLevels,
  groups,
  groupColHeaders,
  groupInputs,
  amputationCauses,
  patientColHeaders,
  patients,
  patientInputs,
  measurements,
  measurementInputs,
  forearm,
  stls
}