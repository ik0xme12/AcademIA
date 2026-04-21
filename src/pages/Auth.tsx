import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Auth({ modo }: { modo: 'login' | 'registro' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      if (modo === 'registro') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nombre } },
        });
        if (error) throw error;
        setMensaje('¡Cuenta creada! Revisa tu correo para confirmar.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      if (msg.includes('Invalid login')) setError('Correo o contraseña incorrectos');
      else if (msg.includes('already registered')) setError('Este correo ya está registrado');
      else setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 via-brand-bg to-blue-50">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-xl text-brand-text">
              Academ<span className="gradient-brand-text">IA</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-brand-text mt-4">
            {modo === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta gratis'}
          </h1>
          <p className="text-brand-text/50 text-sm mt-1">
            {modo === 'login' ? 'Ingresa para continuar tu aprendizaje' : 'Empieza a aprender Claude hoy'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100 border border-purple-100 p-6">
          {mensaje ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">📧</div>
              <p className="text-brand-text font-medium">{mensaje}</p>
              <Link to="/login" className="text-brand-purple text-sm mt-4 inline-block hover:underline">
                Ir a iniciar sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {modo === 'registro' && (
                <div>
                  <label className="block text-sm font-medium text-brand-text/70 mb-1">Nombre</label>
                  <input
                    type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-brand-text/70 mb-1">Correo electrónico</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text/70 mb-1">Contraseña</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full border border-purple-200 rounded-xl px-4 py-2.5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                  required minLength={8}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
                  {error}
                </div>
              )}

              <button
                type="submit" disabled={cargando}
                className="w-full gradient-brand text-white py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {cargando ? 'Cargando...' : modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta gratis'}
              </button>
            </form>
          )}

          {!mensaje && (
            <p className="text-center text-sm text-brand-text/50 mt-4">
              {modo === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <Link to={modo === 'login' ? '/registro' : '/login'} className="text-brand-purple font-medium hover:underline">
                {modo === 'login' ? 'Regístrate gratis' : 'Inicia sesión'}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
