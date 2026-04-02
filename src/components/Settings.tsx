import React from 'react';
import { Settings as SettingsIcon, Globe, Palette, Shield, Bell, Save, Upload, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const Settings = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Configurações salvas com sucesso!');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações da Agência</h2>
        <p className="text-gray-500">Personalize sua plataforma e gerencie as configurações do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="space-y-1">
          {[
            { id: 'general', label: 'Geral', icon: SettingsIcon },
            { id: 'whitelabel', label: 'White Label', icon: Palette },
            { id: 'notifications', label: 'Notificações', icon: Bell },
            { id: 'security', label: 'Segurança', icon: Shield },
            { id: 'integrations', label: 'Integrações', icon: Globe },
          ].map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-lg text-sm font-medium transition-colors",
                item.id === 'general' ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">Informações Gerais</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome da Agência</label>
                <input 
                  type="text" 
                  defaultValue="Minha Agência Digital"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">E-mail de Suporte</label>
                <input 
                  type="email" 
                  defaultValue="suporte@minhaagencia.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
            </div>

            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4 pt-4">White Label</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all cursor-pointer group">
                  <Upload size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold mt-2 uppercase">Logo</span>
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-sm font-bold text-gray-900">Logotipo da Agência</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Recomendado: PNG ou SVG com fundo transparente. Tamanho máximo 2MB.
                  </p>
                  <div className="flex gap-2">
                    <button className="text-xs font-bold text-blue-600 hover:underline">Alterar Logo</button>
                    <button className="text-xs font-bold text-red-500 hover:underline">Remover</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cor Primária</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 border border-gray-200"></div>
                    <input 
                      type="text" 
                      defaultValue="#2563eb"
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono uppercase"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cor Secundária</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-200"></div>
                    <input 
                      type="text" 
                      defaultValue="#111827"
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex justify-end gap-3">
              <button className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                Descartar
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : <Save size={18} />}
                Salvar Alterações
              </button>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-red-900">Excluir Agência</h4>
              <p className="text-xs text-red-700">Todos os dados, clientes e relatórios serão apagados permanentemente.</p>
            </div>
            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
