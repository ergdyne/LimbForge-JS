import { expect } from 'chai'
import validation from '../../src/functions/validation'

const inputEmail = {
  type:'email' //implies required
}

const inputMinMax = {
  min: 1,
  max: 10.5
}

const inputRequired = {
  required:true
}

const inputRequiredAnd = {
  required:true,
  type:'email'
}



describe("validation", () => {
  it("returns required for empty field", () => {
    expect(validation(inputRequired,'','Field')).to.eql(['Field is required.'])
  })
  it("returns only one required for empty field where required and another item", () => {
    expect(validation(inputRequiredAnd,'','Field')).to.eql(['Field is required.'])
  })
  it("returns nothing for good email", () => {
    expect(validation(inputEmail,'test@email.com','Email')).to.eql([])
  })
  it("returns error for bad email", () => {
    expect(validation(inputEmail,'blah.com','Email')).to.eql(['blah.com is not an email.'])
  })
  it("returns required for empty email", () => {
    expect(validation(inputEmail,'','Email')).to.eql(['Email is required.'])
  })

  it("returns nothing number in range", () => {
    expect(validation(inputMinMax,'4.2','Number Field')).to.eql([])
  })
  it("returns error if not a number", () => {
    expect(validation(inputMinMax,'Green','Number Field')).to.eql(['Green is not a number.'])
  })
  it("returns required and range information for empty number", () => {
    expect(validation(inputMinMax,'','Number Field')).to.eql(['Number Field is required.','Number Field must be between 1 and 10.5.'])
  })
  it("returns range information when outside range", () => {
    expect(validation(inputMinMax,'0','Number Field')).to.eql(['Number Field must be between 1 and 10.5.'])
  })
})