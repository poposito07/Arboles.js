class Nodo {
    constructor(usuario) {
        this.usuario = usuario;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ArbolUsuarios {
    constructor() {
        this.raiz = null;
    }

    // Método para buscar por ID
    buscar(id) {
        return this._buscarPorId(this.raiz, id);
    }

    _buscarPorId(nodo, id) {
        if (nodo === null) {
            return null;
        }

        if (id === nodo.usuario.id) {
            return nodo.usuario;
        } else if (id < nodo.usuario.id) {
            return this._buscarPorId(nodo.izquierda, id);
        } else {
            return this._buscarPorId(nodo.derecha, id);
        }
    }

    // Método para insertar un usuario
    insertar(usuario) {
        this.raiz = this._insertarUsuario(this.raiz, usuario);
    }

    _insertarUsuario(nodo, usuario) {
        if (nodo === null) {
            return new Nodo(usuario);
        }

        if (usuario.id === nodo.usuario.id) {
            // No se permite la inserción de IDs duplicados
            return nodo;
        } else if (usuario.id < nodo.usuario.id) {
            nodo.izquierda = this._insertarUsuario(nodo.izquierda, usuario);
        } else {
            nodo.derecha = this._insertarUsuario(nodo.derecha, usuario);
        }

        return nodo;
    }

    // Método para eliminar por ID
    eliminar(id) {
        this.raiz = this._eliminarPorId(this.raiz, id);
    }

    _eliminarPorId(nodo, id) {
        if (nodo === null) {
            return null;
        }

        if (id < nodo.usuario.id) {
            nodo.izquierda = this._eliminarPorId(nodo.izquierda, id);
        } else if (id > nodo.usuario.id) {
            nodo.derecha = this._eliminarPorId(nodo.derecha, id);
        } else {
            // Nodo con el ID a eliminar encontrado
            if (nodo.izquierda === null) {
                return nodo.derecha;
            } else if (nodo.derecha === null) {
                return nodo.izquierda;
            }

            // Nodo con dos hijos, obtener el sucesor inorden (el más pequeño en el subárbol derecho)
            nodo.usuario = this._encontrarMenorValor(nodo.derecha);
            nodo.derecha = this._eliminarPorId(nodo.derecha, nodo.usuario.id);
        }

        return nodo;
    }

    _encontrarMenorValor(nodo) {
        while (nodo.izquierda !== null) {
            nodo = nodo.izquierda;
        }
        return nodo.usuario;
    }

    // Método para actualizar por ID
    actualizar(id, nuevoUsuario) {
        const usuarioExistente = this.buscar(id);
        if (usuarioExistente) {
            this.eliminar(id);
            this.insertar(nuevoUsuario);
        }
    }
}

// Ejemplo de uso
const arbol = new ArbolUsuarios();

const usuario1 = {
    id: 1,
    usuario: "Usuario1",
    password: "pass1",
    nombre: "Nombre1",
    apellidos: "Apellido1"
};

const usuario2 = {
    id: 2,
    usuario: "Usuario2",
    password: "pass2",
    nombre: "Nombre2",
    apellidos: "Apellido2"
};

arbol.insertar(usuario1);
arbol.insertar(usuario2);

console.log(arbol.buscar(1)); // Buscar por ID
arbol.eliminar(1); // Eliminar por ID
console.log(arbol.buscar(2)); // Intentar buscar después de la eliminación
