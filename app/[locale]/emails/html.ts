import { SERVER_LOCALES } from "../constants/server_constants";
import { ICartItemState } from "../hooks/useCart";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const getDateFormat = (date: Date, locale: typeof SERVER_LOCALES) => {
    const currentFormat = format(date, "'FECHA: 'EEEE, dd 'DE' MMMM 'DE' y HH:mm", {
        locale: es,
    });
    return currentFormat.toUpperCase();
}
type DeliveryShip = {
    country: string;
    city: string;
    neighborhood: string;
    address: string;
    apartment: string;
    postal_code: string;
};

type Contact = {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
};

export type PropsUserHtml = {
    deliveryMethods: string;
    deliveryPickup: string;
    deliveryShip: DeliveryShip;
    contact: Contact;
};

export const getHtml = (user: PropsUserHtml, items: ICartItemState[], locale: typeof SERVER_LOCALES) => {
    const date = getDateFormat(new Date, locale);
    const columns = ["Titulo", "Cantidad", "Precio Unitario", "Total"]
    const columnsResume = ["Subtotal", "Total"]
    const html = `
    <div class="">
        <div class="aHl"></div>
        <div id=":op" tabindex="-1"></div>
        <div id=":qf" class="ii gt"
            jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc3NjUwNTY1MzEzMTA3NDM2MCIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW11d; 4:WyIjbXNnLWY6MTc3NjUwNTY1MzEzMTA3NDM2MCIsbnVsbCxbXSxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbXSxbXSxbXV0.">
            <div id=":qg" class="a3s aiL ">
                <div class="adM">
    
                </div>
                <div>
                    <p>&nbsp;</p>
                    <p></p>
    
                    <table id="m_-5101347694983725079backgroundTable" border="0" width="100%" cellspacing="0"
                        cellpadding="0" bgcolor="#F2F2F2">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="0" width="550" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%">
                                                    <table border="0" width="550" cellspacing="0" cellpadding="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center">
                                                                    <div><a><img style="display:block;border:none;outline:none;text-decoration:none"
                                                                                src="https://i.ibb.co/nrfxj2h/rsz-3cosmetic-fotor-20230914172943.jpg"
                                                                                alt="" width="550" height="114" border="0"
                                                                                class="CToWUd" data-bit="iit"></a></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                    <p></p>
    
                    <table id="m_-5101347694983725079backgroundTable" border="0" width="100%" cellspacing="0"
                        cellpadding="0" bgcolor="#F2F2F2">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="0" width="550" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td style="padding:1em" bgcolor="#ede6ea" width="100%">
                                                    <table border="0" width="510" cellspacing="0" cellpadding="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:22px;padding:30px 30px 20px 30px"
                                                                    align="left" bgcolor="#ffffff">
                                                                    <strong>FECHA:</strong>
                                                                    ${date}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:22px;padding:0px 30px 0px 30px"
                                                                    align="left" bgcolor="#ffffff">
                                                                    <center><strong>Transacción Realizada con Éxito</strong>
                                                                    </center>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:16px;padding:20px 30px 20px 30px"
                                                                    align="left" bgcolor="#ffffff">
                                                                    <strong>Estimado/a:</strong>&nbsp;${`${user.contact.first_name} ${user.contact.last_name}`}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:16px;padding:0px 30px 20px 30px"
                                                                    align="left" bgcolor="#ffffff">¡Te damos la bienvenida y
                                                                    agradecemos tu compra en nuestra aplicación de productos
                                                                    coreanos! Nos complace que hayas confiado en nosotros
                                                                    para satisfacer tus necesidades de productos coreanos.
                                                                    Estamos comprometidos a brindarte una experiencia de
                                                                    compra excepcional. A continuación, te proporcionamos
                                                                    información detallada sobre tu transacción:</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:22px;padding:0px 30px 20px 30px"
                                                                    align="left" bgcolor="#ffffff">
                                                                    <h4><strong>Código de Activación</strong>:&nbsp;
                                                                        B1N9RTJ1</h4>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:22px;padding:0px 30px 20px 30px"
                                                                    align="left" bgcolor="#ffffff">
                                                                    <table style="border-collapse: collapse; width: 100%;">
                                                                        <thead>
                                                                            <tr>
                                                                            
                                                                            ${columns.map(column => `
                                                                            <th style="border: 1px solid #ddd; background-color: #f2f2f2; padding: 8px; text-align: left; font-size: 9px;">${column}</th>
                                                                            `).join('\n')}
                                                                            
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        ${items.map(item => `
                                                                    <tr>
                                                                        <td
                                                                            style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 9px;">
                                                                            ${item.title}</td>
                                                                        <td
                                                                            style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 9px;">
                                                                            ${item.quantity}</td>
                                                                        <td
                                                                            style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 9px;">
                                                                            $ ${(item.promoCost).toFixed(2)}</td>
                                                                        <td
                                                                            style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 9px;">
                                                                            $ ${(item.quantity * item.promoCost).toFixed(2)}</td>
                                                                    </tr>
                                                                        `).join('\n')}
                                    
                                                                        </tbody>
                                                                    </table>
    
                                                                    <table style="margin-top: 20px; width: auto; float: right;">
                                                                        <tbody>
                                                                            <tr style="border-bottom: 1px solid #ddd;">
                                                                                <td style="text-align: right; padding: 8px; font-size: 9px;" colspan="3">${columnsResume[0]}</td>
                                                                                <td style="text-align: left; padding: 8px; font-size: 9px;">$ ${items.reduce((acc, item) => (item.promoCost * item.quantity) + acc, 0).toFixed(2)}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="4" style="border-bottom: 1px solid #ddd;"></td>
                                                                            </tr>
                                                                            <tr style="border-bottom: 1px solid #ddd;">
                                                                                <td style="text-align: right; padding: 8px; font-size: 9px;" colspan="3">${columnsResume[1]}</td>
                                                                                <td style="text-align: left; padding: 8px; font-size: 9px;">$ ${items.reduce((acc, item) => (item.promoCost * item.quantity) + acc, 0).toFixed(2)}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:22px;padding:0px 30px 20px 30px"
                                                                    align="left" bgcolor="#ffffff">Una vez que se haya
                                                                    completado el proceso de pago, nos aseguraremos de que
                                                                    tus productos coreanos se envíen de manera rápida y
                                                                    segura a la dirección proporcionada</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family:Arial,sans-serif;color:#333333;font-size:12px;text-align:left;line-height:16px;padding:20px 30px 40px 30px"
                                                                    align="left" bgcolor="#ffffff">Gracias por utilizar
                                                                    nuestros servicios.<br> <br> Atentamente,<br>
                                                                    <strong>El Equipo de Make App</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                    <p></p>
    
                    <table id="m_-5101347694983725079backgroundTable" border="0" width="100%" cellspacing="0"
                        cellpadding="0" bgcolor="#F2F2F2">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="0" width="550" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%">
                                                    <table border="0" width="550" cellspacing="0" cellpadding="0"
                                                        align="center" bgcolor="#0F265C">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:20px;font-family:Arial,sans-serif;color:#ffffff;font-size:9px;text-align:center;line-height:10px"
                                                                    bgcolor="#0F265C"> Estamos aquí para ayudarte en cada
                                                                    paso del camino. Si tienes alguna pregunta o necesitas
                                                                    asistencia adicional, no dudes en comunicarte con
                                                                    nuestro equipo de atención al cliente.
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                    <p><u></u>
    
                    </p>
                    <table id="m_-5101347694983725079backgroundTable" border="0" width="100%" cellspacing="0"
                        cellpadding="0" bgcolor="#F2F2F2">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="0" width="550" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%">
                                                    <table border="0" width="550" cellspacing="0" cellpadding="0"
                                                        align="center" bgcolor="#F2F2F2">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" height="10">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding:10px;font-family:Arial,sans-serif;color:#67554f;font-size:9px;text-align:justify;line-height:10px"
                                                                    bgcolor="#f6f4f5">Este mensaje proporciona una
                                                                    descripción detallada de la transacción, incluyendo los
                                                                    productos comprados, el método de pago y el proceso de
                                                                    entrega. También enfatiza la disponibilidad del equipo
                                                                    de atención al cliente para cualquier pregunta o
                                                                    asistencia que pueda necesitar el cliente.
                                                                    <br /><br />
                                                                    <strong>Proceso
                                                                        de Entrega:&nbsp;</strong>Una vez que se haya
                                                                    completado el proceso de pago, nuestro equipo se
                                                                    encargará de preparar y enviar tus productos coreanos de
                                                                    manera rápida y segura a la dirección que has
                                                                    proporcionado. Te proporcionaremos un número de
                                                                    seguimiento para que puedas rastrear el estado de tu
                                                                    envío y estar al tanto de la fecha estimada de
                                                                    entrega.
                                                                    <strong>Atención al Cliente:&nbsp;</strong>Nuestro
                                                                    equipo de atención al cliente está a tu disposición para
                                                                    brindarte asistencia en cualquier momento. Si tienes
                                                                    alguna pregunta, inquietud o necesitas ayuda adicional,
                                                                    no dudes en ponerte en contacto con nosotros. Tu
                                                                    satisfacción es nuestra prioridad número uno.
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td width="100%" height="10">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `;
    return html
}