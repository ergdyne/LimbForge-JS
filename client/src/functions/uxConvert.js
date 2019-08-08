import _ from 'underscore'
import {listToJSON} from './ergJSON'

//This is a quick path, but misses code reuse.
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

//Converts a set of options to a list string options.
function optionSetToOptions(rows) {
  return _.sortBy(rows.map(r => {
    const order = r.attribute.split("-").pop()
    return ({
      order:order,
      value:r.value
    })
  }),'order').map(r=>r.value)
}

//Converts a set of records to an individual input field.
function recordSetToInput(rows) {
  function check(s) {
    return function (record) {
      return record.attribute.substring(0, s.length) === s
    }
  }
  const isVal = check("validation-")
  const isOpt = check("option-")

  const validations = rows.filter(r => isVal(r))
    .map(r=>{
      var nr = {...r}
      nr.attribute = r.attribute.split("-").pop()
      return nr 
    })

  const options = rows.filter(r => isOpt(r))
  const attributes = rows.filter(r => !(isOpt(r) || isVal(r)))

  var column = listToJSON(attributes)

  const { recordId, order } = rows[0]

  column.recordId =recordId
  column.order = order
  if(validations.length>0){column.validation = listToJSON(validations)}
  if(options.length>0){column.options = optionSetToOptions(options)}

  return column
}

//Converts list of ux records to a list of columns that can be consummed by formatColumns.
function uxToColumns(rows) {
  const columnSets = _.pairs(_.groupBy(rows, r => r.recordId))
  return _.sortBy(columnSets.map(set => recordSetToColumn(set[1])), 'order')
}

//Converts list of attributes and input records from DB to a Form object.
function uxToForm(accessor,attributes, inputs) {
  const column = listToJSON(attributes)
  const inputSets = _.pairs(_.groupBy(inputs, r => r.recordId))
  return {...column, 
    accessor: accessor,
    inputs: _.sortBy(inputSets.map(set => recordSetToInput(set[1])), 'order')
  }
}

export {
  uxToColumns,
  uxToForm
}



