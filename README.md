# psico-sasha
domotica real time
Proyecto de conexion con nodejs y arduino

- librerias johnny-five <----- para el manejo de arduino
- socketIO <---- para que los cambios de estado se reflejen automaticamente a todos los usuarios conectados (real-time).
- boostrap-toggle <---- (cdn) son los botones deslizables

La logica es facil de entender:
-levanto un server con express
-del lado del servidor inicio las librerias
-del lado del usuario genero los eventos de los botones y los envio al server con socketIO
-el server procesa los cambios, johnny-five se encarga de enviar eventos a arduino 
-socketIO recibo el evento de parte del usuario y genera un nuevo evento el cual informa al resto de los usuarios los nuevos cambios
-los usuarios reciben el nuevo evento de socketIO y a traves de Jquery actualiza los toggle-buttons

