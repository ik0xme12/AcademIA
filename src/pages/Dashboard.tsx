import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, getProgreso } from '../lib/supabase';
import { modulos, totalLecciones } from '../data/curso';
import type { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [completadas, setCompletadas] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate('/login'); return; }
      setUser(data.user);
      getProgreso(data.user.id).then(setCompletadas);
    });
  }, [navigate]);

  const porcentaje = totalLecciones > 0 ? Math.round((completadas.length / totalLecciones) * 100) : 0;
  const nombre = user?.user_metadata?.nombre || user?.email?.split('@')[0] || 'Estudiante';

  const encontrarSiguiente = () => {
    for (const mod of modulos) {
      for (const lec of mod.lecciones) {
        if (!completadas.includes(lec.id)) return { modId: mod.id, lecId: lec.id };
      }
    }
    return null;
  };
  const siguiente = encontrarSiguiente();

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-bold text-brand-text">Academ<span className="gradient-brand-text">IA</span></span>
          </Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate('/'); }}
            className="text-sm text-brand-text/50 hover:text-brand-purple"
          >
            Salir
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="gradient-brand rounded-2xl p-6 text-white mb-6 animate-slide-up">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-white/70 text-sm">Bienvenido de vuelta,</p>
              <h1 className="text-2xl font-bold capitalize">{nombre} 👋</h1>
              <p className="text-white/70 text-sm mt-1">
                {porcentaje === 100 ? '¡Completaste el curso! 🎉' :
                 porcentaje === 0 ? 'Empieza tu primer lección hoy' :
                 `Vas ${porcentaje}% del camino`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{porcentaje}%</div>
              <div className="text-white/60 text-xs">completado</div>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${porcentaje}%` }} />
          </div>
          <div className="mt-1 text-white/60 text-xs">{completadas.length} de {totalLecciones} lecciones</div>
        </div>

        {/* Continuar */}
        {siguiente && (
          <div className="bg-white border border-purple-100 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-brand-purple font-semibold mb-1">CONTINUAR APRENDIENDO</div>
              <div className="font-semibold text-brand-text">
                {modulos.find(m => m.id === siguiente.modId)?.lecciones.find(l => l.id === siguiente.lecId)?.titulo}
              </div>
            </div>
            <Link
              to={`/curso/${siguiente.modId}/${siguiente.lecId}`}
              className="gradient-brand text-white px-5 py-2.5 rounded-xl font-medium text-sm shrink-0 hover:opacity-90"
            >
              Continuar →
            </Link>
          </div>
        )}

        {/* Módulos */}
        <h2 className="font-bold text-brand-text text-lg mb-4">Todos los módulos</h2>
        <div className="space-y-3">
          {modulos.map((mod) => {
            const completadasMod = mod.lecciones.filter(l => completadas.includes(l.id)).length;
            const pct = Math.round((completadasMod / mod.lecciones.length) * 100);
            return (
              <div key={mod.id} className="bg-white border border-purple-100 rounded-2xl p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{mod.icono}</div>
                    <div>
                      <div className="text-xs text-brand-purple/60 font-medium">MÓDULO {mod.numero}</div>
                      <div className="font-semibold text-brand-text">{mod.titulo}</div>
                      <div className="text-xs text-brand-text/40">{completadasMod}/{mod.lecciones.length} lecciones</div>
                    </div>
                  </div>
                  <Link
                    to={`/curso/${mod.id}/${mod.lecciones[0].id}`}
                    className="text-sm text-brand-purple font-medium hover:underline shrink-0"
                  >
                    {completadasMod === mod.lecciones.length ? '✓ Completado' : pct > 0 ? 'Continuar →' : 'Empezar →'}
                  </Link>
                </div>
                {pct > 0 && (
                  <div className="mt-3 bg-purple-100 rounded-full h-1.5">
                    <div className="gradient-brand rounded-full h-1.5 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
