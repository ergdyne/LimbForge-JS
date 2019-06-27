import { Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import { MeasureState } from '../entity/ViewMeasureState'

export default class MeasureController{
  static getMeasures = async (req: Request, res: Response) => {
    const sessionUser = req.session.user

    if (sessionUser == null) {
      res.status(400).send({ msg: 'session failed' })
      return
    }

    //TODO set enums for server too...
    //Check auth level
    if(!['user','groupAdmin','admin'].includes(sessionUser.siteAccess)){
      res.status(400).send({ msg: 'Auth failed' })
      return
    }

    //TODO add limit on measures returned by device or something else.
    getRepository(MeasureState).find()
    .then(ms=>{
      res.send({messureStates:ms})
    }).catch(err => res.send(err))
  }
}
