"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [seccion, setSeccion] = useState("inicio");
  const [imagen, setImagen] = useState(1);
  const [vehiculo, setVehiculo] = useState("carro");
  const [vista, setVista] = useState("exterior");
  const [mostrarCotizacion, setMostrarCotizacion] = useState(false);

  const [auto360, setAuto360] = useState(false);

  const [enganche, setEnganche] = useState("");
  const [meses, setMeses] = useState(60);

  const limite = vehiculo === "carro" ? 16 : 15;
  const precio = vehiculo === "carro" ? 327700 : 577500;

  const extensionExterior = vehiculo === "carro" ? "jpg" : "png";
  const extensionInterior = "jpeg";

  const rutaImagen =
    vista === "exterior"
      ? `/${vehiculo}/${imagen}.${extensionExterior}`
      : `/${
          vehiculo === "carro"
            ? "interior-carro"
            : "interior-camioneta"
        }/${imagen}.${extensionInterior}`;

  const engancheNum = Number(enganche) || 0;
  const montoFinanciar = Math.max(0, precio - engancheNum);
  const mensualidad = montoFinanciar / meses;

  useEffect(() => {
    if (!auto360) return;

    const interval = setInterval(() => {
      setImagen((prev) => {
        let next = prev + 1;
        if (next > limite) next = 1;
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [auto360, limite]);

  return (
    <main className="min-h-screen bg-white text-black">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          <h1
            className="text-2xl font-black cursor-pointer"
            onClick={() => setSeccion("inicio")}
          >
            CAR DRIVE
          </h1>

          <nav className="flex gap-6 text-sm font-semibold uppercase">
            <button onClick={() => setSeccion("inicio")}>Inicio</button>
            <button onClick={() => setSeccion("vehiculos")}>Vehículos</button>
            <a href="#contacto" className="px-4 py-2 bg-black text-white rounded-full">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* INICIO */}
      {seccion === "inicio" && (
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6">

          {/* ✅ IMAGEN CORREGIDA */}
          <img
            src="/Inicio/Inicio.png"
            className="w-full max-w-4xl mb-10 rounded-xl shadow-xl"
            alt="inicio"
          />

          <h2 className="text-5xl font-black mb-4">
            Bienvenido a CAR DRIVE
          </h2>

          <p className="text-gray-600 mb-8">
            La mejor experiencia automotriz 360°
          </p>

          <button
            onClick={() => setSeccion("vehiculos")}
            className="px-10 py-4 bg-black text-white rounded-full"
          >
            EXPLORAR
          </button>
        </section>
      )}

      {/* VEHÍCULOS */}
      {seccion === "vehiculos" && (
        <section className="max-w-6xl mx-auto px-6 py-12">

          <div className="flex justify-center gap-4 mb-8">
            {["carro", "camioneta"].map((v) => (
              <button
                key={v}
                onClick={() => {
                  setVehiculo(v);
                  setImagen(1);
                  setAuto360(false);
                  setVista("exterior");
                }}
                className={`px-8 py-3 rounded-full font-bold ${
                  vehiculo === v ? "bg-black text-white" : "border"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="bg-white border shadow-xl rounded-3xl p-8 text-center">

            <img
              src={rutaImagen}
              className="w-full max-h-[520px] object-contain mx-auto"
              alt="auto"
            />

            <div className="flex justify-center gap-3 mt-6">

              <button
                onClick={() =>
                  setImagen(imagen <= 1 ? limite : imagen - 1)
                }
                className="px-6 py-2 bg-gray-100 rounded-full"
              >
                ⬅
              </button>

              <button
                onClick={() => setAuto360(!auto360)}
                className={`px-6 py-2 rounded-full font-bold ${
                  auto360 ? "bg-green-500 text-white" : "bg-black text-white"
                }`}
              >
                {auto360 ? "STOP 360" : "AUTO 360"}
              </button>

              <button
                onClick={() =>
                  setImagen(imagen >= limite ? 1 : imagen + 1)
                }
                className="px-6 py-2 bg-gray-100 rounded-full"
              >
                ➡
              </button>

            </div>

            <button
              onClick={() =>
                setVista(vista === "exterior" ? "interior" : "exterior")
              }
              className="mt-5 text-blue-600 font-semibold"
            >
              Ver {vista === "exterior" ? "Interior" : "Exterior"}
            </button>

            <h3 className="text-3xl font-black mt-6">{vehiculo}</h3>
            <p className="text-2xl text-green-600 font-bold">
              ${precio.toLocaleString()}
            </p>

            <button
              onClick={() => setMostrarCotizacion(true)}
              className="mt-6 px-8 py-3 bg-black text-white rounded-full"
            >
              COTIZAR
            </button>

          </div>
        </section>
      )}

      {/* CONTACTO */}
      <section id="contacto" className="max-w-6xl mx-auto py-20 px-6">
        <div className="bg-black text-white rounded-3xl p-10">
          <h2 className="text-3xl font-black mb-4">CAR DRIVE</h2>

          <p className="text-gray-300 mb-6">
            Agencia automotriz especializada en vehículos nuevos.
          </p>

          <p>📍 CDMX</p>
          <p>📞 55 1234 5678</p>
          <p>📧 contacto@cardrive.com</p>
        </div>
      </section>

    </main>
  );
}