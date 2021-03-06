import _ from 'underscore'

function keyStringToJSON(keyAttribute, stringAttribute, objectArray){
  return (
    JSON.parse(`{${objectArray
      .map(o => `"${o[keyAttribute]}":"${o[stringAttribute]}"`)
      .join(',')}}`))
}

function keyValueTypeToJSON(keyAttribute, valueAttribute,typeAttribute){
  //This can be done better
  //Also there is no error catching on the type parsing

  //Group out
  return function (objectArray){
    const strings = objectArray.filter(o=>o[typeAttribute]=='string')
    const dates = objectArray.filter(o=>o[typeAttribute]=='date')
    const numbers = objectArray.filter(o=>o[typeAttribute]=='number'||o[typeAttribute]=='float')
    const ints = objectArray.filter(o=>o[typeAttribute]=='int')
    const bools = objectArray.filter(o=>o[typeAttribute]=='boolean')

    var obj = {}

    strings.forEach(so=>obj[so[keyAttribute]]=so[valueAttribute])
    dates.forEach(so=>obj[so[keyAttribute]]= new Date(so[valueAttribute]))
    numbers.forEach(so=>obj[so[keyAttribute]]= parseFloat(so[valueAttribute]))
    ints.forEach(so=>obj[so[keyAttribute]]= parseInt(so[valueAttribute]))
    bools.forEach(so=>obj[so[keyAttribute]]= new Boolean(so[valueAttribute]).valueOf())
    
    return obj
  
  }
}

const listToJSON = keyValueTypeToJSON('attribute', 'value', 'type')
const accessorToJSON = keyValueTypeToJSON('accessor', 'value', 'type')

export { keyStringToJSON,listToJSON,accessorToJSON}