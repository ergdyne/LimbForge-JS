import React from 'react'
import moment from 'moment'

//Format columns for use in react-table
//Meant to be reusable on single action lists
export default function formatColumns(columns, onClick, caption) {
  return (
    columns.map(x => {
      return ({
        Header: x.name,
        accessor: x.accessor,
        Cell: props => {
          switch (x.type) {
            case 'date': return (<span>{(props.value == null || props.value == '')?'':moment(props.value).format('LL')}</span>)
            case 'id': return((caption==="")?<span/>:<button onClick={()=>onClick(props.value)}>{caption}</button>)
            default: return(<span>{props.value}</span>)
          }
        }
      })
    })
  )
}