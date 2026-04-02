import React from 'react';
import { Trophy, Users, Star, TrendingUp, Loader2, Search, AlertCircle } from 'lucide-react';
import { generateCompetitorAnalysis } from '../lib/gemini';
import { cn } from '../lib/utils';

export const Competitors = () => {
  const [businessName, setBusinessName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [competitors, setCompetitors] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !city || !competitors) return;
    
    setLoading(true);
    try {
      const competitorList = competitors.split(',').map(c => c.trim());
      const result = await generateCompetitorAnalysis(businessName, city, competitorList);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Análise de Concorrentes</h2>
        <p className="text-gray-500">Compare o desempenho do seu cliente com os principais concorrentes da região.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nome da Empresa do Cliente" 
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Cidade" 
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <textarea 
            placeholder="Nomes dos concorrentes (separados por vírgula)" 
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[80px]"
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Trophy size={20} />}
            Gerar Ranking Comparativo
          </button>
        </form>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Ranking Local</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {analysis.ranking.map((item: any, i: number) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        i === 0 ? "bg-yellow-100 text-yellow-700" : 
                        i === 1 ? "bg-gray-100 text-gray-600" : 
                        "bg-orange-50 text-orange-700"
                      )}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                            <Star size={12} fill="currentColor" /> {item.rating}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{item.reviewsCount} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{item.score}%</div>
                      <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Visibilidade</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Análise Estratégica</h4>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "{analysis.analysis}"
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <TrendingUp size={18} />
                Como Superar
              </h4>
              <ul className="space-y-4">
                {analysis.strategy.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle size={18} className="text-yellow-500" />
                Insight Crítico
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                O concorrente líder responde 100% das avaliações em menos de 24h. Esta é a maior oportunidade de ganho rápido para seu cliente.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
