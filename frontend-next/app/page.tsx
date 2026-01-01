"use client";

import { useEffect, useState } from 'react';
import api from './services/api';
import type { Car } from './types/car';
import Link from 'next/link';
import Footer from './components/footer';
import Catalogo from './catalogo/page';

export default function Home() {
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
  
  const featuredCars = filteredCars.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-red-600 text-2xl">🚗</div>
          <span className="text-xl font-bold text-gray-800 italic">AutoCheck</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-red-600 transition">Início</Link>
          <Link href="#" className="hover:text-red-600 transition">Catálogo</Link>
          <Link href="#" className="hover:text-red-600 transition">Comparar</Link>
          <Link href="#" className="hover:text-red-600 transition">Sobre</Link>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        {/* 2. HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 max-w-3xl leading-tight">
            Encontre o carro perfeito com informações confiáveis
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl text-lg">
            Consulte preços justos, problemas crônicos conhecidos e especificações detalhadas antes de comprar.
          </p>

          <div className="mt-10 flex w-full max-w-2xl shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white">
            <div className="flex items-center px-4 flex-1">
              <span className="text-gray-400 mr-2">🔍</span>
              <input 
                type="text" 
                placeholder="Busque por marca, modelo ou ano..." 
                className="w-full py-4 outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-[#b11b22] text-white px-8 py-4 font-bold hover:bg-red-800 transition">
              Buscar
            </button>
          </div>
        </section>

        {/* 3. LISTAGEM DE DESTAQUES */}
        <section className="max-w-[1200px] mx-auto px-10 pb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 italic">Carros em Destaque</h2>
            <Link href="/catalogo" className="text-gray-500 border border-gray-300 px-4 py-1 rounded hover:bg-[#b11b22] hover:text-white hover:border-[#b11b22] transition text-sm font-medium">
              Ver Todos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map(car => (
              <Link href={`/car/${car.id}`} key={car.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  
                  {/* Imagem do Carro */}
                  <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
                    {car.imagem_url ? (
                      <img 
                        src={car.imagem_url} 
                        alt={car.modelo} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">Sem Foto</div>
                    )}
                  </div>
                  
                  {/* Informações do Carro */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-gray-400 text-[10px] font-bold uppercase mb-1">{car.ano}</span>
                    
                    {/* --- SEÇÃO DE BADGES --- */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {car.preco_fipe > 100000 ? (
                        <span className="bg-purple-50 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded border border-purple-100 uppercase">Premium</span>
                      ) : (
                        <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase">Custo-Benefício</span>
                      )}
                      
                      {car.cambio && (
                        <span className="bg-gray-50 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded border border-gray-100 uppercase">
                           {car.cambio.toLowerCase().includes('auto') || car.cambio.toLowerCase().includes('cvt') ? '🕹️ Auto' : 'Manual'}
                        </span>
                      )}

                      {car.consumo_estrada && car.consumo_estrada > 14 && (
                        <span className="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-100 uppercase">🍃 Econômico</span>
                      )}
                    </div>
                    {/* --- FIM DAS BADGES --- */}

                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                      {car.marca} {car.modelo}
                    </h3>
                    
                    <p className="text-[#b11b22] font-black text-xl mt-1">
                      R$ {car.preco_fipe.toLocaleString('pt-BR')}
                    </p>
                    
                    {/* Resumo Técnico Rápido */}
                    <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-2 flex-grow justify-end">
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-green-600 font-bold">✓</span>
                        <p className="text-gray-500 line-clamp-1 italic">{car.pontos_positivos}</p>
                      </div>
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-red-600 font-bold">!</span>
                        <p className="text-gray-500 line-clamp-1 italic">Crônico: {car.problemas_cronicos}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {featuredCars.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              Nenhum veículo encontrado para "{searchTerm}"
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}