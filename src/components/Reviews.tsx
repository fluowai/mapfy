import React from 'react';
import { Star, MessageSquare, Send, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { suggestReviewReply } from '../lib/gemini';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const mockReviews = [
  {
    id: '1',
    author: 'João Silva',
    rating: 5,
    comment: 'Excelente atendimento e comida maravilhosa! Recomendo muito.',
    date: '2 horas atrás',
    replied: false,
  },
  {
    id: '2',
    author: 'Maria Oliveira',
    rating: 3,
    comment: 'A comida estava boa, mas o tempo de espera foi muito longo.',
    date: '1 dia atrás',
    replied: true,
    reply: 'Olá Maria, agradecemos o feedback. Estamos trabalhando para melhorar nosso tempo de resposta.'
  },
  {
    id: '3',
    author: 'Pedro Santos',
    rating: 1,
    comment: 'Pedi uma pizza e veio fria. Tentei ligar e ninguém atendeu.',
    date: '3 dias atrás',
    replied: false,
  }
];

export const Reviews = () => {
  const [reviews, setReviews] = React.useState(mockReviews);
  const [activeReview, setActiveReview] = React.useState<string | null>(null);
  const [aiReply, setAiReply] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleGenerateReply = async (comment: string) => {
    setLoading(true);
    try {
      const reply = await suggestReviewReply(comment);
      setAiReply(reply || '');
    } catch (error) {
      toast.error('Erro ao gerar resposta com IA');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, replied: true, reply: aiReply } : r));
    setActiveReview(null);
    setAiReply('');
    toast.success('Resposta enviada com sucesso!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Avaliações</h2>
          <p className="text-gray-500">Monitore e responda às avaliações dos seus clientes com ajuda de IA.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            Todas
          </button>
          <button className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-sm font-medium">
            Não Respondidas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.author}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} 
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>
              {review.replied && (
                <div className="flex items-center gap-1 text-green-600 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  Respondida
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {review.comment}
            </p>

            {review.replied ? (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Sua Resposta</p>
                <p className="text-sm text-gray-700 italic">"{review.reply}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeReview === review.id ? (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <textarea 
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px]"
                      placeholder="Escreva sua resposta..."
                      value={aiReply}
                      onChange={(e) => setAiReply(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleGenerateReply(review.comment)}
                        disabled={loading}
                        className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                        Gerar com IA
                      </button>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setActiveReview(null)}
                          className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={() => handleSendReply(review.id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2"
                        >
                          <Send size={16} />
                          Enviar Resposta
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveReview(review.id)}
                    className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageSquare size={18} />
                    Responder Avaliação
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
