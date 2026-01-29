import { Phone, Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Contacto
        </h1>
        <p className="text-base text-gray-500 sm:text-lg">
          Estamos aquí para ayudarte. Ponte en contacto con nosotros a través
          de cualquiera de estos medios.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Teléfono */}
        <a
          href="tel:+34631515999"
          className="group flex flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:border-gray-900 hover:shadow-md"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-gray-900">
            <Phone className="h-8 w-8 text-gray-600 transition group-hover:text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
            <p className="text-base font-semibold text-gray-900">
              +34 631 515 999
            </p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:ayoubmorghiouhda@gmail.com"
          className="group flex flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:border-gray-900 hover:shadow-md"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-gray-900">
            <Mail className="h-8 w-8 text-gray-600 transition group-hover:text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Correo</h3>
            <p className="text-sm font-semibold text-gray-900 break-all">
              ayoubmorghiouhda@gmail.com
            </p>
          </div>
        </a>
      </div>

      {/* Redes sociales */}
      <section className="space-y-6">
        <h2 className="text-center text-lg font-semibold text-gray-900">
          Síguenos en redes sociales
        </h2>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/ayoub-morghi-ouhda/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/ayoubMO19"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </section>
    </div>
  );
}
