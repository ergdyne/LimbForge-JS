
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


drop view full_user_group ;
drop view group_state ;
drop view measure_state ;
drop view patient_measurement_state ;
drop view patient_state ;
drop view user_group_state;
drop view view_admin_access ;
drop view view_patient_group;
drop view view_site_auth ;


    select l.pid as "patientId", og."groupId", "groupName" from 
      (select 
        "patientId" as pid, 
        max(create_at) as latest
      from patient_group
      group by "patientId"
      ) as l
    inner join patient_group as og
    on l.pid = og."patientId" and l.latest = og.create_at
    inner join
    (
      select l.gid as "groupId", oa.value as "groupName" from 
      (
        select 
          "groupId" as gid, 
          max(create_at) as latest, 
          attribute
        from group_attribute
        where attribute = 'name'
        group by "groupId", attribute
      ) as l
    inner join group_attribute as oa
    on l.gid = oa."groupId" and l.latest = oa.create_at and l.attribute = oa.attribute
    ) as n
    on n."groupId" = og."groupId"