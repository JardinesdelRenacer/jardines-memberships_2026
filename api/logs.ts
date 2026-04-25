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

            return res.status(200).json({ success: true, data: logs });
        } catch (error: any) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}