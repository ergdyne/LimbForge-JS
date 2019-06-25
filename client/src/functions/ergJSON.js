import _ from 'underscore'

function keyNumberToJSON(keyAttribute, numberAttribute, objectArray){
  return (
    JSON.parse(`{${objectArray
      .map(o => `"${o[keyAttribute]}":${o[numberAttribute]}`)
      .join(',')}}`))
}

function keyStringToJSON(keyAttribute, stringAttribute, objectArray){
  return (
    JSON.parse(`{${objectArray
      .map(o => `"${o[keyAttribute]}":"${o[stringAttribute]}"`)
      .join(',')}}`))
}

function keyValueTypeToJSON(keyAttribute, valueAttribute,typeAttribute){
  //Group out
  return function (objectArray){
    const strings = objectArray.filter(o=>o[typeAttribute]=='string')
    const dates = objectArray.filter(o=>o[typeAttribute]=='date')
    const numbers = objectArray.filter(o=>o[typeAttribute]=='number')
    const ints = objectArray.filter(o=>o[typeAttribute]=='int')

    //This can be better setup...
    var obj = {}

    strings.forEach(so=>obj[so[keyAttribute]]=so[valueAttribute])
    dates.forEach(so=>obj[so[keyAttribute]]= new Date(so[valueAttribute]))
    numbers.forEach(so=>obj[so[keyAttribute]]= parseFloat(so[valueAttribute]))
    ints.forEach(so=>obj[so[keyAttribute]]= parseInt(so[valueAttribute]))
    
    return obj
  
  }
}

const listToJSON = keyValueTypeToJSON('attribute', 'value', 'type')

export {keyNumberToJSON, keyStringToJSON,listToJSON}