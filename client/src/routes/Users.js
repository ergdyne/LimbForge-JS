import React from 'react'

//Site Admin and Group Admin access
//Site Admin sees all users
//Group Admin sees group's users
//Areas
  //List of users
  //View/Edit user
    //Add list of groups access with remove/promote group admin
    //single item form to add another group
const Users = props => {
  return (
     // More convoluted divs from the current copied CSS.
     <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
     <div className="card round white"><div className="container padding">
       <div>{'Hello User'}</div>
     </div></div>
   </div></div></div></div>
  )
}

export default Users
