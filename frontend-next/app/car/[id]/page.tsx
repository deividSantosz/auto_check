"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../../services/api'; 
import type { Car } from '../../types/car';
import Link from 'next/link';

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/cars/${id}`)
        .then(res => {
          setCar(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!car) return <div className="text-center py-20">Carro não encontrado.</div>;

  return (
    <div className="min-h-screen bg-[#f8f6f3] pb-20">
      <nav className="bg-white shadow-sm px-10 py-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-red-600 transition flex items-center gap-2 font-medium">
          ← Voltar para a busca
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100">
          
          {/* Header: Imagem e Dados Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-[450px] bg-gray-200">
              <img src={car.imagem_url} alt={car.modelo} className="w-full h-full object-cover" />
            </div>
            <div className="p-12 flex flex-col justify-center">
              <span className="text-red-600 font-bold tracking-widest uppercase text-sm">{car.marca}</span>
              <h1 className="text-5xl font-black text-gray-900 mt-2">{car.modelo}</h1>
              <div className="flex gap-4 mt-4">
                <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-600">{car.ano}</span>
                <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-600">{car.motorizacao || "N/A"}</span>
              </div>
              <div className="mt-10">
                <p className="text-gray-400 text-sm">Preço Médio FIPE</p>
                <p className="text-5xl font-black text-[#b11b22]">R$ {car.preco_fipe.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>

          {/* Grid de Informações Técnicas */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
            <div className="p-10 border-r border-gray-100 bg-green-50/20">
              <h3 className="font-bold text-green-800 flex items-center gap-2 mb-4 italic">✅ Pontos Positivos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{car.pontos_positivos}</p>
            </div>
            <div className="p-10 border-r border-gray-100 bg-orange-50/20">
              <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-4 italic">❌ Pontos Negativos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{car.pontos_negativos}</p>
            </div>
            <div className="p-10 bg-red-50/30">
              <h3 className="font-bold text-red-800 flex items-center gap-2 mb-4 italic">⚠️ Problemas Crônicos</h3>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed">{car.problemas_cronicos}</p>
            </div>
          </div>

          {/* Seção Extra: Consumo e Manutenção */}
          <div className="p-12 bg-gray-50/50 border-t border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">⛽ Consumo Real (km/l)</h3>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cidade</p>
                      <p className="text-3xl font-black text-gray-800">{car.consumo_cidade || "--"}</p>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Estrada</p>
                      <p className="text-3xl font-black text-gray-800">{car.consumo_estrada || "--"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">🛠️ Manutenção</h3>
                  <div className="bg-white p-6 rounded-3xl shadow-sm h-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-sm">Custo estimado:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${car.custo_manutencao === 'Baixo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {car.custo_manutencao || "Não informado"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{car.dica_especialista || "Sem dicas registradas para este modelo."}"</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}