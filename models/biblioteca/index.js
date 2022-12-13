const usuario = require('../usuario.model');
const audilog = require('../audilog.model');
const autor = require('../autor.model');
const coleccion = require('../coleccion.model');
const edicion = require('../edicion.model');
const editorial = require('../editorial.model');
const estante = require('../estante.model');
const idioma = require('../idioma.model');
const libroAutor = require('../libro_autor.model');
const libroEditorial = require('../libro_editorial.model');
const libroEjemplar = require('../libro_ejemplar.model');
const libro = require('../libro.model');
const permiso = require('../permiso.model');
const rolPermiso = require('../rol_permiso.model');
const rol = require('../rol.model');
const transaccion = require('../transaccion.model');

// Relacion Libro

idioma.hasMany(libro, {
    foreignKey: 'idIdioma'
});
coleccion.hasMany(libro, {
    foreignKey: 'idColeccion'
});
edicion.hasMany(libro, {
    foreignKey: 'idEdicion'
});

//Relacion Libro -- Libro Ejemplar
libro.hasMany(libroEjemplar, {
    foreignKey: 'idLibro'
});

libroEjemplar.belongsTo(libro, {
    foreignKey: 'idLibro'
});

//Relacion Libro ejemplar -- Usuario
usuario.hasMany(libroEjemplar, {
    foreignKey: 'idUsuario'
});

//Relacion Libro ejemplar -- Estante
estante.hasMany(libroEjemplar, {
    foreignKey: 'idEstante'
});

libroEjemplar.belongsTo(estante, {
    foreignKey: 'idEstante'
})

libro.belongsTo(idioma, {
    foreignKey: 'idIdioma'
});
libro.belongsTo(coleccion, {
    foreignKey: 'idColeccion'
});
libro.belongsTo(edicion, {
    foreignKey: 'idEdicion'
});

editorial.belongsToMany(libro, { 
    through: libroEditorial,
    foreignKey: "idLibro",
    otherKey: "idEditorial"
 });
libro.belongsToMany(editorial, {
    through: libroEditorial,
    foreignKey: "idLibro",
    otherKey: "idEditorial"
});

autor.belongsToMany(libro, { 
    through: libroAutor,
    foreignKey: "idLibro",
    otherKey: "idAutor"
 });

libro.belongsToMany(autor, {
    through: libroAutor,
    foreignKey: "idLibro",
    otherKey: "idAutor"
});


transaccion.hasMany(audilog, {
    foreignKey: 'idTransaccion'
});

audilog.belongsTo(transaccion, {
    foreignKey: 'idTransaccion'
});

usuario.hasMany(audilog, {
    foreignKey: 'idUsuario'
});

audilog.belongsTo(usuario, {
    foreignKey: 'idUsuario'
});


rol.hasMany(usuario, {
    foreignKey: { name: 'idRol', allowNull: false }
});

usuario.belongsTo(rol, {
    foreignKey: { name: 'idRol', allowNull: false }
});

permiso.belongsToMany(rol, {
    through: rolPermiso,
    foreignKey: "idRol",
    otherKey: "idPermiso"
  });
  rol.belongsToMany(permiso, {
    through: rolPermiso,
    foreignKey: "idRol",
    otherKey: "idPermiso"
  });


const db = {
    usuario,
    audilog,
    autor,
    coleccion,
    edicion,
    editorial,
    estante,
    idioma,
    libroAutor,
    libroEditorial,
    libroEjemplar,
    libro,
    permiso,
    rolPermiso,
    rol,
    transaccion,
};


module.exports = db;