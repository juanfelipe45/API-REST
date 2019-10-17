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

insert into Imagen values (null, 1, "Bulldog", "Es una raza canina originaria del Reino Unido.", 'bulldog.jpg');
insert into Imagen values (null, 1, "Doberman", "Debe su nombre al alemán Karl Friedrich Louis Dobermann.", 'Doberman.jpg');
insert into Imagen values (null, 2, "Persa", "El Persa es una raza de gato caracterizada por tener una cara ancha y plana y un gran abundante pelaje de variados colores.", 'Persa.jpg');
insert into Imagen values (null, 2, "Scottish-fold", "El Fold escocés es una raza de gato originaria de Escocia, Reino Unido, de una estructura ósea mediana y una gran musculatura.", 'Scottish-fold.jpg');

select * from Album;
select * from Imagen;
select imagen from Imagen where id=1;
select imagen from Imagen where id = 1;