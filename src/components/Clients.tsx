import React from 'react';
import { Users, Plus, MoreVertical, Search, Filter, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const mockClients = [
  {
    id: '1',
    name: 'Restaurante Sabor & Arte',
    contact: 'Carlos Mendes',
    email: 'contato@saborarte.com',
    phone: '(11) 98888-7777',
    status: 'active',
    locations: 2,
    lastActivity: '2 horas atrás'
  },
  {
    id: '2',
    name: 'Clínica Sorriso Perfeito',
    contact: 'Dra. Ana Paula',
    email: 'ana@sorrisoperfeito.com',
    phone: '(11) 97777-6666',
    status: 'proposal',
    locations: 1,
    lastActivity: '1 dia atrás'
  },
  {
    id: '3',
    name: 'Hotel Central Plaza',
    contact: 'Roberto Lima',
    email: 'gerencia@centralplaza.com',
    phone: '(11) 96666-5555',
    status: 'lead',
    locations: 1,
    lastActivity: '3 dias atrás'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    active: "bg-green-50 text-green-700 border-green-100",
    proposal: "bg-blue-50 text-blue-700 border-blue-100",
    lead: "bg-yellow-50 text-yellow-700 border-yellow-100",
  };
  const labels: any = {
    active: "Ativo",
    proposal: "Proposta",
    lead: "Lead",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider", styles[status])}>
      {labels[status]}
    </span>
  );
};

export const Clients = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h2>
          <p className="text-gray-500">Gerencie seus leads, propostas e clientes ativos em um só lugar.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center gap-2">
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors bg-white">
              <Filter size={16} />
              Filtros
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors bg-white">
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Unidades</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Última Atividade</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                        {client.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{client.name}</h4>
                        <p className="text-xs text-gray-500">{client.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={client.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      {client.locations} {client.locations === 1 ? 'unidade' : 'unidades'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {client.lastActivity}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Phone size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
