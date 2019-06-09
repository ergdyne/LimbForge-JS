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

--patient's most recent group (will really just be the one entry)
select l.pid as "patientId", "groupId" from 
  (select 
    "patientId" as pid, 
    max(create_at) as latest
  from patient_group
  group by "patientId"
  ) as l
inner join patient_group as og
on l.pid = og."patientId" and l.latest = og.create_at;

-- View that is a table of the user - group - most recent access level combo
select l.aid as "userId", l.gid as "groupId", og.access from 
  (select 
    "userId" as aid, 
    max(create_at) as latest, 
    "groupId" as gid
  from user_group
  group by "userId", "groupId"
  ) as l
inner join user_group as og
on l.aid = og."userId" and l.latest = og.create_at and l.gid = og."groupId";

--View that gives the most recent measurement for each patient and measure
      select l.mid as "measureId", l.pid as "patientId", om.value from 
        (select 
          "measureId" as mid, 
          max(create_at) as latest, 
          "patientId" as pid
        from patient_measurement
        group by "measureId", "patientId"
        ) as l
      inner join patient_measurement as om
      on l.mid = om."measureId" and l.latest = om.create_at and l.pid = om."patientId";

--user's most recent admin status... if exists
select l.aid as "userId", oa."isAdmin" from 
  (select 
    "userId" as aid, 
    max(create_at) as latest
  from admin_access
  group by "userId"
  ) as l
inner join admin_access as oa
on l.aid = oa."userId" and l.latest = oa.create_at;

--user's most recent auth... should exist. And this lets it be password or google and the site doesn't have to know which is stored.
select l.aid as "userId", oa."hash" from 
  (select 
    "userId" as aid, 
    max(create_at) as latest
  from site_auth
  group by "userId"
  ) as l
inner join site_auth as oa
on l.aid = oa."userId" and l.latest = oa.create_at;

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

insert into patient_group ("patientId","groupId") values (1,1);
insert into patient_group ("patientId","groupId") values (1,2);

insert into "user" ("email") values ('j@j.com');
insert into user_group ("userId","groupId","access") values (1,1,'requested');
insert into user_group ("userId","groupId","access") values (1,1,'groupAdmin');
--TODO write a seed for measures and attributes

insert into "measure" (create_at) values (current_timestamp);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('name', 'C1', 'ok', 2);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('name', 'Cir 1', 'ok', 2);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('instruction', 'default', 'ok', 2);
insert into "measure_attribute" (attribute,value,type,"measureId") values ('instruction', 'Measure around the wrist.', 'ok', 2);
insert into patient_measurement ("patientId","measureId","value") values (1,1,25.4);
insert into patient_measurement ("patientId","measureId","value") values (1,2,16.4);
insert into patient_measurement ("patientId","measureId","value") values (1,1,26.4);
insert into patient_measurement ("patientId","measureId","value") values (1,2,17.4);

insert into admin_access ("userId","isAdmin") values (1,true);
insert into admin_access ("userId","isAdmin") values (1,false);
insert into admin_access ("userId","isAdmin") values (1,true);

insert into site_auth ("userId","hash") values (1,'meow');
insert into site_auth ("userId","hash") values (1,'moo');