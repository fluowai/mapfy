import React from 'react';
import { Calendar, Sparkles, Send, Image as ImageIcon, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { generatePostContent } from '../lib/gemini';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const Posts = () => {
  const [businessType, setBusinessType] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [scheduledDate, setScheduledDate] = React.useState('');
  const [scheduledTime, setScheduledTime] = React.useState('');
  const [scheduledPosts, setScheduledPosts] = React.useState([
    { date: 'Amanhã, 10:00', title: 'Promoção de Verão' },
    { date: 'Quarta, 14:30', title: 'Dica de Saúde Bucal' },
  ]);

  const handleGenerate = async () => {
    if (!businessType || !topic) return;
    setLoading(true);
    try {
      const result = await generatePostContent(businessType, topic);
      setContent(result || '');
    } catch (error) {
      toast.error('Erro ao gerar post');
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = () => {
    if (!content) {
      toast.error('Gere ou escreva o conteúdo do post primeiro');
      return;
    }
    if (!scheduledDate || !scheduledTime) {
      toast.error('Selecione uma data e horário para o agendamento');
      return;
    }

    const newPost = {
      date: `${new Date(scheduledDate).toLocaleDateString('pt-BR')}, ${scheduledTime}`,
      title: topic || 'Novo Post Agendado'
    };

    setScheduledPosts(prev => [newPost, ...prev]);
    toast.success('Post agendado com sucesso!');
    
    // Reset fields
    setTopic('');
    setContent('');
    setScheduledDate('');
    setScheduledTime('');
  };

  const removeScheduledPost = (index: number) => {
    setScheduledPosts(prev => prev.filter((_, i) => i !== index));
    toast.success('Agendamento removido');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Postagens e Conteúdo</h2>
        <p className="text-gray-500">Crie e agende postagens otimizadas para manter o perfil do Google sempre ativo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Side */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900">Criar Novo Post</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo de Negócio</label>
                <input 
                  type="text" 
                  placeholder="Ex: Restaurante Italiano, Dentista..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assunto do Post</label>
                <input 
                  type="text" 
                  placeholder="Ex: Promoção de Almoço, Novo Equipamento..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              Gerar Conteúdo com IA
            </button>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Conteúdo do Post</label>
              <textarea 
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[150px] leading-relaxed"
                placeholder="O conteúdo gerado aparecerá aqui..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data de Agendamento</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Horário</label>
                <input 
                  type="time" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gray-50 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <ImageIcon size={20} />
                Adicionar Foto
              </button>
              <button 
                onClick={handleSchedule}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                <Clock size={20} />
                Agendar Post
              </button>
            </div>
          </div>
        </div>

        {/* Preview Side */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden max-w-sm mx-auto">
            <div className="p-4 border-b border-gray-50 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">M</div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Preview do Google</h4>
                <p className="text-[10px] text-gray-400">Como aparecerá para os clientes</p>
              </div>
            </div>
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-300">
              <ImageIcon size={48} />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4">Próximos Agendamentos</h4>
            <div className="space-y-4">
              {scheduledPosts.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.title}</p>
                      <p className="text-[10px] text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeScheduledPost(i)}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ))}
              {scheduledPosts.length === 0 && (
                <p className="text-center text-xs text-gray-400 py-4">Nenhum post agendado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
