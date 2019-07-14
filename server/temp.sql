
-- Inserts for test case if I have to rebuild the DB

--Probably need a user seed too

-- write a seed...

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

insert into "measure" (create_at) values (current_timestamp);
insert into "measure" (create_at) values (current_timestamp);
insert into "measure" (create_at) values (current_timestamp);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'L2', 'string', 5);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'l2', 'string', 5);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure length.', 'string', 5);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '0.5', 'number', 5);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 5);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'C2', 'string', 6);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'c2', 'string', 6);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure around.', 'string', 6);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '0.5', 'number', 6);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 6);

insert into "measure_attribute" (attribute,"value", "type","measureId") values ('name', 'C3', 'string', 7);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('accessor', 'c3', 'string', 7);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('instruction', 'Measure around.', 'string', 7);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('step', '0.5', 'number', 7);
insert into "measure_attribute" (attribute,"value", "type","measureId") values ('placeholder', 'XX.X', 'string', 7);

drop view full_user_group ;
drop view group_state ;
drop view measure_state ;
drop view patient_measurement_state ;
drop view patient_state ;
drop view user_group_state;
drop view view_admin_access ;
drop view view_patient_group;
drop view view_site_auth ;

drop table migrations;
drop table typeorm_metadata;

--Version 0.4

insert into "record" (create_at) values (current_timestamp);insert into record_attribute (attribute, "value","type","recordId") values ('accessor','email','string',1);insert into record_attribute (attribute, "value","type","recordId") values ('name','Email','string',1);insert into record_attribute (attribute, "value","type","recordId") values ('type','string','string',1);insert into record_attribute (attribute, "value","type","recordId") values ('inputType','text','string',1);insert into record_attribute (attribute, "value","type","recordId") values ('validation-type','email','string',1);
