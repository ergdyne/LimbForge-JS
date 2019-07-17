import _ from 'underscore'

//This is a quick path, but misses code reuse
function recordSetToColumn(rows){
  const {recordId,order}= rows[0]

  var column = {
    recordId:recordId,
    order:order
  }

  rows.filter(r=> 
    ['accessor','name','type'].includes(r.attribute)
  ).forEach(r=>{
    column[r.attribute]=r.value
  })

  return (column)
}

function uxToColumns(rows){
  const columnSets = _.pairs(_.groupBy(rows, r=>r.recordId))
  return columnSets.map(set => recordSetToColumn(set[1]))
}

export{
  uxToColumns
}



