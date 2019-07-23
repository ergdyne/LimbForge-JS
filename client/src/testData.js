
//used in URL generator
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

const measurements = [
  //ID refers to the current test state of the database, in the future this table will come from there.
  { id: 1, name: 'L1', step: 1.0, min: 18, max: 32, unit: 'cm', instruction: 'type instruction here' },
  //{ name: 'L2', step: 0.5, min: 20, max: 28,  unit: 'cm', instruction: 'type instruction here' },
  { id: 2, name: 'L4', step: 0.5, min: 14, max: 19, unit: 'cm', instruction: 'type instruction here' },
  { id: 3, name: 'C1', step: 0.5, min: 14.5, max: 18, unit: 'cm', instruction: 'type instruction here' },
  //{ name: 'C2', step: 0.5, min: 20, max: 28,  unit: 'cm', instruction: 'type instruction here' },
  //{ name: 'C3', step: 0.5, min: 20, max: 28,  unit: 'cm', instruction: 'type instruction here' },
  { id: 4, name: 'C4', step: 0.5, min: 20, max: 28, unit: 'cm', instruction: 'type instruction here' }
]


const measurementInputs = measurements.map(m => {
  return ({
    accessor: m.name.toLowerCase(),
    name: m.name,
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

const measurementForm = {
  accessor:'measurements',
  name: "Measurements",
  button: "Save",
  preventDefault: true,
  inputs: measurementInputs}


export {
  forearm,
  measurementForm
}