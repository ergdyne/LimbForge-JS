--Due to limitations of the ORM, it is better to build the views here rather than in the ORM

-- Provides a View of the most recent attributes grouped by patientId and attribute
create view patient_state as
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

-- Inserts for test case if I have to rebuild the DB
insert into "patient" (create_at) values (current_timestamp);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('hi', '1', 'ok', 1);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('hi', '2', 'ok', 1);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('bye', 'a', 'ok', 1);
insert into "patient_attribute" (attribute,value,type,"patientId") values ('bye', 'b', 'ok', 1);