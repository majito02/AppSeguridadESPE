import React, {
  RefObject,
  useState,
  useEffect,
  FC,
  useRef,
  PropsWithChildren,
  CSSProperties
} from "react";
import { Layout } from "../../components/layouts/Layout";
import {
  EnvelopeOpenIcon,
  MapIcon,
  PaperAirplaneIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Image from "next/image";

function useElementOnScreen(ref: RefObject<Element>, rootMargin = "0px") {
  const [isIntersecting, setIsIntersecting] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
}

const AnimateIn: FC<PropsWithChildren<{ from: CSSProperties; to: CSSProperties, time: String }>> = ({ from, to, time, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  const defaultStyles: CSSProperties = {
    transition: `${time} ease-in-out`
  };
  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
            ...defaultStyles,
            ...to
          }
          : {
            ...defaultStyles,
            ...from
          }
      }
    >
      {children}
    </div>
  );
};

const FadeIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
    time="1500ms">
    {children}
  </AnimateIn>
);

const FadeUp: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ opacity: 0, translate: "0 2rem" }}
    to={{ opacity: 1, translate: "none" }}
    time="1500ms"
  >
    {children}
  </AnimateIn>
);

const ScaleIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn from={{ scale: "0" }} to={{ scale: "1" }} time="1000ms">
    {children}
  </AnimateIn>
);

const MoveIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ transform: "translateY(300px)" }}
    to={{ transform: "translateY(0px)" }}
    time="1000ms">
    {children}
  </AnimateIn>
);

const MoveRight: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ transform: "translateX(300px)" }}
    to={{ transform: "translateX(0px)" }}
    time="1000ms">
    {children}
  </AnimateIn>
);

const Animate = {
  FadeIn,
  FadeUp,
  ScaleIn,
  MoveIn,
  MoveRight
};

const ContactPage = () => {
  return (
    <>
      <Layout title="Contacto">
        <div className="bg-white py-10">

          <div className="w-full h-full lg:h-screen flex flex-col lg:flex-row justify-center items-center relative overflow-hidden fade-in">
            <div className="w-full">
              <Image
                width={1920}
                height={1080}
                src="/SeguridadESPE/images/workteam.jpg"
                className="object-fill"
                alt="Persona 1" />
            </div>
            <div className="w-full h-full lg:w-1/2 lg:py-20 lg:absolute lg:top-0 lg:right-10">
              <div className="w-full h-full flex justify-center items-center">
                <div className="gray-faded shadow-lg rounded-lg p-4 lg:p-10">
                  <div className="fade-in">
                    <h1 className="second-title mb-4 text-3xl color-gray-light font-bold">
                      Hablemos de lo que necesitas y cómo te podemos ayudar
                    </h1>
                  </div>
                  <div id="contact-form">
                    <div className="flex flex-col justify-center items-center">
                      <p className="mb-6 text-color-primary-light">
                        Para enviarnos un mensaje directo, completa el formulario a continuación y nos pondremos en contacto contigo rápidamente.
                      </p>
                      <form className="w-full px-6">
                        <div className="flex gap-x-5 mb-6">
                          <div className="w-full md:w-1/2 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Nombres
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              id="grid-first-name"
                              type="text"
                              placeholder="Escriba su nombre"
                            />
                            <p className="text-red-500 text-xs italic">
                              {/* Por favor complete este campo. */}
                            </p>
                          </div>
                          <div className="w-full md:w-1/2">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-last-name"
                            >
                              Telefono
                            </label>
                            <input
                              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                              id="grid-last-name"
                              type="text"
                              placeholder="Escriba teléfono"
                            />
                          </div>
                        </div>
                        <div className="flex mb-6">
                          <div className="w-full">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Email
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-email"
                              type="email"
                              placeholder="example@mail.com"
                            />
                            <p className="text-gray-600 text-xs italic">
                              {/* Por favor complete este campo. */}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                          <div className="w-full">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Mensaje
                            </label>
                            <textarea
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-email"
                              placeholder="Nuevo mensaje..."
                            >
                            </textarea>
                            <p className="text-gray-600 text-xs italic">
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                          <button type="submit" className="button bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center">
                            <span className="flex">
                              Enviar
                              <PaperAirplaneIcon className="h-5 w-5 ml-1 text-color-white" />
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*       <section className="bg-color-lila py-10">
            <div className="container mb-8 px-10 lg:px-32">
              <p className="leading-relaxed mb-4 text-center">
                Si tienes alguna consulta o necesitas más información sobre la aplicación Seguridad ESPE, estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros.
              </p>
            </div>
            <Animate.FadeIn>
              <div className="w-full flex flex-col lg:flex-row justify-center container lg:px-32 lg:gap-12 gap-6">
                <div className="flex flex-col lg:w-1/3 items-center">
                  <div className="mb-4">
                    <MapIcon className="h-14 w-14 text-color-secundario" aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <p>
                      Director del proyecto
                      <br />
                      Ing. Luis Castillo, Mgtr.
                      <br />
                      Implementación de aplicaciones web y móvil para gestionar emergencias comunitarias en la provincia de Santo Domingo de los Tsáchilas
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:w-1/3 items-center">
                  <div className="mb-4">
                    <PhoneIcon className="h-14 w-14 text-color-secundario" aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <p>
                      Teléfono convencional
                      <br />
                      (02) 272-2246
                      <br />
                      ESPE sede Santo Domingo
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:w-1/3 items-center">
                  <div className="mb-4">
                    <EnvelopeOpenIcon className="h-14 w-14 text-color-secundario" aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <p>
                      Correo electrónico
                      <br />
                      lacastillo12@esp.edu.ec
                    </p>
                  </div>
                </div>
              </div>
            </Animate.FadeIn>
          </section> */}

          <div className="bg-color-lila py-10 w-full h-full">
            <div className="flex flex-col lg:flex-row w-full items-center px-10">
              <div className="w-full h-full lg:w-2/3">
                <Animate.FadeIn>
                  <div className="fade-in">
                    <h1 className="second-title mb-1 text-3xl color-gray-light font-bold">
                      También puedes visitarnos en nuestra sede
                    </h1>
                    <br />
                  </div>
                  <div className="flex justify-center text-black overflow-hidden" style={{ height: '100%' }}>
                    <iframe className="rounded-lg shadow-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14362.34376615065!2d-79.3174620878782!3d-0.41326645086554714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d53237044f39bb%3A0x24ed753bfe34c98b!2sUniversidad%20de%20las%20Fuerzas%20Armadas%20-%20ESPE%20-%20Santo%20Domingo!5e0!3m2!1sen!2sec!4v1688466546265!5m2!1sen!2sec"
                      width="1000" height="475" loading="lazy" ></iframe>
                  </div>
                </Animate.FadeIn>
                <div className="px-4 mt-8">
                  <p className="leading-relaxed mb-4 text-justify">
                    Si tienes alguna consulta o necesitas más información sobre la aplicación Seguridad ESPE, estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros.
                  </p>
                </div>                
              </div>
              <div className="w-full h-full lg:w-1/3">                
                <Animate.FadeIn>
                  <div className="flex flex-col justify-center px-2 lg:px-10 gap-6">
                    <div className="flex flex-col w-full items-center bg-white rounded-lg p-6 shadow">
                      <MapIcon className="h-14 w-14 text-color-secundario mb-4" aria-hidden="true" />
                      <div className="text-center">
                        <p className="text-color-secundario font-bold">Director del proyecto</p>
                        <p className="text-gray-700 text-sm">Ing. Luis Castillo, Mgtr.</p>
                        <p className="text-gray-700 text-sm">
                          Implementación de aplicaciones web y móvil para gestionar emergencias comunitarias en la provincia de Santo Domingo de los Tsáchilas
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full items-center bg-white rounded-lg p-6 shadow">
                      <PhoneIcon className="h-14 w-14 text-color-secundario mb-4" aria-hidden="true" />
                      <div className="text-center">
                        <p className="text-color-secundario font-bold">Teléfono convencional</p>
                        <p className="text-gray-700 text-sm">(02) 272-2246</p>
                        <p className="text-gray-700 text-sm">ESPE sede Santo Domingo</p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full items-center bg-white rounded-lg p-6 shadow">
                      <EnvelopeOpenIcon className="h-14 w-14 text-color-secundario mb-4" aria-hidden="true" />
                      <div className="text-center">
                        <p className="text-color-secundario font-bold">Correo electrónico</p>
                        <p className="text-gray-700 text-sm">lacastillo12@esp.edu.ec</p>
                      </div>
                    </div>
                  </div>
                </Animate.FadeIn>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    </>
  );
};

export default ContactPage;
