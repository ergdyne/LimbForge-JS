import formatValue from '../functions/formatValue'
import React from 'react'


export default function SimpleAttribute(x, obj){
  return ((obj[x.accessor]) ?
    <div key={`header-${x.accessor}`} className="row">
      {`${x.name}: ${formatValue(x.type, obj[x.accessor])}`}
        
    </div> : <span />
  )
}