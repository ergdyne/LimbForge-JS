import formatValue from '../functions/formatValue'
import React from 'react'

//Inputs are an object that holds values (such as patient) and
//an UX object that contains formatting information.
export default function SimpleAttribute(x, obj){
  return ((obj[x.accessor]) ?
    <div key={`${x.accessor}`} className="row">
      {`${x.name}: ${formatValue(x.type, obj[x.accessor])}`} 
    </div> : <span key={`${x.accessor}`} />
  )
}