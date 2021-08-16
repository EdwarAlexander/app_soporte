import { getConnection, sql } from '../database/connection';
import { statusErrorInternal, statusErrorValidation, statusSave, statusToList } from '../answer/answer.format';

const getSoporte = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('exec spSoporteAll');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const postSoporte = async (req, res) => {
    const { nombre, usuario, telefono } = req.body;
    if (nombre == null || usuario == null || telefono == null) {
        const answerValidation = statusErrorValidation('Debe enviar los campos nombre,usuario,telefono');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('usuario', sql.VarChar, usuario)
            .input('telefono', sql.VarChar, telefono)
            .query('exec spSoporteSave @nombre,@usuario,@telefono');
        const answer = statusSave('Soporte Registrado');
        res.status(201).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const putSoporte = async (req, res) => {
    const { id, nombre, telefono, estado } = req.body;
    if (id == null || nombre == null || telefono == null || estado == null) {
        const answerValidation = statusErrorValidation('Debe enviar los campos id,nombre,telefono,estado');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('estado', sql.Bit, estado)
            .query('exec spSoporteUpdate @id,@nombre,@telefono,@estado');
        const answer = statusSave('Soporte Actualizado');
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const getSoporteById = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        const answerValidation = statusErrorValidation('Debes enviar el parametro id');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('exec spSoporteSearch @id');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}
export {
    getSoporte,
    postSoporte,
    putSoporte,
    getSoporteById
}