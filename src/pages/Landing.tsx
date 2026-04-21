import { Link } from 'react-router-dom';
import { modulos, totalLecciones } from '../data/curso';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-bold text-brand-text">
              Academ<span className="gradient-brand-text">IA</span>
            </span>
          </div>
          <div className="flex gap-2">
            <Link to="/login" className="text-sm text-brand-text/70 hover:text-brand-purple px-3 py-1.5">Iniciar sesión</Link>
            <Link to="/registro" className="text-sm gradient-brand text-white px-4 py-1.5 rounded-lg font-medium">Comenzar gratis</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-brand-bg to-blue-50 -z-10" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white border border-purple-200 rounded-full px-4 py-1.5 text-sm text-brand-purple mb-6">
            <span>✨</span> Aprende IA sin conocimientos técnicos
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-text mb-6 leading-tight">
            Domina <span className="gradient-brand-text">Claude</span> y<br />transforma tu vida
          </h1>
          <p className="text-lg text-brand-text/60 mb-8 max-w-2xl mx-auto">
            El primer curso en español diseñado para principiantes. Aprende a usar la IA más avanzada del mundo para ser más productivo, creativo y eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/registro" className="gradient-brand text-white px-8 py-3.5 rounded-xl font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-purple-200">
              Comenzar gratis →
            </Link>
            <Link to="/curso" className="bg-white border border-purple-200 text-brand-text px-8 py-3.5 rounded-xl font-medium text-base hover:bg-purple-50">
              Ver el curso
            </Link>
          </div>
          <p className="text-sm text-brand-text/40 mt-4">Sin tarjeta de crédito · {totalLecciones} lecciones · 100% en español</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-purple-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-6 text-center">
          {[
            { valor: `${totalLecciones}`, label: 'Lecciones' },
            { valor: `${modulos.length}`, label: 'Módulos' },
            { valor: '100%', label: 'Gratis para empezar' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold gradient-brand-text">{s.valor}</div>
              <div className="text-sm text-brand-text/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Módulos */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-text mb-3">Lo que vas a aprender</h2>
          <p className="text-brand-text/50">Un camino paso a paso desde cero hasta experto</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modulos.map((mod) => (
            <div key={mod.id} className="bg-white border border-purple-100 rounded-2xl p-5 hover:shadow-lg hover:shadow-purple-100 transition-all hover:-translate-y-0.5">
              <div className="text-3xl mb-3">{mod.icono}</div>
              <div className="text-xs font-semibold text-brand-purple mb-1">MÓDULO {mod.numero}</div>
              <h3 className="font-bold text-brand-text mb-2">{mod.titulo}</h3>
              <p className="text-sm text-brand-text/50 mb-3">{mod.descripcion}</p>
              <div className="text-xs text-brand-text/40">{mod.lecciones.length} lecciones</div>
            </div>
          ))}
        </div>
      </section>

      {/* Para quién */}
      <section className="bg-white border-y border-purple-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-text text-center mb-10">¿Para quién es este curso?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '👩‍💼', titulo: 'Profesionales', desc: 'Que quieren ser más productivos en su trabajo' },
              { icon: '🏪', titulo: 'Emprendedores', desc: 'Que quieren usar IA para hacer crecer su negocio' },
              { icon: '👩‍🎓', titulo: 'Estudiantes', desc: 'Que quieren mejorar su aprendizaje y tareas' },
              { icon: '👴', titulo: 'Cualquier persona', desc: 'Sin importar la edad ni conocimientos técnicos' },
            ].map((item) => (
              <div key={item.titulo} className="flex gap-4 p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-brand-text">{item.titulo}</div>
                  <div className="text-sm text-brand-text/50">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="gradient-brand rounded-3xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-3">¿Listo para empezar?</h2>
            <p className="text-white/70 mb-6">Únete y domina Claude desde cero. Totalmente gratis.</p>
            <Link to="/registro" className="bg-white text-brand-purple font-bold px-8 py-3 rounded-xl hover:bg-purple-50 inline-block">
              Crear cuenta gratis →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-100 py-6 text-center text-sm text-brand-text/30">
        AcademIA · Aprende Claude IA en español
      </footer>
    </div>
  );
}
