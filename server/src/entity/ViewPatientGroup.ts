import { ViewEntity, ViewColumn } from "typeorm"

//patient's group is not expected to change, but this makes it allowable.
@ViewEntity({
  expression: `
    select l.pid as "patientId", "groupId" from 
      (select 
        "patientId" as pid, 
        max(create_at) as latest
      from patient_group
      group by "patientId"
      ) as l
    inner join patient_group as og
    on l.pid = og."patientId" and l.latest = og.create_at
  `
})
export class ViewPatientGroup{
  @ViewColumn()
  patientId: number

  @ViewColumn()
  groupId: number
}