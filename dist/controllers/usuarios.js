"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuarios = exports.getUsuarioById = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findAll();
    console.log(usuario);
    res.json({
        msg: 'get usuarios',
        usuario
    });
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario con el id ${id} no existe en la base`
            });
        }
        res.json({
            msg: 'get usuario',
            usuario
        });
    }
    catch (error) {
    }
});
exports.getUsuarioById = getUsuarioById;
const postUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(500).json({
                ok: false,
                msg: `Este email ya existe en la base d edatos`
            });
        }
        const usuario = yield usuario_1.default.create(body);
        return res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'hable con el administrador',
        });
    }
});
exports.postUsuarios = postUsuarios;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario)
            return res.status(400).json({ ok: false, msg: 'El usuario no existe en la base de datos' });
        yield usuario_1.default.update(Object.assign({}, body), { where: { idUsuario: id } });
        res.json({
            msg: 'put usuarios',
            id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Este correo ya existe en la base de datos '
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario)
            return res.status(400).json({ ok: false, msg: 'El usuario no existe en la base de datos' });
        const estado = usuario.getDataValue('estado');
        //eliminacion fisica
        //await usuario.destroy()
        //eliminacion logica
        //await usuario.update({estado: (estado === 1 ) ? 0:1 }, {where:{idUsuario: id}})
        yield usuario.update({ estado: false }, { where: { idUsuario: id } });
        res.json({
            ok: true,
            msg: `el usuario ${usuario.getDataValue('nombre')} ha sido eliminado`
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Error al eliminar'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map