import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase, getProgreso, marcarCompletada } from '../lib/supabase';
import { modulos } from '../data/curso';
import type { User } from '@supabase/supabase-js';

export default function Leccion() {
  const { modId, lecId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [completadas, setCompletadas] = useState<string[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [quizFin, setQuizFin] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [completando, setCompletando] = useState(false);

  const modulo = modulos.find(m => m.id === modId);
  const leccion = modulo?.lecciones.find(l => l.id === lecId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) getProgreso(data.user.id).then(setCompletadas);
    });
  }, []);

  useEffect(() => {
    setQuizIdx(0); setSeleccion(null); setMostrarExplicacion(false);
    setQuizFin(false); setAciertos(0);
  }, [lecId]);

  if (!modulo || !leccion) return <div className="p-8 text-center">Lección no encontrada.</div>;

  const yaCompletada = completadas.includes(leccion.id);

  // Navegación entre lecciones
  const todasLecciones = modulos.flatMap(m => m.lecciones.map(l => ({ modId: m.id, lecId: l.id })));
  const idxActual = todasLecciones.findIndex(x => x.modId === modId && x.lecId === lecId);
  const anterior = idxActual > 0 ? todasLecciones[idxActual - 1] : null;
  const siguiente = idxActual < todasLecciones.length - 1 ? todasLecciones[idxActual + 1] : null;

  const completar = async () => {
    if (!user || yaCompletada) {
      if (siguiente) navigate(`/curso/${siguiente.modId}/${siguiente.lecId}`);
      return;
    }
    setCompletando(true);
    const puntos = leccion.tipo === 'quiz' ? aciertos * 100 : 100;
    await marcarCompletada(user.id, leccion.id, puntos);
    setCompletadas(prev => [...prev, leccion.id]);
    setCompletando(false);
    if (siguiente) navigate(`/curso/${siguiente.modId}/${siguiente.lecId}`);
    else navigate('/dashboard');
  };

  const responder = (idx: number) => {
    if (seleccion !== null) return;
    setSeleccion(idx);
    setMostrarExplicacion(true);
    if (leccion.quiz && idx === leccion.quiz[quizIdx].correcta) setAciertos(a => a + 1);
  };

  const siguientePregunta = () => {
    if (!leccion.quiz) return;
    if (quizIdx + 1 < leccion.quiz.length) {
      setQuizIdx(q => q + 1); setSeleccion(null); setMostrarExplicacion(false);
    } else {
      setQuizFin(true);
    }
  };

  const renderContenido = () => {
    const lines = leccion.contenido.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-brand-text mt-6 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-brand-text mt-5 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith('#### ')) return <h4 key={i} className="font-bold text-brand-purple mt-4 mb-1">{line.slice(5)}</h4>;
      if (line.startsWith('- ')) {
        const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        return <li key={i} className="ml-4 mb-1 text-brand-text/80" dangerouslySetInnerHTML={{ __html: text }} />;
      }
      if (line.startsWith('> ')) return (
        <blockquote key={i} className="border-l-4 border-brand-purple pl-4 my-3 italic text-brand-text/70 bg-purple-50/50 py-2 rounded-r-xl">{line.slice(2)}</blockquote>
      );
      if (line.match(/^\d+\. /)) {
        const text = line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <li key={i} className="ml-4 mb-1 list-decimal text-brand-text/80" dangerouslySetInnerHTML={{ __html: text }} />;
      }
      if (line === '') return <div key={i} className="h-3" />;
      const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
      return <p key={i} className="text-brand-text/80 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: html }} />;
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-brand-text/60 hover:text-brand-purple text-sm">
            ← Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-text/40">Módulo {modulo.numero}</span>
            <span className="text-brand-text/20">·</span>
            <span className="text-xs font-medium text-brand-text/60 truncate max-w-32">{leccion.titulo}</span>
          </div>
          <div className="text-xs text-brand-text/40">{idxActual + 1}/{todasLecciones.length}</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
        {/* Header lección */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{modulo.icono}</span>
            <span className="text-xs text-brand-purple font-semibold">MÓDULO {modulo.numero} · {modulo.titulo.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-text">{leccion.titulo}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs bg-purple-100 text-brand-purple px-2.5 py-1 rounded-full font-medium">
              {leccion.tipo === 'lectura' ? '📖 Lectura' : leccion.tipo === 'quiz' ? '✏️ Quiz' : '🎯 Práctica'}
            </span>
            <span className="text-xs text-brand-text/40">⏱ {leccion.duracion}</span>
            {yaCompletada && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">✓ Completada</span>}
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white border border-purple-100 rounded-2xl p-6 mb-6">
          {leccion.tipo !== 'quiz' && (
            <div className="prose max-w-none">{renderContenido()}</div>
          )}

          {/* Quiz */}
          {leccion.tipo === 'quiz' && leccion.quiz && (
            <div>
              {!quizFin ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-brand-text/50">Pregunta {quizIdx + 1} de {leccion.quiz.length}</span>
                    <span className="text-sm font-medium text-brand-purple">{aciertos} correctas</span>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 mb-4">
                    <h3 className="font-bold text-brand-text">{leccion.quiz[quizIdx].pregunta}</h3>
                  </div>
                  <div className="space-y-2">
                    {leccion.quiz[quizIdx].opciones.map((op, i) => {
                      const esCorrecta = i === leccion.quiz![quizIdx].correcta;
                      const esSeleccionada = i === seleccion;
                      let cls = 'border rounded-xl px-4 py-3 text-sm w-full text-left transition-all ';
                      if (seleccion === null) cls += 'border-purple-200 hover:border-brand-purple hover:bg-purple-50 cursor-pointer';
                      else if (esCorrecta) cls += 'border-green-400 bg-green-50 text-green-800';
                      else if (esSeleccionada) cls += 'border-red-400 bg-red-50 text-red-800';
                      else cls += 'border-purple-100 text-brand-text/40';
                      return (
                        <button key={i} className={cls} onClick={() => responder(i)} disabled={seleccion !== null}>
                          <span className="mr-2">{esCorrecta && seleccion !== null ? '✓' : esSeleccionada ? '✗' : `${String.fromCharCode(65 + i)}.`}</span>
                          {op}
                        </button>
                      );
                    })}
                  </div>
                  {mostrarExplicacion && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in">
                      <p className="text-blue-800 text-sm"><strong>💡 </strong>{leccion.quiz[quizIdx].explicacion}</p>
                      <button onClick={siguientePregunta} className="mt-3 gradient-brand text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {quizIdx + 1 < leccion.quiz.length ? 'Siguiente pregunta →' : 'Ver resultados →'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 animate-slide-up">
                  <div className="text-5xl mb-3">{aciertos === leccion.quiz.length ? '🏆' : aciertos >= leccion.quiz.length / 2 ? '👏' : '💪'}</div>
                  <h3 className="text-xl font-bold text-brand-text mb-1">{aciertos} de {leccion.quiz.length} correctas</h3>
                  <p className="text-brand-text/50 text-sm mb-2">
                    {aciertos === leccion.quiz.length ? '¡Perfecto! Dominas este tema' :
                     aciertos >= leccion.quiz.length / 2 ? '¡Buen trabajo! Sigue practicando' :
                     'Puedes repasar el contenido e intentarlo de nuevo'}
                  </p>
                  <div className="text-2xl font-bold gradient-brand-text">{Math.round((aciertos / leccion.quiz.length) * 100)}%</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navegación */}
        <div className="flex items-center justify-between gap-3">
          {anterior ? (
            <Link to={`/curso/${anterior.modId}/${anterior.lecId}`} className="flex items-center gap-2 text-sm text-brand-text/50 hover:text-brand-purple">
              ← Anterior
            </Link>
          ) : <div />}

          <button
            onClick={completar}
            disabled={completando || (leccion.tipo === 'quiz' && !quizFin)}
            className="gradient-brand text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50"
          >
            {completando ? 'Guardando...' : yaCompletada ? (siguiente ? 'Siguiente →' : '🎉 Finalizar') : (siguiente ? 'Completar y seguir →' : '🎉 Terminar curso')}
          </button>
        </div>
      </main>
    </div>
  );
}
