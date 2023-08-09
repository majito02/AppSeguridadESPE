import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
    ssr: false, // Evita que se ejecute en el servidor durante la compilación
});

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
    ssr: false, // Evita que se ejecute en el servidor durante la compilación
});

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false, // Evita que se ejecute en el servidor durante la compilación
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
    ssr: false, // Evita que se ejecute en el servidor durante la compilación
});


function Map({ coordinates }: any) {
    if (!Array.isArray(coordinates)) {
        return <div>No se encontraron coordenadas válidas para mostrar el mapa.</div>;
    }

    const [map, setMap] = useState(null);
    const L = require("leaflet");
    let DefaultIcon:any =  L.icon({
        iconUrl: "https://i.pinimg.com/originals/3f/59/63/3f59638e24b03a92aa97785fa043b21b.png",
        iconSize: [30, 30]
    });
    useEffect(() => {
        // Cargar Leaflet y otras bibliotecas que accedan a `window` aquí, dentro del bloque useEffect.
        // Asegúrate de que solo se carguen en el lado del cliente.
   
         DefaultIcon = L.icon({
            iconUrl: "https://i.pinimg.com/originals/3f/59/63/3f59638e24b03a92aa97785fa043b21b.png",
            iconSize: [30, 30]
        });

        if (map) {
            setInterval(function () {
                map.invalidateSize();
            }, 100);
        }
    }, [map]);

    return (
        <MapContainer className="map" center={[-1.197, -78.508]} zoom={6} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {

                coordinates.map((element: any, index: any) =>
                    <Marker
                        key={index}
                        marker_index={index}
                        position={element.position}
                        icon={DefaultIcon}
                    >
                        <Popup>
                            {element.titulo}
                        </Popup>
                    </Marker>
                )

            }
        </MapContainer>
    );
}

export default Map;
