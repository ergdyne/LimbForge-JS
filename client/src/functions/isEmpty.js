//Helper to check if an object is empty.
export default function isEmpty(obj){
  if(obj==null){return true}
  return Object.keys(obj).length === 0
}