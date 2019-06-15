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



-- Inserts for test case if I have to rebuild the DB

insert into "group" (create_at) values (current_timestamp);
insert into "group" (create_at) values (current_timestamp);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('name', 'first', 'ok', 1);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('name', '2nd', 'ok', 1);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('description', 'a', 'ok', 1);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('description', 'b', 'ok', 1);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('name', 'old', 'ok', 2);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('name', 'new', 'ok', 2);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('description', 'aaa', 'ok', 2);
insert into "group_attribute" (attribute,"value", "type","groupId") values ('description', 'bbb', 'ok', 2);

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



insert into user_group ("userId","groupId","access") values (13,1,'user');