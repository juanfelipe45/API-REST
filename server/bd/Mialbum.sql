create database if not exists Mialbum ;
use Mialbum;

create table Album(
id int not null auto_increment primary key,
nombre varchar(45)
);

create table Imagen(
id int not null auto_increment primary key,
album int not null,
nombre varchar(45),
descripcion varchar(400),
imagen varchar(400),
foreign key (album) references Album(id) on delete cascade on update cascade 
);

insert into Album values (null, "perros");
insert into Album values (null, "gatos");

insert into Imagen values (null, 1, "Bulldog", "Es una raza canina originaria del Reino Unido. Su ancestro, conocido como el Antiguo Bulldog Inglés, fue utilizado en peleas de perros con toros hasta mediados del siglo XVII, aunque en 1835 esta práctica fue prohibida en Reino Unido.", null);
insert into Imagen values (null, 1, "Doberman", "Es una raza de perro relativamente reciente. Debe su nombre al alemán Karl Friedrich Louis Dobermann, quien, a finales del siglo XIX, emprende la tarea de crear una nueva raza de perro que sirviera eficazmente a su difícil trabajo como recaudador de impuestos.", null);
insert into Imagen values (null, 2, "Persa", "El Persa es una raza de gato caracterizada por tener una cara ancha y plana y un gran abundante pelaje de variados colores. Son considerados comúnmente como gatos aristocráticos.", null);

select * from Album;

update Imagen set imagen = '/home/needzaio/Desktop/API-REST/server/src/uploads/4132de7008e30b4a1cee4b882772c1b2' where id = '1';