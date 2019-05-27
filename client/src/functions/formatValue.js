import moment from 'moment'

export default function formatValue (t, v){
  switch (t) {
    //case 'number' : return v.toString()
    case 'date': return moment(v).format('LL')
    default: return v
  }
}