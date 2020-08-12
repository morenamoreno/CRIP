drop database CRIP;
create database if not exists CRIP;

create table if not exists CRIP.users (
  id int primary key auto_increment,
  username varchar(30),
  password varchar(30),
  email  varchar(30),
  role  varchar(30),
  metarole int
) ;
insert ignore into CRIP.users values
  (1, 'Admin', '1admin','admin@localhost.es', 'admin',0);
insert ignore into CRIP.users values
  (2, 'Agent1', '1agent','agent1@localhost.es', 'agent',0);
insert ignore into CRIP.users values
  (3, 'Agent2', '2agent','agent2@localhost.es', 'agent',0);
insert ignore into CRIP.users values
  (4, 'Chuck Norris', 'client','client1@localhost.es', 'client',2);
insert ignore into CRIP.users values
  (5, 'Webmaster', '1webmaster','webmaster@localhost.es', 'webmaster',0);
insert ignore into CRIP.users values
  (6, 'Bruce Lee', 'client','client2@localhost.es', 'client',2);
insert ignore into CRIP.users values
  (7, 'Evander Holyfield', 'client','client3@localhost.es', 'client',3);

create table if not exists CRIP.policy (
  id int primary key auto_increment,
  client int,
  name varchar(30),
  type  varchar(30),
  valid varchar(30)
) ;

insert ignore into CRIP.policy values
  (1, 3, 'Life', 'Personal', '2022');
insert ignore into CRIP.policy values
  (2, 3, 'Property','Business', '2022');
insert ignore into CRIP.policy values
  (3, 5, 'Life', 'Personal', '2025');
insert ignore into CRIP.policy values
  (4, 4, 'Car', 'Personal', '2022');
insert ignore into CRIP.policy values
  (5, 4, 'Yatch','Business', '2022');
insert ignore into CRIP.policy values
  (6, 6, 'Life', 'Personal', '2025');

  create table if not exists CRIP.disclosure (
    id int primary key auto_increment,
    client int,
    email varchar(30),
    token  varchar(30),
    valid varchar(30)
  ) ;

insert ignore into CRIP.disclosure values
  (1, 6, 'beneficiary1@domain.org', '6kuiyc6vdek0000000000', '17/08/2020');
insert ignore into CRIP.disclosure values
  (2, 7, 'beneficiary1@domain.org','23wruw8nb39c000000000', '24/08/2020');