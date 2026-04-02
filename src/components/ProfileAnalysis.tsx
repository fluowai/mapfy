import React from 'react';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Loader2, 
  Info, 
  Map as MapIcon, 
  Target, 
  Star,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { generateAudit } from '../lib/gemini';
import { cn } from '../lib/utils';

export const ProfileAnalysis = () => {
  const [query, setQuery] = React.useState('');
  const [city, setCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [audit, setAudit] = React.useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !city) return;
    
    setLoading(true);
    setAudit(null);
    
    try {
      const result = await generateAudit(query, city);
      setAudit(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Análise Profissional de Perfil</h2>
        <p className="text-gray-500">Insira o nome da empresa e a cidade para um diagnóstico completo de posicionamento e otimização.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Nome da Empresa ou Link" 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cidade" 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Gerar Análise'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-4 text-blue-600" size={48} />
          <p className="text-lg font-medium text-gray-900">Gerando Auditoria Profissional...</p>
          <p className="text-sm">Estamos analisando o posicionamento e comparando com concorrentes.</p>
        </div>
      )}

      {audit && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">
          <div className="lg:col-span-2 space-y-6">
            {/* Header & Score */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{query}</h3>
                  <p className="text-gray-500 flex items-center gap-1"><MapPin size={14} /> {city}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold",
                    audit.score >= 80 ? "border-green-500 text-green-600" : 
                    audit.score >= 50 ? "border-yellow-500 text-yellow-600" : 
                    "border-red-500 text-red-600"
                  )}>
                    {audit.score}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider mt-2 text-gray-400">Score de Otimização</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <CheckCircle2 size={20} className="text-blue-600" />
                  <h4>Checklist de Posicionamento</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {audit.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50">
                      {item.status === 'success' ? <CheckCircle2 className="text-green-500 shrink-0" size={20} /> :
                       item.status === 'warning' ? <AlertTriangle className="text-yellow-500 shrink-0" size={20} /> :
                       <XCircle className="text-red-500 shrink-0" size={20} />}
                      <div>
                        <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Grid Visualization */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MapIcon className="text-blue-600" size={24} />
                    Posicionamento no Mapa (Grid 3x3)
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Ranking da empresa em diferentes pontos da região.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rank Médio</span>
                  <p className="text-2xl font-black text-blue-600">#{audit.positioning?.currentRank || '?'}</p>
                </div>
              </div>

              <div className="relative aspect-square max-w-md mx-auto bg-gray-50 rounded-2xl border border-gray-100 p-8">
                <div className="grid grid-cols-3 gap-12 h-full">
                  {audit.mapData?.map((point: any, i: number) => {
                    const rank = point.rank || 0;
                    return (
                      <div key={i} className="relative flex items-center justify-center">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-transform hover:scale-110 cursor-help",
                          rank === 0 ? "bg-gray-300" :
                          rank <= 3 ? "bg-green-500 shadow-green-100" :
                          rank <= 10 ? "bg-yellow-500 shadow-yellow-100" :
                          "bg-red-500 shadow-red-100"
                        )}>
                          {rank || '?'}
                        </div>
                        {i === 4 && (
                          <div className="absolute -top-6 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 whitespace-nowrap">
                            LOCALIZAÇÃO ATUAL
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Top 3</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Top 10</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-50 rounded-full"></div> Fora</div>
                </div>
              </div>
            </div>

            {/* Competitors Analysis */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="text-red-500" size={24} />
                Concorrentes Diretos no Mapa
              </h3>
              <div className="space-y-4">
                {audit.positioning?.competitors?.map((comp: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-gray-400 border border-gray-100">
                        #{comp.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{comp.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1 text-yellow-500 font-bold"><Star size={12} fill="currentColor" /> {comp.rating}</span>
                          <span>{comp.reviewsCount} reviews</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {comp.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Ameaça</span>
                      <div className="h-1.5 w-24 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            comp.rank <= 3 ? "bg-red-500" : "bg-yellow-500"
                          )} 
                          style={{ width: `${Math.max(10, (20 - comp.rank) * 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
                {(!audit.positioning?.competitors || audit.positioning.competitors.length === 0) && (
                  <p className="text-center py-8 text-gray-400 italic">Nenhum concorrente direto mapeado nesta análise.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-600 p-8 rounded-2xl text-white shadow-xl shadow-blue-200">
              <h4 className="text-lg font-bold mb-2">Relatório Profissional</h4>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Este diagnóstico analisa o posicionamento local e a autoridade do perfil perante os algoritmos do Google.
              </p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <FileText size={20} />
                Exportar PDF de Análise
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Diagnóstico da IA</h4>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "{audit.summary}"
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Info size={20} className="text-blue-600" />
                <h4 className="font-bold text-gray-900">Oportunidades</h4>
              </div>
              <ul className="space-y-3">
                {audit.opportunities.map((opp: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

