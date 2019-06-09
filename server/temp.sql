--Due to limitations of the ORM, it is better to build the views here rather than in the ORM

-- Provides a View of the most recent attributes grouped by patientId and attribute
select l.pid as "patientId", oa.attribute, oa.value, oa.type from 
  (select 
    "patientId" as pid, 
    max(create_at) as latest, 
    attribute
  from patient_attribute
  group by "patientId", attribute
  ) as l
inner join patient_attribute as oa
on l.pid = oa."patientId" and l.latest = oa.create_at and l.attribute = oa.attribute;

-- Provides a View of the most recent attributes grouped by groupId and attribute
select l.gid as "groupId", oa.attribute, oa.value, oa.type from 
  (select 
    "groupId" as gid, 
    max(create_at) as latest, 
    attribute
  from group_attribute
  group by "groupId", attribute
  ) as l
inner join group_attribute as oa
on l.gid = oa."groupId" and l.latest = oa.create_at and l.attribute = oa.attribute;

-- View of most recent measure attributes
select l.mid as "measureId", oa.attribute, oa.value, oa.type from 
  (select 
    "measureId" as mid, 
    max(create_at) as latest, 
    attribute
  from measure_attribute
  group by "measureId", attribute
  ) as l
inner join measure_attribute as oa
on l.mid = oa."measureId" and l.latest = oa.create_at and l.attribute = oa.attribute;



-- Inserts for test case if I have to rebuild the DB
insert into "patient" (create_at) values (current_timestamp);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('hi', '1', 'ok', 1);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('hi', '2', 'ok', 1);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('bye', 'a', 'ok', 1);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('bye', 'b', 'ok', 1);
insert into "group" (create_at) values (current_timestamp);
insert into "group" (create_at) values (current_timestamp);
insert into "group_attribute" (attribute,value,type,"groupId") values ('name', 'first', 'ok', 1);
insert into "group_attribute" (attribute,value,type,"groupId") values ('name', '2nd', 'ok', 1);
insert into "group_attribute" (attribute,value,type,"groupId") values ('description', 'a', 'ok', 1);
insert into "group_attribute" (attribute,value,type,"groupId") values ('description', 'b', 'ok', 1);
insert into "group_attribute" (attribute,value,type,"groupId") values ('name', 'old', 'ok', 2);
insert into "group_attribute" (attribute,value,type,"groupId") values ('name', 'new', 'ok', 2);
insert into "group_attribute" (attribute,value,type,"groupId") values ('description', 'aaa', 'ok', 2);
insert into "group_attribute" (attribute,value,type,"groupId") values ('description', 'bbb', 'ok', 2);
insert into "measure" (create_at) values (current_timestamp);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('name', 'L1', 'ok', 1);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('name', 'Length 1', 'ok', 1);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('instruction', 'default', 'ok', 1);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('instruction', 'Measure from elbow to wrist.', 'ok', 1);

--TODO write a seed for measures and attributes