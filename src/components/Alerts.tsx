import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Mail, 
  MessageSquare, 
  Layout, 
  AlertTriangle,
  Clock,
  Search,
  TrendingDown,
  Power,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AlertConfig, AlertType, NotificationChannel } from '../types';
import { toast } from 'sonner';

const MOCK_ALERTS: AlertConfig[] = [
  {
    id: '1',
    agencyId: 'agency-1',
    name: 'Críticas Negativas (Palavras-chave)',
    type: 'keyword',
    active: true,
    channels: ['dashboard', 'email', 'whatsapp'],
    conditions: {
      keywords: ['sujo', 'péssimo', 'atraso', 'ruim']
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    agencyId: 'agency-1',
    name: 'Queda de Nota Média',
    type: 'rating_drop',
    active: true,
    channels: ['dashboard', 'email'],
    conditions: {
      dropPercentage: 10,
      daysRange: 7
    },
    createdAt: new Date().toISOString()
  }
];

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertConfig[]>(MOCK_ALERTS);
  const [isAdding, setIsAdding] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<AlertConfig>>({
    name: '',
    type: 'keyword',
    active: true,
    channels: ['dashboard'],
    conditions: {
      keywords: [],
      dropPercentage: 5,
      daysRange: 30
    }
  });

  const handleToggleActive = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    toast.success('Status do alerta atualizado');
  };

  const handleDelete = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast.success('Alerta removido');
  };

  const handleSave = () => {
    if (!newAlert.name) {
      toast.error('O nome do alerta é obrigatório');
      return;
    }

    const alert: AlertConfig = {
      id: Math.random().toString(36).substr(2, 9),
      agencyId: 'agency-1',
      name: newAlert.name || '',
      type: newAlert.type as AlertType,
      active: true,
      channels: newAlert.channels || ['dashboard'],
      conditions: newAlert.conditions || {},
      createdAt: new Date().toISOString()
    };

    setAlerts(prev => [alert, ...prev]);
    setIsAdding(false);
    setNewAlert({
      name: '',
      type: 'keyword',
      active: true,
      channels: ['dashboard'],
      conditions: { keywords: [], dropPercentage: 5, daysRange: 30 }
    });
    toast.success('Novo alerta configurado com sucesso');
  };

  const getIcon = (type: AlertType) => {
    switch (type) {
      case 'keyword': return <Search className="text-blue-500" size={20} />;
      case 'disabled': return <Power className="text-red-500" size={20} />;
      case 'hours': return <Clock className="text-orange-500" size={20} />;
      case 'rating_drop': return <TrendingDown className="text-purple-500" size={20} />;
    }
  };

  const getTypeName = (type: AlertType) => {
    switch (type) {
      case 'keyword': return 'Palavras-chave em Reviews';
      case 'disabled': return 'Perfil Desativado';
      case 'hours': return 'Alteração de Horário';
      case 'rating_drop': return 'Queda de Nota Média';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configuração de Alertas</h2>
          <p className="text-gray-500">Defina gatilhos para ser notificado sobre eventos importantes.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Novo Alerta
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome do Alerta</label>
              <input 
                type="text" 
                placeholder="Ex: Alerta de Crise de Imagem"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={newAlert.name}
                onChange={e => setNewAlert(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tipo de Evento</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={newAlert.type}
                onChange={e => setNewAlert(prev => ({ ...prev, type: e.target.value as AlertType }))}
              >
                <option value="keyword">Palavras-chave em Reviews</option>
                <option value="disabled">Perfil Desativado</option>
                <option value="hours">Alteração de Horário</option>
                <option value="rating_drop">Queda de Nota Média</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Canais de Notificação</label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Layout },
                { id: 'email', label: 'E-mail', icon: Mail },
                { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
              ].map(channel => (
                <button
                  key={channel.id}
                  onClick={() => {
                    const current = newAlert.channels || [];
                    const updated = current.includes(channel.id as NotificationChannel)
                      ? current.filter(c => c !== channel.id)
                      : [...current, channel.id as NotificationChannel];
                    setNewAlert(prev => ({ ...prev, channels: updated }));
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                    newAlert.channels?.includes(channel.id as NotificationChannel)
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  )}
                >
                  <channel.icon size={18} />
                  {channel.label}
                </button>
              ))}
            </div>
          </div>

          {newAlert.type === 'keyword' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Palavras-chave (separadas por vírgula)</label>
              <input 
                type="text" 
                placeholder="sujo, péssimo, enganação"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                onChange={e => setNewAlert(prev => ({ 
                  ...prev, 
                  conditions: { ...prev.conditions, keywords: e.target.value.split(',').map(k => k.trim()) } 
                }))}
              />
            </div>
          )}

          {newAlert.type === 'rating_drop' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Queda de Nota (%)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={newAlert.conditions?.dropPercentage}
                  onChange={e => setNewAlert(prev => ({ 
                    ...prev, 
                    conditions: { ...prev.conditions, dropPercentage: Number(e.target.value) } 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Período (Dias)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={newAlert.conditions?.daysRange}
                  onChange={e => setNewAlert(prev => ({ 
                    ...prev, 
                    conditions: { ...prev.conditions, daysRange: Number(e.target.value) } 
                  }))}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Salvar Alerta
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {alerts.map(alert => (
          <div key={alert.id} className={cn(
            "bg-white p-5 rounded-xl border transition-all flex items-center justify-between",
            alert.active ? "border-gray-100 shadow-sm" : "border-gray-100 opacity-60 grayscale"
          )}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                {getIcon(alert.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{alert.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                    {getTypeName(alert.type)}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Bell size={14} />
                    {alert.channels.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
                  </div>
                  {alert.type === 'keyword' && alert.conditions.keywords && (
                    <div className="text-xs text-gray-400">
                      Termos: {alert.conditions.keywords.join(', ')}
                    </div>
                  )}
                  {alert.type === 'rating_drop' && (
                    <div className="text-xs text-gray-400">
                      Gatilho: -{alert.conditions.dropPercentage}% em {alert.conditions.daysRange} dias
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleToggleActive(alert.id)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  alert.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
                )}
                title={alert.active ? "Desativar" : "Ativar"}
              >
                {alert.active ? <CheckCircle2 size={20} /> : <Power size={20} />}
              </button>
              <button 
                onClick={() => handleDelete(alert.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Excluir"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {alerts.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Bell className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-lg font-medium text-gray-900">Nenhum alerta configurado</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-1">
              Crie alertas para ser notificado sobre mudanças críticas nos perfis dos seus clientes.
            </p>
            <button 
              onClick={() => setIsAdding(true)}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Configurar primeiro alerta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
