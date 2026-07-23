import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The string to insert for the new templates
new_templates = """,
    "videonistagmografia": {
        id: "videonistagmografia",
        internalCode: "954402",
        name: "Videonistagmografía",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (arr) => arr[Math.floor(Math.random() * arr.length)];
            
            // Randomize some clinical data for variance
            const quirurgicos = osc(["(+) Histerectomía - Otros", "(-) Niega", "(+) Apendicectomía", "(-) Sin antecedentes"]);
            const patologicos = osc(["(+) HTA - Diabetes", "(-) Niega", "(+) Hipertensión", "(+) Hipotiroidismo"]);
            const medicamentos = osc(["(+) Valsartán - Otros", "(-) Niega", "(+) Losartán", "(+) Levotiroxina"]);
            const visuales = osc(["(+) No específicos", "(-) Niega", "(+) Miopía", "(+) Astigmatismo"]);
            const traumatismos = osc(["(-) Niega", "(-) Sin historial", "(+) Trauma leve hace años", "(-) Niega trauma"]);
            
            const sacadicas = osc(["Movimientos rápidos normales", "Ligeramente disminuidos pero simétricos"]);
            const rastreo = osc(["Movimientos lentos normales", "Rastreo conservado"]);
            const nistagmoOpto = osc(["Normal simétrico", "Respuesta simétrica"]);
            
            const pruebaMono = osc([
                "Revela una baja frecuencia nistágmica derecha, hallazgo patognomónico que sugiere una hipofunción canalicular derecha de origen periférico.",
                "Revela una baja frecuencia nistágmica izquierda, hallazgo patognomónico que sugiere una hipofunción canalicular izquierda de origen periférico.",
                "Simetría en las respuestas, sin evidencia de hipofunción canalicular significativa.",
                "Respuestas dentro de límites normales, sin asimetrías."
            ]);
            
            const dixhallpike = pruebaMono.includes("hipofunción") ? osc(["Positiva para estimulación del canal semicircular respectivo, correlacionada de forma directa con la sintomatología posicional de la paciente.", "Ligeramente positiva con nistagmo transitorio."]) : "Negativa, sin desencadenamiento de nistagmo o vértigo.";
            
            let conclusion = "";
            let planManejo = "";
            if (pruebaMono.includes("derecha")) {
                conclusion = "El análisis integral de los registros nistagmográficos revela un compromiso vestibular periférico derecho caracterizado por:\\n• Hipofunción canalicular derecha (confirmada por estimulación monotérmica).\\n• Canalitiasis posterior derecha (asociada clínicamente a vértigo posicional).";
                planManejo = "1. Valoración Especializada: Retomar a consulta con su médico tratante u Otorrinolaringólogo (ORL) para el seguimiento de comorbilidades (HTA/Diabetes) y control farmacológico.\\n2. Terapia de Reposicionamiento Canalicular: Ejecución de maniobras específicas en consultorio (ej. Maniobra de Epley para canal posterior derecho) para resolver la canalitiasis de manera inmediata.\\n3. Rehabilitación Vestibular: Sesiones guiadas de fonoaudiología/otoneurología encaminadas a potenciar la compensación central de la hipofunción vestibular derecha detectada.";
            } else if (pruebaMono.includes("izquierda")) {
                conclusion = "El análisis integral de los registros nistagmográficos revela un compromiso vestibular periférico izquierdo caracterizado por:\\n• Hipofunción canalicular izquierda (confirmada por estimulación monotérmica).\\n• Canalitiasis posterior izquierda (asociada clínicamente a vértigo posicional).";
                planManejo = "1. Valoración Especializada: Retomar a consulta con su médico tratante u Otorrinolaringólogo (ORL) para el seguimiento de comorbilidades (HTA/Diabetes) y control farmacológico.\\n2. Terapia de Reposicionamiento Canalicular: Ejecución de maniobras específicas en consultorio (ej. Maniobra de Epley para canal posterior izquierdo) para resolver la canalitiasis de manera inmediata.\\n3. Rehabilitación Vestibular: Sesiones guiadas de fonoaudiología/otoneurología encaminadas a potenciar la compensación central de la hipofunción vestibular izquierda detectada.";
            } else {
                conclusion = "El análisis integral de los registros nistagmográficos NO revela compromiso vestibular periférico evidente. Función vestibular bilateral conservada y simétrica.";
                planManejo = "1. Valoración Especializada: Retomar a consulta con su médico tratante u Otorrinolaringólogo (ORL).\\n2. Observación: Manejo conservador según evolución clínica.\\n3. Control: Según criterio de su médico tratante.";
            }

            return {
                pageSize: 'LETTER',
                pageMargins: [30, 20, 30, 20],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 450, opacity: 0.05, absolutePosition: { x: 80, y: 250 } }; },
                content: [
                    { text: 'Videonistagmografía', style: 'headerTitle' },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 550, y2: 0, lineWidth: 1, lineColor: '#2e5a88' }], margin: [0, 5, 0, 10] },
                    {
                        table: {
                            widths: [60, '*', 60, '*'],
                            body: [
                                [ { text: 'Paciente:', bold: true }, cleanName(data.PACIENTE_NOMBRE), { text: 'Fecha:', bold: true }, data.FECHA ],
                                [ { text: 'ID:', bold: true }, data.PACIENTE_ID, { text: 'Estudio:', bold: true }, 'Videonistagmografía' ]
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 0, 0, 10],
                        fontSize: 9
                    },
                    { text: 'Paciente remitida por especialista en Otorrinolaringología debido a episodios recurrentes de vértigo. A continuación se consolidan los antecedentes médicos y los hallazgos cuantitativos y cualitativos del examen.', fontSize: 9, margin: [0, 0, 0, 10] },
                    
                    {
                        columns: [
                            {
                                width: '48%',
                                stack: [
                                    { text: '| 1. Antecedentes Clínicos', bold: true, color: '#104d8c', fontSize: 11, margin: [0, 0, 0, 5] },
                                    {
                                        table: {
                                            widths: ['*', 40, '*'],
                                            body: [
                                                [ { text: 'Categoría', bold: true, color: '#104d8c', fillColor: '#f4f8fb' }, { text: 'Estado', bold: true, color: '#104d8c', fillColor: '#f4f8fb' }, { text: 'Detalle', bold: true, color: '#104d8c', fillColor: '#f4f8fb' } ],
                                                [ 'Quirúrgicos', { text: quirurgicos.includes('(+)') ? '(+)' : '(-)', color: quirurgicos.includes('(+)') ? 'red' : 'green', bold: true }, quirurgicos.replace('(+) ', '').replace('(-) ', '') ],
                                                [ 'Patológicos', { text: patologicos.includes('(+)') ? '(+)' : '(-)', color: patologicos.includes('(+)') ? 'red' : 'green', bold: true }, patologicos.replace('(+) ', '').replace('(-) ', '') ],
                                                [ 'Medicamentos', { text: medicamentos.includes('(+)') ? '(+)' : '(-)', color: medicamentos.includes('(+)') ? 'red' : 'green', bold: true }, medicamentos.replace('(+) ', '').replace('(-) ', '') ],
                                                [ 'Visuales', { text: visuales.includes('(+)') ? '(+)' : '(-)', color: visuales.includes('(+)') ? 'red' : 'green', bold: true }, visuales.replace('(+) ', '').replace('(-) ', '') ],
                                                [ 'Traumatismos', { text: traumatismos.includes('(+)') ? '(+)' : '(-)', color: traumatismos.includes('(+)') ? 'red' : 'green', bold: true }, traumatismos.replace('(+) ', '').replace('(-) ', '') ]
                                            ]
                                        },
                                        layout: 'lightHorizontalLines',
                                        fontSize: 8.5
                                    }
                                ]
                            },
                            { width: '4%', text: '' },
                            {
                                width: '48%',
                                stack: [
                                    { text: '| 2. Protocolo Oculomotor', bold: true, color: '#104d8c', fontSize: 11, margin: [0, 0, 0, 5] },
                                    {
                                        table: {
                                            widths: ['*', '*'],
                                            body: [
                                                [ { text: 'Prueba Evaluada', bold: true, color: '#104d8c', fillColor: '#f4f8fb' }, { text: 'Resultado / Estado', bold: true, color: '#104d8c', fillColor: '#f4f8fb' } ],
                                                [ 'Sacádicas Oculares', { text: sacadicas, color: 'green' } ],
                                                [ 'Rastreo Pendular', { text: rastreo, color: 'green' } ],
                                                [ 'Nistagmo Optocinético', { text: nistagmoOpto, color: 'green' } ],
                                                [ 'Nistagmo Espontáneo', 'Ausente' ],
                                                [ 'Fijación de Mirada (Gaze)', 'Ausente' ]
                                            ]
                                        },
                                        layout: 'lightHorizontalLines',
                                        fontSize: 8.5
                                    }
                                ]
                            }
                        ], margin: [0, 0, 0, 15]
                    },

                    { text: '| 3. Pruebas Vestibulares Específicas', bold: true, color: '#104d8c', fontSize: 11, margin: [0, 0, 0, 5] },
                    {
                        table: {
                            widths: [130, '*'],
                            body: [
                                [ { text: 'Prueba', bold: true, color: '#104d8c', fillColor: '#f4f8fb' }, { text: 'Hallazgos Clínicos / Interpretación Tecnológica', bold: true, color: '#104d8c', fillColor: '#f4f8fb' } ],
                                [ { text: 'Prueba Monotérmica', bold: true }, pruebaMono ],
                                [ { text: 'Prueba de Dix Hallpike', bold: true }, dixhallpike ],
                                [ { text: 'Rotación de Cabeza Activa', bold: true }, 'Ausente de respuestas anormales o asimetrías dinámicas adicionales.' ]
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        fontSize: 9, margin: [0, 0, 0, 15]
                    },

                    {
                        stack: [
                            { text: '4. Conclusiones Diagnósticas', bold: true, color: '#c46a1e', fontSize: 10.5, margin: [0, 0, 0, 3] },
                            { text: conclusion, fontSize: 9.5 }
                        ],
                        margin: [0, 0, 0, 15],
                        padding: [10, 10, 10, 10],
                        fillColor: '#fdf8f4'
                    },

                    { text: '| 5. Plan de Manejo Recomendado', bold: true, color: '#104d8c', fontSize: 11, margin: [0, 0, 0, 5] },
                    { text: planManejo, fontSize: 9.5, margin: [0, 0, 0, 20] },

                    signature ? { image: signature.data, width: 120, alignment: 'right', margin: [0, 5, 0, 0] } : { text: '__________________________\\nYARIELA IBAÑEZ GUERRA\\nFonoaudióloga - Especialista en Audiología\\nT.P. 12 - 02211', alignment: 'right', margin: [0, 15, 0, 0], fontSize: 9 }
                ],
                styles: {
                    headerTitle: { fontSize: 16, bold: true, alignment: 'center', color: '#104d8c' }
                }
            };
        }
    },
    "potencial_evocado_auditivo": {
        id: "potencial_evocado_auditivo",
        internalCode: "954626",
        name: "Potencial Evocado Auditivo",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const dbVal = [20, 25, 30][Math.floor(Math.random() * 3)];
            let conclusion = "";
            if (dbVal === 20) conclusion = "Los resultados electrofisiológicos obtenidos se correlacionan con una audición dentro de los parámetros de normalidad en frecuencias agudas para ambos oídos.";
            else if (dbVal === 25) conclusion = "Los resultados electrofisiológicos obtenidos sugieren una audición dentro de límites normales bajos en frecuencias agudas para ambos oídos.";
            else conclusion = "Los resultados electrofisiológicos revelan una leve disminución de respuesta, sugiriendo hipoacusia leve en frecuencias agudas.";

            return {
                pageSize: 'LETTER',
                pageMargins: [40, 40, 40, 40],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 450, opacity: 0.05, absolutePosition: { x: 80, y: 250 } }; },
                content: [
                    { text: 'ELECTROFISIOLOGÍA AUDITIVA', style: 'mainHeader' },
                    { text: 'Potencial Evocado Auditivo', style: 'subHeader' },
                    {
                        table: {
                            widths: [100, '*'],
                            body: [
                                [ { text: 'Paciente:', bold: true }, cleanName(data.PACIENTE_NOMBRE) ],
                                [ { text: 'Documento:', bold: true }, data.PACIENTE_ID ],
                                [ { text: 'Fecha:', bold: true }, data.FECHA ]
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 10, 0, 15],
                        fontSize: 9.5
                    },
                    { text: [ { text: 'MOTIVO DE CONSULTA: ', bold: true }, 'Valoración electrofisiológica de control para determinar el estado actual de su audición.' ], fontSize: 9.5, margin: [0, 0, 0, 15] },
                    
                    { text: '1. Parámetros Técnicos de Estimulación', style: 'sectionTitle' },
                    {
                        table: {
                            widths: [180, '*'],
                            body: [
                                [ { text: 'Parámetro', bold: true, color: '#2e5a88', fillColor: '#f4f8fb' }, { text: 'Configuración Aplicada', bold: true, color: '#2e5a88', fillColor: '#f4f8fb' } ],
                                [ { text: 'Estímulo Utilizado', bold: true }, 'Click CE Chirp (Rastrea un rango frecuencial más amplio que el click convencional, entre 177 Hz y 11.000 Hz)' ],
                                [ { text: 'Intensidades Evaluadas', bold: true }, '40, 35 y 20 dB nHL' ],
                                [ { text: 'Tasa de Estimulación', bold: true }, '44.1 m/seg' ],
                                [ { text: 'Polaridad & Presentación', bold: true }, 'Alternante / Monoaural' ],
                                [ { text: 'Ventana de Registro', bold: true }, '16 mseg' ]
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        fontSize: 9, margin: [0, 0, 0, 20]
                    },

                    { text: '2. Resultados Electroneurofisiológicos', style: 'sectionTitle' },
                    { text: 'Durante el barrido electrofisiológico, se analizó el comportamiento de la vía auditiva aferente a nivel del tallo cerebral bajo las diferentes intensidades acústicas suministradas de forma monoaural. Se resalta el siguiente hallazgo crítico de respuesta:', fontSize: 9.5, margin: [0, 0, 0, 10] },
                    {
                        table: {
                            widths: [180, '*'],
                            body: [
                                [ { text: 'Componente Evaluado', bold: true, color: '#2e5a88', fillColor: '#f4f8fb' }, { text: 'Presencia y Umbral Observado', bold: true, color: '#2e5a88', fillColor: '#f4f8fb' } ],
                                [ { text: 'Onda V (Oído Izquierdo / Derecho)', bold: true }, { text: `La onda V se encuentra presente hasta ${dbVal} dB nHL de intensidad en ambos oídos de forma simétrica.`, bold: true, color: 'green' } ]
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        fontSize: 9, margin: [0, 0, 0, 20]
                    },

                    {
                        stack: [
                            { text: '3. Conclusiones del Estudio', bold: true, color: '#2e5a88', fontSize: 10.5, margin: [0, 0, 0, 5] },
                            { text: conclusion, bold: true, fontSize: 9.5 }
                        ],
                        margin: [0, 0, 0, 20],
                        padding: [10, 10, 10, 10],
                        fillColor: '#f2fbf5'
                    },

                    { text: '4. Recomendaciones Clínicas', style: 'sectionTitle' },
                    {
                        ul: [
                            'Control y entrega de resultados a médico tratante.'
                        ],
                        fontSize: 9.5, margin: [0, 0, 0, 30]
                    },

                    signature ? { image: signature.data, width: 120, margin: [0, 5, 0, 0] } : { text: '__________________________\\nJESSICA BRAVO DÍAZ\\nM.D. Audióloga\\nR.M. 1045708705', margin: [0, 15, 0, 0], fontSize: 9 }
                ],
                styles: {
                    mainHeader: { fontSize: 16, bold: true, alignment: 'center', color: '#104d8c' },
                    subHeader: { fontSize: 14, bold: true, alignment: 'center', color: '#8b1f1f', decoration: 'underline', margin: [0, 5, 0, 15] },
                    sectionTitle: { fontSize: 11, bold: true, color: '#104d8c', margin: [0, 0, 0, 5] }
                }
            };
        }
    }"""

# Insert at the end of CATALOG (before the closing "};")
# We know the closing "};" of CATALOG is around line 1232, followed by let selectedStudy = null;
content = re.sub(r'(\n    \}\n\};\n\n// --- 2\. VARIABLES DE ESTADO ---)', new_templates + r'\1', content)

# Now update CUP_MAP
new_map = """    "950602": "interferometria",
    "954402": "videonistagmografia",
    "954626": "potencial_evocado_auditivo"
};"""
content = re.sub(r'    "950602": "interferometria"\n\};', new_map, content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated app.js")
