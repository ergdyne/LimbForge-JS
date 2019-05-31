import React from 'react'
import moment from 'moment'

//Format columns for use in react-table
//Meant to be reusable on single action lists
//Maybe make a multiple callback function version
export default function formatColumns(columns, onClick, caption) {
  return (
    columns.map(x => {
      return ({
        Header: x.label,
        accessor: x.accessor,
        Cell: props => {
          switch (x.type) {
            case 'date': return (<span>{moment(props.value).format('LL')}</span>)
            //This id thing is a bit messy. I don't think it is worth it.
            //What am I trying to achieve? Something like reusability and database programability...
            case 'id': return(<button onClick={()=>onClick(props.value)}>{caption}</button>)
            default: return(<span>{props.value}</span>)
          }
        }
      })
    })
  )
}