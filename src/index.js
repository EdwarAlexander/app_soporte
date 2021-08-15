import app from './app';

//obtenemos el puerto configurado en el archivo .env
app.listen(app.get('port'));

console.log("server runing port ", app.get("port"));