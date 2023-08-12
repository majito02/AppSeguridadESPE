import React, { useState, useEffect } from "react"
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Layout } from "../../components/layouts/Layout"
const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});
import es from './date-fns.locale.es'; // Importa la configuración en español
import { defaultStaticRanges, defaultInputRanges } from "react-date-range/dist/defaultRanges"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import moment from 'moment';
import { DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, ArcElement
} from "chart.js"
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { ApexOptions } from "apexcharts";
import { DateRangePicker } from 'react-date-range';
const defaultPosition = {
  lat: 35.7407872,
  lng: 51.4375991,
  zoom: 13
};


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, ArcElement,
  Title,
  Tooltip,
  Legend
);
const fechaActual = new Date();

// Restar un mes a la fecha actual
fechaActual.setMonth(fechaActual.getMonth() - 1);
const ReportsPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: fechaActual,
    endDate: new Date(),
    key: 'selection',
  });

  const handleDateChange = (range: any) => {
    if (range.selection) {
      console.log(range.selection != undefined);
      setSelectedDateRange(range.selection);
    } else {
      setSelectedDateRange(range.range1);
    }
    console.log(range.selection);
    console.log(range);


  };

  const [openTab, setOpenTab] = useState(1);
  const [activeElement, setActiveElement] = useState("");
  const [dataBarras, setDataBarras] = useState([
    {
      name: 'Series 1',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ]);
  const [optionsBarras, setOptionsBarras] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Grafico linel de emergencias',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  });
  const [selectedCiudad, setSelectedCiudad] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [selectedBarrio, setSelectedBarrio] = useState('');
  const [barrios, setBarrios] = useState([]);
  const [selectedEmergencia, setSelectedEmergencia] = useState('');
  const [emergencias, setEmergencias] = useState([]);
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState("");
  const [selectedMes, setSelectedMes] = useState("");
  const [selectedDia, setSelectedDia] = useState("");
  const [selectedHoraInicio, setSelectedHoraInicio] = useState("");
  const [selectedHoraFin, setSelectedHoraFin] = useState("");
  const [publicacionesRegistradas, setPublicacionesRegistradas] = useState(0);
  const [usuariosRegistros, setUsuariosRegistros] = useState(0);
  const [publicacionesDelMes, setPublicacionesDelMes] = useState(0);
  const [publicacionesDelDia, setPublicacionesDelDia] = useState(0);

  const [horasFinMostrar, setHorasFinMostrar] = useState([{ value: "1", label: "01:00 AM" },
  { value: "2", label: "02:00 AM" },
  { value: "3", label: "03:00 AM" },
  { value: "4", label: "04:00 AM" },
  { value: "5", label: "05:00 AM" },
  { value: "6", label: "06:00 AM" },
  { value: "7", label: "07:00 AM" },
  { value: "8", label: "08:00 AM" },
  { value: "9", label: "09:00 AM" },
  { value: "10", label: "10:00 AM" },
  { value: "11", label: "11:00 AM" },
  { value: "12", label: "12:00 PM" },
  { value: "13", label: "13:00 PM" },
  { value: "14", label: "14:00 PM" },
  { value: "15", label: "15:00 PM" },
  { value: "16", label: "16:00 PM" },
  { value: "17", label: "17:00 PM" },
  { value: "18", label: "18:00 PM" },
  { value: "19", label: "19:00 PM" },
  { value: "20", label: "20:00 PM" },
  { value: "21", label: "21:00 PM" },
  { value: "22", label: "22:00 PM" },
  { value: "23", label: "23:00 PM" },
  { value: "24", label: "24:00 PM" }]);
  const [dataBarrasNumber, setDataBarrasNumber] = useState([]);
  const [primeraVez, setPrimeraVez] = useState(true);

  const [dataPastel, setDataPastel] = useState([{data:[25, 15, 44, 55, 41, 17]}]);
  const [heatmapOptionsPie, setHeatmapOptionsPie] = useState<ApexOptions>( {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ["25", "15", "44", "55", "41", "17"] ,
    },colors:
      [  '#FF5733', '#3366CC', '#66CC66']
    
  })
  const [labelsBarras, setLabelsBarras] = useState([]);
  const ReporteCard = ({ titulo, descripcion, valor }: any) => {
    return (
      <div className="border border-gray-300 rounded-md p-4">
        <h3 className="text-lg font-semibold text-blue-800">{titulo}</h3>
        <p className="text-gray-500">{descripcion}</p>
        <div className="mt-4">
          <span className="text-3xl font-bold text-blue-800">{valor}</span>
        </div>
      </div>
    );
  };
  useEffect(() => {
    datosIniciales();
  }, [selectedCiudad, selectedBarrio, selectedEmergencia, selectedDateRange.startDate, selectedDateRange.endDate, selectedHoraInicio.$d, selectedHoraFin.$d]);
  /*-----------------------------------------------------------
  |                                                           |
  |             FUNCIONES                                     |
  |                                                           |
  ------------------------------------------------------------|*/
  const datosIniciales = async () => {

    await obtenerciudades();
    await obtenerBarrios(selectedCiudad)
    await obtenerEmergencias(selectedCiudad, selectedBarrio)
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedEmergencia);
    await obtenerDatosCards()
    await generearGraficos()
    setPrimeraVez(false)


  }

  /* ciudad */
  const obtenerciudades = () => {
    axios.get('http://localhost:3000/api/reportes/obtenerCiudades')
      .then(response => { setCiudades(response.data.data); if (primeraVez) { setSelectedCiudad(response.data.data[0]) } })
      .catch(error => { console.error(error); });
  }

  const cambiarCiudad = async (event: { target: { value: React.SetStateAction<string> }; }) => {
    await setSelectedCiudad(event.target.value);
    await obtenerBarrios(selectedCiudad);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    await generearGraficos()
    await setSelectedBarrio('');
    await setSelectedEmergencia('');
  };
  /* Barrio */
  const cambiarBarrio = async (event: { target: { value: React.SetStateAction<string> }; }) => {
    await setSelectedBarrio(event.target.value);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    await generearGraficos()
  };

  const obtenerBarrios = (ciudad: any) => {
    axios.post('http://localhost:3000/api/reportes/obtenerBarrios', { ciudad })
      .then(response => { setBarrios(response.data.data); })
      .catch(error => { console.error(error); });
  }
  /* Emergencia */
  const cambiarEmergencia = async (event: { target: { value: React.SetStateAction<string> }; }) => {
    await setSelectedEmergencia(event.target.value);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    await generearGraficos()
  };
  const obtenerEmergencias = (ciudad: any, barrio: any) => {
    axios.post('http://localhost:3000/api/reportes/obtenerEmergencias', { ciudad, barrio })
      .then(response => { setEmergencias(response.data.data); })
      .catch(error => { console.error(error); });
  };
  /* Anio */
  const cambiarAnio = async (event: { target: { value: React.SetStateAction<string> }; }) => {

    await setSelectedAnio(event.target.value);
    await generearGraficos()
  };

  const obtenerAnios = (ciudad: any, barrio: any, titulo: any) => {
    axios.post('http://localhost:3000/api/reportes/obtenerAnios', { ciudad, barrio, titulo })
      .then(response => {
        setAnios(response.data.data);
      })
      .catch(error => { console.error(error); });
  };
  /* HORAS */
  const cambiarHoraInicio = async (seleted:any) => {

    await setSelectedHoraInicio(seleted);
    await generearGraficos()
  };
  const cambiarHoraFin = async (seleted:any) => {
    await setSelectedHoraFin(seleted);
    await generearGraficos()
  };
  const cambiarMes = async (event: { target: { value: React.SetStateAction<string> }; }) => {
    await setSelectedMes(event.target.value);
    await generearGraficos()
  };
  const cambiarDia = async (event: { target: { value: React.SetStateAction<string> }; }) => {
    await setSelectedDia(event.target.value);
    await generearGraficos()
  };

  /* Graficas */
  const generearGraficos = async () => {

    await obtenerMapaCalor(selectedCiudad, selectedBarrio, selectedEmergencia, selectedDateRange.startDate, selectedDateRange.endDate, selectedHoraInicio.$d, selectedHoraFin.$d);
    await obtenerReporteBarras(selectedCiudad, selectedBarrio, selectedEmergencia, selectedDateRange.startDate, selectedDateRange.endDate, selectedHoraInicio.$d, selectedHoraFin.$d)
    await obtenerReportPastel(selectedCiudad, selectedBarrio, selectedEmergencia, selectedDateRange.startDate, selectedDateRange.endDate, selectedHoraInicio.$d, selectedHoraFin.$d)
    await obtenerCoordenadas(selectedCiudad, selectedBarrio, selectedEmergencia, selectedDateRange.startDate, selectedDateRange.endDate, selectedHoraInicio.$d, selectedHoraFin.$d)
  }

  const obtenerReporteBarras = (ciudad: any, barrio: any, titulo: any, fechaInicio: any, fechaFin: any, horaInicio: any, horaFin: any) => {
    axios.post('http://localhost:3000/api/reportes/obtenerReporteBarras', { ciudad, barrio, titulo,fechaInicio, fechaFin, horaInicio, horaFin })
      .then(response => {setDataBarrasNumber(response.data.data);
        console.log(response.data.data);
        const values: any = Object.keys(response.data.data);
        const conteos: any = Object.values(response.data.data);
        const labels: any = values.map((value: any) => value);
        
        setDataBarras([
          {
            name: "Total de emergencias por día",
            data: conteos.map((data: any) => data),
          }]
        )
        setOptionsBarras({
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Gráfico de líneas de emergencias',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: labels,
          }
        })
      })
      .catch(error => { console.error(error); });
  };

  const obtenerReportPastel = (ciudad: any, barrio: any, titulo: any, fechaInicio: any, fechaFin: any, horaInicio: any, horaFin: any) => {

    axios.post('http://localhost:3000/api/reportes/obtenerReportePastel', {  ciudad, barrio, titulo,fechaInicio, fechaFin, horaInicio, horaFin})
      .then(response => {/* setDataBarrasNumber(response.data.data); */
        const values: any = Object.keys(response.data.data);
        const conteos: any = Object.values(response.data.data);

    console.log(conteos);
    const colores = [
      '#FF5733', '#3366CC', '#66CC66', '#FFC300', '#FF9933',
      '#9966CC', '#FF3399', '#00CC99', '#FF6600', '#0099CC',
      '#FF9966', '#003366', '#CC9900', '#FF3300', '#339933',
      '#FF6600', '#006699', '#FF0033', '#00CCFF', '#FFCC33',
      // ... y así sucesivamente
    ];
      
        setHeatmapOptionsPie( {
            chart: {
              type: 'bar',
              height: 380
            },
            plotOptions: {
              bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                  position: 'bottom'
                },
              }
            },
            colors: [  '#CC9900', '#3366CC', '#66CC66', '#FFC300', '#FF9933',
            '#9966CC', '#FF3399', '#00CC99', '#FF6600', '#0099CC',
            '#FF9966', '#003366', '#CC9900', '#FF3300', '#339933',
            '#FF6600', '#006699', '#FF0033', '#00CCFF', '#FFCC33'
            ],
            dataLabels: {
              enabled: true,
              textAnchor: 'start',
              style: {
                colors: ['#fff']
              },
              formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
              },
              offsetX: 0,
              dropShadow: {
                enabled: true
              }
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            xaxis: {
              categories: values,
            },
            yaxis: {
              labels: {
                show: false
              }
            },
            title: {
                text: 'Reportes de Barras de Emergencias',
                align: 'center',
                floating: true
            },
            subtitle: {
                text: 'Cantidad de Eemergencias',
                align: 'center',
            },
            tooltip: {
              theme: 'dark',
              x: {
                show: false
              },
              y: {
                title: {
                  formatter: function () {
                    return ''
                  }
                }
              }
            }
          })
          setDataPastel([{data:conteos}]);
        })
      .catch(error => { console.error(error); });
  };
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  /*-------------------------------------------------------------
    |                                                           |
    |             CONSTANTES                                    |
    |                                                           |
    ------------------------------------------------------------|*/

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Reporte de emergencias",
      },
    },
  };

  const meses = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const dias = [
    { value: "1", label: "Lunes" },
    { value: "2", label: "Martes" },
    { value: "3", label: "Miercoles" },
    { value: "4", label: "Jueves" },
    { value: "5", label: "Viernes" },
    { value: "6", label: "Sabado" },
    { value: "7", label: "Domingo" },
  ];


  const horas = [
    { value: "0", label: "00:00 AM" },
    { value: "1", label: "01:00 AM" },
    { value: "2", label: "02:00 AM" },
    { value: "3", label: "03:00 AM" },
    { value: "4", label: "04:00 AM" },
    { value: "5", label: "05:00 AM" },
    { value: "6", label: "06:00 AM" },
    { value: "7", label: "07:00 AM" },
    { value: "8", label: "08:00 AM" },
    { value: "9", label: "09:00 AM" },
    { value: "10", label: "10:00 AM" },
    { value: "11", label: "11:00 AM" },
    { value: "12", label: "12:00 PM" },
    { value: "13", label: "13:00 PM" },
    { value: "14", label: "14:00 PM" },
    { value: "15", label: "15:00 PM" },
    { value: "16", label: "16:00 PM" },
    { value: "17", label: "17:00 PM" },
    { value: "18", label: "18:00 PM" },
    { value: "19", label: "19:00 PM" },
    { value: "20", label: "20:00 PM" },
    { value: "21", label: "21:00 PM" },
    { value: "22", label: "22:00 PM" },
    { value: "23", label: "23:00 PM" },
    { value: "24", label: "24:00 PM" }
  ];


  const handleMesChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedMes(event.target.value);
  };
  const [total, setTotal] = useState(10);
  const [coordenadas, setCoordenadas] = useState([{ titulo: 1, position: [-1.197, -78.508] }]);

  const [heatmapData, sethHeatmapData] = useState([
    {
      name: 'Lunes',
      data: [
        10, 2, 30, 40, 5, 60, 70
      ],
    },
    {
      name: 'Martes',
      data: [
        0, 0, 0, 0, 0, 0, 10, 2, 30, 40, 5, 60, 70
      ],
    },
    {
      name: 'Miércoles',
      data: [
        0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 30, 40, 5, 60, 70
      ],
    },
    {
      name: 'Jueves',
      data:
        [0, 0, 0, 0, 0, 0, 10, 20, 0, 0, 0, 40, 50, 60, 70],


    },
    {
      name: 'Viernes',
      data: [
        [0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      ],
    },
    {
      name: 'Sábado',
      data: [
        [10, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
      ],
    },
    {
      name: 'Domingo',
      data: [
        [0, 0, 0, 20, 30, 40, 0, 0, 0, 50, 60, 70],
      ],
    },
  ]);
  const [heatmapOptions, setHeatmapOptions] = useState<ApexOptions>({
    chart: {
      type: 'heatmap',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [

            {
              from: 1,
              to: 30,
              name: 'Bajo',
              color: '#A1D7C9',
            },
            {
              from: 31,
              to: 60,
              name: 'Medio',
              color: '#efa94a',
            },
            {
              from: 61,
              to: 100,
              name: 'Alto',
              color: '#FF4560',
            },
          ],
        },
      },
    },
    xaxis: {
      categories: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    },
    dataLabels: {
      enabled: false,
    },
  });


  const obtenerMapaCalor = (ciudad: any, barrio: any, titulo: any, fechaInicio: any, fechaFin: any, horaInicio: any, horaFin: any) => {
    axios.post('http://localhost:3000/api/reportes/obtenerMapaCalor', {  ciudad, barrio, titulo,fechaInicio, fechaFin, horaInicio, horaFin})
      .then(response => {
       
        
        const tooltip:any = response.data.data.tooltip;
        const tooltiptime:any = response.data.data.tooltiptime;
      
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        
        sethHeatmapData(response.data.data.heatmapData)
        setHeatmapOptions({
          chart: {
            type: 'heatmap',
            toolbar: {
              show: true,
            },
          },
          tooltip:{
            custom: function ({ seriesIndex, dataPointIndex }) {
              let existenDatos = false;
              const hora = dataPointIndex;
              const emergencias = tooltip[seriesIndex].data[hora];
              let tooltipContent = `<div class="custom-tooltip">`;
              for (const [titulo, total] of Object.entries(emergencias)) {
                existenDatos = true;
                tooltipContent += `<div>${titulo}: ${total}</div>`;
              }


              if(existenDatos){
              
                  tooltipContent += `<div>${tooltiptime[seriesIndex].data[hora].fechaMinima} - ${tooltiptime[seriesIndex].data[hora].fechaMaxima}</div>`;
              
              }
              tooltipContent += `</div>`;
              return tooltipContent;
            },
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              colorScale: {
                ranges: response.data.data.ranges,
              },
            },
          },
          xaxis: {
            categories: [
              '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
              '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
              '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          },
          dataLabels: {
            enabled: false,
          },
        })
        setTotal(response.data.data.total)

      })
      .catch(error => { console.error(error); });
  };
  const obtenerDatosCards = () => {
    axios.get('http://localhost:3000/api/reportes/obtenerDatosCards')
      .then(response => {
        setPublicacionesRegistradas(response.data.data.publicacionesRegistradas);
        setUsuariosRegistros(response.data.data.usuariosRegistros);
        setPublicacionesDelMes(response.data.data.publicacionesDelMes);
        setPublicacionesDelDia(response.data.data.publicacionesDelDia);
      })
      .catch(error => { console.error(error); });
  };



  const obtenerCoordenadas = (ciudad: any, barrio: any, titulo: any, fechaInicio: any, fechaFin: any, horaInicio: any, horaFin: any) => {
    axios.post('http://localhost:3000/api/reportes/obtenerCoordenadas', {  ciudad, barrio, titulo,fechaInicio, fechaFin,horaInicio, horaFin})
      .then(response => {
        setCoordenadas(response.data.data);



      })
      .catch(error => { console.error(error); });
  };

    const descargarExcel = () => {
      axios
        .post('http://localhost:3000/api/reportes/descargarXLSX', {  ciudad:selectedCiudad, 
        barrio:selectedBarrio, titulo:selectedEmergencia,fechaInicio: selectedDateRange.startDate
        , fechaFin:selectedDateRange.endDate, horaInicio:selectedHoraInicio.$d, horaFin:selectedHoraFin.$d}, {
          responseType: 'blob', // Indicar que la respuesta es de tipo blob (binario)
        })
        .then((response) => {
          // Crear una URL a partir del blob de la respuesta
          const url = window.URL.createObjectURL(new Blob([response.data]));
  
          // Crear un enlace temporal para descargar el archivo
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'datos.xlsx'); // Nombre del archivo de descarga
          document.body.appendChild(link);
  
          // Hacer clic en el enlace para iniciar la descarga
          link.click();
  
          // Liberar la URL creada
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error al descargar el archivo:', error);
        });
    };

    const descargarPDF = () => {
      axios
        .post('http://localhost:3000/api/reportes/descargarPDF', {  ciudad:selectedCiudad, 
        barrio:selectedBarrio, titulo:selectedEmergencia,fechaInicio: selectedDateRange.startDate
        , fechaFin:selectedDateRange.endDate, horaInicio:selectedHoraInicio.$d, horaFin:selectedHoraFin.$d}, {
          responseType: 'blob', // Indicar que la respuesta es de tipo blob (binario)
        })
        .then((response) => {
          // Crear una URL a partir del blob de la respuesta
          const url = window.URL.createObjectURL(new Blob([response.data]));
  
          // Crear un enlace temporal para descargar el archivo
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'datos.pdf'); // Nombre del archivo de descarga
          document.body.appendChild(link);
  
          // Hacer clic en el enlace para iniciar la descarga
          link.click();
  
          // Liberar la URL creada
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error al descargar el archivo:', error);
        });
    };
    const verPDF = () => {
      axios
        .post('http://localhost:3000/api/reportes/descargarPDF', {  ciudad:selectedCiudad, 
        barrio:selectedBarrio, titulo:selectedEmergencia,fechaInicio: selectedDateRange.startDate
        , fechaFin:selectedDateRange.endDate, horaInicio:selectedHoraInicio.$d, horaFin:selectedHoraFin.$d}, {
          responseType: 'arraybuffer', // Indicar que la respuesta es un ArrayBuffer
        })
        .then((response) => {
          // Convertir la respuesta en un Blob
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    
          // Crear una URL a partir del Blob
          const url = window.URL.createObjectURL(pdfBlob);
    
          // Abrir una nueva ventana del navegador con la URL del PDF
          window.open(url, '_blank');
        })
        .catch((error) => {
          console.error('Error al mostrar la vista previa del PDF:', error);
        });
    };

    const descargarCSV = () => {
      axios
        .post('http://localhost:3000/api/reportes/descargarCSV', {  ciudad:selectedCiudad, 
        barrio:selectedBarrio, titulo:selectedEmergencia,fechaInicio: selectedDateRange.startDate
        , fechaFin:selectedDateRange.endDate, horaInicio:selectedHoraInicio.$d, horaFin:selectedHoraFin.$d}, {
          responseType: 'blob', // Indicar que la respuesta es de tipo blob (binario)
        })
        .then((response) => {
          // Crear una URL a partir del blob de la respuesta
          const url = window.URL.createObjectURL(new Blob([response.data]));
  
          // Crear un enlace temporal para descargar el archivo
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'datos.csv'); // Nombre del archivo de descarga
          document.body.appendChild(link);
  
          // Hacer clic en el enlace para iniciar la descarga
          link.click();
  
          // Liberar la URL creada
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error al descargar el archivo CSV:', error);
        });
    };

    const [printing, setPrinting] = useState(false);

    
  const handlePrint = () => {
    setPrinting(true); // Cambiar el estado para mostrar el efecto de impresión
    window.print();
    // Esperar un breve tiempo (3 segundos en este ejemplo) antes de restaurar las clases originales
    setTimeout(() => {
      setPrinting(false);
    }, 100); // Cambiar a la cantidad de tiempo deseada para el efecto de impresión
  };


  const staticRangesLabels = {
    "Today": "Hoy",
    "Yesterday": "Ayer",
    "This Week": "Esta semana",
    "Last Week": "Semana pasada",
    "This Month": "Este mes",
    "Last Month": "Mes pasado"
  };

  const inputRangesLabels = {
    "days up to today": "días hasta hoy",
    "days starting today": "días a partir de hoy"
  };

  function translateRange(dictionary: any) {
    return (item: any) =>
      dictionary[item.label] ? { ...item, label: dictionary[item.label] } : item;
  }

  const esStaticRanges = defaultStaticRanges.map(translateRange(staticRangesLabels));
  const esInputRanges = defaultInputRanges.map(translateRange(inputRangesLabels));

  return (
    <>

      <Layout title="Reportes">

        <div className="flex">
          <div className="pt-28 pb-20 bg-white ">
            <div className="text-center fade-in">

              <h1 className="title mb-4 text-3xl color-gray-light font-bold">
                Analítica
                <br />
                Emergencias comunitarias
              </h1>
              <br />
              <div className=" mx-auto px-32 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ReporteCard
                    titulo="Usuarios registros"
                    descripcion="Total de usuarios registrados"
                    valor={usuariosRegistros}
                  />
                  <ReporteCard
                    titulo="Publicaciones registradas"
                    descripcion="Total de publicaciones registradas"
                    valor={publicacionesRegistradas}
                  />
                  <ReporteCard
                    titulo="publicaciones del mes"
                    descripcion="Total de publicaciones hechas en este mes"
                    valor={publicacionesDelMes}
                  />
                  <ReporteCard
                    titulo="publicaciones del día"
                    descripcion="Total de publicaciones hechas el día de hoy"
                    valor={publicacionesDelDia}
                  />
                </div>
              </div>
               <div className="flex mt-4 justify-center gap-6 no-print">
              <button    onClick={verPDF} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-110 transition-all">
                <span className="flex">
                {printing ? 'Descargando...' : 'Descargar PDF Datos'} 
                  <DocumentArrowDownIcon className="h-5 w-5 ml-1 text-color-white" />
                </span>
              </button>
              <button    onClick={handlePrint} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-110 transition-all">
                <span className="flex">
                {printing ? 'Descargando...' : 'Descargar PDF Graficos'} 
                  <DocumentArrowDownIcon className="h-5 w-5 ml-1 text-color-white" />
                </span>
              </button>
              <button  onClick={descargarCSV}  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-110 transition-all">
                <span className="flex">
                  Descargar CSV
                  <DocumentArrowDownIcon  className="h-5 w-5 ml-1 text-color-white" />
                </span>
              </button>
              <button   onClick={descargarExcel} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-110 transition-all">
                <span className="flex">
                  Descargar EXCEL
                  <DocumentArrowDownIcon  className="h-5 w-5 ml-1 text-color-white" />
                </span>
              </button>
            </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <section>



              <div className=" px-32">
                <div className="text-sm font-medium  text-gray-500 border-gray-200 dark:text-gray-400 ">
                  <div className="relative flex flex-w min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      {/*  <Bar data={dataBarras} options={options} /> */}
                      <div className="flex flex-wrap">
                        <div className="w-full  p-4 no-page-break">
                          <h1 className="text-center">Mapa de calor de publicaciones</h1>
                          <Chart options={heatmapOptions} series={heatmapData} type="heatmap" width="100%" />
                        </div>
                        <div className="w-full  p-4 no-page-break">
                          <h1 className="text-center">Ubicación exacta de las publicaciones</h1>
                          <Map coordinates={coordenadas} />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-32 ">
                <div className="text-sm font-medium  text-gray-500 border-gray-200 dark:text-gray-400 ">
                  <div className="relative flex flex-w min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="flex flex-wrap">
                        <div className="w-full  p-4 no-page-break">
                          {/*  <Bar data={dataBarras} options={options} height={"100%"} /> */}
                          <Chart options={optionsBarras} series={dataBarras} type="line" width="100%" />
                        </div>
                        <div className="w-full  p-4 no-page-break">
                          <h1 className="text-center">Grafico de barras</h1>
                          {/*   <Pie data={dataPastel} /> */}
                          <Chart options={heatmapOptionsPie} series={dataPastel} type="bar" width="100%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>



          {/* Filtro flotante en el lado derecho */}
          <div className=" sticky right-0 top-0 h-screen bg-white filtros shadow-lg no-print">
            {/* Aquí colocamos los filtros */}
            <div className="p-4 overflow-auto	h-screen filtros">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>
              <div className="sm:col-span-2 pt-5">

                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  PARROQUIA
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={selectedCiudad}
                    onChange={cambiarCiudad}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    {ciudades.map((ciudad: any) => (
                      <option key={ciudad} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZONA/ BARRIO
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={selectedBarrio}
                    onChange={cambiarBarrio}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    <option disabled>SELECCIONAR ZONA</option>
                    <option>TODAS</option>
                    {barrios.map((barrio: any) => (
                      <option key={barrio} value={barrio}>
                        {barrio}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  TIPO DE EMERGENCIA
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={selectedEmergencia}
                    onChange={cambiarEmergencia}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    <option disabled>SELECCIONAR TIPO DE EMERGENCIA</option>
                    <option key="" value="">
                      TODAS
                    </option>
                    {emergencias.map((emergencia: any) => (
                      <option key={emergencia} value={emergencia}>
                        {emergencia}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  RANGO DE DÍAS
                </label>
                <DateRangePicker
                  locale={es}
                  staticRanges={esStaticRanges}
                  inputRanges={esInputRanges}
                  showSelectionPreview={false}
                  ranges={[selectedDateRange]}

                  onChange={handleDateChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="hora"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  HORA DE INICIO
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <TimePicker
                    className="w-full"
                    label="Selecciona una hora"
                    value={selectedHoraInicio}
                    onChange={cambiarHoraInicio}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </div>


              <div className="sm:col-span-2">
                <label
                  htmlFor="hora"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  HORA DE FIN
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <TimePicker
                  className="w-full"
                    label="Selecciona una hora"
                    value={selectedHoraFin}
                    onChange={cambiarHoraFin}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="sm:col-span-2">

                <label
                  htmlFor="hora"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  TOTAL DE INCIDENTES OCURRIDOS:  {total}
                </label>
              </div>


              {/* <div className="sm:col-span-2 text-center  text-gray-900">
                    Total de incidentes
                    <div className="mt-2 text-center text-black font-bold text-5xl">
                      100
                    </div>
                  </div> */}
            </div>
          </div>
        </div>


      </Layout>
    </>
  );

};

export default ReportsPage;