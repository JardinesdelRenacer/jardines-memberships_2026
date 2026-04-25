import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/lib/supabaseClient.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { adminId, batch } = req.body;

        if (!adminId || !batch || !Array.isArray(batch)) {
            return res.status(400).json({ success: false, message: 'Datos incompletos' });
        }

        const resultados = { exitosos: 0, errores: 0, detalles: [] as any[] };

        for (const fila of batch) {
            try {
                const idPersonaRaw = fila.IDPERSONA?.toString()?.trim() || fila.idPersona?.toString()?.trim() || '';
                const cedulaRaw = fila.CEDULA?.toString()?.trim() || fila.cedula?.toString()?.trim() || idPersonaRaw;
                const contratoRaw = fila.IDCONTRATO?.toString()?.trim() || fila.idContrato?.toString()?.trim() || idPersonaRaw;
                
                const estadoRaw = fila.ESTADO?.toString()?.trim()?.toLowerCase() || fila.estado?.toString()?.trim()?.toLowerCase() || '';
                const estadoLimpio = ['activo', 'inactivo', 'suspendido', 'cancelado'].includes(estadoRaw) ? estadoRaw : 'activo';

                if (!cedulaRaw) throw new Error("Falta IDPERSONA o Cédula");

                const { error } = await supabase.from('contratantes').upsert({
                    nombre_contratante: fila.NOMBRES || fila.nombreContratante || 'SIN NOMBRE',
                    cedula: cedulaRaw,
                    id_contrato: contratoRaw,
                    id_persona: idPersonaRaw,
                    celular: fila.CELULAR?.toString()?.trim() || fila.celular?.toString()?.trim() || 'NO REGISTRA',
                    email: fila.email || '',
                    edad_actual: parseInt(fila.edadActual) || 0,
                    fecha_nacimiento: fila.fechaNacimiento || null,
                    estado: estadoLimpio,
                    zona: fila.ZONA || fila.zona || 'NO REGISTRA',
                    ciudad: fila.ciudad || '',
                    departamento: fila.departamento || '',
                    direccion: fila.direccion || '',
                    tipo_plan: fila.tipoPlan || '',
                    ultimo_pago: fila.ultimoPago || null,
                    deuda: parseFloat(fila.deuda) || 0,
                    cargado_por: adminId
                }, { onConflict: 'cedula' });

                if (error) {
                    resultados.errores++;
                    resultados.detalles.push({ cedula: fila.cedula, error: error.message });
                } else {
                    resultados.exitosos++;
                }
            } catch (error: any) {
                resultados.errores++;
                resultados.detalles.push({ cedula: fila.cedula, error: error.message });
            }
        }

        return res.status(200).json({ success: true, resultados });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}