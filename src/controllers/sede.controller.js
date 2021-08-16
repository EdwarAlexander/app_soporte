import { getConnection, sql } from '../database/connection';
import { statusErrorInternal, statusErrorValidation, statusSave, statusToList } from '../answer/answer.format';

const getSede = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('exec spSedeAll');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const postSede = async (req, res) => {
    const { nombre, usuario } = req.body;
    if (nombre == null || usuario == null) {
        const answerValidation = statusErrorValidation('Debe enviar los campos nombre, usuario');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('usuario', sql.VarChar, usuario)
            .query('exec spSedeSave @nombre,@usuario');
        const answer = statusSave('Sede Registrada');
        res.status(201).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const putSede = async (req, res) => {
    const { id, nombre, estado } = req.body;
    if (id == null || nombre == null || estado == null) {
        const answerValidation = statusErrorValidation('Debe enviar los campos id,nombre,estado');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('estado', sql.VarChar, estado)
            .query('exec spSedeUpdate @id,@nombre,@estado');
        const answer = statusSave('Sede Actualizada');
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const getSedeById = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        const answerValidation = statusErrorValidation('Debe enviar el parametro id');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('exec spSedeSearch @id');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

export {
    getSede,
    postSede,
    putSede,
    getSedeById
}