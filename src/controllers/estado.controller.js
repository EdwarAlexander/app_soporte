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
    if (nombre == null|| usuario==null) {
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
export {
    getEstado,
    postEstado
}