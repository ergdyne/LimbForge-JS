export default function urlGenerator() {
  //Take first letter of gender for terminal device m or f
  const first = 'Jj'
  const last = 'Zz'
  const gender = 'male'
  const side = 'right'
  const C1 = '15' //if error might have to do a string... feels weird but I guess this was meant to be dynamically changed
  const C4 = '24'
  const L1 = '27'
  const L4 = '16'
  const componentFolder = 'forearm-QTC'
  const componentVersion = 20 //yarg
  const nozzleSize = 0.4


  //Processed number
  const revision = gender == "male" ? 1 : 17 //revision is 1 or 17... which seems like it is hard coded weird way
  const genderChar = gender.charAt(0)
  const sideChar = side.charAt(0).toUpperCase()
  const C_1 = roundDownNumber(C1)
  const C_4 = roundDownNumber(C4)
  const L_1 = roundUpNumber(L1)
  const L_4 = roundDownNumber(L4)
  const patientName = fullNameUpper(first, last)

  //load for preview... well... these are the same as the others, but they got a C6 and some other stuff that isn't right.
  //const td =  'https://s3.amazonaws.com/limbforgestls/TD/' + genderChar + 'PTD1/r'+ revision +'/preview/'+ sideChar +'/info_C1-' + C_1 + '_L4-'+ L_4 + '.stl'
  //const d = 'https://s3.amazonaws.com/limbforgestls/'+componentFolder+'/r' + componentVersion + '/preview/' + sideChar + '/info_C4-' + C_4 + '_C6-'+ this.roundDownNumber(this.state.specs.C6) + '_L2-'+ this.roundDownNumber(this.state.specs.L2) + '.stl'


  //Take a terminal device
  var urls = [
    {
      link: `https://s3.amazonaws.com/limbforgestls/TD/${genderChar}PTD1/r${revision}/build/${sideChar}/info_C1-${C_1}_L4-${L_4}.stl`,
      name: `${patientName}TERMINAL DEVICE_r15_C1=${C1}_L4=${L4}`,
      position: {x:0,y:0,z:0},
      rotation : {x:0, y:0,z:0},
      type: 'terminalDevice'
    },
    {

      link: `https://s3.amazonaws.com/limbforgestls/${componentFolder}/r${componentVersion}/${sideChar}/info_C1-${C_1}_C4-${C_4}_L1-${L_1}.stl`,
      name: `${patientName}FOREARM_r${componentVersion}_${sideChar}_C1=${C1}_C4=${C4}_L1=${L1}`,
      position: {x:0,y:0,z:3.3},
      rotation : {x:0, y:Math.PI,z:0},
      type: 'device'
    }
  ]
  console.log(urls)
  return urls
}

function roundUpNumber(input) {
  // removing decimal from number
  var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
  // round up to nearest 5
  var result = (Math.ceil(base_num / 5) * 5);
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
  return ((first === '') ? '' : `${first}_` + (last === '') ? '' : `${last}_`).toUpperCase()
}


//https://s3.amazonaws.com/limbforgestls/forearm-QTC/r20/R/info_C1-150_C4-240_L1-270.stl