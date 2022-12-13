const db = require("../models/biblioteca/index");
const { DB } = require("../database/config");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config.js");


const Editorial = require("../models/editorial.model");

const LibroEditorial = require("../models/libro_editorial.model");
const { libroAutor, libroEjemplar, estante, transaccion } = require("../models/biblioteca/index");
const AudiLog = db.audilog;
const Autor = db.autor;
const Coleccion = db.coleccion;
const Edicion = db.edicion;
const Estante = db.estante;
const Idioma = db.idioma;
const LibroAutor = db.libroAutor;
const LibroEjemplar = db.libroEjemplar;
const LibroEditoria = db.libroEditorial;
const Libro = db.libro;
const Permiso = db.permiso;
const RolPermiso = db.rolPermiso;
const RolUsuario = db.rolUsuario;
const Rol = db.rol;
const Transaccion = db.transaccion;
const Usuario = db.usuario;

exports.initial = async () => {
    try {
        await Rol.create({
            idRol: 1,
            nombreRol: "admin"
        });
        await Rol.create({
            idRol: 2,
            nombreRol: "rol2"
        });

        await Permiso.bulkCreate([
        {
            "nombrePermiso": "Colección"
        }, {
            "nombrePermiso": "Edición"
        }, {

            "nombrePermiso": "Idioma"
        }, {

            "nombrePermiso": "Editorial"
        }, {

            "nombrePermiso": "Autor"
        }, {

            "nombrePermiso": "Libro"
        }, {

            "nombrePermiso": "Ejemplar"
        }, {

            "nombrePermiso": "Estante"
        }, {

            "nombrePermiso": "Rol"
        }, {

            "nombrePermiso": "Usuario"
        }, {

            "nombrePermiso": "AudiLog"
        }, {

            "nombrePermiso": "Transacciones"
        }, {

            "nombrePermiso": "BuscarLibros"
        }]);
        await Usuario.create({
            usuario: "root",
            password: bcrypt.hashSync(config.secret, 8),
            idRol: 1,
        });
        await Usuario.create({
            usuario: "root2",
            password: bcrypt.hashSync(config.secret, 8),
            idRol: 2,
        });

        await Estante.create({
            "codigoEstante": "e-12",
            "codigoInventario": "INV. F-03193"
        });

        await RolPermiso.bulkCreate([{
            idRol: "1",
            idPermiso: "1"
        },{
            idRol: "1",
            idPermiso: "2"
        },{
            idRol: "1",
            idPermiso: "3"
        },{
            idRol: "1",
            idPermiso: "4"
        },{
            idRol: "1",
            idPermiso: "5"
        },
        {
            idRol: "1",
            idPermiso: "6"
        },{
            idRol: "1",
            idPermiso: "7"
        },{
            idRol: "1",
            idPermiso: "8"
        },{
            idRol: "1",
            idPermiso: "9"
        },{
            idRol: "1",
            idPermiso: "10"
        },{
            idRol: "1",
            idPermiso: "11"
        },{
            idRol: "1",
            idPermiso: "12"
        },{
            idRol: "2",
            idPermiso: "1"
        },{
            idRol: "2",
            idPermiso: "2"
        },{
            idRol: "2",
            idPermiso: "3"
        },{
            idRol: "2",
            idPermiso: "4"
        }]);


        await Coleccion.create({
            "idColeccion": 1,
            "nombreColeccion": "General"
        });
        await Editorial.create({
            "idEditorial": 1,
            "nombreEditorial": "editorial1"
        });
        await Editorial.create({
            "idEditorial": 2,
            "nombreEditorial": "editorial2"
        });
        await Edicion.create({
            "idEdicion": 1,
            "nombreEdicion": "Edicion1"
        });
        await Autor.create({
            "nombreAutor": "erick",
            "claveAutor": "121"
        })
        await Autor.create({
            "nombreAutor": "Armando",
            "claveAutor": "13"
        })

        await Idioma.create({
            "idIdioma": 1,
            "nombreIdioma": "español"
        });
        await Libro.create({
            "idLibro": 1,
            "tituloLibro": "librotote",
            "idColeccion": 1,
            "idEdicion": 1,
            "ISBN13": "asd123",
            "ISBN16": "",
            "año": 1998,
            "idIdioma": 1
        });
        await Libro.create({
            "idLibro": 2,
            "tituloLibro": "librotote2",
            "idColeccion": 1,
            "idEdicion": 1,
            "ISBN13": "asd1232",
            "ISBN16": "",
            "año": 2000,
            "idIdioma": 1
        });
        await Libro.create({
            "idLibro": 3,
            "tituloLibro": "librotote3",
            "idColeccion": 1,
            "idEdicion": 1,
            "ISBN13": "asd1232",
            "ISBN16": "",
            "año": 2000,
            "idIdioma": 1
        });
        await Libro.create({
            "idLibro": 4,
            "tituloLibro": "librotote4",
            "idColeccion": 1,
            "idEdicion": 1,
            "ISBN13": "asd1232",
            "ISBN16": "",
            "año": 2000,
            "idIdioma": 1
        });
        await LibroEditorial.bulkCreate([{
            "id": 1,
            "idLibro": 1,
            "idEditorial": 1
        }, {
            "id": 2,
            "idLibro": 2,
            "idEditorial": 2
        }, {
            "id": 3,
            "idLibro": 3,
            "idEditorial": 2
        }, {
            "id": 4,
            "idLibro": 4,
            "idEditorial": 1
        }])

        await libroAutor.bulkCreate([{
            "id": 1,
            "idLibro": 1,
            "idAutor": 1,
        }, {
            "id": 2,
            "idLibro": 2,
            "idAutor": 1,
        }, {
            "id": 3,
            "idLibro": 3,
            "idAutor": 2,
        }, {
            "id": 4,
            "idLibro": 4,
            "idAutor": 2,
        }, {
            "id": 5,
            "idLibro": 1,
            "idAutor": 2,
        }]);

        await libroEjemplar.create({
            "idLibroEjemplar": 1,
            "idLibro": 1,
            "estado": "Disponible",
            "codigoBarras": "codigoBarrassss",
            "idEstante": 1,
            "idUsuario": 1,
            "observaciones": "observaciones",
            "repisa": 1,
            "ladoEstante": 'B',
            "asignaturaTopografica": "asignaturaTopografica",
            "valorDolares": 20.0
        });
        await libroEjemplar.create({
            "idLibroEjemplar": 2,
            "idLibro": 2,
            "estado": "Disponible",
            "codigoBarras": "codigoBarrassss",
            "idEstante": 1,
            "idUsuario": 1,
            "observaciones": "observaciones",
            "repisa": 1,
            "ladoEstante": 'A',
            "asignaturaTopografica": "asignaturaTopografica",
            "valorDolares": 20.0
        });

        await Transaccion.bulkCreate([
            {
                "idTransaccion": 1,
                "nombreTransaccion": "Crear"
            },
            {
                "idTransaccion": 2,
                "nombreTransaccion": "Actualizar"
            },
            {
                "idTransaccion": 3,
                "nombreTransaccion": "Borrar"
            },
        ]);

        await AudiLog.create({
            "idAudilog": 1,
            "descripcion": "prueba de audilog",
            "fecha": "2022-12-12",
            "idUsuario": 1,
            "idTransaccion": 1
        });

    } catch (error) {
        console.log(error);
    }
};
