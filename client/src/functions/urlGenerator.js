//using specs is a cheap way of doing it
export default function urlGenerator(specs, component) {
  //Take first letter of gender for terminal device m or f
  const {firstName, lastName, gender, side, measurements} = specs
  const {c1, c4, l1, l4} = measurements
  const componentFolder = component.folder
  const componentVersion = component.version

  //Processed number
  const genderChar = gender.charAt(0).toLowerCase()
  const revision = genderChar === "m" ? 1 : 17 //revision is 1 or 17... which seems like it is hard coded weird way
  const sideChar = side.charAt(0).toUpperCase()
  const C_1 = roundDownNumber(c1)
  const C_4 = roundDownNumber(c4)
  const L_1 = roundUpNumber(l1)
  const L_4 = roundDownNumber(l4)
  const patientName = fullNameUpper(firstName, lastName)

 
  //Since the first two are the only devices that can be downloaded with the current version.
  var urls = [
    {
      link: `https://s3.amazonaws.com/limbforgestls/TD/${genderChar}PTD1/r${revision}/build/${sideChar}/info_C1-${C_1}_L4-${L_4}.stl`,
      name: `${patientName}TERMINAL DEVICE_r15_C1=${c1}_L4=${l4}`,
      position: {x:0,y:0,z:0},
      rotation : {x:0, y:0,z:0},
      type: 'terminalDevice'
    },
    {

      link: `https://s3.amazonaws.com/limbforgestls/${componentFolder}/r${componentVersion}/${sideChar}/info_C1-${C_1}_C4-${C_4}_L1-${L_1}.stl`,
      name: `${patientName}FOREARM_r${componentVersion}_${sideChar}_C1=${c1}_C4=${c4}_L1=${l1}`,
      position: {x:0,y:0,z:3.3},
      rotation : {x:0, y:Math.PI,z:0},
      type: 'device'
    },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-1.stl", name: "WRIST_COUPLER_VERY_LOOSE", type:'coupler' },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-2.stl", name: "WRIST_COUPLER_LOOSE", type:'coupler' },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-3.stl", name: "WRIST_COUPLER_TIGHT", type:'coupler' },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-4.stl", name: "WRIST_COUPLER_VERY_TIGHT", type:'coupler' }
  ]
  return urls
}

//Well L1 seems to be every 10, not 5... so replacing 5 with 10
function roundUpNumber(input) {
  // removing decimal from number
  var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
  // round up to nearest 5
  var result = (Math.ceil(base_num / 10) * 10);
  return result
}

function roundDownNumber(input) {
  // removing decimal from number
  var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
  // round down to nearest 5
  var result = (Math.floor(base_num / 5) * 5);
  return result
}

function fullNameUpper(first, last) {
  return (((last === '') ? '' : `${last}_`)+((first === '') ? '' : `${first}_`)).toUpperCase()
}
