import _ from 'underscore'
import {listToJSON} from './ergJSON'

//This is a quick path, but misses code reuse
function recordSetToColumn(rows) {
  const { recordId, order } = rows[0]

  var column = {
    recordId: recordId,
    order: order
  }

  rows.filter(r =>
    ['accessor', 'name', 'type'].includes(r.attribute)
  ).forEach(r => {
    column[r.attribute] = r.value
  })

  return (column)
}

function uxToColumns(rows) {
  const columnSets = _.pairs(_.groupBy(rows, r => r.recordId))
  return _.sortBy(columnSets.map(set => recordSetToColumn(set[1])), 'order')
}

function valSetToValidation(rows) {
  var v = {}

  rows.forEach(r => {
    const attribute = r.attribute.split("-").pop()
    console.log('VAL ATT', attribute)
    try {
      switch (r.type) {
        case 'boolean': {
          v[attribute] = new Boolean(r.value).valueOf()
          break
        }
        case 'float': {
          v[attribute] = parseFloat(r.value)
          break
        }
        default: {
          v[attribute] = r.value
        }
      }
    } catch (err) {
      console.log('ERROR in parsing valSetToValidation -> Skipping')
    }
  })
  return v
}

function optionSetToOptions(rows) {
  return _.sortBy(rows.map(r => {
    const order = r.attribute.split("-").pop()
    return ({
      order:order,
      value:r.value
    })
  }),'order').map(r=>r.value)
}

function recordSetToInput(rows) {
  function check(s) {
    return function (record) {
      return record.attribute.substring(0, s.length) === s
    }
  }
  const isVal = check("validation-")
  const isOpt = check("option-")

  const validations = rows.filter(r => isVal(r))
  const options = rows.filter(r => isOpt(r))
  const attributes = rows.filter(r => !(isOpt(r) || isVal(r)))

  var column = listToJSON(attributes)

  const { recordId, order } = rows[0]

  column.recordId =recordId
  column.order = order
  if(validations.length>0){column.validation = valSetToValidation(validations)}
  if(options.length>0){column.options = optionSetToOptions(options)}

  return column
}

function uxToForm(rows) {
  const inputSets = _.pairs(_.groupBy(rows, r => r.recordId))
  return _.sortBy(inputSets.map(set => recordSetToInput(set[1])), 'order')
}


export {
  uxToColumns,
  uxToForm
}



