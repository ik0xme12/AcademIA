import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserProgress = {
  user_id: string;
  leccion_id: string;
  completada: boolean;
  puntos: number;
};

export async function getProgreso(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from('progreso')
    .select('leccion_id')
    .eq('user_id', userId)
    .eq('completada', true);
  return (data ?? []).map((r: { leccion_id: string }) => r.leccion_id);
}

export async function marcarCompletada(userId: string, leccionId: string, puntos: number) {
  await supabase.from('progreso').upsert({
    user_id: userId,
    leccion_id: leccionId,
    completada: true,
    puntos,
  }, { onConflict: 'user_id,leccion_id' });
}
