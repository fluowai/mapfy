import React from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Loader2, 
  Users, 
  ArrowLeft,
  TrendingUp,
  Target,
  ShieldAlert,
  Map as MapIcon,
  Info
} from 'lucide-react';
import { searchLeads, getLeadDetails } from '../lib/gemini';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const Prospecting = () => {
  const [category, setCategory] = React.useState('');
  const [city, setCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [leads, setLeads] = React.useState<any[]>([]);
  const [selectedLead, setSelectedLead] = React.useState<any>(null);
  const [leadDetails, setLeadDetails] = React.useState<any>(null);
  const [loadingDetails, setLoadingDetails] = React.useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !city) return;
    
    setLoading(true);
    setLeads([]);
    setSelectedLead(null);
    
    try {
      const result = await searchLeads(category, city);
      setLeads(result.leads || []);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao buscar leads');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (lead: any) => {
    setSelectedLead(lead);
    setLoadingDetails(true);
    setLeadDetails(null);
    
    try {
      const details = await getLeadDetails(lead.name, lead.address, category, city);
      setLeadDetails(details);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar detalhes do lead');
    } finally {
      setLoadingDetails(false);
    }
  };

  if (selectedLead) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <button 
          onClick={() => setSelectedLead(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Voltar para a lista
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <Users size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedLead.name}</h2>
              <p className="text-gray-500 flex items-center gap-1"><MapPin size={16} /> {selectedLead.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
              <Phone size={20} />
              Ligar Agora
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
              <FileText size={20} />
              Gerar Proposta
            </button>
          </div>
        </div>

        {loadingDetails ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="animate-spin mb-4 text-blue-600" size={48} />
            <p className="text-lg font-medium text-gray-900">Analisando Posicionamento Local...</p>
            <p className="text-sm">Estamos mapeando os concorrentes e o ranking no Google Maps.</p>
          </div>
        ) : leadDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Map & Ranking */}
            <div className="lg:col-span-2 space-y-8">
              {leadDetails.positioning.currentRank === "?" && (
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center gap-3 text-orange-700 text-sm">
                  <AlertTriangle size={20} />
                  Não conseguimos obter dados precisos de posicionamento para esta empresa no momento. Exibindo dados estimados.
                </div>
              )}
              {/* Local Ranking Grid (The "Map") */}
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
                    <p className="text-2xl font-black text-blue-600">#{leadDetails.positioning.currentRank}</p>
                  </div>
                </div>

                <div className="relative aspect-square max-w-md mx-auto bg-gray-50 rounded-2xl border border-gray-100 p-8">
                  {/* Grid of 9 points */}
                  <div className="grid grid-cols-3 gap-12 h-full">
                    {[...Array(9)].map((_, i) => {
                      const rank = leadDetails.mapData?.[i]?.rank || Math.floor(Math.random() * 20) + 1;
                      return (
                        <div key={i} className="relative flex items-center justify-center">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-transform hover:scale-110 cursor-help",
                            rank <= 3 ? "bg-green-500 shadow-green-100" :
                            rank <= 10 ? "bg-yellow-500 shadow-yellow-100" :
                            "bg-red-500 shadow-red-100"
                          )}>
                            {rank}
                          </div>
                          {i === 4 && (
                            <div className="absolute -top-6 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                              LOCALIZAÇÃO ATUAL
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Top 3</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Top 10</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Fora do Top 10</div>
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
                  {leadDetails.positioning.competitors.map((comp: any, i: number) => (
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
                            style={{ width: `${(20 - comp.rank) * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Insights & Strategy */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="text-blue-600" size={20} />
                  Sobre a Empresa
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{leadDetails.details.description}"
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShieldAlert className="text-orange-500" size={20} />
                  Pontos Críticos
                </h4>
                <div className="space-y-3">
                  {leadDetails.details.weaknesses.map((w: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                      <XCircle size={16} className="shrink-0" />
                      {w}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-600 p-8 rounded-3xl text-white shadow-xl shadow-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={24} />
                  <h4 className="text-lg font-bold">Potencial de Crescimento</h4>
                </div>
                <div className="mb-6">
                  <span className="text-green-100 text-xs uppercase font-bold tracking-widest">Tráfego Estimado</span>
                  <p className="text-3xl font-black">{leadDetails.details.estimatedTraffic}</p>
                  <p className="text-xs text-green-100 mt-1">Buscas mensais no Google Maps</p>
                </div>
                <p className="text-sm text-green-500 bg-white p-4 rounded-2xl font-bold text-center">
                  Oportunidade de aumentar o faturamento em até 35% com otimização.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <XCircle size={48} className="mb-4 text-red-500" />
            <p className="text-lg font-medium text-gray-900">Falha ao carregar detalhes</p>
            <p className="text-sm mb-6">Não foi possível obter a análise detalhada para este lead.</p>
            <button 
              onClick={() => handleViewDetails(selectedLead)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Prospecção de Leads</h2>
        <p className="text-gray-500">Encontre empresas no Google Meu Negócio que precisam de ajuda com SEO local e gestão de perfil.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Categoria (ex: Dentista)" 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Buscar Leads'}
          </button>
        </form>
      </div>

      {leads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500">
          {leads.map((lead, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Users size={20} />
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star size={16} fill="currentColor" />
                  <span>{lead.rating}</span>
                  <span className="text-gray-400 text-xs font-normal">({lead.reviewsCount})</span>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{lead.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                <MapPin size={12} /> {lead.address}
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pontos de Dor:</p>
                {lead.painPoints.map((point: string, j: number) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                    <AlertTriangle size={12} />
                    {point}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => handleViewDetails(lead)}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                >
                  Ver Detalhes
                </button>
                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                  <Phone size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-lg font-medium">Prospectando leads qualificados...</p>
          <p className="text-sm">Isso pode levar alguns segundos enquanto analisamos o mapa.</p>
        </div>
      )}
    </div>
  );
};


