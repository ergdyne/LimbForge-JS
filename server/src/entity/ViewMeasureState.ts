import { ViewEntity, ViewColumn } from "typeorm"

//View of most recent attributes for measure
@ViewEntity({
  expression: `
    select l.mid as "measureId", oa.attribute, oa.value, oa.type from
      (
        select 
          "measureId" as mid,
          max(create_at) as latest,
          attribute
        from measure_attribute
        group by "measureId", attribute
      ) as l
    inner join measure_attribute as oa
    on l.mid = oa."measureId" and l.latest = oa.create_at and l.attribute = oa.attribute
  `
})

export class MeasureState{
  @ViewColumn()
  measureId: number

  //Name, min, max, default, step, instruction...unit?
  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}