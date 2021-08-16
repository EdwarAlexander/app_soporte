import { getConnection, sql } from '../database/connection';
import { statusErrorInternal, statusErrorValidation, statusSave, statusToList } from '../answer/answer.format';

const getEstado = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('exec spEstadoAll');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const postEstado = async (req, res) => {
    const { nombre, usuario } = req.body;
    if (nombre == null || usuario == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo nombre o usuario');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('usuario', sql.VarChar, usuario)
            .query('exec spEstadoSave @nombre, @usuario');
        const answer = statusSave('Estado Registrado');
        res.status(201).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const putEstado = async (req, res) => {
    const { id, nombre, estado } = req.body;
    if (id == null || nombre == null || estado == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo id, nombre y estado');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('estado', sql.Bit, estado)
            .query('exec spEstado @id,@nombre,@estado');
        const answer = statusSave('Estado Actualizado');
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const getEstadoById = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        const answerValidation = statusErrorValidation('Debe enviar el parametro id');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('exec spEstadoSearch @id');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}
export {
    getEstado,
    postEstado,
    putEstado,
    getEstadoById
}