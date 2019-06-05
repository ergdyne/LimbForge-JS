import React from 'react'

//Site Admin access only
//Views available:
  //A list of groups 
  //add group -> simple form (subset of view/edit)
  //view/edit group
    //the add group form
    //stats
    //users listing
    //patient listing?
const Groups = props => {
  return (
     // More convoluted divs from the current copied CSS.
     <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
     <div className="card round white"><div className="container padding">
       <div>{'Hello Group'}</div>
     </div></div>
   </div></div></div></div>
  )
}

export default Groups
