import { getConnection, sql } from '../database/connection';
import { statusErrorInternal, statusErrorValidation, statusSave, statusToList } from '../answer/answer.format';

const getNivel = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('exec spNivelAll');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const postNivel = async (req, res) => {
    const { nombre, usuario } = req.body;
    if (nombre == null || usuario == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo nombre y usuario para el registro');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('usuario', sql.VarChar, usuario)
            .query('exec spNivelSave @nombre, @usuario');
        const answer = statusSave('Nivel Registrado');
        res.status(201).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const putNivel = async (req, res) => {
    const { id, nombre, estado } = req.body;
    if (id == null || nombre == null || estado == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo id, nombre, estado para la Actualización');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('estado', sql.VarChar, estado)
            .query('exec spNivel @id,@nombre,@estado');
        const answer = statusSave('Nivel Actualizado');
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const getNivelById = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        const answerValidation = statusErrorValidation('Debe enviar el campo id');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('exec spNivelSearch @id');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

export {
    getNivel,
    postNivel,
    putNivel,
    getNivelById
}