"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../../services/api';
import type { Car } from '../../types/car';
import Link from 'next/link';
import Footer from '../../components/footer';

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [activeTab, setActiveTab] = useState('Motor');
  const [fotoAtiva, setFotoAtiva] = useState(0);

  useEffect(() => {
    if (id) {
      api.get(`/cars/${id}`)
        .then(res => setCar(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!car) return <div className="min-h-screen flex items-center justify-center bg-[#f8f6f3]">Carregando...</div>;

  const tabs = ['Motor', 'Consumo', 'Análise'];
  
  const imagens = car.imagens_url && car.imagens_url.length > 0 ? car.imagens_url : [car.imagem_url];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-red-600 text-2xl">🚗</div>
          <Link href="/" className="text-xl font-bold text-gray-800 italic">AutoCheck</Link>
        </div>
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-red-600 transition">Início</Link>
          <Link href="/catalogo" className="text-red-600">Catálogo</Link>
          <Link href="#" className="hover:text-red-600 transition">Comparar</Link>
        </div>
      </nav>

      <main className="flex-grow max-w-[1100px] mx-auto pt-6 px-6 w-full">
        
        {/* BOTÃO VOLTAR */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold text-sm mb-6 transition-colors"
        >
          ← Voltar para a busca
        </button>

        {/* HEADER: CARROSSEL + INFOS */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 items-start">
          
          {/* CARROSSEL */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden bg-gray-50 h-[380px] flex items-center justify-center border border-gray-100 relative group">
              <img 
                src={imagens[fotoAtiva]} 
                alt={car.modelo} 
                className="max-w-full max-h-full object-contain p-6 transition-opacity duration-300" 
              />
              
              {imagens.length > 1 && (
                <>
                  <button 
                    onClick={() => setFotoAtiva(fotoAtiva === 0 ? imagens.length - 1 : fotoAtiva - 1)}
                    className="absolute left-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    ❮
                  </button>
                  <button 
                    onClick={() => setFotoAtiva(fotoAtiva === imagens.length - 1 ? 0 : fotoAtiva + 1)}
                    className="absolute right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            {imagens.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imagens.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setFotoAtiva(index)}
                    className={`w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all 
                      ${fotoAtiva === index ? 'border-red-600 scale-105' : 'border-transparent opacity-60'}`}
                  >
                    <img src={url} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFOS DO TOPO */}
          <div className="flex flex-col justify-center">
            <span className="text-[#8C5E58] font-bold uppercase text-xs tracking-widest">{car.marca}</span>
            <h1 className="text-5xl font-bold text-[#1A1A1A] mt-2 mb-4">{car.modelo}</h1>
            
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-[#F2F2F2] px-4 py-1.5 rounded-xl font-bold text-gray-700">{car.ano}</span>
              <span className="text-gray-400 font-medium italic">Ficha Técnica Detalhada</span>
            </div>

            <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="bg-[#F8F8F8] p-3 rounded-2xl text-xl">📈</div>
                <div>
                  <p className="text-sm text-gray-400">Potência</p>
                  <p className="font-bold text-[#1A1A1A]">{car.cavalaria} 177 cv</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#F8F8F8] p-3 rounded-2xl text-xl">⛽</div>
                <div>
                  <p className="text-sm text-gray-400">Combustível</p>
                  <p className="font-bold text-[#1A1A1A]">Flex</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#F8F8F8] p-3 rounded-2xl text-xl">⚙️</div>
                <div>
                  <p className="text-sm text-gray-400">Transmissão</p>
                  <p className="font-bold text-[#1A1A1A]">{car.cambio}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#F8F8F8] p-3 rounded-2xl text-xl">📅</div>
                <div>
                  <p className="text-sm text-gray-400">Ano/Modelo</p>
                  <p className="font-bold text-[#1A1A1A]">{car.ano}/{car.ano}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
               <p className="text-4xl font-black text-[#b11b22]">R$ {car.preco_fipe.toLocaleString('pt-BR')}</p>
               <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition shadow-lg shadow-red-100">
                 Comparar
               </button>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE ABAS */}
        <div className="w-full pb-10">
          <div className="bg-[#EAEAEA] p-1.5 rounded-2xl flex gap-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all
                  ${activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[24px] p-10 shadow-sm border border-gray-100">
            
            {activeTab === 'Motor' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                  <span className="text-xl">⚙️</span> Especificações do Motor
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Tipo de Motor</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">4 cilindros em linha</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Cilindrada</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">2.0 L (1.987 cm³)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Potência Máxima</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">{car.cavalaria} 177 cv @ 6.600 rpm</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Torque Máximo</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">{car.torque} kgfm @ 4.400 rpm</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Alimentação</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">Injeção direta</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Combustível</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">Flex (Etanol/Gasolina)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Transmissão</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">{car.cambio} (Automática)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Tração</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">Dianteira</p>
                  </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-50">
                   <h4 className="font-bold text-lg mb-3">Notas sobre Manutenção</h4>
                   <p className="text-gray-500 leading-relaxed text-sm">
                     O {car.marca} {car.modelo} possui custo de manutenção classificado como **médio**. A manutenção é simples, mas exige óleo OW20 sintético.
                   </p>
                </div>
              </div>
            )}

            {activeTab === 'Consumo' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                  <span className="text-xl">⛽</span> Consumo e Eficiência
                </h3>
                <div className="mb-12">
                  <h4 className="font-bold text-xl mb-6">Gasolina</h4>
                  <div className="grid grid-cols-2 gap-20">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Cidade</p>
                      <p className="text-4xl font-bold text-[#1A1A1A]">{car.consumo_urbano} 10,5 <span className="text-sm font-normal text-gray-400">km/l</span></p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Estrada</p>
                      <p className="text-4xl font-bold text-[#1A1A1A]">{car.consumo_estrada} <span className="text-sm font-normal text-gray-400">km/l</span></p>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-100 mb-12" />
                <div className="mb-12">
                  <h4 className="font-bold text-xl mb-6">Etanol</h4>
                  <div className="grid grid-cols-2 gap-20">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Cidade</p>
                      <p className="text-4xl font-bold text-[#1A1A1A]">{car.etanol} 7.4 <span className="text-sm font-normal text-gray-400"> km/l</span></p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Estrada</p>
                      <p className="text-4xl font-bold text-[#1A1A1A]">{(car.consumo_estrada * 0.7).toFixed(1)} <span className="text-sm font-normal text-gray-400">km/l</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA ANÁLISE COM CORES ATUALIZADAS */}
            {activeTab === 'Análise' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                  <span className="text-xl">🔍</span> Análise do Especialista
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-8">
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                      <h4 className="text-green-800 font-bold mb-3">✅ Pontos Positivos</h4>
                      <p className="text-green-700 text-sm leading-relaxed">{car.pontos_positivos}</p>
                    </div>
                    {/* Pontos Negativos em Vermelho */}
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                      <h4 className="text-red-800 font-bold mb-3">❌ Pontos Negativos</h4>
                      <p className="text-red-700 text-sm leading-relaxed">{car.pontos_negativos}</p>
                    </div>
                  </div>

                  {/* Problemas Crônicos em Amarelo Alerta */}
                  <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 flex flex-col justify-center">
                    <h4 className="text-amber-800 font-bold mb-4 flex items-center gap-2">⚠️ Problemas Crônicos</h4>
                    <div className="bg-white p-6 rounded-xl border border-amber-300 shadow-sm italic text-amber-700 font-medium">
                      "{car.problemas_cronicos}"
                    </div>
                    <p className="text-[10px] text-amber-500 font-bold uppercase mt-6 text-center tracking-tighter">
                      Atenção redobrada na manutenção preventiva desses itens.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}