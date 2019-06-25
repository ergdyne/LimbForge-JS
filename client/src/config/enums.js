//Database driven ENUM
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

//Database driven ENUM?
const genders = [`Male`, `Female`]

//ENUM
const sides = [`Right`, `Left`]

//Database driven ENUM
const amputationLevels = [`Transradial`]

//ENUM
const userAccessLevels =['user','groupAdmin','admin','requested','none']

export {
  amputationCauses,
  amputationLevels,
  genders,
  sides,
  userAccessLevels
}