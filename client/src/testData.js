//TODO move enums to enums
//The display/value concept seems like it might be a waste, but it is easier now and feels right (can't say why). 
const amputationCauses = [
  {display: "Congenital", value: "congenital"},
  {display: "Diabetes", value: "diabetes"},
  {display: "Traffic accident", value: "traffic accident"},
  {display: "Cancer", value: "cancer"},
  {display: "Burn", value: "burn"},
  {display: "Frostbite", value: "frostbite"},
  {display: "Industrial accident", value: "industrial accident"},
  {display: "Electrocution", value: "electrocution"},
  {display: "Natural disaster", value: "natural disaster"},
  {display: "Infection", value: "infection"},
  {display: "Conflict", value: "conflict"},
  {display: "Unknown", value: "unknown"},
  {display: "Other", value: "other"}
]

const genders = [{display:`Male`, value:`male`},{display:`Female`, value:`female`}]
const sides = [{display:`Right`, value:`right`},{display:`Left`, value:`left`}]
const amputationLevels = [{display: `Transradial`, value: `transradial`}]

const past = new Date(1950,1,1)
const amp = new Date(2012,2,2)

function randomFromList(l){
  return l[(Math.round(Math.random()*(l.length-1)))]
}

const navData = {
  loggedIn: true,
  home:`patients`,
  menu:[
    {text:`Patients`,link:`patients`},
    {text:`New Patient`,link:`new-patient`}
  ]
}

function patient(first, last,id){
  return {
    id:id,
    firstName: first,
    lastName: last,
    dateOfBirth: past,
    dateOfAmputation: amp,
    city: `Pittsburgh`,
    country: `USA`,
    gender: randomFromList(genders).display,
    side: randomFromList(sides).display,
    amputationLevel: randomFromList(amputationLevels).display,
    amputationCause: randomFromList(amputationCauses).display
  }
}

const lastNames = [`Fun`, `Cat`, `Bear`, `Gerry`, `Amith`, `Dill`, `Elsworth`,`Gary`,`Goo`]
const firstNames = [`A`,`B`,`C`,`D`,`E`,`F`,`G`,`E`,`F`,`G`,`E`,`F`,`G`,`E`,`F`,`G`,`E`,`F`,`G`,`E`,`F`,`G`,`E`,`F`,`G`]
const patients = firstNames.map((x,i) => patient(x,randomFromList(lastNames),i))

const patientColHeaders = [
  {accessor: `id`, header: ``, type:`id`},
  {accessor: `firstName`, header: `First Name`, type:`string`},
  {accessor: `lastName`, header: `Last Name`, type:`string`},
  {accessor: `dateOfBirth`, header: `Date of Birth`, type:`date`},
  {accessor: `dateOfAmputation`, header: `Amputation Date`, type:`date`},
  {accessor: `city`, header: `City`, type:`string`},
  {accessor: `country`, header: `Country`, type:`string`},
  {accessor: `gender`, header: `Gender`, type:`string`},
  {accessor: `side`, header: `Side`, type: `string`},
  {accessor: `amputationLevel`, header: `Amputation Level`, type:`string`},
  {accessor: `amputationCause`, header: `Amputation Cause`, type:`string`}
]

const patientInputs = [
  {accessor: `firstName`, header: `First Name`, type:`string`, input: `text`},
  {accessor: `lastName`, header: `Last Name`, type:`string`, input: `text`},
  {accessor: `dateOfBirth`, header: `Date of Birth`, type:`date`, input: `date`},
  {accessor: `dateOfAmputation`, header: `Amputation Date`, type:`date`, input: `date`},
  //There is a google library, but we will just feed a default by User and otherwise they can put what they want
  {accessor: `city`, header: `City`, type:`string`, input: `text`},
  {accessor: `country`, header: `Country`, type:`string`, input: `text`},
  {accessor: `gender`, header: `Gender`, type:`string`, input: `radio`, options: genders},
  {accessor: `amputationCause`, header: `Amputation Cause`, type:`selection`, options: amputationCauses}
  //Amputation level and right/left are something are something special, so not on this
]

export {
  navData,
  patients,
  amputationCauses,
  patientColHeaders,
  patientInputs
}