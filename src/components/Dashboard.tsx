import { 
  Users, 
  MapPin, 
  Star, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Seg', reviews: 4 },
  { name: 'Ter', reviews: 3 },
  { name: 'Qua', reviews: 6 },
  { name: 'Qui', reviews: 8 },
  { name: 'Sex', reviews: 5 },
  { name: 'Sáb', reviews: 9 },
  { name: 'Dom', reviews: 12 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Olá, Agência Digital</h2>
          <p className="text-gray-500">Aqui está o que está acontecendo com seus clientes hoje.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Nova Prospecção
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Clientes" value="24" icon={Users} trend="up" trendValue="+12%" />
        <StatCard title="Unidades Monitoradas" value="58" icon={MapPin} trend="up" trendValue="+5%" />
        <StatCard title="Nota Média" value="4.8" icon={Star} trend="up" trendValue="+0.2" />
        <StatCard title="Alertas Críticos" value="3" icon={AlertCircle} trend="down" trendValue="-2" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Novas Avaliações (7 dias)</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              Reviews
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="reviews" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorReviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Tarefas Pendentes</h3>
          <div className="space-y-4">
            {[
              { title: 'Responder 5 reviews', client: 'Restaurante Sabor', priority: 'high' },
              { title: 'Post semanal', client: 'Clínica Sorriso', priority: 'medium' },
              { title: 'Atualizar fotos', client: 'Hotel Central', priority: 'low' },
              { title: 'Auditoria mensal', client: 'Auto Peças', priority: 'high' },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className={cn(
                  "w-2 h-2 mt-2 rounded-full",
                  task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                )}></div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                  <p className="text-xs text-gray-500">{task.client}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Ver todas as tarefas
          </button>
        </div>
      </div>

      {/* Recent Alerts Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Alertas Recentes</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Ver todos</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Palavra-chave detectada', message: 'Review com "péssimo" em Restaurante Sabor', type: 'error', time: '10 min atrás' },
            { title: 'Queda de Nota', message: 'Queda de 15% na nota de Clínica Sorriso', type: 'warning', time: '2 horas atrás' },
            { title: 'Perfil Desativado', message: 'Unidade Hotel Central está temporariamente desativada', type: 'error', time: '5 horas atrás' },
          ].map((alert, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex items-start gap-3 transition-all hover:shadow-md",
              alert.type === 'error' ? "bg-red-50/50 border-red-100" : "bg-orange-50/50 border-orange-100"
            )}>
              <div className={cn(
                "p-2 rounded-lg",
                alert.type === 'error' ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
              )}>
                <AlertCircle size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-gray-900">{alert.title}</h4>
                  <span className="text-[10px] text-gray-400 font-medium uppercase">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
