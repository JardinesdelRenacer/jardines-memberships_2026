import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/lib/supabaseClient.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        try {
            // Buscar las últimas 30 consultas, de la más reciente a la más antigua
            const { data: logs, error } = await supabase
                .from('logs_acceso')
                .select('cedula_consultada, tipo_accion, created_at')
                .like('tipo_accion', 'consulta_publica%')
                .order('created_at', { ascending: false })
                .limit(30);

            if (error) throw error;

            // Enriquecer los logs buscando el nombre del contratante
            const logsConNombres = await Promise.all(logs.map(async (log) => {
                let nombre = 'No registrado';
                if (log.tipo_accion === 'consulta_publica_exitosa') {
                    const val = log.cedula_consultada;
                    const { data } = await supabase
                        .from('contratantes')
                        .select('nombre_contratante')
                        .or(`cedula.ilike.${val},id_persona.ilike.${val},id_contrato.ilike.${val}`)
                        .limit(1);
                        
                    if (data && data.length > 0) {
                        nombre = data[0].nombre_contratante;
                    }
                }
                return { ...log, nombre_persona: nombre };
            }));

            return res.status(200).json({ success: true, data: logsConNombres });
        } catch (error: any) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}