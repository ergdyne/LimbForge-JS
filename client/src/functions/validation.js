import isEmail from 'email-validator'

function reqText (name){
  return `${name} is required.`
}

//Runs validation set vs a value and returns a list of string errors.
//There are better ways of doing this that should be explored in the future. Such as using someone else's library.
export default function validation (validations,value,name){
  const v = validations
  var errors = []

  //If any other requirements, required is implied
  if(v.required && value.length <1){
    errors.push(reqText(name))
  }

  if(v.confirm){
    const first = (typeof value === 'string')?value:value.first
    const second = (typeof value === 'string')?'':value.second

    if(first !==second){
      errors.push(`Passwords must match.`)
    }
  }

  //Type errors
  if(v.type){
    switch (v.type){
      case 'email':{
        if(value.length < 1){
          if(!v.required){errors.push(reqText(name))}
        }
        if(value.length > 0 && !isEmail.validate(value)){
          errors.push(`${value} is not an email.`)
        }
        break
      }
      default:{
        console.log(`${v.type} is not yet implimented in validation`)
        break
      }
    }
  }

  if(v.min || v.max){
    //Number type implied, check if is a number
    if(value.length < 1 ){
      if(!v.required){errors.push(reqText(name))}
    }
    if(isNaN(value)){
      errors.push(`${value} is not a number.`)
    }else{
      if(v.min && v.max){
        if(v.min > value || v.max < value){
          errors.push(`${name} must be between ${v.min} and ${v.max}.`)
        }
      }else{
        console.log(`seperate min and max are not yet implimented in valdiations`)
      }
    }
  }



  return errors
}