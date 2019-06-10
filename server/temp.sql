

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
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'L1', 'ok', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'Length 1', 'ok', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'default', 'ok', 1);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure from elbow to wrist.', 'ok', 1);

insert into "measure" (create_at) values (current_timestamp);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'C1', 'ok', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'Cir 1', 'ok', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'default', 'ok', 2);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure around the wrist.', 'ok', 2);
