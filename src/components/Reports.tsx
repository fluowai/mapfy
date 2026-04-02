import React from 'react';
import { FileBarChart, Download, Share2, QrCode, ExternalLink, Mail, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const Reports = () => {
  const [loading, setLoading] = React.useState(false);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Relatório gerado com sucesso!');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Relatórios e Crescimento</h2>
        <p className="text-gray-500">Gere relatórios de performance e ferramentas para aumentar as avaliações dos clientes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reports Section */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileBarChart size={24} />
            </div>
            <h3 className="font-bold text-gray-900">Relatório Mensal de Performance</h3>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Gere um PDF profissional com a evolução da nota, quantidade de novas avaliações, postagens feitas e melhorias aplicadas no último mês.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selecionar Cliente</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option>Restaurante Sabor & Arte</option>
                <option>Clínica Sorriso Perfeito</option>
                <option>Hotel Central Plaza</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Período</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
                <option>Ano Atual</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={handleExport}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              Exportar PDF
            </button>
            <button className="px-4 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
              <Mail size={20} />
            </button>
          </div>
        </div>

        {/* Review Card Section */}
        <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 text-white rounded-lg">
              <QrCode size={24} />
            </div>
            <h3 className="font-bold">Review Card (Cartão de Avaliação)</h3>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Gere um link direto ou QR Code personalizado para o seu cliente colocar no balcão ou enviar via WhatsApp para pedir avaliações.
          </p>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Link de Avaliação</span>
              <button className="text-blue-400 text-xs font-bold hover:underline flex items-center gap-1">
                Copiar Link <Share2 size={12} />
              </button>
            </div>
            <div className="bg-white/10 p-3 rounded-lg text-sm font-mono truncate">
              g.page/r/restaurante-sabor/review
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Download size={20} />
              Baixar QR Code
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={20} />
              Ver Cartão
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="font-bold text-gray-900">Relatórios Gerados Recentemente</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { name: 'Relatório Mensal - Março', client: 'Restaurante Sabor', date: '01/04/2026' },
            { name: 'Auditoria de Prospecção', client: 'Clínica Sorriso', date: '28/03/2026' },
            { name: 'Relatório Trimestral Q1', client: 'Hotel Central', date: '25/03/2026' },
          ].map((report, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileBarChart size={20} className="text-gray-400" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{report.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{report.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">{report.date}</span>
                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
