import { ViewEntity, ViewColumn } from "typeorm"

//patient's group is not expected to change, but this makes it allowable.
@ViewEntity({
  expression: `
    select l.mid as "measureId", l.pid as "patientId",pg."groupId", om.value from 
      (select 
        "measureId" as mid, 
        max(create_at) as latest, 
        "patientId" as pid
      from patient_measurement
      group by "measureId", "patientId"
      ) as l
    inner join patient_measurement as om
    on l.mid = om."measureId" and l.latest = om.create_at and l.pid = om."patientId"
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
export class PatientMeasurementState{
  @ViewColumn()
  patientId: number

  @ViewColumn()
  measureId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  value: number
}