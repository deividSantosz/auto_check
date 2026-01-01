import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-red-600 text-2xl">🚗</div>
              <span className="text-xl font-bold text-gray-800">
                Auto<span className="text-red-600">Check</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sua fonte confiável para decisões automotivas inteligentes. Analisamos crônicos, preços e fichas técnicas para você não errar na compra.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-red-600 transition">Início</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Catálogo Completo</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Comparador</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Tabela FIPE</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-red-600 transition">Sobre Nós</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Contato</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Termos de Uso</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Fique por dentro</h4>
            <p className="text-sm text-gray-500 mb-4">Receba alertas de novos crônicos e variações da FIPE.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-gray-100 border-none rounded-lg px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-red-600"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-800 transition">
                Ok
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © 2024 GuiaCar. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-400 hover:text-red-600 cursor-pointer transition">Instagram</span>
            <span className="text-gray-400 hover:text-red-600 cursor-pointer transition">YouTube</span>
            <span className="text-gray-400 hover:text-red-600 cursor-pointer transition">TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  );
}