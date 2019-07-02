
//Database driven ENUMs
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
const amputationLevels = [`Transradial`]
const genders = [`Male`, `Female`] //Maybe?
const nozzelOptions = [`0.4mm`,`0.6mm`]

//Set ENUMs
const sides = [`Right`, `Left`]
const userAccessLevels =['user','groupAdmin','admin','requested','none']

export {
  amputationCauses,
  amputationLevels,
  genders,
  nozzelOptions,
  sides,
  userAccessLevels
}