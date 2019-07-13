import { ViewEntity, ViewColumn } from "typeorm"

//Provides a View of the most recent attributes grouped by patientId and attribute
@ViewEntity({
  expression: `
  select l.pid as "patientId", pg."groupId", oa.attribute, oa.value, oa.type from 
    (
      select 
        "patientId" as pid, 
        max(create_at) as latest, 
        attribute
      from patient_attribute
      group by "patientId", attribute
    ) as l
  inner join patient_attribute as oa
  on l.pid = oa."patientId" and l.latest = oa.create_at and l.attribute = oa.attribute
  inner join (
    select l.pid as "patientId", "groupId" from 
      (select 
        "patientId" as pid, 
        max(create_at) as latest
      from patient_group
      group by "patientId"
      ) as l
    inner join patient_group as og
    on l.pid = og."patientId" and l.latest = og.create_at
    ) as pg on pg."patientId" = l.pid
  `
})
export class PatientState {
  @ViewColumn()
  patientId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}