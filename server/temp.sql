
-- Inserts for test case if I have to rebuild the DB

--Probably need a user seed too

--TODO write a seed for measures and attributes
insert into "measure" (create_at) values (current_timestamp);
insert into "measure" (create_at) values (current_timestamp);
insert into "measure" (create_at) values (current_timestamp);
insert into "measure" (create_at) values (current_timestamp);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'L1', 'string', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'l1', 'string', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure from elbow to wrist.', 'string', 1);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'L4', 'string', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'l4', 'string', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure...', 'string', 2);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'C1', 'string', 3);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'c1', 'string', 3);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure around the wrist.', 'string', 3);


insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'C4', 'string', 4);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'c4', 'string', 4);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure around the wrist.', 'string', 4);

--New inserts - v 0.2
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '1.0', 'number', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '0.5', 'number', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '0.5', 'number', 3);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '0.5', 'number', 4);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-min', '18', 'number', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-max', '32', 'number', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-min', '14', 'number', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-max', '19', 'number', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-min', '14.5', 'number', 3);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-max', '18', 'number', 3);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-min', '20', 'number', 4);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('validation-max', '28', 'number', 4);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 3);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 4);



drop view full_user_group ;
drop view group_state ;
drop view measure_state ;
drop view patient_measurement_state ;
drop view patient_state ;
drop view user_group_state;
drop view view_admin_access ;
drop view view_patient_group;
drop view view_site_auth ;


select l.mid as "measureId", l.pid as "patientId",pg."groupId", om.value, a.accessor from 
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
    inner join
    (select l.mid as "measureId", oa.value as accessor from
      (
        select 
          "measureId" as mid,
          max(create_at) as latest,
          attribute
        from measure_attribute
        where attribute = 'accessor'
        group by "measureId", attribute
      ) as l
    inner join measure_attribute as oa
    on l.mid = oa."measureId" and l.latest = oa.create_at and l.attribute = oa.attribute) as a
    on a."measureId" = l.mid