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

    insertar(usuario) {
        this.raiz = this._insertarUsuario(this.raiz, usuario);
    }

    _insertarUsuario(nodo, usuario) {
        if (nodo === null) {
            return new Nodo(usuario);
        }

        if (usuario.id === nodo.usuario.id) {
            return nodo;
        } else if (usuario.id < nodo.usuario.id) {
            nodo.izquierda = this._insertarUsuario(nodo.izquierda, usuario);
        } else {
            nodo.derecha = this._insertarUsuario(nodo.derecha, usuario);
        }

        return nodo;
    }

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


    actualizar(id, nuevoUsuario) {
        const usuarioExistente = this.buscar(id);
        if (usuarioExistente) {
            this.eliminar(id);
            this.insertar(nuevoUsuario);
        }
    }
}


const arbol = new ArbolUsuarios();

const usuario1 = {
    id: 1,
    usuario: "231183",
    password: "gab231183",
    nombre: "Angel",
    apellidos: "Gabriel"
};

const usuario2 = {
    id: 2,
    usuario: "202020",
    password: "gab2020",
    nombre: "Samuel",
    apellidos: "Morales"
};

arbol.insertar(usuario1);
arbol.insertar(usuario2);

console.log(arbol.buscar(1));
arbol.eliminar();
console.log(arbol.buscar(2));
