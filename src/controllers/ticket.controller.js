import { getConnection, sql } from '../database/connection';
import { statusErrorInternal, statusErrorValidation, statusSave, statusToList } from '../answer/answer.format';
import {sendEmail, sendMail} from '../util/correo';

const getTicket = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('exec spTicketAll');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const postTicket = async (req, res) => {
    const { fecha, ipequipo, idequipo, titulo, descripcion, idnivel, idsoporte, usuario, idestado } = req.body;
    if (fecha == null || ipequipo == null || idequipo == null || titulo == null || descripcion == null || idnivel == null || idsoporte == null || usuario == null || idestado == null) {
        const answerValidation = statusErrorValidation('Debe enviar los campos necesarios para el registro del ticket');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('fecha', sql.Date, fecha)
            .input('ipequipo', sql.VarChar, ipequipo)
            .input('idequipo', sql.Int, idequipo)
            .input('titulo', sql.VarChar, titulo)
            .input('descripcion', sql.VarChar, descripcion)
            .input('idnivel', sql.Int, idnivel)
            .input('idsoporte', sql.Int, idsoporte)
            .input('usuario', sql.VarChar, usuario)
            .input('idestado', sql.Int, idestado)
            .query('exec spTicketSave @fecha,@ipequipo,@idequipo,@titulo,@descripcion,@idnivel,@idsoporte,@usuario,@idestado');
        const answer = statusSave('Ticket Registrado');

        const pruebamail= sendMail('edwar.moran@gmail.com','este mensaje es de prueba');
        console.log(pruebamail);
        
        res.status(201).json(answer);
    } catch (error) {
        console.log(error);
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const getTicketById = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        const answerValidation = statusErrorValidation('Debe enviar el parametro id');
        return res.status(401).json(answerValidation);
    }
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('exec spTicketSearch @id');
        const answer = statusToList(result.recordset);
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

const putTicketDeveloper = async (req, res) => {
    const { id, fechacierre, solucion, notasolucion, idestado } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('fechacierre', sql.Date, fechacierre)
            .input('solucion', sql.VarChar, solucion)
            .input('notasolucion', sql.VarChar, notasolucion)
            .input('idestado', sql.Int, idestado)
            .query('exec spTicketUpdateDeveloper @id,@fechacierre,@solucion,@notasolucion,@idestado');
        const answer = statusSave('Ticket Actualizado');
        res.status(200).json(answer);
    } catch (error) {
        const answerError = statusErrorInternal(error);
        res.status(500).json(answerError);
    }
}

export {
    getTicket,
    postTicket,
    getTicketById,
    putTicketDeveloper
}
