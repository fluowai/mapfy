import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, Plus, Filter, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const mockTasks = [
  { id: '1', title: 'Responder 5 novas avaliações', client: 'Restaurante Sabor', priority: 'high', dueDate: 'Hoje', status: 'pending' },
  { id: '2', title: 'Criar post de oferta da semana', client: 'Clínica Sorriso', priority: 'medium', dueDate: 'Amanhã', status: 'pending' },
  { id: '3', title: 'Atualizar fotos da fachada', client: 'Hotel Central', priority: 'low', dueDate: 'Em 2 dias', status: 'completed' },
  { id: '4', title: 'Auditoria de concorrentes mensal', client: 'Auto Peças X', priority: 'high', dueDate: 'Hoje', status: 'pending' },
];

export const Tasks = () => {
  const [tasks, setTasks] = React.useState(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t));
    toast.success('Status da tarefa atualizado!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tarefas e Automações</h2>
          <p className="text-gray-500">Gerencie as ações necessárias para otimizar os perfis dos seus clientes.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center gap-2">
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className={cn(
              "bg-white p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group",
              task.status === 'completed' ? "border-gray-100 opacity-60" : "border-gray-100 hover:border-blue-200 hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "transition-colors",
                task.status === 'completed' ? "text-green-500" : "text-gray-300 group-hover:text-blue-500"
              )}>
                {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
              <div>
                <h4 className={cn(
                  "font-bold text-sm transition-all",
                  task.status === 'completed' ? "text-gray-400 line-through" : "text-gray-900"
                )}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{task.client}</span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    task.priority === 'high' ? "bg-red-50 text-red-600" : 
                    task.priority === 'medium' ? "bg-yellow-50 text-yellow-600" : 
                    "bg-blue-50 text-blue-600"
                  )}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <Clock size={14} />
              {task.dueDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
