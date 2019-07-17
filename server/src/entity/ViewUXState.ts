import { ViewEntity, ViewColumn} from "typeorm"

//Results in an entry for each userID, groupId, and attribute, which must be merged into a single group-access object.
@ViewEntity({
  expression: `
    select ux.id as "uXId", ux.accessor, ot.attribute, ot.value, ot.type from 
    ux left outer join
      (
        select 
          "uXId" as parentId, 
          max(create_at) as latest, 
          attribute
        from ux_attribute
        group by "uXId", attribute
      ) as l
    on ux.id = l.parentId
    left outer join ux_attribute as ot
    on l.parentId = ot."uXId" and l.latest = ot.create_at and l.attribute = ot.attribute
  `
})
export class UXState{
  @ViewColumn()
  uXId: number

  @ViewColumn()
  accessor: string

  @ViewColumn()
  attribute:string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}
