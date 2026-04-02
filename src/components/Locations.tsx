import React from 'react';
import { MapPin, Star, TrendingUp, AlertCircle, ExternalLink, MoreVertical, Plus, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const mockLocations = [
  {
    id: '1',
    name: 'Restaurante Sabor - Matriz',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    score: 88,
    reviews: 450,
    rating: 4.8,
    status: 'active',
    lastAudit: '2 dias atrás'
  },
  {
    id: '2',
    name: 'Restaurante Sabor - Jardins',
    address: 'Rua Oscar Freire, 500, São Paulo - SP',
    score: 62,
    reviews: 120,
    rating: 4.2,
    status: 'active',
    lastAudit: '1 semana atrás'
  },
  {
    id: '3',
    name: 'Clínica Sorriso - Unidade Centro',
    address: 'Rua Direita, 200, São Paulo - SP',
    score: 95,
    reviews: 890,
    rating: 4.9,
    status: 'active',
    lastAudit: 'Ontem'
  }
];

export const Locations = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Unidades Monitoradas</h2>
          <p className="text-gray-500">Acompanhe o desempenho de cada unidade do Google Meu Negócio.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center gap-2">
          <Plus size={20} />
          Adicionar Unidade
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLocations.map((location) => (
          <div key={location.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider",
                  location.score >= 80 ? "bg-green-50 text-green-700 border-green-100" :
                  location.score >= 50 ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                  "bg-red-50 text-red-700 border-red-100"
                )}>
                  Score {location.score}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{location.name}</h3>
              <p className="text-xs text-gray-400 mb-4 line-clamp-1">{location.address}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{location.rating}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nota Média</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-1 text-blue-600 mb-1">
                    <TrendingUp size={14} />
                    <span className="text-sm font-bold">{location.reviews}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reviews</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                <span className="flex items-center gap-1">
                  <AlertCircle size={14} />
                  Auditoria: {location.lastAudit}
                </span>
                <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                  Ver Perfil
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
