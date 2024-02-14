// Importamos los módulos necesarios
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT;

// Creamos un servidor HTTP
const server = createServer((req, res) => {
    // Cuando se recibe una solicitud, respondemos con un estado 200 y un mensaje
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Chat en tiempo real!\n");
});
// Inicializamos una nueva instancia de socket.io utilizando el servidor HTTP
const io = new Server(server, {
    cors: {
        // CUANDO SUBAMOS EL SERVER CAMBIAR VALOR DE 'origin' A '*'
        // DE ESTE MODO ACEPTA CUALQUIER URL POR LA QUE SALGA
        // origin; "*",
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// Cuando un cliente se conecta al servidor...
io.on("connection", (socket) => {
    console.log("Usuario conectado!");
    // Cuando ese cliente envía un mensaje de chat...
    socket.on("Mensaje de chat", (msg) => {
        // Emitimos ese mensaje a todos los clientes conectados
        io.emit("Mensaje de chat", msg);
        console.log("Mensaje de chat: " + msg);
    });
    // Cuando ese cliente se desconecta...
    socket.on("Desconectado!", () => {
        console.log("Usuario desconectado!");
    });
});
// El servidor comienza a escuchar en el puerto 3000 (MODO LOCAL)
server.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
// USAMOS ESTE ESCUCHADOR DEL SERVIDOR PARA MODO ONLINE
// server.listen(PORT, () => {
//     console.log('Servidor corriendo en http://localhost:3000'); });
export default { server, io };
