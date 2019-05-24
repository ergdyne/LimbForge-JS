const navData = {
  loggedIn: true,
  home:`patients`,
  menu:[
    {text:`Patients`,link:`patients`},
    {text:`Something`,link:`something`}
  ]
}

const ampCauses = [
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

const past = new Date(1950,1,1)
const amp = new Date(2012,2,2)

function patient(first, last){
  return {
    firstName: first,
    lastName: last,
    dateOfBirth: past,
    dateOfAmputation: amp,
    city: `Pittsburgh`,
    country: `USA`,
    gender: `male`,
    amputationLevel: `transradial`,
    amputationCause: ampCauses[(Math.round(Math.random()*ampCauses.length))]
  }
}

const patients = [`A`,`B`,`C`,`E`,`F`].map(x => patient(x,`Z`))

const patientColHeaders = [
  {accessor: `firstName`, header: `First Name`, type:`string`},
  {accessor: `lastName`, header: `Last Name`, type:`string`},
  {accessor: `dateOfBirth`, header: `Date of Birth`, type:`date`},
  {accessor: `dateOfAmputation`, header: `Amputation Date`, type:`date`},
  {accessor: `city`, header: `City`, type:`string`},
  {accessor: `country`, header: `Country`, type:`string`},
  {accessor: `gender`, header: `Gender`, type:`string`},
  {accessor: `amputationLevel`, header: `Amputation Level`, type:`string`},
  {accessor: `amputationCause`, header: `Amputation Cause`, type:`string`}
]

export {
  navData,
  patients,
  ampCauses,
  patientColHeaders
}