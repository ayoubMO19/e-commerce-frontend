// Privacy policy page
export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Política de Privacidad
        </h1>
        <p className="text-sm text-zinc-500">
          Última actualización: {new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="prose prose-sm max-w-none space-y-8 text-zinc-700">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            1. Responsable del tratamiento
          </h2>
          <p>
            El responsable del tratamiento de los datos personales recogidos a través de este
            sitio web es [NOMBRE O RAZÓN SOCIAL], con NIF [NIF], y dirección de contacto en
            [DIRECCIÓN]. Para cualquier cuestión relacionada con esta política puedes escribir a
            ayoubmorghiouhda@gmail.com.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            2. Información que recopilamos
          </h2>
          <p>
            En MOTORPART recopilamos la información que nos proporcionas directamente
            cuando te registras en nuestra plataforma, realizas una compra,
            o te pones en contacto con nosotros.
            Esta información incluye tu nombre, dirección de correo
            electrónico, dirección postal de envío, número de teléfono y, en el momento del pago,
            los datos necesarios para procesar la transacción a través de nuestra pasarela de pago.
          </p>
          <p>
            También recopilamos automáticamente cierta información cuando
            visitas nuestro sitio web, como tu dirección IP, tipo de navegador,
            páginas visitadas, tiempo de permanencia y patrones de navegación.
            Esta información nos ayuda a mejorar la experiencia del usuario y
            optimizar nuestro sitio web.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            3. Uso de la información
          </h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Procesar y gestionar tus pedidos y transacciones</li>
            <li>
              Enviarte confirmaciones de pedido, actualizaciones y notificaciones
              relacionadas con tus compras
            </li>
            <li>
              Responder a tus consultas, solicitudes y proporcionar servicio al
              cliente
            </li>
            <li>
              Mejorar y personalizar tu experiencia en nuestro sitio web
            </li>
            <li>
              Detectar y prevenir fraudes, abusos y actividades ilegales
            </li>
            <li>
              Cumplir con obligaciones legales y resolver disputas
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            4. Cookies y tecnologías similares
          </h2>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar la
            funcionalidad de nuestro sitio web, mantener tu sesión iniciada y tu
            carrito de compra, y analizar el tráfico del sitio. Las cookies son pequeños archivos de
            texto que se almacenan en tu dispositivo cuando visitas nuestro
            sitio.
          </p>
          <p>
            Puedes controlar y gestionar las cookies a través de la
            configuración de tu navegador. Ten en cuenta que deshabilitar
            ciertas cookies puede afectar la funcionalidad de nuestro sitio
            web, incluido el proceso de compra.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            5. Compartir información
          </h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros con fines comerciales.
            Compartimos tu información únicamente en las siguientes circunstancias:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Con Stripe, nuestra pasarela de pago, para procesar de forma segura las transacciones.
              MOTORPART no almacena en ningún momento los datos completos de tu tarjeta
            </li>
            <li>
              Con empresas de transporte y logística necesarias para hacer llegar tu pedido,
              incluyendo el envío de piezas desde proveedores en Francia cuando corresponda
            </li>
            <li>
              Cuando sea necesario para cumplir con la ley, órdenes judiciales
              o procesos legales
            </li>
            <li>
              Para proteger nuestros derechos, propiedad o seguridad, así como
              la de nuestros usuarios
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            6. Seguridad de los datos
          </h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas
            apropiadas para proteger tu información personal contra acceso no
            autorizado, alteración, divulgación o destrucción. El procesamiento de pagos se
            realiza íntegramente a través de Stripe, cifrado mediante TLS, y en ningún momento
            los datos de tu tarjeta pasan por ni se almacenan en nuestros servidores.
          </p>
          <p>
            Aun así, ningún método de transmisión por Internet o
            almacenamiento electrónico es 100% seguro. Nos esforzamos por
            proteger tu información, pero no podemos garantizar su seguridad
            absoluta.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            7. Tus derechos
          </h2>
          <p>
            De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la LOPDGDD,
            tienes derecho a:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Acceder a tus datos personales y recibir una copia de la
              información que tenemos sobre ti
            </li>
            <li>
              Rectificar datos inexactos o incompletos
            </li>
            <li>
              Solicitar la eliminación de tus datos personales cuando ya no sean
              necesarios
            </li>
            <li>
              Oponerte al procesamiento de tus datos personales en ciertas
              circunstancias
            </li>
            <li>
              Solicitar la limitación del procesamiento de tus datos
            </li>
            <li>
              Portabilidad de datos: recibir tus datos en un formato
              estructurado y comúnmente usado
            </li>
            <li>
              Retirar tu consentimiento en cualquier momento cuando el
              procesamiento se base en consentimiento
            </li>
          </ul>
          <p>
            Para ejercer estos derechos, puedes contactarnos a través de
            ayoubmorghiouhda@gmail.com. También tienes derecho a presentar una reclamación ante
            la Agencia Española de Protección de Datos (AEPD) si consideras que no hemos
            tratado tus datos correctamente.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            8. Retención de datos
          </h2>
          <p>
            Conservamos tu información personal durante el tiempo necesario para
            cumplir con los fines descritos en esta política. Los datos de
            transacciones se conservan según los plazos que exige la normativa fiscal y
            contable española.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            9. Menores de edad
          </h2>
          <p>
            Nuestro sitio web no está dirigido a menores de 18 años. No
            recopilamos intencionalmente información personal de menores. Si
            descubrimos que hemos recopilado información de un menor sin el
            consentimiento de sus padres o tutores, tomaremos medidas para eliminar esa
            información de nuestros sistemas.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            10. Cambios en esta política
          </h2>
          <p>
            Podemos actualizar esta política de privacidad ocasionalmente para
            reflejar cambios en nuestras prácticas o por razones legales,
            operativas o regulatorias. Te notificaremos sobre cambios
            significativos publicando la nueva política en esta página y
            actualizando la fecha de "Última actualización".
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            11. Contacto
          </h2>
          <p>
            Si tienes preguntas, inquietudes o solicitudes relacionadas con
            esta política de privacidad o el tratamiento de tus datos
            personales, puedes contactarnos en:
          </p>
          <p className="font-medium text-zinc-900">
            Email: ayoubmorghiouhda@gmail.com
            <br />
            Teléfono: +34 631 515 999
          </p>
        </section>
      </div>
    </div>
  );
}