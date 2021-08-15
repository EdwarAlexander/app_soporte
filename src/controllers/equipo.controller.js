import { getConnection, sql } from '../database/connection';
import { statusErrorInternal, statusErrorValidation, statusSave, statusToList } from '../answer/answer.format';

const getEquipo = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('exec spEquipoAll');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const postEquipo = async (req, res) => {
    const { nombre, usuario } = req.body;
    if (nombre == null || usuario == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo nombre para el registro');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('usuario', sql.VarChar, usuario)
            .query('exec spEquipoSave @nombre,@usuario');
        const answer = statusSave('Equipo Registrado');
        res.status(201).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const putEquipo = async (req, res) => {
    const { id, nombre, estado } = req.body;
    if (id == null || nombre == null || estado == null) {
        const answerValidation = statusErrorValidation('Debe enviar los campos id,nombre,estado para la actualización');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('estado', sql.Bit, estado)
            .query('exec spEquipoUpdate @id,@nombre,@estado');
        const answer = statusSave('Equipo Actualizado');
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const getEquipoById = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo id');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('exec spEquipoSearch @id');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

export {
    getEquipo,
    postEquipo,
    putEquipo,
    getEquipoById
}