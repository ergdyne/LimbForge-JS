import { Request, Response, response } from "express"
import { getRepository, getManager, In } from "typeorm"
import { UX } from '../entity/UX'
import { UXRecordState } from '../entity/ViewUXRecordState'
import { UXState } from '../entity/ViewUXState'

export default class UXController {
  static getUX = async (req: Request, res: Response) => {
    //TODO restrict access
    const accessor = req.params.accessor
    //Run this way to get easy error message
    getRepository(UX).findOneOrFail({ where: { accessor: accessor } })
      .then(ux => {
        getRepository(UXState).find({where:{uXId:ux.id}})
        .then(attributes =>{
          getRepository(UXRecordState).find({where:{uXId:ux.id}})
          .then(records =>{
            res.status(200).send({
              accessor: accessor,
              attributes:attributes,
              records: records
            })
          })
        })
      })
      .catch(err => res.status(400).send(err))
  }
}