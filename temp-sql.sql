create database narentemp with connection limit=-1;

create user narentmp with password '123';

grant all privileges on database narentemp to narentmp;
