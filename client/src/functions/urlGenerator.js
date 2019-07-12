//This is a monster associated with the current way of "Multiple points of truth" for the STL files.
//STL files are stored in S3. The App accesses them via URLs. The URLs have to have correct format.
//Future versions should:
//Control all STL files and versions via Admin functions (upload, describe, link, delete, exc).
//User inputs will query the descriptions to find matching files.


//This is all a HACK and confusing.
export default function urlGenerator(specs, component) {
  //These are all the items we need to get the correct URLs. Patient name is optional.
  const {firstName, lastName, gender, side, measurements} = specs
  const {c1, c4, l1, l4} = measurements
  const componentFolder = component.folder
  const componentVersion = component.version

  //First we process them a bit.
  //Gender influences two things and must be single letter and lower case.
  const genderChar = gender.charAt(0).toLowerCase()
  //We also need gender to get a revision number, which means if a revision is changed, it has to be hard coded...
  const revision = genderChar === "m" ? 1 : 17 
  //Left or Right, but now and uppercase character!
  const sideChar = side.charAt(0).toUpperCase()
  //C1,C4, and L4 are all to the nearest 5mm.
  const C_1 = roundDownNumber(c1)
  const C_4 = roundDownNumber(c4)
  const L_4 = roundDownNumber(l4)
  //L1 is to the nearest 10mm.
  const L_1 = roundUpNumber(l1)

  //Patient name is optional.
  const patientName = fullNameUpper(firstName, lastName)

 
  //Since the first two are the only devices that can be downloaded with the current version.
  var urls = [
    {
      link: `https://s3.amazonaws.com/limbforgestls/TD/${genderChar}PTD1/r${revision}/build/${sideChar}/info_C1-${C_1}_L4-${L_4}.stl`,
      name: `${patientName}TERMINAL DEVICE_r15_C1=${C_1}_L4=${L_4}`,
      type: 'terminalDevice'
    },
    {
    //The forearm has to be rotated pi radians to be lined up correctly.
      link: `https://s3.amazonaws.com/limbforgestls/${componentFolder}/r${componentVersion}/${sideChar}/info_C1-${C_1}_C4-${C_4}_L1-${L_1}.stl`,
      name: `${patientName}FOREARM_r${componentVersion}_${sideChar}_C1=${C_1}_C4=${C_4}_L1=${L_1}`,
      rotation : {x:0, y:Math.PI,z:0},
      type: 'device'
    },
    //The other items are couplers that are provided with every file.
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-1.stl", name: "WRIST_COUPLER_VERY_LOOSE", type:'coupler' },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-2.stl", name: "WRIST_COUPLER_LOOSE", type:'coupler' },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-3.stl", name: "WRIST_COUPLER_TIGHT", type:'coupler' },
    { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-4.stl", name: "WRIST_COUPLER_VERY_TIGHT", type:'coupler' }
  ]
  return urls
}

//Converts cm to mm and rounds to nearest 10 mm.
//Well L1 seems to be every 10, not 5... so replacing 5 with 10.
function roundUpNumber(input) {
  // removing decimal from number
  var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
  // round up to nearest 10
  var result = (Math.ceil(base_num / 10) * 10);
  return result
}

//Converst cm to mm and rounds to nearest 5 mm.
function roundDownNumber(input) {
  // removing decimal from number
  var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
  // round down to nearest 5
  var result = (Math.floor(base_num / 5) * 5);
  return result
}

//Converts first and last name into a format for the filename.
//TODO move somewhere else
function fullNameUpper(first, last) {
  return (((last === '') ? '' : `${last}_`)+((first === '') ? '' : `${first}_`)).toUpperCase()
}
