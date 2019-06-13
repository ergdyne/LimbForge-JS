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
  //TODO error control
  function typeMatch(type,value){
    switch (type){
      case 'date':
      case 'string': return `"${value}"`
      default: return `${value}`
    }

  }
  return function (objectArray){return (
    JSON.parse(`{${objectArray
      .map(o => `"${o[keyAttribute]}":${typeMatch(o[typeAttribute],o[valueAttribute])}`)
      .join(',')}}`))}
}

const listToJSON = keyValueTypeToJSON('attribute', 'value', 'type')

export {keyNumberToJSON, keyStringToJSON,listToJSON}