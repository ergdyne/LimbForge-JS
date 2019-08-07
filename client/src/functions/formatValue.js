import moment from 'moment'

//Right now just used in temproary areas to format the dates.
//Would be used to format different types of data similar to used in React-Table
export default function formatValue (t, v){
  switch (t) {
    //case 'number' : return v.toString()
    case 'date': return moment(v).format('LL')
    default: return v
  }
}