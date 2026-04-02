import React from 'react';
import { FileText, Plus, Download, Eye, MoreVertical, Search, Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const mockProposals = [
  {
    id: '1',
    client: 'Restaurante Sabor & Arte',
    score: 45,
    value: 'R$ 1.394,00',
    status: 'sent',
    date: 'Ontem',
  },
  {
    id: '2',
    client: 'Clínica Sorriso Perfeito',
    score: 72,
    value: 'R$ 997,00',
    status: 'accepted',
    date: '3 dias atrás',
  },
  {
    id: '3',
    client: 'Hotel Central Plaza',
    score: 31,
    value: 'R$ 2.497,00',
    status: 'draft',
    date: '1 semana atrás',
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    accepted: "bg-green-50 text-green-700 border-green-100",
    sent: "bg-blue-50 text-blue-700 border-blue-100",
    draft: "bg-gray-50 text-gray-700 border-gray-100",
  };
  const labels: any = {
    accepted: "Aceita",
    sent: "Enviada",
    draft: "Rascunho",
  };
  const icons: any = {
    accepted: <CheckCircle2 size={14} />,
    sent: <Clock size={14} />,
    draft: <AlertCircle size={14} />,
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider flex items-center gap-1 w-fit", styles[status])}>
      {icons[status]}
      {labels[status]}
    </span>
  );
};

export const Proposals = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Propostas Comerciais</h2>
          <p className="text-gray-500">Transforme diagnósticos em propostas profissionais de alto impacto.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center gap-2">
          <Plus size={20} />
          Nova Proposta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <FileText size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{proposal.client}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-400 font-medium">Score Inicial: <span className={cn("font-bold", proposal.score < 50 ? "text-red-500" : "text-yellow-500")}>{proposal.score}</span></span>
                    <span className="text-xs text-gray-400 font-medium">Valor: <span className="text-gray-900 font-bold">{proposal.value}</span></span>
                    <span className="text-xs text-gray-400 font-medium">{proposal.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                <StatusBadge status={proposal.status} />
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar">
                    <Eye size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Download PDF">
                    <Download size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Dica de Conversão</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Propostas com score abaixo de 40 têm 85% mais chance de fechamento quando apresentadas junto com a análise de concorrentes. Use o Módulo de Prospecção para gerar o diagnóstico completo antes de enviar.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 shrink-0">
          Gerar Novo Diagnóstico
        </button>
      </div>
    </div>
  );
};
