import React, { FC, PropsWithChildren } from "react";
import { Layout } from "../../components/layouts/Layout";
import { EnvelopeIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const EquipoPage: FC<PropsWithChildren<{}>> = ({ }) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Layout title="Nuestro Equipo">
        <section>
          <div className="w-full h-full lg:h-screen bg-gray-100 pt-12 lg:pt-32 lg:pb-12 lg:px-20 mb-0">
            <div className="bg-color-lila w-full h-full">
              <div className="w-full h-full flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-full p-10 lg:p-20 flex flex-col justify-center">
                  <h1 className="title mb-10 text-color-primario">Miembros de nuestro equipo</h1>
                  <p className="text-sm text-justify">
                    La Universidad de las Fuerzas Armadas ESPE es una institución
                    académica reconocida por su excelencia en la formación de
                    profesionales altamente capacitados en diversas áreas del
                    conocimiento. Su compromiso con la calidad educativa, su
                    amplia trayectoria y su vinculación con las Fuerzas Armadas la
                    convierten en una institución destacada en el ámbito
                    educativo. Como estudiantes de la carrera de Ingeniera de
                    Tecnologías de la Información, nos enorgullece apoyar a
                    iniciativas como esta que buscan mejorar el bienestar de las
                    comunidades. Hemos trabajado arduamente para desarrollar una
                    aplicación efectiva que contribuya a la seguridad y protección
                    de los habitantes. ¡Estamos comprometidos en crear un entorno
                    seguro y brindar soluciones innovadoras para enfrentar los
                    desafíos de seguridad en la provincia!
                  </p>
                </div>
                <div className="w-full lg:w-1/2 h-full flex flex-col bg-white">
                  <div className="w-full flex flex-col lg:flex-row h-full lg:h-1/2 overflow-hidden">
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center text-center gap-y-4 px-6 py-4">
                      <LightBulbIcon className="text-color-secondary h-14 w-14" />
                      <p className="font-bold text-color-primario second-title">Vinicio Leonardo Borja</p>
                    </div>
                    <div className="w-full lg:w-1/2 h-full">
                      <div className="flip-card h-72 lg:h-full bg-color-lila">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <Image
                              width={500}
                              height={500}
                              src="/SeguridadESPE/images/vinicio.png"
                              className="object-fill"
                              alt="Persona 1"
                            />
                          </div>
                          <div className="flip-card-back bg-color-primario">
                            <div className="flex flex-col justify-center items-center text-center w-full h-full">
                              <p className="second-title text-white text-sm">
                                Desarrollador de Software
                              </p>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="mailto:vinicio.borja10@gmail.com"
                              >
                                vinicio.borja10@gmail.com
                              </a>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="https://github.com/Vinici0"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Ver Perfil
                              </a>

                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                  <div className="w-full flex flex-col-reverse lg:flex-row h-full lg:h-1/2 overflow-hidden">
                    <div className="w-full lg:w-1/2 h-full">
                      <div className="flip-card h-72 lg:h-full bg-color-lila">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <Image
                              width={500}
                              height={500}
                              src="/SeguridadESPE/images/majo.jpg"
                              className="object-fill"
                              alt="Persona 1"
                            />
                          </div>
                          <div className="flip-card-back bg-color-secondary">
                            <div className="flex flex-col justify-center items-center text-center w-full h-full py-4">
                              <p className="second-title text-white text-sm">
                                Desarrollador de Software
                              </p>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="mailto:mariaparraga2000@gmail.com"
                              >
                                mariaparraga2000@gmail.com
                              </a>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="https://github.com/majito02"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Ver Perfil
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <Image
                        width={500}
                        height={500}
                        src="/SeguridadESPE/images/majo.jpg"
                        className="object-fill lg:hidden"
                        alt="Persona 1"
                      /> */}
                    </div>
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center text-center gap-y-4 px-6 py-4">
                      <LightBulbIcon className="text-color-secondary h-14 w-14 " />
                      <p className="font-bold text-color-primario second-title">María José Párraga</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="pt-28 relative h-screen">
          <section
            className="bg-color-lila fade-inflex-col justify-center items-center"
            style={{ height: "50vh" }}
          >
            <div className="lg:px-20 px-10 container flex flex-col fade-in">
              <div className="flex flex-col items-center justify-center mb-6 ">
                <h1 className="
                text-5xl font-semibold
                ">Miembros de nuestro equipo</h1>
              </div>
              <br />
              <div className="text-center">
                <p className="text-sm text-justify">
                  La Universidad de las Fuerzas Armadas ESPE es una institución
                  académica reconocida por su excelencia en la formación de
                  profesionales altamente capacitados en diversas áreas del
                  conocimiento. Su compromiso con la calidad educativa, su
                  amplia trayectoria y su vinculación con las Fuerzas Armadas la
                  convierten en una institución destacada en el ámbito
                  educativo. Como estudiantes de la carrera de Ingeniera de
                  Tecnologías de la Información, nos enorgullece apoyar a
                  iniciativas como esta que buscan mejorar el bienestar de las
                  comunidades. Hemos trabajado arduamente para desarrollar una
                  aplicación efectiva que contribuya a la seguridad y protección
                  de los habitantes. ¡Estamos comprometidos en crear un entorno
                  seguro y brindar soluciones innovadoras para enfrentar los
                  desafíos de seguridad en la provincia!
                </p>
              </div>
            </div>

            <div className=" w-full absolute my-11 ">
              <div className="flex justify-around flex-wrap my-0 ">
                <div className="flex-col justify-center items-center">
                  <div
                    className="w-60 h-60 rounded-full bg-white flex"
                    style={{
                      backgroundImage:
                        'url("/SeguridadESPE/images/formal.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="text-center">
                    <h3 className="text-lg text-gray-900 font-medium">
                      Vinicio Leonardo Borja
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Desarrollador de Software
                    </p>
                    <a
                      className="block text-sm text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium text-center"
                      href="https://github.com/Vinici0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Perfil
                    </a>
                  </div>
                </div>



                <div className="flex-col justify-center items-center">
                  <div
                    className="w-60 h-60 rounded-full bg-white flex"
                    style={{
                      backgroundImage:
                        'url("/SeguridadESPE/images/formal.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="text-center">
                    <h3 className="text-lg text-gray-900 font-medium">
                      María José Párraga
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Desarrollador de Software
                    </p>

                    <a
                      className="block text-sm text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium text-center"
                      href="https://github.com/majito02"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Perfil
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

        {/* <section className="py-10 fade-in absolute">
            <div className="w-full lg:w-1/2 container px-10 lg:px-16">
              {/* <h2 className="mb-6 font-bold text-3xl text-center">
                Desarrolladores
              </h2> */}

        {/* <div className="flex flex-row">
                <div className="flex flex-col items-center bg-white rounded-lg p-4 max-w-xs h-full">
                  <div className="max-w-xs m-5 p-4 border rounded-lg shadow-lg">
                    <div className="text-center">
                      <br />
                      <img
                        src="/SeguridadESPE/images/vinicio.png"
                        alt="Persona 1"
                        className="w-24 h-24 rounded-full mx-auto mb-8"
                      />
                      <h3 className="text-lg text-gray-900 font-medium">
                        Vinicio Leonardo Borja
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Desarrollador de Software
                      </p>
                    </div>
                    <table className="text-sm my-2 mx-auto">
                      <tbody>
                        <tr>
                          <td className="px-2 py-1 font-semibold">Ciudad:</td>
                          <td className="px-2 py-1">
                            Santo Domingo de los Tsáchilas
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 font-semibold">Teléfono:</td>
                          <td className="px-2 py-1">+593 0939225130</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 font-semibold">Correo:</td>
                          <td className="px-2 py-1">
                            vinicio.borja10@gmail.com
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <a
                      className="block text-sm text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium text-center"
                      href="https://github.com/Vinici0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Perfil
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg p-4 max-w-xs">
                  <div className="max-w-xs m-5 p-4 border rounded-lg shadow-lg">
                    <div className="text-center">
                      <br />
                      <img
                        src="/SeguridadESPE/images/majo.jpg"
                        alt="Persona 2"
                        className="w-24 h-24 rounded-full mx-auto mb-8"
                      />
                      <h3 className="text-lg text-gray-900 font-medium">
                        María José Párraga
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Desarrollador de Software
                      </p>
                    </div>
                    <table className="text-sm my-2 mx-auto">
                      <tbody>
                        <tr>
                          <td className="px-2 py-1 font-semibold">Ciudad:</td>
                          <td className="px-2 py-1">
                            Santo Domingo de los Tsáchilas
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 font-semibold">Teléfono:</td>
                          <td className="px-2 py-1">+593 960089365</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 font-semibold">Correo:</td>
                          <td className="px-2 py-1">mjparraga25@gmail.com</td>
                        </tr>
                      </tbody>
                    </table>

                    <a
                      className="block text-sm text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium text-center"
                      href="https://github.com/majito02"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Perfil
                    </a>
                  </div>
                </div>
              </div> */}
        {/* </div> */}
        {/* </section> */}
        {/* </div> */}
      </Layout>
    </>
  );
};

export default EquipoPage;