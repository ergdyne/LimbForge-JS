import { ViewEntity, ViewColumn} from "typeorm"

//Results in an entry for each userID, groupId, and attribute, which must be merged into a single group-access object.
@ViewEntity({
  expression: `
    select ux.id  as "uXId", ux.accessor, uxrs."recordId", uxrs."order",rs.attribute, rs.value, rs.type from
    ux left outer join
    (
      select l.parentId as "uXId", ot."recordId", ot."order" from 
        (
          select 
            "uXId" as parentId, 
            max(create_at) as latest, 
            "recordId"
          from ux_record
          group by "uXId", "recordId"
        ) as l
      inner join ux_record as ot
      on l.parentId = ot."uXId" and l.latest = ot.create_at and l."recordId" = ot."recordId"
      where "order" > -1
    ) as uxrs
    on ux.id = uxrs."uXId"
    left outer join
    (
      select l.parentId as "recordId", ot.attribute, ot.value, ot.type from 
        (
          select 
            "recordId" as parentId, 
            max(create_at) as latest, 
            attribute
          from record_attribute
          group by "recordId", attribute
        ) as l
      inner join record_attribute as ot
      on l.parentId = ot."recordId" and l.latest = ot.create_at and l.attribute = ot.attribute
    ) as rs
    on uxrs."recordId" = rs."recordId"
  `
})
export class UXRecordState{
  @ViewColumn()
  uXId: number

  @ViewColumn()
  accessor: string

  @ViewColumn()
  recordId: number

  @ViewColumn()
  order: number

  @ViewColumn()
  attribute:string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}

   