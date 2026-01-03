"use client";

import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Car } from '../types/car';
import Link from 'next/link';
import Footer from '../components/footer';

export default function Catalogo() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get('/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredCars = cars.filter(car => 
    car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">

      <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-red-600 text-2xl">🚗</div>
          <span className="text-xl font-bold text-gray-800">AutoCheck</span>
        </Link>
        <div className="flex-1 max-w-md mx-10">
            <input 
                type="text" 
                placeholder="Pesquisar no catálogo..." 
                className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Link href="/" className="text-gray-500 hover:text-red-600 font-medium text-sm">Voltar</Link>
      </nav>

      <main className="flex-grow max-w-[1200px] mx-auto px-10 py-12 w-full">
        <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900">Catálogo Completo</h1>
            <p className="text-gray-500 mt-2">Explorando {filteredCars.length} veículos encontrados</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <Link href={`/car/${car.id}`} key={car.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="h-40 bg-gray-200 w-full relative overflow-hidden">
                  <img src={car.imagens_url[0]} alt={car.modelo} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {car.preco_fipe > 100000 && <span className="bg-purple-50 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded border border-purple-100 uppercase">Premium</span>}
                    {car.consumo_estrada && car.consumo_estrada > 14 && <span className="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-100 uppercase">Econômico</span>}
                  </div>

                  <h3 className="text-md font-bold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {car.marca} {car.modelo}
                  </h3>
                  <p className="text-[#b11b22] font-black text-lg mt-1">
                    R$ {car.preco_fipe.toLocaleString('pt-BR')}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-50 text-[11px] text-gray-400">
                    Ano: <span className="text-gray-600 font-bold">{car.ano}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 italic text-gray-400">
            Nenhum carro encontrado para sua busca.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}