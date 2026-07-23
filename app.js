
// --- 0. FUNCIONES DE UTILIDAD Y BANCO DE DATOS ---
const cleanName = (str) => {
    if (!str) return '';
    let cleaned = str.toString().trim();
    cleaned = cleaned.replace(/^(CC|C\.C\.|C\.C|CC\.)\s+/i, '');
    cleaned = cleaned.replace(/Ã‘/g, 'Ñ').replace(/Ã‘/g, 'ñ').replace(/Ã‘/g, 'Ñ');
    cleaned = cleaned.replace(/Ã'A/g, 'ÑA').replace(/Ã'a/g, 'ña');
    cleaned = cleaned.replace(/Ã /g, 'À').replace(/Ã¡/g, 'á').replace(/Ã©/g, 'é').replace(/Ã/g, 'í').replace(/Ã³/g, 'ó').replace(/Ãº/g, 'ú');
    return cleaned.toUpperCase();
};

const isValidPatientName = (name) => {
    if (!name) return false;
    let nameClean = name.toString().toUpperCase().trim();
    nameClean = nameClean.replace(/^(PACIENTE|PTE|NOMBRE|USUARIO|AFILIADO|MEDICO|DOCTOR|DR|DRA|CC|TI|RC|CE|PA|PEP|PPT|MS|AS)\s*[:.-]?\s*/, "");
    nameClean = nameClean.trim();
    
    if (nameClean.length < 4 || nameClean.length > 60) return false;
    if (/\d/.test(nameClean)) return false;
    
    const forbiddenWords = [
        "FACTURA", "RESOLUCION", "DIAN", "AUTORIZADO", "OFTALMOLOGICA", "CARIBE",
        "BIOMETRIA", "OCULAR", "CELULAS", "ENDOTELIALES", "TOMOGRAFIA", "OPTICA",
        "COHERENTE", "SEGMENTO", "ANTERIOR", "POSTERIOR", "ECOGRAFIA", "ULTRABIOMICROSCOPIA",
        "PAQUIMETRIA", "UBM", "RECUENTO", "FOTO", "COLOR", "RETINOGRAFIA", "ANGIOGRAFIA",
        "OTOLOGIA", "TIMPANOMETRIA", "AUDIOMETRIA", "OTITIS", "HIPOACUSIA", "TINNITUS",
        "VERTIGO", "MENIERE", "PERFORACION", "TIMPANICA", "CERUMEN", "TAPON", "CONSULTA",
        "RINOLOGIA", "LENTES", "CONTRATO", "REGISTRO", "EMISION", "VALOR", "COPAGO", "CUOTA", 
        "MODERADORA", "REGIMEN", "COMUN", "SIMPLIFICADO", "GRAVADO", "EXENTO", "TOTAL", "SUBTOTAL",
        "DESCUENTO", "PAGO", "EFECTIVO", "TARJETA", "TRANSITO", "ESTABLE", "FOVEAL",
        "MACULAR", "EDEMA", "NEVUS", "EPITELIO", "CICATRIZ", "MEMBRANA", "EPIRRETINIANA",
        "MONOCULAR", "BILATERAL", "CANTIDAD", "CANT", "DESCRIPCION", "UNITARIO", "CIIU", "NIT", 
        "RUT", "IVA", "IMPUESTO", "SERVICIO", "PRESTACION", "FECHA", "HORA", "TELEFONO", "DIRECCION",
        "VLR", "DSCTO", "DCTO", "CODIGO", "COMPUTALIZADO", "ESTUDIO", "COMPUTARIZADO", 
        "COMPUTADA", "CORNEAL", "SIMPLE", "TOPOGRAFIA", "OFTALMOLOGICO", "DERECHO", "IZQUIERDO", 
        "AMBOS", "OJOS", "PROCEDIMIENTO", "ATENCION", "CONTROL", "REVISION", "ESPECIALISTA", 
        "MEDICO", "GENERAL", "MACULA", "NERVIO", "OPTICO", "CAMPIMETRIA", "VISUAL", "UNILATERAL", 
        "FLUORESCEINICA", "MODO", "FOTOGRAFIA", "PRIMERA", "VEZ", "MONTURA", "ENTREGA", "AYUDA", 
        "DIAGNOSTICA", "EXAMEN", "PRUEBA", "TEST", "EVALUACION", "CENTRAL", "PERIFERICO", "PERIFÉRICO", "OPTICA"
    ];
    
    // Check if it's mostly a name (not just 1 letter words)
    const words = nameClean.split(/\s+/);
    if (words.length > 0 && words.every(w => w.length < 3)) return false;
    
    for (const word of forbiddenWords) {
        // exact word match to avoid false positives on names containing 'cant' (like 'CANTILLO')
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(nameClean)) {
            return false;
        }
    }
    
    return true;
};

function getCurrentLogo() {
    const selector = document.querySelector('input[name="razonSocial"]:checked');
    if (selector && selector.value === 'clinica' && typeof LOGO_CLINICA_BASE64 !== 'undefined') {
        return LOGO_CLINICA_BASE64;
    }
    return typeof LOGO_BASE64 !== 'undefined' ? LOGO_BASE64 : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
}
const LISTA_DIAGNOSTICOS = [
    "AGUJERO MACULAR DE ESPESOR PARCIAL", "AGUJERO MACULAR DE ESPESOR TOTAL ATROFICO", "DESCARTAR SEUDO AGUJERO MACULAR",
    "MEMBRANA EPIRRETINIANA CON ADHERENCIA FOVEAL", "MEMBRANA EPIRRETINIANA CON SINDROME DE TRACCION VITREOMACULAR",
    "MACULOPATIA POR TRACCION VITREO MACULAR", "DEGENERACION MACULAR ASOCIADA A LA EDAD TIPO SECO", "CORIORETINOPATIA SEROSA CENTRAL",
    "EDEMA MACULAR DIABETICO", "EDEMA MACULAR CISTOIDE", "MEMBRANA NEOVASCULAR SUBRETINIANA", "DRUSAS MACULARES"
];

const LISTA_CONDUCTAS = [
    "Control en 6 meses con nuevos exámenes.",
    "Valoración prioritaria por especialista en retina.",
    "Iniciar tratamiento farmacológico según guía institucional.",
    "Seguimiento estrecho y vigilancia de agudeza visual.",
    "Se recomienda realizar OCT de control en 3 meses.",
    "Paciente requiere manejo quirúrgico según evolución."
];

const LISTA_TITULOS_TOMOGRAFIA = [
    "TOMOGRAFÍA ÓPTICA DE SEGMENTO POSTERIOR",
    "TOMOGRAFÍA ÓPTICA DE SEGMENTO ANTERIOR",
    "TOMOGRAFÍA ÓPTICA COHERENTE DE ESTRUCTURA OCULAR"
];

const LISTA_DIAGNOSTICOS_ANGIO = [
    "MIELINIZACIÓN DE FIBRAS NERVIOSAS", "ÁREAS DE PERFUSIÓN PERIFÉRICA", "PUNTO DE FUGA SOBRE HAZ PAPILOMACULAR",
    "SECUELAS DE OCLUSION DE RAMA VENOSA INFERO TEMPORAL", "PANFOTOCOAGULADA", "OCLUSION DE RAMA VENOSA",
    "EPITELIO PIGMENTARIO PARAFOVEALES", "CORIORETINOPATIA SEROSA CENTRAL ACTIVA", "EN BORDE SUPERO TEMPORAL DE LA FOVEA",
    "ESTABLE DURANTE TRANSITO ANGIOGRAFICO", "ASPAPILO MACULAR", "ESTABLE DURANTE EL TRANSITO ANGIOGRAFICO",
    "NEVUS SOBRE ENTRE ARCADA SUPERO TEMPORAL", "SECUELAS DE CORIORETINOPATIA SEROSA CENTRAL SIN SIGNOS DE ACTIVIDAD",
    "FONDO COROIDEO", "EXCAVACION ÓPTICAS AUMENTADA", "EXUDADOS DUROS PARAFOVEALES",
    "RETINOPATÍA DIABÉTICA NO PROLIFERATIVA", "RETINOSQUISIS MACULAR", "TORTUOSIDAD VASCULAR COMPATIBLE CON RETINOPATIA HIPERTENSIVA"
];

const GET_COMENTARIO_ANGIO = (diagnosticos) => {
    const dStr = diagnosticos.join(" ").toUpperCase();
    if (dStr.includes("DIABÉTICA")) return "Se recomienda control metabólico estricto por medicina interna y seguimiento estrecho por retinólogo.";
    if (dStr.includes("GLAUCOMA") || dStr.includes("EXCAVACION")) return "Se sugiere realizar Campo Visual Computarizado y GDX/OCT de nervio óptico para descartar daño glaucomatoso.";
    if (dStr.includes("SEROSA") || dStr.includes("MACULAR")) return "Recomiendo realizar OCT (tomografía óptica coherente) macular para valorar actividad y edema.";
    if (dStr.includes("VENOSA") || dStr.includes("OCLUSION")) return "Vigilancia de neovascularización periférica. Valorar necesidad de fotocoagulación láser según evolución.";
    if (dStr.includes("HIPERTENSIVA")) return "Control de cifras tensionales y valoración por cardiología.";
    return "Correlacionar hallazgos con la clínica del paciente. Sugiero control periódico según criterio del especialista.";
};

const CASOS_OTOLOGIA = [
    {
        dx: "OTITIS MEDIA AGUDA SUPURATIVA",
        tac: "Ocupación difusa de la caja timpánica por material con densidad de partes blandas. Celdillas mastoideas con signos de ocupación mucosa inflamatoria aguda.",
        otoscopia: "Membrana timpánica abombada, hiperémica y opaca. Pérdida total del reflejo luminoso y movilidad disminuida a la otoscopia neumática.",
        timpano: "Curva Tipo B (plana) por presencia de exudado en oído medio. Reflejos estapediales ausentes por efecto de masa retro-timpánica.",
        conducta: "MANEJO ANTIBIÓTICO Y CONTROL CLÍNICO ESTRECHO",
        planes: ["Iniciar amoxicilina + ácido clavulánico según esquema.", "Analgesia sistémica para control del otalgia intensa.", "Control en 7 días para valorar resolución del cuadro agudo."]
    },
    {
        dx: "OTITIS MEDIA CON EFUSIÓN (SEROSA)",
        tac: "Presencia de niveles hidroaéreos en caja timpánica. No se observa erosión de las paredes óseas ni compromiso de la cadena osicular.",
        otoscopia: "Tímpano íntegro pero retraído, con presencia de burbujas de aire y niveles de líquido amarillento traslúcido.",
        timpano: "Curva Tipo B en el lado afectado. Presión negativa significativa en el oído contralateral (Curva Tipo C).",
        conducta: "TRATAMIENTO DESCONGESTIONANTE Y MANIOBRAS DE VENTILACIÓN",
        planes: ["Uso de esteroides nasales y lavados frecuentes.", "Ejercicios de autoinsuflación (Valsalva controlada).", "Valoración por ORL para posible colocación de tubos de ventilación."]
    },
    {
        dx: "OTITIS EXTERNA DIFUSA AGUDA",
        tac: "Estudio de TAC de oídos sin hallazgos patológicos en oído medio ni mastoides. Edema de tejidos blandos en el conducto auditivo externo.",
        otoscopia: "Estenosis del conducto auditivo externo por edema inflamatorio. Presencia de detritos blanquecinos y dolor intenso a la tracción del pabellón.",
        timpano: "Estudio timpanométrico limitado por el dolor y edema del conducto. No se sugiere realizar maniobras de presión en fase aguda.",
        conducta: "TRATAMIENTO TÓPICO ANTIBIÓTICO Y ANALGESIA",
        planes: ["Limpieza cuidadosa del conducto auditivo.", "Gotas óticas con antibiótico y corticoide cada 8 horas.", "Evitar entrada de agua al oído durante el tratamiento."]
    },
    {
        dx: "HIPOACUSIA NEUROSENSORIAL BILATERAL",
        tac: "TAC de oídos con anatomía preservada. Conductos auditivos internos de calibre normal. No se observan malformaciones cocleares.",
        otoscopia: "Membranas timpánicas íntegras, translúcidas y con movilidad normal bilateralmente. Oído medio ventilado.",
        timpano: "Curva Tipo A (normal) en ambos oídos. Reflejos estapediales presentes con umbrales elevados.",
        conducta: "VALORACIÓN POR AUDIOLOGÍA PARA ADAPTACIÓN PROTÉSICA",
        planes: ["Realizar pruebas de selección y adaptación de audífonos.", "Programa de rehabilitación auditiva y logoaudiometría.", "Seguimiento semestral para vigilancia de umbrales."]
    },
    {
        dx: "HIPOACUSIA CONDUCTIVA POR FIJACIÓN DE CADENA",
        tac: "Se observa posible foco de desmineralización en la ventana oval compatible con otosclerosis. Cadena osicular presente pero con movilidad limitada.",
        otoscopia: "Tímpano normal en apariencia (Signo de Schwartz negativo). No hay evidencia de patología en oído externo ni medio.",
        timpano: "Curva Tipo As (rigidez del sistema). Reflejos estapediales ausentes (Fenómeno de On-Off).",
        conducta: "CONSULTA ESPECIALIZADA POR OTOLOGÍA / CIRUGÍA",
        planes: ["Valoración de candidatos para estapedectomía/estapedotomía.", "Realizar pruebas de diapasones (Rinne negativo).", "Control audiológico post-quirúrgico en 3 meses."]
    },
    {
        dx: "TINNITUS (ACÚFENOS) IDIOPÁTICO",
        tac: "Estudio de TAC simple y contrastado sin evidencia de malformaciones vasculares ni tumores (glomus) en caja timpánica.",
        otoscopia: "Exploración otoscópica dentro de los límites normales. No se observan masas pulsátiles ni cambios de coloración en el tímpano.",
        timpano: "Timpanometría normal Tipo A. Reflejos presentes. No se evidencia patología mecánica.",
        conducta: "MANEJO MULTIDISCIPLINARIO Y TERAPIA DE REENTRENAMIENTO",
        planes: ["Realizar acufenometría para caracterizar el ruido.", "Terapia de habituación al tinnitus (TRT).", "Manejo de factores estresantes y protección auditiva."]
    },
    {
        dx: "VÉRTIGO POSICIONAL PAROXÍSTICO BENIGNO (VPPB)",
        tac: "TAC de oídos y peñascos sin alteraciones estructurales. Oído interno con morfología normal.",
        otoscopia: "Oído externo y medio sin hallazgos patológicos. Membranas timpánicas normales.",
        timpano: "Resultados dentro de la normalidad. No hay compromiso de la audición ni del sistema de transmisión.",
        conducta: "REALIZACIÓN DE MANIOBRAS DE REPOSICIONAMIENTO CANALICULAR",
        planes: ["Maniobra de Epley para canalitiasis del conducto posterior.", "Seguimiento clínico en 48 horas para valorar nistagmo.", "Evitar movimientos bruscos de cabeza temporalmente."]
    },
    {
        dx: "ENFERMEDAD DE MÉNIÈRE (HIDROPS ENDOLINFÁTICO)",
        tac: "Se descarta patología retrococlear. Acueducto vestibular de dimensiones normales. No hay signos de ocupación inflamatoria.",
        otoscopia: "Examen físico del oído sin alteraciones evidentes. Tímpano normal.",
        timpano: "Curva Tipo A. La audiometría (correlacionada) muestra caída en frecuencias graves durante las crisis.",
        conducta: "MANEJO FARMACOLÓGICO Y DIETA HIPOSÓDICA",
        planes: ["Restricción estricta de sal, cafeína y tabaco.", "Tratamiento con betahistina según indicación médica.", "Control por otoneurología para seguimiento de crisis vertiginosas."]
    },
    {
        dx: "PERFORACIÓN DE MEMBRANA TIMPÁNICA POST-TRAUMÁTICA",
        tac: "Oído medio ventilado. No se observa sangrado (hemotímpano) ni fracturas de peñasco. Cadena osicular indemne.",
        otoscopia: "Presencia de perforación timpánica en cuadrante postero-inferior con bordes irregulares. No hay signos de infección activa.",
        timpano: "No realizable por pérdida del sellado hermético. Volumen físico del conducto aumentado.",
        conducta: "OBSERVACIÓN EVOLUTIVA Y PROTECCIÓN DEL OÍDO",
        planes: ["Protección estricta contra la entrada de agua.", "Cierre espontáneo probable en 4-6 semanas.", "Valoración de miringoplastia si no hay cierre espontáneo."]
    },
    {
        dx: "TAPÓN DE CERUMEN IMPACTADO",
        tac: "Se observa masa densa que ocluye el conducto auditivo externo, impidiendo la valoración adecuada de la membrana timpánica por este medio.",
        otoscopia: "Obstrucción total del conducto por masa de cerumen marrón oscuro, consistencia dura y adherente.",
        timpano: "Curva plana por obstrucción física del conducto (falsa Tipo B).",
        conducta: "EXTRACCIÓN POR LAVADO O MICROASPIRACIÓN",
        planes: ["Uso de agentes cerumenolíticos previos a la extracción.", "Procedimiento de limpieza de conducto auditivo externo.", "Valoración post-extracción de la integridad timpánica."]
    }
];

const CASOS_FOTOCOLOR = [
    {
        nervio: "Bordes netos, coloración rosada normal, excavación fisiológica.",
        macula: "Brillo foveal conservado, sin alteraciones pigmentarias.",
        vasos: "Relación A/V 2:3, trayecto y calibre conservado.",
        periferia: "Retina aplicada, sin desgarros ni lesiones evidentes.",
        impresion: "Examen dentro de límites normales en ambos ojos (AO)."
    },
    {
        nervio: "Características anatómicas conservadas, sin palidez.",
        macula: "Presencia de escasos microaneurismas y exudados duros dispersos.",
        vasos: "Trayecto vascular conservado, sin neovasos evidentes.",
        periferia: "Retina aplicada, sin hemorragias periféricas significativas.",
        impresion: "Retinopatía Diabética No Proliferativa Leve/Moderada."
    },
    {
        nervio: "Bordes definidos, excavación dentro de límites normales.",
        macula: "Sin alteraciones, brillo foveal presente.",
        vasos: "Tortuosidad aumentada, aumento del reflejo arteriolar (hilos de cobre) y signos de cruces A-V.",
        periferia: "Sin alteraciones periféricas evidentes.",
        impresion: "Signos sugerentes de Retinopatía Hipertensiva."
    },
    {
        nervio: "Excavación aumentada (>0.6), asimetría de copas, rechazo nasal de los vasos.",
        macula: "Sin alteraciones evidentes, área central conservada.",
        vasos: "Emergencia vascular desplazada hacia nasal.",
        periferia: "Retina aplicada en todos sus cuadrantes.",
        impresion: "Excavación óptica sospechosa. Descartar Glaucoma (Sugerir OCT de NO y Campo Visual)."
    },
    {
        nervio: "Bordes netos, coloración y excavación normales.",
        macula: "Presencia de múltiples drusas pequeñas y medianas, alteraciones del epitelio pigmentario.",
        vasos: "Calibre y distribución dentro de la normalidad.",
        periferia: "Sin lesiones periféricas predisponentes.",
        impresion: "Degeneración Macular Asociada a la Edad (DMAE) forma Seca."
    },
    {
        nervio: "Estructura anatómica conservada, bordes regulares.",
        macula: "Fóvea libre, arquitectura conservada.",
        vasos: "Red vascular retiniana de curso y calibre normal.",
        periferia: "Lesión pigmentada plana de bordes definidos, sin fluido subretiniano asociado.",
        impresion: "Nevus Coroideo periférico (Requiere seguimiento fotográfico anual)."
    },
    {
        nervio: "Bordes netos, sin alteraciones de coloración.",
        macula: "Área de atrofia coriorretiniana con bordes hiperpigmentados bien definidos.",
        vasos: "Vasos de curso normal, sin signos inflamatorios perivasculares.",
        periferia: "Resto de la retina aplicada sin alteraciones.",
        impresion: "Cicatriz Coriorretiniana (compatible con secuela de Toxoplasmosis inactiva)."
    },
    {
        nervio: "Anatomía papilar dentro de límites normales.",
        macula: "Pérdida del reflejo foveal, brillo celofánico superficial y tortuosidad vascular local.",
        vasos: "Leve tracción vascular hacia el área macular.",
        periferia: "Retina periférica sin alteraciones patológicas.",
        impresion: "Membrana Epirretiniana Macular (Sugerir OCT Macular para evaluar tracción)."
    }
];

const CASOS_ECOGRAFIA = [
    {
        anamnesis: "Paciente refiere disminución progresiva y no dolorosa de la agudeza visual en ojo derecho (OD) de varios meses de evolución. Reporta además percepción esporádica de opacidades móviles (\"moscas volantes\") en ojo izquierdo (OI). Sin antecedentes de trauma ocular, inflamación o cirugías previas.",
        basal: {
            av_od: "20/100 -- Cc: 20/60 (No mejora con estenopeico)",
            av_oi: "20/30 -- Cc: 20/20",
            pio_od_base: 14,
            pio_oi_base: 15,
            bio_od: "Catarata escleronuclear ++/++++. Cámara amplia, córnea clara, sin tyndall.",
            bio_oi: "Cristalino transparente, centrado. Cámara anterior amplia, limpia.",
            ref_od: "DPR conservado. No defecto pupilar aferente relativo.",
            ref_oi: "DPR conservado. Motor y consensual normales."
        },
        ultrasonografia: {
            subtext: "Debido a que la opacidad del cristalino en OD impide la visualización directa del polo posterior mediante oftalmoscopia, se realiza ecografía diagnóstica en sala para evaluar viabilidad vitreorretiniana quirúrgica:",
            od: "Modo B demuestra aumento patológico de la reflectividad del núcleo cristaliniano (Catarata). Cavidad vítrea acústicamente vacía (anecoica), sin ecos hemáticos ni membranas organizadas. Complejo coriorretiniano totalmente aplicado a la pared posterior en los 360°, sin evidencia de desprendimientos, desgarros ni masas retrobulbares. Excavación papilar plana. Biometría (Modo A): Longitud Axial (LA) de {la_od} mm; amplitud de cámara de {ac_od} mm.",
            oi: "Cristalino ecográficamente silente. En cavidad vítrea posterior se detectan discretos ecos lineales móviles de baja reflectividad compatibles con sinéresis vítrea leve, sin desprendimiento de vítreo posterior (DVP) clínico ni tracciones mecánicas sobre la retina periférica. Complejo retinocoroideo completamente aplicado. Longitud Axial (LA) de {la_oi} mm."
        },
        diagnosticos: [
            "OD: Catarata senil escleronuclear avanzada. Segmento posterior sano comprobado por ultrasonido.",
            "OI: Sinéresis vítrea simple / Medios ópticos e integridad retiniana conservados."
        ],
        plan: [
            "• Conducta Quirúrgica (OD): Se decide programación para facoemulsificación más implante de Lente Intraocular (LIO) en saco capsular. Se valida la Longitud Axial ultrasónica ({la_od} mm) para el cálculo de poder dioptrico de la LIO. Solicitados exámenes preoperatorios, valoración cardiovascular y consentimiento informado.",
            "• Plan Profiláctico (OI): Manejo expectante. Se instruye de forma estricta al paciente sobre signos de alarma (fotopsias, incremento súbito de miodesopsias o cortina de sombra periférica) con indicación de acudir a urgencias de inmediato."
        ]
    },
    {
        anamnesis: "Paciente consulta por cuadro clínico de aparición súbita de destellos de luz (fotopsias) y múltiples opacidades móviles (\"manchas filamentosas\") en campo visual de ambos ojos. No refiere dolor ocular, trauma ni antecedente de miopía alta.",
        basal: {
            av_od: "20/25 -- Cc: 20/20",
            av_oi: "20/30 -- Cc: 20/20",
            pio_od_base: 13,
            pio_oi_base: 12,
            bio_od: "Cristalino transparente, centrado. Cámara anterior libre de células.",
            bio_oi: "Cristalino transparente, centrado. Cámara anterior sin alteraciones.",
            ref_od: "Reflejo motor y consensual conservados AO.",
            ref_oi: "Reflejo motor y consensual conservados AO."
        },
        ultrasonografia: {
            subtext: "Se realiza exploración ultrasonográfica diagnóstica para descartar solución de continuidad o tracción en retina periférica debido a sintomatología de inicio agudo:",
            od: "Modo B demuestra una interfase vítreo-retiniana con desprendimiento de vítreo posterior (DVP) completo. Hialoides posterior visible como una membrana delgada y móvil, sin adherencia patológica al polo posterior. Cavidad vítrea con ecos puntiformes de baja reflectividad en movimiento. Complejo coriorretiniano totalmente aplicado a la pared posterior en todos los cuadrantes. Biometría (Modo A): Longitud Axial (LA) de {la_od} mm; amplitud de cámara de {ac_od} mm.",
            oi: "Se evidencia desprendimiento de vítreo posterior (DVP) incompleto con persistencia de anclaje papilar laxo. Cavidad vítrea libre de membranas organizadas. Complejo coriorretiniano aplicado, sin zonas de tracción mecánica evidenciable. Longitud Axial (LA) de {la_oi} mm."
        },
        diagnosticos: [
            "AO: Desprendimiento de vítreo posterior (DVP) en evolución.",
            "AO: Integridad coriorretiniana periférica comprobada ecográficamente (Retina aplicada 360°)."
        ],
        plan: [
            "• Conducta Médica (AO): Manejo conservador. Se instruye detalladamente al paciente sobre la evolución natural del desprendimiento de vítreo posterior. Se explican signos de alarma.",
            "• Plan Profiláctico (AO): Evitar sacudidas bruscas de cabeza y deportes de impacto por 3 semanas. Control oftalmológico con dilatación en 1 mes para examen exhaustivo de la retina periférica."
        ]
    },
    {
        anamnesis: "Paciente con antecedente de trauma ocular contuso en ojo derecho con pelota de tenis hace una semana. Refiere disminución severa de la visión y percepción de una cortina oscura en el cuadrante inferior de su campo visual en OD.",
        basal: {
            av_od: "Cuenta dedos a 1 metro",
            av_oi: "20/20 -- Cc: 20/20",
            pio_od_base: 11,
            pio_oi_base: 14,
            bio_od: "Opacidad corneal leve, hifema grado I residual. Medios opacos (catarata traumática en evolución) que impide examen de fondo de ojo.",
            bio_oi: "Cristalino transparente y centrado. Segmento anterior normal.",
            ref_od: "Reflejo fotomotor lento en OD. Defecto pupilar aferente relativo leve.",
            ref_oi: "Reflejo fotomotor normal. Consensual conservado."
        },
        ultrasonografia: {
            subtext: "Ante la imposibilidad de evaluar el polo posterior por opacidad de medios refractivos en OD, se indica ecografía ocular diagnóstica comparativa urgente:",
            od: "Modo B demuestra una membrana intraocular hiperecogénica lineal de alta reflectividad acústica, con inserción en la papila óptica y en la periferia ocular (ora serrata), compatible con desprendimiento de retina regmatógeno en embudo abierto, con movilidad ondulante. Cavidad vítrea con múltiples ecos móviles de baja y mediana reflectividad compatibles con hemorragia vítrea leve. Biometría (Modo A): Longitud Axial (LA) de {la_od} mm; amplitud de cámara de {ac_od} mm.",
            oi: "Cristalino ecográficamente transparente. Cavidad vítrea acústicamente vacía, sin evidencia de ecos hemáticos ni membranas. Complejo coriorretiniano totalmente aplicado. Longitud Axial (LA) de {la_oi} mm."
        },
        diagnosticos: [
            "OD: Desprendimiento de retina regmatógeno / Hemorragia vítrea secundaria a trauma ocular cerrado.",
            "OI: Ojo clínicamente normal. Ecografía de polo posterior dentro de límites normales."
        ],
        plan: [
            "• Conducta Quirúrgica (OD): Remisión urgente a subespecialidad en Retina y Vítreo. Se sugiere programación para procedimiento quirúrgico (Vitrectomía vía pars plana, endofotocoagulación y taponamiento intraocular) a la mayor brevedad.",
            "• Plan Profiláctico (OI): Reposo físico relativo. Evitar maniobras de Valsalva y control estricto de la presión intraocular. Cuidado del ojo contra-lateral."
        ]
    }
];

const CASOS_UBM = [
    {
        anamnesis: "Paciente de 40 años que asiste para valoración de segmento anterior previo a cirugía refractiva o por sospecha diagnóstica de glaucoma. Reporta antecedentes familiares de primer grado de glaucoma primario de ángulo abierto.",
        od: {
            cornea: "Espesor y transparencia normales. Perfil corneal conservado. Paquimetría de {paq_od} µm.",
            camara: "Amplitud central y periférica normal. Profundidad de cámara anterior (ACD) de {acd_od} mm. Contenido ecolúcido sin ecos.",
            angulo: "Abierto y permeable en los 4 cuadrantes (Shaffer IV). Ángulo de apertura (TIA) de {tia_od}°, AOD500 de {aod_od} mm. Sin presencia de sinequias periféricas anteriores.",
            iris: "Configuración plana, espesor normal. Sin evidencia de lesiones quísticas ni masas retroiridianas.",
            cuerpo: "Morfología, posición y ecogenicidad normales. Surco ciliar libre y permeable.",
            cristalino: "Centrado, normoposicionado. Relación irido-cristalina normal."
        },
        oi: {
            cornea: "Espesor y perfil dentro de límites normales. Paquimetría de {paq_oi} µm.",
            camara: "Amplia, profundidad conservada. Profundidad de cámara anterior (ACD) de {acd_oi} mm. Sin celularidad ni flare.",
            angulo: "Abierto y permeable en sus 360 grados. Ángulo de apertura (TIA) de {tia_oi}°, AOD500 de {aod_oi} mm. Sin evidencia de cierre angular.",
            iris: "Perfil plano, inserción anatómica normal. Sin anomalías estructurales.",
            cuerpo: "Características normales. Procesos ciliares bien definidos y alineados.",
            cristalino: "Centrado, sin subluxaciones. Relaciones anatómicas con el iris íntegras."
        },
        conclusion: [
            "ESTUDIO DE ULTRABIOMICROSCOPÍA (UBM) DENTRO DE LÍMITES NORMALES EN AMBOS OJOS.",
            "• Segmento anterior con arquitectura anatómica y relaciones topográficas perfectamente conservadas.",
            "• Ángulos iridocorneales abiertos y totalmente permeables de forma bilateral, sin riesgo de cierre angular por este medio."
        ],
        conducta: "Control periódico anual con oftalmología general."
    },
    {
        anamnesis: "Paciente femenina de 65 años remitida por oftalmología con sospecha de ángulo estrecho ocluible a la gonioscopia y cámara anterior estrecha bilateral. Reporta episodios intermitentes de dolor ocular leve y visión borrosa nocturna.",
        od: {
            cornea: "Transparencia normal. Perfil corneal conservado. Paquimetría de {paq_od} µm.",
            camara: "Estrechamiento central moderado y estrechamiento periférico severo. Profundidad de cámara anterior (ACD) de {acd_od} mm. Aposición del iris periférico a la red trabecular.",
            angulo: "Estrecho, ocluible en cuadrante superior e inferior (Shaffer I-II), ángulo de apertura (TIA) de {tia_od}°, AOD500 de {aod_od} mm. Aposición iridocorneal sin sinequias evidentes por este medio.",
            iris: "Configuración en meseta (plateau) con convexidad anterior marcada que empuja la raíz hacia la malla trabecular.",
            cuerpo: "Procesos ciliares anteriorizados con rotación anterior del cuerpo ciliar, reduciendo la amplitud del receso angular.",
            cristalino: "Centrado, relación irido-cristalina estrecha por aposición posterior."
        },
        oi: {
            cornea: "Perfil corneal dentro de límites normales. Paquimetría de {paq_oi} µm.",
            camara: "Cámara anterior estrecha. Profundidad de cámara anterior (ACD) de {acd_oi} mm. Distancia de apertura angular reducida bilateralmente.",
            angulo: "Ángulo estrecho, ocluible en cuadrantes superiores, compatible con aposición iridotrabecular reversible. Ángulo de apertura (TIA) de {tia_oi}°, AOD500 de {aod_oi} mm.",
            iris: "Perfil convexo, inserción anterior en cuerpo ciliar.",
            cuerpo: "Procesos ciliares de tamaño normal pero en posición discretamente anteriorizada.",
            cristalino: "Centrado, normoposicionado. Leve aumento del contacto irido-cristalino."
        },
        conclusion: [
            "ANOMALÍA ANATÓMICA COMPATIBLE CON SOSPECHA DE CIERRE ANGULAR PRIMARIO POR CONFIGURACIÓN DE IRIS EN MESETA EN AO.",
            "• Estrechamiento severo del receso angular bilateral con aposición iridotrabecular.",
            "• Posición anterior de procesos ciliares que contribuye al estrechamiento periférico."
        ],
        conducta: "Se sugiere realizar iridotomía láser periférica profiláctica (YAG) en ambos ojos y control estricto de PIO."
    },
    {
        anamnesis: "Paciente masculino de 48 años enviado para descartar lesión ocupante de espacio en segmento anterior tras evidenciarse sobreelevación localizada del iris periférico en cuadrante temporal del ojo derecho durante examen rutinario. Asintomático.",
        od: {
            cornea: "Transparente. Espesor normal. Paquimetría de {paq_od} µm.",
            camara: "Cámara anterior de amplitud central conservada. Profundidad de cámara anterior (ACD) de {acd_od} mm. Se observa estrechamiento localizado en cuadrante temporal por elevación del iris periférico.",
            angulo: "Cierre angular focal secundario en cuadrante temporal. Los cuadrantes superior, inferior y nasal permanecen abiertos (Shaffer III-IV) con ángulo de apertura (TIA) de {tia_od}° y AOD500 de {aod_od} mm.",
            iris: "Se evidencia elevación y convexidad localizada del iris periférico en cuadrante temporal (entre horas 8 y 10) debido a masa retroiridiana.",
            cuerpo: "En cara posterior del iris/cuerpo ciliar en cuadrante temporal, se visualiza una lesión quística anecoica, redonda, de paredes finas y contenido ecolúcido de {cist_w} x {cist_h} mm.",
            cristalino: "Centrado. Relación irido-cristalina conservada, sin evidencia de subluxación o compresión del cristalino por el quiste."
        },
        oi: {
            cornea: "Perfil corneal normal. Paquimetría de {paq_oi} µm.",
            camara: "Profundidad de cámara anterior (ACD) de {acd_oi} mm, amplitud central conservada y ecolúcida.",
            angulo: "Ángulo abierto en los 4 cuadrantes (Shaffer IV) con ángulo de apertura (TIA) de {tia_oi}° y AOD500 de {aod_oi} mm. Sin sinequias.",
            iris: "Configuración plana, de características normales.",
            cuerpo: "Morfología y posición de procesos ciliares normales. Sin quistes.",
            cristalino: "Centrado y normoposicionado."
        },
        conclusion: [
            "LESIÓN QUÍSTICA BENIGNA DE CUERPO CILIAR EN CUADRANTE TEMPORAL DEL OJO DERECHO (OD). OJO IZQUIERDO (OI) NORMAL.",
            "• Quiste neuroepitelial retroiridiano solitario en OD en zona temporal.",
            "• Cierre angular focal secundario al quiste, sin compromiso del resto del ángulo ni hipertensión ocular secundaria."
        ],
        conducta: "Conducta expectante. Se aconseja control ecográfico UBM en 6 meses para evaluar estabilidad y tamaño del quiste."
    }
];

// --- 1. CONFIGURACIÓN DEL CATÁLOGO ---
const CATALOG = {
    "masivo": {
        id: "masivo",
        name: "📂 GENERACIÓN MASIVA (ESTUDIOS CLINICOS)",
        isMassive: true,
        requiredFields: ["CODIGO_ESTUDIO", "FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, sig) => {
            // Buscador por código interno (001-009)
            const study = Object.values(CATALOG).find(s => s.internalCode === String(data.CODIGO_ESTUDIO).padStart(3, '0'));
            if (study && study.id !== 'masivo' && study.id !== 'lentes' && study.id !== 'comprobante_recibido') {
                return study.generateTemplate(data, sig);
            }
            // Fallback si no existe o es lentes
            return { content: [{ text: `ERROR: Código ${data.CODIGO_ESTUDIO} no válido para masivo.` }] };
        }
    },
    "tomografia_segmento_anterior": {
        id: "tomografia_segmento_anterior",
        internalCode: "951901",
        name: "Tomografía Óptica de Segmento Anterior",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const tituloBase = "TOMOGRAFÍA ÓPTICA DE SEGMENTO ANTERIOR";
            const conducta = data.CONDUCTA || randItem(LISTA_CONDUCTAS);

            return {
                pageSize: 'LETTER', pageMargins: [70, 30, 70, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 20] },
                    { text: [{ text: `REPORTE DE ${tituloBase}\n`, style: 'mainTitle' }, { text: 'AMBOS OJOS', style: 'mainTitle' }], alignment: 'center', margin: [0, 0, 0, 35] },
                    { columns: [{ text: 'PACIENTE:', bold: true, width: 95 }, { text: cleanName(data.PACIENTE_NOMBRE), width: '*' }], margin: [0, 0, 0, 5] },
                    { columns: [{ text: 'ID:', bold: true, width: 95 }, { text: data.PACIENTE_ID || '', width: '*' }], margin: [0, 0, 0, 5] },
                    { columns: [{ text: 'FECHA:', bold: true, width: 95 }, { text: (data.FECHA || '').toUpperCase(), width: '*' }], margin: [0, 0, 0, 35] },
                    { text: 'Tuve el gusto de revisar el estudio de su paciente, encontrando lo siguiente:\nAl realizar análisis del examen de ' + tituloBase.toLowerCase() + ', y examinar las características de la disposición de las capas retínales, características del neuro epitelio, presencia o ausencia de líquido intra o subretinal, características y forma de la excavación foveal, contorno retiniano, con posible presencia o ausencia de tracción y alteraciones de la interfaz vítreo retiniana, así como características del vítreo, el epitelio pigmentario retinal, la zona elipsoide , la limitante externa, algunos detalles de la coriocapilar; y tras la valoración de las mediciones de espesores retinianos, respaldado por las normativas vigentes, se concluye:', italics: true, alignment: 'justify', lineHeight: 1.25, margin: [0, 0, 0, 25], fontSize: 9.5 },
                    { text: 'IMPRESIÓN DIAGNOSTICA:', bold: true, margin: [0, 0, 0, 10] },
                    { stack: (() => {
                        const selected = []; const available = [...LISTA_DIAGNOSTICOS]; const lateralidades = ["OD.", "OI.", "AO.", "OD/OI."];
                        const count = Math.floor(Math.random() * 2) + 1;
                        for(let i=0; i<count; i++) {
                            const idx = Math.floor(Math.random() * available.length);
                            const diag = available.splice(idx, 1)[0];
                            const lat = lateralidades[Math.floor(Math.random() * lateralidades.length)];
                            selected.push({ text: `➤   ${diag.toUpperCase()} ${lat}`, margin: [20, 0, 0, 5], bold: true, fontSize: 9.5 });
                        }
                        return selected;
                    })(), margin: [0, 0, 0, 20] },
                    { text: [{ text: 'Conducta: ', bold: true, italics: true }, { text: conducta, italics: true }], margin: [0, 0, 0, 40], fontSize: 9.5 },
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', margin: [0, 20, 0, 0], fontSize: 9 }
                ],
                styles: { mainTitle: { fontSize: 11, bold: true, italics: true, decoration: 'underline' } },
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "tomografia": {
        id: "tomografia",
        internalCode: "951902",
        name: "Tomografía Ocular (OCT)",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const tituloBase = randItem(LISTA_TITULOS_TOMOGRAFIA);
            const conducta = data.CONDUCTA || randItem(LISTA_CONDUCTAS);

            return {
                pageSize: 'LETTER', pageMargins: [70, 30, 70, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 20] },
                    { text: [{ text: `REPORTE DE ${tituloBase}\n`, style: 'mainTitle' }, { text: 'AMBOS OJOS', style: 'mainTitle' }], alignment: 'center', margin: [0, 0, 0, 35] },
                    { columns: [{ text: 'PACIENTE:', bold: true, width: 95 }, { text: cleanName(data.PACIENTE_NOMBRE), width: '*' }], margin: [0, 0, 0, 5] },
                    { columns: [{ text: 'ID:', bold: true, width: 95 }, { text: data.PACIENTE_ID || '', width: '*' }], margin: [0, 0, 0, 5] },
                    { columns: [{ text: 'FECHA:', bold: true, width: 95 }, { text: (data.FECHA || '').toUpperCase(), width: '*' }], margin: [0, 0, 0, 35] },
                    { text: 'Tuve el gusto de revisar el estudio de su paciente, encontrando lo siguiente:\nAl realizar análisis del examen de ' + tituloBase.toLowerCase() + ', y examinar las características de la disposición de las capas retínales, características del neuro epitelio, presencia o ausencia de líquido intra o subretinal, características y forma de la excavación foveal, contorno retiniano, con posible presencia o ausencia de tracción y alteraciones de la interfaz vítreo retiniana, así como características del vítreo, el epitelio pigmentario retinal, la zona elipsoide , la limitante externa, algunos detalles de la coriocapilar; y tras la valoración de las mediciones de espesores retinianos, respaldado por las normativas vigentes, se concluye:', italics: true, alignment: 'justify', lineHeight: 1.25, margin: [0, 0, 0, 25], fontSize: 9.5 },
                    { text: 'IMPRESIÓN DIAGNOSTICA:', bold: true, margin: [0, 0, 0, 10] },
                    { stack: (() => {
                        const selected = []; const available = [...LISTA_DIAGNOSTICOS]; const lateralidades = ["OD.", "OI.", "AO.", "OD/OI."];
                        const count = Math.floor(Math.random() * 2) + 1;
                        for(let i=0; i<count; i++) {
                            const idx = Math.floor(Math.random() * available.length);
                            const diag = available.splice(idx, 1)[0];
                            const lat = lateralidades[Math.floor(Math.random() * lateralidades.length)];
                            selected.push({ text: `➤   ${diag.toUpperCase()} ${lat}`, margin: [20, 0, 0, 5], bold: true, fontSize: 9.5 });
                        }
                        return selected;
                    })(), margin: [0, 0, 0, 20] },
                    { text: [{ text: 'Conducta: ', bold: true, italics: true }, { text: conducta, italics: true }], margin: [0, 0, 0, 40], fontSize: 9.5 },
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', margin: [0, 20, 0, 0], fontSize: 9 }
                ],
                styles: { mainTitle: { fontSize: 11, bold: true, italics: true, decoration: 'underline' } },
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "lentes": {
        id: "lentes",
        internalCode: "010",
        name: "Lentes y Montura",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID", "ENTIDAD", "NIT", "FACTURA"],
        generateTemplate: (data) => {
            return {
                pageSize: 'LETTER', pageMargins: [70, 40, 70, 40],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 140, alignment: 'left', margin: [0, 0, 0, 10] },
                    (data.FACTURA && data.FACTURA !== "0") ? { text: `# ${data.FACTURA}`, absolutePosition: { x: 460, y: 40 }, bold: true, fontSize: 12, alignment: 'right' } : [],
                    { text: 'ENTREGA DE LENTE Y MONTURAS', fontSize: 16, bold: true, alignment: 'center', margin: [0, 10, 0, 40] },
                    { text: `FECHA DE ENTREGA: |${data.FECHA || ''}`, margin: [0, 0, 0, 40] },
                    { text: [`Hoy, ${data.FECHA || ''} al Sr `, { text: cleanName(data.PACIENTE_NOMBRE), bold: true }, ` con documento de identificación número, ${data.PACIENTE_ID || ''} afiliado a `, { text: (data.ENTIDAD || '').toUpperCase(), bold: true }, ` NIT ${data.NIT || ''}, se le hace entrega de LENTE Y MONTURA en nuestras instalaciones.`], alignment: 'justify', lineHeight: 1.5, margin: [0, 0, 0, 80] },
                    { stack: ['RECIBE CONFORME: _________________________________', { text: `${data.PACIENTE_ID || ''}`, margin: [0, 5, 0, 0] }], margin: [0, 40, 0, 0] }
                ],
                defaultStyle: { fontSize: 12 }
            };
        }
    },
    "comprobante_recibido": {
        id: "comprobante_recibido",
        internalCode: "COMP",
        name: "Comprobante de Recibido",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID", "ENTIDAD", "FACTURA"],
        generateTemplate: (data) => {
            const isClinica = document.querySelector('input[name="razonSocial"]:checked')?.value === 'clinica';
            const clinicName = isClinica ? "CLINICA VIU" : "FUNDACION OFTALMOLOGICA DEL CARIBE";
            return {
                pageSize: 'LETTER', pageMargins: [70, 40, 70, 40],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 140, alignment: 'left', margin: [0, 0, 0, 10] },
                    (data.FACTURA && data.FACTURA !== "0") ? { text: data.FACTURA, absolutePosition: { x: 460, y: 40 }, bold: true, fontSize: 10, alignment: 'right' } : [],
                    { text: 'COMPROBANTE DE RECIBIDO DEL USUARIO', fontSize: 13, bold: true, alignment: 'center', margin: [0, 20, 0, 40] },
                    { text: [
                        `Certifico como usuario(a) `, 
                        { text: cleanName(data.PACIENTE_NOMBRE).toUpperCase(), bold: true }, 
                        ` `, 
                        { text: data.PACIENTE_ID || '', bold: true }, 
                        ` activo(a de `, 
                        { text: (data.ENTIDAD || '').toUpperCase(), bold: true }, 
                        ` doy fe de haber recibido un trato profesional, amable y cordial por parte del personal de la `, 
                        { text: clinicName, bold: true }, 
                        ` en la prestación de los servicios por mi requeridos. De forma manifiesto haber recibido la totalidad de los servicios en salud por mi aseguradora autorizados, en los tiempos establecidos y con la debida reserva de la información personal.`
                    ], alignment: 'justify', lineHeight: 1.5, margin: [0, 0, 0, 40], fontSize: 11 },
                    { text: 'Me siento conforme con el servicio prestado por la institución antes mencionada y por consiguiente firmo el presente documento a satisfacción como constancia expresa de ello.', alignment: 'justify', lineHeight: 1.5, margin: [0, 0, 0, 120], fontSize: 11 },
                    { stack: ['_____________________________________', 'FIRMA USUARIO O ACOMPAÑANTE', `${data.PACIENTE_ID || ''}`], margin: [0, 0, 0, 0], fontSize: 11 }
                ],
                defaultStyle: { fontSize: 12 }
            };
        }
    },
    "recuento": {
        id: "recuento",
        internalCode: "950610",
        name: "Recuento de Células Endoteliales",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 0) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            const stats = {
                od: { esp: osc(0.520, 0.03, 3), den: osc(2450, 150, 1), n: osc(100, 20), t: osc(450, 40, 1), cv: osc(33, 3, 1), hex: osc(55, 5), min: osc(180, 20, 1), max: osc(850, 50, 1) },
                oi: { esp: osc(0.525, 0.03, 3), den: osc(2480, 150, 1), n: osc(110, 20), t: osc(440, 40, 1), cv: osc(32, 3, 1), hex: osc(56, 5), min: osc(175, 20, 1), max: osc(860, 50, 1) }
            };
            return {
                pageSize: 'LETTER', pageMargins: [60, 30, 60, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 20] },
                    { text: 'RECUENTO DE CELULAS ENDOTELIALES', fontSize: 17, bold: true, color: '#2e5a88', alignment: 'center', margin: [0, 0, 0, 10] },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 480, y2: 0, lineWidth: 1, strokeColor: '#2e5a88' }], margin: [0, 0, 0, 30] },
                    { text: [{ text: 'PACIENTE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'FECHA: ', bold: true }, data.FECHA || ''], margin: [0, 0, 0, 35] },
                    { table: { widths: ['*', '*', '*'], body: [[{ text: 'Parámetro', bold: true, fillColor: '#f3f4f6' }, { text: 'Ojo Derecho (R)', bold: true, fillColor: '#f3f4f6' }, { text: 'Ojo Izquierdo (L)', bold: true, fillColor: '#f3f4f6' }], ['Espesor Corneal (mm)', stats.od.esp, stats.oi.esp], ['Densidad Celular (/mm²)', stats.od.den, stats.oi.den], ['Número de Células', stats.od.n, stats.oi.n], ['Tamaño Promedio (µm²)', stats.od.t, stats.oi.t], ['C.V. de Tamaño (%)', stats.od.cv, stats.oi.cv], ['Hexagonalidad (%)', stats.od.hex, stats.oi.hex], ['Tamaño Mínimo (µm²)', stats.od.min, stats.oi.min], ['Tamaño Máximo (µm²)', stats.od.max, stats.oi.max]] }, margin: [0, 0, 0, 30], fontSize: 8.5 },
                    { text: 'Observaciones Clínicas:', bold: true, fontSize: 10, margin: [0, 10, 0, 8] },
                    { text: `El análisis comparativo muestra una densidad celular de ${stats.od.den} /mm² en el ojo derecho y ${stats.oi.den} /mm² en el ojo izquierdo. Ambos ojos presentan estabilidad relativa en la forma celular con hexagonalidad de ${stats.od.hex}% y ${stats.oi.hex}% respectivamente.`, alignment: 'justify', italics: true, fontSize: 9.5, lineHeight: 1.25, margin: [0, 0, 0, 60] },
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', margin: [0, 20, 0, 0], fontSize: 9 }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "biometria": {
        id: "biometria",
        internalCode: "952001",
        name: "Biometría Ocular",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 2) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            const b = { 
                od: { al: osc(23.70, 0.2), cct: osc(545, 10, 0), k1: osc(46.30, 0.2), k2: osc(46.90, 0.2), a1: Math.floor(Math.random()*180), a2: Math.floor(Math.random()*180), acd: osc(3.40, 0.2), lt: osc(4.20, 0.2), wtw: osc(11.8, 0.3, 1) }, 
                oi: { al: osc(24.00, 0.2), cct: osc(555, 10, 0), k1: osc(45.00, 0.2), k2: osc(46.80, 0.2), a1: Math.floor(Math.random()*180), a2: Math.floor(Math.random()*180), acd: osc(3.45, 0.2), lt: osc(4.15, 0.2), wtw: osc(12.0, 0.3, 1) } 
            };
            return {
                pageSize: 'LETTER', pageMargins: [60, 30, 60, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 15] },
                    { text: 'REPORTE TÉCNICO DE BIOMETRIA OCULAR', fontSize: 16, bold: true, color: '#2e5a88', alignment: 'center', margin: [0, 0, 0, 15] },
                    { text: [{ text: 'PACIENTE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'FECHA: ', bold: true }, data.FECHA || ''], margin: [0, 0, 0, 25] },
                    { table: { widths: ['*', '*', '*'], body: [
                        [{ text: 'Parámetro', bold: true, fillColor: '#f3f4f6' }, { text: 'Ojo Derecho (OD)', bold: true, fillColor: '#f3f4f6' }, { text: 'Ojo Izquierdo (OS)', bold: true, fillColor: '#f3f4f6' }], 
                        ['Longitud Axial (AL)', `${b.od.al} mm`, `${b.oi.al} mm`], 
                        ['Espesor Corneal (CCT)', `${b.od.cct} µm`, `${b.oi.cct} µm`], 
                        ['Queratometría K1', `${b.od.k1}D @ ${b.od.a1}°`, `${b.oi.k1}D @ ${b.oi.a1}°`], 
                        ['Queratometría K2', `${b.od.k2}D @ ${b.od.a2}°`, `${b.oi.k2}D @ ${b.oi.a2}°`],
                        ['Cámara Anterior (ACD)', `${b.od.acd} mm`, `${b.oi.acd} mm`],
                        ['Grosor Cristalino (LT)', `${b.od.lt} mm`, `${b.oi.lt} mm`],
                        ['Blanco a Blanco (WTW)', `${b.od.wtw} mm`, `${b.oi.wtw} mm`]
                    ] }, margin: [0, 0, 0, 20], fontSize: 8.5 },
                    { text: 'Planificación LIO - Fórmula: Barrett Universal II', bold: true, fontSize: 10, margin: [0, 5, 0, 5] },
                    { table: { widths: ['*', '*', '*', '*'], body: [
                        [{ text: 'Modelo de LIO', bold: true, fillColor: '#f3f4f6' }, { text: 'Constante A', bold: true, fillColor: '#f3f4f6' }, { text: 'Poder (D)', bold: true, fillColor: '#f3f4f6' }, { text: 'REF Esperada', bold: true, fillColor: '#f3f4f6' }], 
                        ['Centry Fold 601 (OD)', '118.5', osc(16.80, 0.5), osc(0.05, 0.1)], 
                        ['AcrySof SN60WF (OS)', '118.7', osc(17.30, 0.5), osc(0.15, 0.1)]
                    ] }, margin: [0, 0, 0, 35], fontSize: 8.5 },
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { stack: [{ text: '__________________________', margin: [0, 10, 0, 0] }, { text: 'Firma del Técnico', fontSize: 9 }] }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "paquimetria": {
        id: "paquimetria",
        internalCode: "952501",
        name: "Paquimetría",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 0) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            const vOD = parseInt(osc(530, 30)); const vOI = parseInt(osc(535, 30));
            const fOD = (545-vOD >= 0) ? `+${Math.round((545-vOD)/10)}` : `${Math.round((545-vOD)/10)}`;
            const fOI = (545-vOI >= 0) ? `+${Math.round((545-vOI)/10)}` : `${Math.round((545-vOI)/10)}`;
            
            // Valores para el grid (coherentes con el central)
            const g = { 
                od: [osc(vOD+15, 10), osc(vOD+10, 10), osc(vOD+20, 10), osc(vOD+12, 10)],
                oi: [osc(vOI+15, 10), osc(vOI+10, 10), osc(vOI+20, 10), osc(vOI+12, 10)]
            };

            const gridTable = (v, pts) => ({
                table: {
                    widths: [30, 30, 30],
                    body: [
                        ['', { text: pts[0], alignment: 'center' }, ''],
                        [{ text: pts[3], alignment: 'center' }, { text: v, alignment: 'center', fillColor: '#d9d9d9', bold: true }, { text: pts[1], alignment: 'center' }],
                        ['', { text: pts[2], alignment: 'center' }, '']
                    ]
                }, margin: [0, 5, 0, 5]
            });

            return {
                pageSize: 'LETTER', pageMargins: [40, 25, 40, 20],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { table: { widths: [100, '*', 120], body: [[{ image: 'logo', width: 80, alignment: 'center', rowspan: 3 }, { text: 'FUNDACION OFTALMOLOGICA DEL CARIBE', alignment: 'center', bold: true, fontSize: 10 }, { text: 'F-FAA/FAD-032', alignment: 'center', fontSize: 9 }], ['', '', { text: 'VERSION: 005', alignment: 'center', fontSize: 9 }], ['', { text: 'RESULTADOS DEL ESTUDIO DE PAQUIMETRIA- FOCA', alignment: 'center', bold: true, fontSize: 10 }, { text: 'VIGENCIA: 2030-12-06', alignment: 'center', fontSize: 9 }]] }, margin: [0, 0, 0, 15] },
                    { table: { widths: [100, '*'], body: [[{ text: 'NOMBRE', bold: true, fontSize: 9 }, { text: cleanName(data.PACIENTE_NOMBRE), fontSize: 9 }], [{ text: 'ID', bold: true, fontSize: 9 }, { text: data.PACIENTE_ID || '', fontSize: 9 }], [{ text: 'FECHA', bold: true, fontSize: 9 }, { text: data.FECHA || '', fontSize: 9 }]] }, margin: [0, 0, 0, 15] },
                    { columns: [
                        { stack: [{ text: 'OJO DERECHO', bold: true, alignment: 'center' }, { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineWidth: 1 }] }, { text: vOD, fontSize: 14, bold: true, alignment: 'center' }, gridTable(vOD, g.od)], width: 150 },
                        { width: '*', text: '' },
                        { stack: [{ text: 'OJO IZQUIERDO', bold: true, alignment: 'center' }, { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineWidth: 1 }] }, { text: vOI, fontSize: 14, bold: true, alignment: 'center' }, gridTable(vOI, g.oi)], width: 150 }
                    ], margin: [40, 0, 40, 10] },
                    { text: [{ text: 'FACTOR DE CORRECCIÓN EN AMBOS OJOS:      ', bold: true }, { text: `OD: ${fOD}     OI: ${fOI}` }], fontSize: 10, margin: [0, 5, 0, 5] },
                    { text: 'NOTA: SE REALIZAN VARIOS INTENTOS, SE CONFIRMAN RESULTADOS EN AMBOS OJOS.', fontSize: 9, bold: true, italics: true, margin: [0, 5, 0, 10] },
                    signature ? { image: signature.data, width: 120, margin: [0, 5, 0, 5] } : { stack: [{ text: 'ARLEDYS FLOREZ', bold: true }, { text: 'TÉCNICO EN AYUDAS DX', fontSize: 9 }], margin: [0, 5, 0, 10] },
                    { table: { widths: ['*', '*', '*'], body: [[{ text: 'ELABORO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }, { text: 'REVISO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }, { text: 'APROBO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }], [{ text: 'Rosa Martinez Gonzalez', fontSize: 7.5, alignment: 'center' }, { text: 'Monica Sierra Merlano', fontSize: 7.5, alignment: 'center' }, { text: 'Jorge Martinez Ramirez', fontSize: 7.5, alignment: 'center' }], [{ text: 'Coordinador DX', fontSize: 6.5, alignment: 'center' }, { text: 'Director Medico', fontSize: 6.5, alignment: 'center' }, { text: 'Gerente General', fontSize: 6.5, alignment: 'center' }]] } }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "fotocolor": {
        id: "fotocolor",
        internalCode: "951102",
        name: "Foto Color (Retinografía)",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const caso = CASOS_FOTOCOLOR[Math.floor(Math.random() * CASOS_FOTOCOLOR.length)];
            return {
                pageSize: 'LETTER', pageMargins: [60, 40, 60, 30],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 130, alignment: 'left', margin: [0, 0, 0, 20] },
                    { text: 'REPORTE FOTOGRAFIA A COLOR DE SEGMENTOS POSTERIOR AMBOS OJOS', fontSize: 12, bold: true, color: '#2e5a88', alignment: 'center', margin: [0, 0, 0, 25] },
                    { text: [{ text: 'NOMBRE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE), '\n', { text: 'ID: ', bold: true }, data.PACIENTE_ID, '\n', { text: 'FECHA: ', bold: true }, data.FECHA], margin: [20, 0, 0, 30], fontSize: 9.5 },
                    
                    { columns: [
                        { stack: [
                            { text: 'OJO DERECHO (OD)', bold: true, decoration: 'underline', margin: [0, 0, 0, 10] },
                            { text: `• Nervio Óptico: ${caso.nervio}`, margin: [5, 0, 0, 5] },
                            { text: `• Mácula: ${caso.macula}`, margin: [5, 0, 0, 5] },
                            { text: `• Vasos: ${caso.vasos}`, margin: [5, 0, 0, 5] },
                            { text: `• Periferia: ${caso.periferia}`, margin: [5, 0, 0, 10] }
                        ], width: '*' },
                        { width: 20, text: '' },
                        { stack: [
                            { text: 'OJO IZQUIERDO (OI)', bold: true, decoration: 'underline', margin: [0, 0, 0, 10] },
                            { text: `• Nervio Óptico: ${caso.nervio}`, margin: [5, 0, 0, 5] },
                            { text: `• Mácula: ${caso.macula}`, margin: [5, 0, 0, 5] },
                            { text: `• Vasos: ${caso.vasos}`, margin: [5, 0, 0, 5] },
                            { text: `• Periferia: ${caso.periferia}`, margin: [5, 0, 0, 10] }
                        ], width: '*' }
                    ], margin: [0, 0, 0, 30], fontSize: 9, lineHeight: 1.2 },

                    { text: `IMPRESIÓN DIAGNÓSTICA: ${caso.impresion}`, bold: true, fontSize: 9.5, margin: [0, 0, 0, 40] },
                    
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { stack: [{ text: 'ARLEDYS FLOREZ', bold: true }, { text: 'Técnico en Ayudas Diagnósticas', fontSize: 9 }], margin: [0, 0, 0, 20] },
                    { table: { widths: ['*', '*', '*'], body: [[{ text: 'ELABORO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }, { text: 'REVISO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }, { text: 'APROBO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }], [{ text: 'Rosa Martinez Gonzalez', fontSize: 8, alignment: 'center' }, { text: 'Monica Sierra Merlano', fontSize: 8, alignment: 'center' }, { text: 'Jorge Martinez Ramirez', fontSize: 8, alignment: 'center' }], [{ text: 'Coordinador DX', fontSize: 7, alignment: 'center' }, { text: 'Director Medico', fontSize: 7, alignment: 'center' }, { text: 'Gerente General', fontSize: 7, alignment: 'center' }]] } }
                ],
                styles: { sectionTitle: { fontSize: 10.5, bold: true, color: '#2e5a88', margin: [0, 0, 0, 6] } },
                defaultStyle: { fontSize: 9.5 }
            };
        }
    },
    "interferometria": {
        id: "interferometria",
        internalCode: "950602",
        name: "Interferometría",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const avL = ["20/20", "20/25", "20/30", "20/40"];
            return {
                pageSize: 'LETTER', pageMargins: [40, 30, 40, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { table: { widths: [100, '*', 120], body: [[{ image: 'logo', width: 80, alignment: 'center', rowspan: 3 }, { text: 'FUNDACION OFTALMOLOGICA DEL CARIBE', alignment: 'center', bold: true, fontSize: 10 }, { text: 'F-FAA/FAD-033', alignment: 'center', fontSize: 9 }], ['', '', { text: 'VERSION: 005', alignment: 'center', fontSize: 9 }], ['', { text: 'RESULTADO DE INTERFEROMETRIA- FOCA', alignment: 'center', bold: true, fontSize: 10 }, { text: 'VIGENCIA: 2030-08-01', alignment: 'center', fontSize: 9 }]] }, margin: [0, 0, 0, 25] },
                    { table: { widths: [100, '*'], body: [[{ text: 'NOMBRE', bold: true, fontSize: 9 }, { text: cleanName(data.PACIENTE_NOMBRE), fontSize: 9 }], [{ text: 'ID', bold: true, fontSize: 9 }, { text: data.PACIENTE_ID || '', fontSize: 9 }], [{ text: 'FECHA', bold: true, fontSize: 9 }, { text: data.FECHA || '', fontSize: 9 }]] }, margin: [0, 0, 0, 35] },
                    { columns: [{ stack: [{ text: 'AV OJO DERECHO', bold: true, alignment: 'center' }, { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] }, { text: avL[Math.floor(Math.random()*4)], fontSize: 12, bold: true, alignment: 'center' }], width: 180 }, { width: '*', text: '' }, { stack: [{ text: 'AV OJO IZQUIERDO', bold: true, alignment: 'center' }, { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] }, { text: avL[Math.floor(Math.random()*4)], fontSize: 12, bold: true, alignment: 'center' }], width: 180 }], margin: [20, 0, 20, 70] },
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { stack: [{ text: 'VALERIE MERCADO', bold: true }, { text: 'Tecnico en Ayudas Diagnosticas', fontSize: 9 }], margin: [0, 20, 0, 20] },
                    { table: { widths: ['*', '*', '*'], body: [[{ text: 'ELABORO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }, { text: 'REVISO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }, { text: 'APROBO:', bold: true, alignment: 'center', fillColor: '#f3f4f6' }], [{ text: 'Rosa Martinez Gonzalez', fontSize: 8, alignment: 'center' }, { text: 'Monica Sierra Merlano', fontSize: 8, alignment: 'center' }, { text: 'Jorge Martinez Ramirez', fontSize: 8, alignment: 'center' }], [{ text: 'Coordinador de Ayudas DX', fontSize: 7, alignment: 'center' }, { text: 'Director Medico', fontSize: 7, alignment: 'center' }, { text: 'Gerente General', fontSize: 7, alignment: 'center' }]] } }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "perimetria": {
        id: "perimetria",
        internalCode: "950505",
        name: "Campo Visual (Perimetría)",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 2) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            
            const getEyeData = () => {
                const rand = Math.random();
                let dm, phg, obs, status;
                if (rand < 0.65) {
                    // Normal
                    dm = parseFloat(osc(-1.10, 0.90));
                    phg = "Dentro de límites normales";
                    obs = "no se observan defectos significativos de la sensibilidad retiniana; los puntos evaluados se mantienen dentro de los rangos de normalidad.";
                    status = "normal";
                } else if (rand < 0.85) {
                    // Limítrofe
                    dm = parseFloat(osc(-2.80, 0.80));
                    phg = "Limítrofe";
                    obs = "se observan puntos de disminución de la sensibilidad retiniana de baja significancia dispersos que no conforman un patrón.";
                    status = "limitrofe";
                } else {
                    // Anormal / Fuera de límites
                    dm = parseFloat(osc(-5.50, 1.50));
                    phg = "Fuera de límites normales";
                    obs = "se evidencia depresión moderada de la sensibilidad en el campo visual central/periférico. Se sugiere correlacionar con OCT de nervio óptico.";
                    status = "anormal";
                }
                return { dm: dm.toFixed(2), phg, obs, status };
            };

            const od = getEyeData();
            const oi = getEyeData();

            let conclusion = "Compatible con normalidad AO. Sugiero control anual. Gracias por la remisión.";
            if (od.status === "anormal" || oi.status === "anormal") {
                conclusion = "Compatible con sospecha de defecto campimétrico. Se sugiere correlación estrecha con clínica, OCT de nervio óptico y control periódico. Gracias por la remisión.";
            } else if (od.status === "limitrofe" || oi.status === "limitrofe") {
                conclusion = "Se sugiere control en 6 meses con nueva valoración o correlación con OCT de nervio óptico. Gracias por la remisión.";
            }

            return {
                pageSize: 'LETTER', pageMargins: [70, 30, 70, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 20] },
                    { text: 'PERIMETRIA AUTOMATIZADA - Prueba Central 24-2 Humphrey', fontSize: 11, bold: true, italics: true, decoration: 'underline', alignment: 'center', margin: [0, 0, 0, 30] },
                    { text: [{ text: 'PACIENTE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'FECHA: ', bold: true }, data.FECHA || ''], margin: [0, 0, 0, 20] },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 470, y2: 0, lineWidth: 0.5, strokeColor: '#666666' }], margin: [0, 0, 0, 25] },
                    { text: 'El Campo Visual Computarizado es una ayuda subjetiva y su credibilidad depende del desempeño del paciente. Se debe correlacionar con la clínica.', fontSize: 9, italics: true, lineHeight: 1.2, margin: [0, 0, 0, 25] },
                    { text: 'OJO DERECHO (OD):', bold: true, fontSize: 10, margin: [0, 0, 0, 8] },
                    { text: od.obs, margin: [15, 0, 0, 15], fontSize: 9.5, lineHeight: 1.25 },
                    { columns: [{ text: 'D.M.', bold: true, width: 60 }, { text: `${od.dm} DB`, width: 100 }, { text: 'P.H.G:', bold: true, width: 60 }, { text: od.phg, width: '*' }], margin: [15, 0, 0, 25], fontSize: 9.5 },
                    { text: 'OJO IZQUIERDO (OI):', bold: true, fontSize: 10, margin: [0, 0, 0, 8] },
                    { text: oi.obs, margin: [15, 0, 0, 15], fontSize: 9.5, lineHeight: 1.25 },
                    { columns: [{ text: 'D.M.', bold: true, width: 60 }, { text: `${oi.dm} DB`, width: 100 }, { text: 'P.H.G:', bold: true, width: 60 }, { text: oi.phg, width: '*' }], margin: [15, 0, 0, 30], fontSize: 9.5 },
                    { text: conclusion, fontSize: 9.5, margin: [0, 0, 0, 45] },
                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { stack: [{ text: 'VERONICA VARGAS G.', bold: true }, { text: 'Médico Oftalmólogo R.M. # 0899603', fontSize: 9 }] }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "topografia_corneal": {
        id: "topografia_corneal",
        internalCode: "951501",
        name: "Topografía Corneal",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 1) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            const genEye = () => {
                const k1 = parseFloat(osc(43.5, 1.2)); const k2 = parseFloat(osc(k1 + 1.1, 0.6));
                const axis = parseFloat((Math.random() * 180).toFixed(1));
                const astig = (k2 - k1).toFixed(1);
                return { k1, k2, axis, astig, rule: (axis > 60 && axis < 120) ? "CONTRA LA REGLA" : "CON LA REGLA", 
                         isv: Math.floor(Math.random() * 10) + 32, ki: osc(1.01, 0.02, 2), eleA: Math.floor(Math.random() * 15) + 45, 
                         eleP: (Math.random() > 0.5 ? "-" : "+") + (Math.floor(Math.random() * 10) + 35), pC: Math.floor(Math.random() * 30) + 545, pM: Math.floor(Math.random() * 30) + 525 };
            };
            const od = genEye(); const oi = genEye();
            return {
                pageSize: 'LETTER', pageMargins: [70, 25, 70, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 15] },
                    {
                        text: 'REPORTE DE RESULTADOS TOPOGRAFIA-CORNEAL',
                        color: '#2e5a88', alignment: 'center', bold: true, fontSize: 11, margin: [0, 0, 0, 20]
                    },
                    { text: [{ text: 'PACIENTE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], margin: [0, 2] },
                    { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], margin: [0, 2] },
                    { text: [{ text: 'FECHA: ', bold: true }, (data.FECHA || '').toUpperCase()], margin: [0, 2, 0, 20] },
                    
                    { text: `OD: K ${od.k1}Dpt / ${od.k2}Dpt a un eje de ${od.axis}°, el astigmatismo es de ${od.astig}Dpt.`, bold: true, fontSize: 10 },
                    {
                        text: [
                            `ISV: ${od.isv}\nKI: ${od.ki}\nElevación anterior +${od.eleA}\nElevación posterior ${od.eleP}\n`,
                            { text: `Indicando ASTIGMATISMO CORNEAL ${od.rule}\n`, color: 'red', bold: true },
                            { text: `La paquimetría central es de ${od.pC}um y el área más delgada es de ${od.pM}um\n` }
                        ],
                        fontSize: 9.5, lineHeight: 1.2, margin: [0, 2, 0, 15]
                    },

                    { text: `OI: K ${oi.k1}Dpt / ${oi.k2}Dpt a un eje de ${oi.axis}°, el astigmatismo es de ${oi.astig}Dpt.`, bold: true, fontSize: 10 },
                    {
                        text: [
                            `ISV: ${oi.isv}\nKI: ${oi.ki}\nElevación anterior +${oi.eleA}\nElevación posterior ${oi.eleP}\n`,
                            { text: `Indicando ASTIGMATISMO CORNEAL ${oi.rule}\n`, color: 'red', bold: true },
                            { text: `La paquimetría central es de ${oi.pC}um y el área más delgada es de ${oi.pM}um\n` }
                        ],
                        fontSize: 9.5, lineHeight: 1.2, margin: [0, 2, 0, 20]
                    },

                    { text: 'OBSERVACIONES Y RECOMENDACIONES', bold: true, fontSize: 10.5, margin: [0, 0, 0, 8] },
                    {
                        text: [
                            { text: 'K:', bold: true }, ' dentro de los límites normales ambos ojos\n',
                            { text: 'PACHY:', bold: true }, ' dentro de los límites normales ambos ojos\n',
                            { text: 'ELVACION ANT:', bold: true }, ' dentro de los límites normales ambos ojos\n',
                            { text: 'ELEVACION POST:', bold: true }, ' dentro de los límites normales ambos ojos\n',
                            { text: 'TCK OD QUERATOCONO NEGATIVO\n', color: 'red', bold: true, margin: [20, 0, 0, 0] },
                            { text: '       OI QUERATOCONO NEGATIVO', color: 'red', bold: true, decoration: 'underline' }
                        ],
                        fontSize: 9.5, lineHeight: 1.2, margin: [0, 0, 0, 15]
                    },

                    {
                        text: 'Paciente presenta astigmatismo en ambos ojos. Sugiero realizar topografia corneal anualmente. CORRELACIONAR DATOS CON SU HISTORIA CLINICA',
                        fontSize: 9.5, italics: true, margin: [0, 0, 0, 30]
                    },

                    signature ? { image: signature.data, width: 130, margin: [0, 10, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', fontSize: 9 }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "angiografia": {
        id: "angiografia",
        internalCode: "951202",
        name: "Angiografía Fluoresceínica",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const selected = []; const available = [...LISTA_DIAGNOSTICOS_ANGIO];
            const count = Math.floor(Math.random() * 2) + 1;
            for(let i=0; i<count; i++) {
                const idx = Math.floor(Math.random() * available.length);
                selected.push(available.splice(idx, 1)[0]);
            }
            const comentario = GET_COMENTARIO_ANGIO(selected);
            return {
                pageSize: 'LETTER', pageMargins: [70, 30, 70, 25],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 20] },
                    { text: 'REPORTE DE ANGIOGRAFÍA FLUORESCEÍNICA AMBOS OJOS', alignment: 'center', bold: true, fontSize: 11, color: '#2e5a88', margin: [0, 0, 0, 30] },
                    { text: [{ text: 'PACIENTE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], margin: [0, 0, 0, 5] },
                    { text: [{ text: 'FECHA: ', bold: true }, (data.FECHA || '').toUpperCase()], margin: [0, 0, 0, 25] },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 470, y2: 0, lineWidth: 0.5, strokeColor: '#666666' }], margin: [0, 0, 0, 25] },
                    { text: 'Tuve el gusto de interpretar el examen de Angiografía Fluoresceínica ocular de su paciente y considerando los tiempos de llenado vascular y las características de circulación y comportamiento de fluorescencia o ausencia de la misma en las estructuras de la retina y coroides, así como todos los parámetros a valorar en la interpretación de este estudio, considero que la impresión diagnóstica más acertada para su paciente es:', italics: true, alignment: 'justify', fontSize: 9.5, lineHeight: 1.25, margin: [0, 0, 0, 25] },
                    { text: 'Impresión Diagnóstica:', bold: true, margin: [0, 0, 0, 10] },
                    { stack: selected.map(d => ({ text: `➤   ODI. ${d.toUpperCase()}.`, margin: [20, 0, 0, 5], bold: true, fontSize: 9.5 })), margin: [0, 0, 0, 25] },
                    { text: [{ text: 'Comentario: ', bold: true }, { text: comentario }], fontSize: 9.5, lineHeight: 1.25, margin: [0, 0, 0, 40] },
                    { text: 'Atentamente,', margin: [0, 10, 0, 15] },
                    signature ? { image: signature.data, width: 130, margin: [0, 5, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', fontSize: 9 }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "otologia": {
        id: "otologia",
        internalCode: "954101",
        name: "Consulta de Otología",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const caso = CASOS_OTOLOGIA[Math.floor(Math.random() * CASOS_OTOLOGIA.length)];
            return {
                pageSize: 'LETTER', pageMargins: [60, 35, 60, 30],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; },
                content: [
                    { image: 'logo', width: 110, alignment: 'left', margin: [0, 0, 0, 15] },
                    { text: 'INFORME DE OTOLOGIA', alignment: 'center', bold: true, fontSize: 16, color: '#2e5a88', margin: [0, 0, 0, 25] },
                    {
                        table: {
                            widths: ['*'],
                            body: [[
                                {
                                    stack: [
                                        { text: 'SÍNTESIS DE HISTORIA CLÍNICA', bold: true, color: '#2e5a88', fontSize: 10, margin: [0, 0, 0, 6] },
                                        { text: [{ text: 'Paciente: ', bold: true }, cleanName(data.PACIENTE_NOMBRE), '   ', { text: 'Identificación: ', bold: true }, data.PACIENTE_ID], fontSize: 9.5, margin: [0, 0, 0, 4] },
                                        { text: [{ text: 'Diagnóstico Principal: ', bold: true }, caso.dx], fontSize: 9.5 }
                                    ],
                                    fillColor: '#f0f4f8',
                                    margin: [15, 10, 15, 10]
                                }
                            ]]
                        , layout: 'noBorders'
                        },
                        margin: [0, 0, 0, 30]
                    },
                    
                    { text: 'I. CORPUS DIAGNÓSTICO Y EXÁMENES', bold: true, color: '#2e5a88', fontSize: 11, margin: [0, 0, 0, 12] },
                    {
                        text: [
                            { text: '1. Diagnóstico por Imagen (TAC de Oídos): ', bold: true }, caso.tac, '\n\n',
                            { text: '2. Otoscopia de Control: ', bold: true }, caso.otoscopia, '\n\n',
                            { text: '3. Timpanometría y Reflejos: ', bold: true }, caso.timpano
                        ],
                        fontSize: 9.5, lineHeight: 1.25, alignment: 'justify', margin: [0, 0, 0, 25]
                    },

                    { text: 'II. RESOLUCIÓN DE JUNTA MÉDICA Y CONDUCTA', bold: true, color: '#2e5a88', fontSize: 11, margin: [0, 0, 0, 12] },
                    {
                        text: `Bajo el criterio unificado del equipo evaluador, se establece una ${caso.conducta}. El objetivo es iniciar el abordaje pertinente para mitigar la patología detectada y restaurar la funcionalidad auditiva.`,
                        fontSize: 9.5, lineHeight: 1.25, alignment: 'justify', margin: [0, 0, 0, 10]
                    },
                    {
                        ul: caso.planes.map(p => ({ text: p, margin: [0, 0, 0, 6] })),
                        fontSize: 9.5, margin: [20, 0, 0, 30]
                    },

                    { text: 'Dictamen emitido y avalado electrónicamente por:', italics: true, fontSize: 9, margin: [0, 15, 0, 15] },
                    {
                        stack: [
                            { text: 'DR. JORGE ALMARIO', bold: true, color: '#2e5a88', fontSize: 12 },
                            { text: 'Médico Especialista Evaluador', fontSize: 9.5 },
                            { text: 'Registro Médico / Licencia ESO (M.D.)', fontSize: 9 }
                        ]
                    }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "ecografia_ocular": {
        id: "ecografia_ocular",
        internalCode: "951302",
        name: "Ecografía Ocular Modo A/B",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 2) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            
            // Elegir un caso aleatorio
            const casoIndex = Math.floor(Math.random() * CASOS_ECOGRAFIA.length);
            const caso = CASOS_ECOGRAFIA[casoIndex];
            
            // Generar oscilaciones numéricas consistentes
            const la_od_val = osc(23.45, 0.40, 2);
            const la_oi_val = osc(23.48, 0.40, 2);
            const ac_od_val = osc(3.20, 0.20, 2);
            const pio_od_val = Math.round(caso.basal.pio_od_base + (Math.random() * 4 - 2)); 
            const pio_oi_val = Math.round(caso.basal.pio_oi_base + (Math.random() * 4 - 2));
            
            // Reemplazar marcadores en los textos
            const od_texto = caso.ultrasonografia.od
                .replace("{la_od}", la_od_val)
                .replace("{ac_od}", ac_od_val);
            const oi_texto = caso.ultrasonografia.oi
                .replace("{la_oi}", la_oi_val);
                
            const plan_textos = caso.plan.map(p => 
                p.replace("{la_od}", la_od_val)
                 .replace("{la_oi}", la_oi_val)
            );
            
            return {
                pageSize: 'LETTER', 
                pageMargins: [50, 20, 50, 15],
                images: { logo: getCurrentLogo() },
                background: function() { 
                    return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; 
                },
                content: [
                    { image: 'logo', width: 110, alignment: 'left', margin: [0, 0, 0, 10] },
                    { text: 'ECOGRAFIA OCULAR MODO A Y B AMBOS OJOS', fontSize: 11, bold: true, color: '#2e5a88', alignment: 'center', margin: [0, 0, 0, 10] },
                    
                    // Datos del Paciente en columnas
                    {
                        columns: [
                            { text: [{ text: 'Paciente: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], width: '*' },
                            { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], width: 150 },
                            { text: [{ text: 'Fecha: ', bold: true }, (data.FECHA || '').toUpperCase()], width: 120 }
                        ],
                        margin: [0, 0, 0, 10],
                        fontSize: 9.5
                    },
                    
                    // Separador
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 490, y2: 0, lineWidth: 1, strokeColor: '#2e5a88' }], margin: [0, 0, 0, 10] },
                    
                    // 1. Anamnesis
                    { text: '1. ANAMNESIS CLÍNICA Y ENFERMEDAD ACTUAL', bold: true, fontSize: 10, color: '#2e5a88', margin: [0, 0, 0, 3] },
                    { text: caso.anamnesis, fontSize: 8.5, alignment: 'justify', margin: [10, 0, 0, 8], lineHeight: 1.2 },
                    
                    // 2. Exploración Basal
                    { text: '2. EXPLORACIÓN CLÍNICA BASAL', bold: true, fontSize: 10, color: '#2e5a88', margin: [0, 0, 0, 4] },
                    {
                        table: {
                            widths: [150, '*', '*'],
                            body: [
                                [
                                    { text: 'Parámetro Clínico', bold: true, fillColor: '#f0f4f8', color: '#2e5a88', fontSize: 8 },
                                    { text: 'Ojo Derecho (OD)', bold: true, fillColor: '#f0f4f8', color: '#2e5a88', fontSize: 8 },
                                    { text: 'Ojo Izquierdo (OI)', bold: true, fillColor: '#f0f4f8', color: '#2e5a88', fontSize: 8 }
                                ],
                                [
                                    { text: 'Agudeza Visual (AV sc / cc)', fontSize: 8 },
                                    { text: caso.basal.av_od, fontSize: 8 },
                                    { text: caso.basal.av_oi, fontSize: 8 }
                                ],
                                [
                                    { text: 'Presión Intraocular (PIO)', fontSize: 8 },
                                    { text: `${pio_od_val} mmHg (Goldman)`, fontSize: 8 },
                                    { text: `${pio_oi_val} mmHg (Goldman)`, fontSize: 8 }
                                ],
                                [
                                    { text: 'Biomicroscopía (Seg. Anterior)', fontSize: 8 },
                                    { text: caso.basal.bio_od, fontSize: 8 },
                                    { text: caso.basal.bio_oi, fontSize: 8 }
                                ],
                                [
                                    { text: 'Reflejos Pupilares', fontSize: 8 },
                                    { text: caso.basal.ref_od, fontSize: 8 },
                                    { text: caso.basal.ref_oi, fontSize: 8 }
                                ]
                            ]
                        },
                        layout: {
                            paddingLeft: () => 4,
                            paddingRight: () => 4,
                            paddingTop: () => 2.5,
                            paddingBottom: () => 2.5,
                            hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 1 : 0.5,
                            vLineWidth: () => 0.5,
                            hLineColor: () => '#cccccc',
                            vLineColor: () => '#cccccc'
                        },
                        margin: [10, 0, 0, 8]
                    },
                    
                    // 3. Exploración Ultrasonográfica
                    { text: '3. EXPLORACIÓN ULTRA SONOGRÁFICA COMPARATIVA INTEGRADA (Modo A/B)', bold: true, fontSize: 10, color: '#2e5a88', margin: [0, 0, 0, 3] },
                    { text: caso.ultrasonografia.subtext, fontSize: 8.5, italics: true, margin: [10, 0, 0, 4], lineHeight: 1.15 },
                    {
                        ul: [
                            { text: [{ text: 'Ojo Derecho (OD): ', bold: true }, od_texto], margin: [0, 0, 0, 4], fontSize: 8.5 },
                            { text: [{ text: 'Ojo Izquierdo (OI): ', bold: true }, oi_texto], margin: [0, 0, 0, 4], fontSize: 8.5 }
                        ],
                        margin: [20, 0, 0, 8],
                        lineHeight: 1.2
                    },
                    
                    // 4. Diagnóstico Clínico
                    { text: '4. DIAGNÓSTICO CLÍNICO INTEGRADO', bold: true, fontSize: 10, color: '#2e5a88', margin: [0, 0, 0, 4] },
                    {
                        ol: caso.diagnosticos.map(d => ({ text: d, fontSize: 8.5, margin: [0, 0, 0, 2], bold: true })),
                        margin: [20, 0, 0, 8]
                    },
                    
                    // 5. Plan Terapéutico
                    { text: '5. PLAN TERAPÉUTICO Y CONDUCTA MÉDICA', bold: true, fontSize: 10, color: '#2e5a88', margin: [0, 0, 0, 4] },
                    {
                        stack: plan_textos.map(p => ({ text: p, fontSize: 8.5, margin: [0, 0, 0, 3] })),
                        margin: [10, 0, 0, 10],
                        lineHeight: 1.2
                    },
                    
                    // Firma
                    signature ? { image: signature.data, width: 115, margin: [0, 5, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', margin: [0, 10, 0, 0], fontSize: 8.5 }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
    "ubm": {
        id: "ubm",
        internalCode: "951304",
        name: "Ultrabiomicroscopía Ocular (UBM)",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const osc = (base, range, dec = 0) => (base + (Math.random() * (range * 2) - range)).toFixed(dec);
            
            // Elegir un caso aleatorio
            const casoIndex = Math.floor(Math.random() * CASOS_UBM.length);
            const caso = CASOS_UBM[casoIndex];
            
            // Generar espesores paquimétricos consistentes (oscilación de 5 micras en base)
            const paq_od_val = osc(535, 15, 0);
            const paq_oi_val = osc(540, 15, 0);
            
            // Generar variables de oscilación clínica coherentes
            let acd_od, acd_oi, tia_od, tia_oi, aod_od, aod_oi, cist_w, cist_h;
            if (casoIndex === 0) {
                acd_od = osc(3.35, 0.20, 2);
                acd_oi = osc(3.38, 0.20, 2);
                tia_od = osc(39, 4, 0);
                tia_oi = osc(40, 4, 0);
                aod_od = osc(0.39, 0.04, 2);
                aod_oi = osc(0.41, 0.04, 2);
            } else if (casoIndex === 1) {
                acd_od = osc(1.92, 0.12, 2);
                acd_oi = osc(1.95, 0.12, 2);
                tia_od = osc(11, 3, 0);
                tia_oi = osc(12, 3, 0);
                aod_od = osc(0.12, 0.02, 2);
                aod_oi = osc(0.13, 0.02, 2);
            } else {
                acd_od = osc(3.15, 0.15, 2);
                acd_oi = osc(3.18, 0.15, 2);
                tia_od = osc(37, 3, 0);
                tia_oi = osc(38, 3, 0);
                aod_od = osc(0.36, 0.03, 2);
                aod_oi = osc(0.38, 0.03, 2);
                cist_w = osc(1.42, 0.12, 2);
                cist_h = osc(1.22, 0.08, 2);
            }
            
            // Formatear textos con las variables de oscilación
            const od_cornea = caso.od.cornea.replace("{paq_od}", paq_od_val);
            const oi_cornea = caso.oi.cornea.replace("{paq_oi}", paq_oi_val);
            
            const od_camara = caso.od.camara.replace("{acd_od}", acd_od);
            const oi_camara = caso.oi.camara.replace("{acd_oi}", acd_oi);
            
            const od_angulo = caso.od.angulo.replace("{tia_od}", tia_od).replace("{aod_od}", aod_od);
            const oi_angulo = caso.oi.angulo.replace("{tia_oi}", tia_oi).replace("{aod_oi}", aod_oi);
            
            const od_iris = caso.od.iris;
            const oi_iris = caso.oi.iris;
            
            const od_cuerpo = caso.od.cuerpo.replace("{cist_w}", cist_w).replace("{cist_h}", cist_h);
            const oi_cuerpo = caso.oi.cuerpo;
            
            const od_cristalino = caso.od.cristalino;
            const oi_cristalino = caso.oi.cristalino;
            
            return {
                pageSize: 'LETTER', 
                pageMargins: [50, 20, 50, 15],
                images: { logo: getCurrentLogo() },
                background: function() { 
                    return { image: 'logo', width: 550, opacity: 0.05, absolutePosition: { x: 30, y: 240 } }; 
                },
                content: [
                    { image: 'logo', width: 110, alignment: 'left', margin: [0, 0, 0, 10] },
                    { text: 'REPORTE DE ULTRABIOMICROSCOPÍA OCULAR (UBM)', fontSize: 11, bold: true, color: '#2e5a88', alignment: 'center', margin: [0, 0, 0, 3] },
                    { text: 'Estudio de Alta Resolución del Segmento Anterior (50 MHz)', fontSize: 8.5, italics: true, color: '#475569', alignment: 'center', margin: [0, 0, 0, 10] },
                    
                    // Datos del Paciente
                    {
                        columns: [
                            { text: [{ text: 'NOMBRE: ', bold: true }, cleanName(data.PACIENTE_NOMBRE)], width: '*' },
                            { text: [{ text: 'ID: ', bold: true }, data.PACIENTE_ID || ''], width: 150 },
                            { text: [{ text: 'FECHA: ', bold: true }, (data.FECHA || '').toUpperCase()], width: 120 }
                        ],
                        margin: [0, 0, 0, 10],
                        fontSize: 9.5
                    },
                    
                    // Separador
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 490, y2: 0, lineWidth: 1.2, strokeColor: '#2e5a88' }], margin: [0, 0, 0, 10] },
                    
                    // Descripción de Estructuras
                    { text: 'DESCRIPCIÓN DE ESTRUCTURAS OCULARES', bold: true, fontSize: 10, color: '#2e5a88', margin: [0, 0, 0, 5] },
                    {
                        table: {
                            widths: [110, '*', '*'],
                            body: [
                                [
                                    { text: 'Estructura', bold: true, fillColor: '#2e5a88', color: 'white', fontSize: 8 },
                                    { text: 'Ojo Derecho (OD)', bold: true, fillColor: '#2e5a88', color: 'white', fontSize: 8 },
                                    { text: 'Ojo Izquierdo (OI)', bold: true, fillColor: '#2e5a88', color: 'white', fontSize: 8 }
                                ],
                                [
                                    { text: 'Córnea', bold: true, color: '#2e5a88', fontSize: 8 },
                                    { text: od_cornea, fontSize: 8 },
                                    { text: oi_cornea, fontSize: 8 }
                                ],
                                [
                                    { text: 'Cámara Anterior', bold: true, color: '#2e5a88', fontSize: 8 },
                                    { text: od_camara, fontSize: 8 },
                                    { text: oi_camara, fontSize: 8 }
                                ],
                                [
                                    { text: 'Ángulo Iridocorneal', bold: true, color: '#2e5a88', fontSize: 8 },
                                    { text: od_angulo, fontSize: 8 },
                                    { text: oi_angulo, fontSize: 8 }
                                ],
                                [
                                    { text: 'Iris', bold: true, color: '#2e5a88', fontSize: 8 },
                                    { text: od_iris, fontSize: 8 },
                                    { text: oi_iris, fontSize: 8 }
                                ],
                                [
                                    { text: 'Cuerpo Ciliar', bold: true, color: '#2e5a88', fontSize: 8 },
                                    { text: od_cuerpo, fontSize: 8 },
                                    { text: oi_cuerpo, fontSize: 8 }
                                ],
                                [
                                    { text: 'Cristalino / Lente', bold: true, color: '#2e5a88', fontSize: 8 },
                                    { text: od_cristalino, fontSize: 8 },
                                    { text: oi_cristalino, fontSize: 8 }
                                ]
                            ]
                        },
                        layout: {
                            paddingLeft: () => 4,
                            paddingRight: () => 4,
                            paddingTop: () => 2.5,
                            paddingBottom: () => 2.5,
                            hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 1 : 0.5,
                            vLineWidth: () => 0.5,
                            hLineColor: () => '#cccccc',
                            vLineColor: () => '#cccccc'
                        },
                        margin: [0, 0, 0, 15],
                        lineHeight: 1.1
                    },
                    
                    // Conclusión / Diagnóstico en caja destacada
                    {
                        table: {
                            widths: ['*'],
                            body: [[
                                {
                                    stack: [
                                        { text: 'CONCLUSIÓN / DIAGNÓSTICO', bold: true, color: '#2e5a88', fontSize: 9.5, margin: [0, 0, 0, 3] },
                                        ...caso.conclusion.map(c => ({ text: c, fontSize: 8.5, margin: [0, 0, 0, 2], bold: c.startsWith('ESTUDIO') || c.startsWith('ANOMALÍA') || c.startsWith('LESIÓN') })),
                                        { text: `\n• Conducta Recomendada: ${caso.conducta}`, fontSize: 8.5, italics: true }
                                    ],
                                    fillColor: '#f0f4f8',
                                    margin: [15, 6, 15, 6]
                                }
                            ]]
                        },
                        layout: 'noBorders',
                        margin: [0, 0, 0, 15]
                    },
                    
                    // Firma
                    signature ? { image: signature.data, width: 115, margin: [0, 5, 0, 0] } : { text: '__________________________\nMédico Oftalmólogo', margin: [0, 10, 0, 0], fontSize: 8.5 }
                ],
                defaultStyle: { fontSize: 10 }
            };
        }
    },
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
                conclusion = `El análisis integral de los registros nistagmográficos revela un compromiso vestibular periférico derecho caracterizado por:\n• Hipofunción canalicular derecha (confirmada por estimulación monotérmica).\n• Canalitiasis posterior derecha (asociada clínicamente a vértigo posicional).`;
                planManejo = `1. Valoración Especializada: Retomar a consulta con su médico tratante u Otorrinolaringólogo (ORL) para el seguimiento de comorbilidades (HTA/Diabetes) y control farmacológico.\n2. Terapia de Reposicionamiento Canalicular: Ejecución de maniobras específicas en consultorio (ej. Maniobra de Epley para canal posterior derecho) para resolver la canalitiasis de manera inmediata.\n3. Rehabilitación Vestibular: Sesiones guiadas de fonoaudiología/otoneurología encaminadas a potenciar la compensación central de la hipofunción vestibular derecha detectada.`;
            } else if (pruebaMono.includes("izquierda")) {
                conclusion = `El análisis integral de los registros nistagmográficos revela un compromiso vestibular periférico izquierdo caracterizado por:\n• Hipofunción canalicular izquierda (confirmada por estimulación monotérmica).\n• Canalitiasis posterior izquierda (asociada clínicamente a vértigo posicional).`;
                planManejo = `1. Valoración Especializada: Retomar a consulta con su médico tratante u Otorrinolaringólogo (ORL) para el seguimiento de comorbilidades (HTA/Diabetes) y control farmacológico.\n2. Terapia de Reposicionamiento Canalicular: Ejecución de maniobras específicas en consultorio (ej. Maniobra de Epley para canal posterior izquierdo) para resolver la canalitiasis de manera inmediata.\n3. Rehabilitación Vestibular: Sesiones guiadas de fonoaudiología/otoneurología encaminadas a potenciar la compensación central de la hipofunción vestibular izquierda detectada.`;
            } else {
                conclusion = "El análisis integral de los registros nistagmográficos NO revela compromiso vestibular periférico evidente. Función vestibular bilateral conservada y simétrica.";
                planManejo = `1. Valoración Especializada: Retomar a consulta con su médico tratante u Otorrinolaringólogo (ORL).\n2. Observación: Manejo conservador según evolución clínica.\n3. Control: Según criterio de su médico tratante.`;
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

                    { text: 'Dictamen emitido y avalado electrónicamente por:', italics: true, fontSize: 9, margin: [0, 15, 0, 15] },
                    {
                        stack: [
                            { text: 'DR. JORGE ALMARIO', bold: true, color: '#2e5a88', fontSize: 12 },
                            { text: 'Médico Especialista Evaluador', fontSize: 9.5 },
                            { text: 'Registro Médico / Licencia ESO (M.D.)', fontSize: 9 }
                        ]
                    }
                ],
                styles: {
                    headerTitle: { fontSize: 16, bold: true, alignment: 'center', color: '#104d8c' }
                }
            };
        }
    },
    "potencial_evocado_auditivo": {
        id: "potencial_evocado_auditivo",
        internalCode: "954621",
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

                    { text: 'Dictamen emitido y avalado electrónicamente por:', italics: true, fontSize: 9, margin: [0, 15, 0, 15] },
                    {
                        stack: [
                            { text: 'DR. JORGE ALMARIO', bold: true, color: '#2e5a88', fontSize: 12 },
                            { text: 'Médico Especialista Evaluador', fontSize: 9.5 },
                            { text: 'Registro Médico / Licencia ESO (M.D.)', fontSize: 9 }
                        ]
                    }
                ],
                styles: {
                    mainHeader: { fontSize: 16, bold: true, alignment: 'center', color: '#104d8c' },
                    subHeader: { fontSize: 14, bold: true, alignment: 'center', color: '#8b1f1f', decoration: 'underline', margin: [0, 5, 0, 15] },
                    sectionTitle: { fontSize: 11, bold: true, color: '#104d8c', margin: [0, 0, 0, 5] }
                }
            };
        }
    },
    "potenciales_visuales": {
        id: "potenciales_visuales",
        internalCode: "952302",
        name: "Potenciales Evocados Visuales",
        requiredFields: ["FECHA", "PACIENTE_NOMBRE", "PACIENTE_ID"],
        generateTemplate: (data, signature) => {
            const profile = Math.floor(Math.random() * 3);
            
            let p1 = {
                od: { n1: 32.9, p1: 48.8, n2: 60.1, p2: 86.4, n3: 100.5, p3: 108.0, amp: 7.6, color: 'green' },
                oi: { n1: 49.8, p1: 67.6, n2: 93.0, p2: 104.3, n3: 141.8, p3: 192.6, amp: 3.7, color: 'red' },
                b_od: { n1: 158.5, p1: 218.2, amp: 7.7, color: 'green' },
                b_oi: { n1: 142.9, p1: 219.2, amp: 4.4, color: 'red' },
                analisis: [
                    "Asimetría interocular significativa: Retraso en la conducción del ojo izquierdo (P2 de 104.3 ms) frente al derecho (P2 de 86.4 ms), con una diferencia patológica interocular de 17.9 ms.",
                    "Atenuación severa de amplitud en OI: Reducción de amplitud cortical de aproximadamente el 50% en el ojo izquierdo (3.7 µV) respecto al derecho (7.6 µV), indicativo de pérdida de fibras funcionales o desincronización de conducción.",
                    "Estimulación a 8 Hz: Aunque las latencias se equilibran, persiste el déficit de voltaje en el ojo izquierdo (4.4 µV vs. 7.7 µV)."
                ],
                impresion: [
                    "Ojo Derecho: Conducción periférico-cortical conservada y respuesta visual electrofisiológica normal.",
                    "Ojo Izquierdo: Compatible con **retraso leve de la conducción periférico-cortical** y **disminución moderada de amplitud** en la respuesta evocada.",
                    "Conclusión: Disfunción de la vía visual izquierda que condiciona una asimetría interocular clínicamente significativa."
                ]
            };
            
            if (profile === 0) {
                p1.od = { n1: 33.1, p1: 49.2, n2: 61.0, p2: 88.5, n3: 102.1, p3: 109.5, amp: 8.2, color: 'green' };
                p1.oi = { n1: 33.8, p1: 50.1, n2: 62.4, p2: 89.1, n3: 103.5, p3: 110.2, amp: 8.0, color: 'green' };
                p1.b_od = { n1: 156.2, p1: 215.1, amp: 8.5, color: 'green' };
                p1.b_oi = { n1: 157.0, p1: 216.5, amp: 8.3, color: 'green' };
                p1.analisis = [
                    "Simetría interocular conservada: Conducción simétrica en ambos ojos con latencias P2 dentro de límites de normalidad (88.5 ms en OD y 89.1 ms en OI).",
                    "Amplitudes corticales conservadas: Voltajes adecuados y simétricos en ambos ojos (> 8.0 µV), indicando indemnidad de la vía funcional.",
                    "Estimulación a 8 Hz: Respuestas estables y simétricas a altas frecuencias, sin evidencia de fatiga neural."
                ];
                p1.impresion = [
                    "Ojo Derecho: Conducción periférico-cortical conservada y respuesta visual electrofisiológica normal.",
                    "Ojo Izquierdo: Conducción periférico-cortical conservada y respuesta visual electrofisiológica normal.",
                    "Conclusión: Estudio electrofisiológico visual dentro de límites de normalidad. No se evidencian disfunciones en la vía visual bilateral."
                ];
            } else if (profile === 2) {
                p1.oi = { n1: 32.9, p1: 48.8, n2: 60.1, p2: 86.4, n3: 100.5, p3: 108.0, amp: 7.6, color: 'green' };
                p1.od = { n1: 49.8, p1: 67.6, n2: 93.0, p2: 104.3, n3: 141.8, p3: 192.6, amp: 3.7, color: 'red' };
                p1.b_oi = { n1: 158.5, p1: 218.2, amp: 7.7, color: 'green' };
                p1.b_od = { n1: 142.9, p1: 219.2, amp: 4.4, color: 'red' };
                p1.analisis = [
                    "Asimetría interocular significativa: Retraso en la conducción del ojo derecho (P2 de 104.3 ms) frente al izquierdo (P2 de 86.4 ms), con una diferencia patológica interocular de 17.9 ms.",
                    "Atenuación severa de amplitud en OD: Reducción de amplitud cortical de aproximadamente el 50% en el ojo derecho (3.7 µV) respecto al izquierdo (7.6 µV), indicativo de pérdida de fibras funcionales o desincronización de conducción.",
                    "Estimulación a 8 Hz: Aunque las latencias se equilibran, persiste el déficit de voltaje en el ojo derecho (4.4 µV vs. 7.7 µV)."
                ];
                p1.impresion = [
                    "Ojo Derecho: Compatible con **retraso leve de la conducción periférico-cortical** y **disminución moderada de amplitud** en la respuesta evocada.",
                    "Ojo Izquierdo: Conducción periférico-cortical conservada y respuesta visual electrofisiológica normal.",
                    "Conclusión: Disfunción de la vía visual derecha que condiciona una asimetría interocular clínicamente significativa."
                ];
            }

            return {
                pageSize: 'LETTER',
                pageMargins: [40, 40, 40, 40],
                images: { logo: getCurrentLogo() },
                background: function() { return { image: 'logo', width: 450, opacity: 0.05, absolutePosition: { x: 80, y: 250 } }; },
                content: [
                    { image: 'logo', width: 120, alignment: 'left', margin: [0, 0, 0, 10] },
                    { text: 'Potenciales Evocados Visuales', style: 'mainHeader' },
                    {
                        table: {
                            widths: ['auto', '*', 'auto', '*'],
                            body: [
                                [ 
                                    { text: 'Paciente:', bold: true }, { text: cleanName(data.PACIENTE_NOMBRE) },
                                    { text: 'ID Paciente:', bold: true }, { text: data.PACIENTE_ID }
                                ],
                                [ 
                                    { text: 'Fecha:', bold: true }, { text: data.FECHA },
                                    { text: '' }, { text: '' }
                                ]
                            ]
                        },
                        margin: [0, 10, 0, 10],
                        fontSize: 9.5
                    },
                    
                    { text: '2. Mediciones Registradas', style: 'sectionTitle' },
                    
                    { text: 'A. Protocolo Transitorio (1.4 Hz)', bold: true, margin: [0, 5, 0, 5], fontSize: 10 },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                            body: [
                                [ 
                                    { text: 'Ojo', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'N1 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'P1 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'N2 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'P2 [Pico]\n(ms)', bold: true, color: 'white', fillColor: '#04346c', alignment: 'center' },
                                    { text: 'N3 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'P3 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'Amp. N2-P2\n(µV)', bold: true, color: 'white', fillColor: '#04346c', alignment: 'center' }
                                ],
                                [
                                    { text: 'Derecho (OD)' },
                                    { text: p1.od.n1.toFixed(1) + '' },
                                    { text: p1.od.p1.toFixed(1) + '' },
                                    { text: p1.od.n2.toFixed(1) + '' },
                                    { text: p1.od.p2.toFixed(1) + '', fillColor: p1.od.color === 'red' ? '#fdecea' : '' },
                                    { text: p1.od.n3.toFixed(1) + '' },
                                    { text: p1.od.p3.toFixed(1) + '' },
                                    { text: p1.od.amp.toFixed(1) + '', color: p1.od.color, bold: true }
                                ],
                                [
                                    { text: 'Izquierdo (OI)' },
                                    { text: p1.oi.n1.toFixed(1) + '' },
                                    { text: p1.oi.p1.toFixed(1) + '' },
                                    { text: p1.oi.n2.toFixed(1) + '' },
                                    { text: p1.oi.p2.toFixed(1) + '', fillColor: p1.oi.color === 'red' ? '#fdecea' : '' },
                                    { text: p1.oi.n3.toFixed(1) + '' },
                                    { text: p1.oi.p3.toFixed(1) + '' },
                                    { text: p1.oi.amp.toFixed(1) + '', color: p1.oi.color, bold: true }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function () { return 0.5; },
                            vLineWidth: function () { return 0.5; },
                            hLineColor: function () { return '#aaaaaa'; },
                            vLineColor: function () { return '#aaaaaa'; },
                            paddingLeft: function() { return 4; },
                            paddingRight: function() { return 4; },
                            paddingTop: function() { return 4; },
                            paddingBottom: function() { return 4; }
                        },
                        fontSize: 9, margin: [0, 0, 0, 8], alignment: 'center'
                    },
                    
                    { text: 'B. Protocolo de Alta Frecuencia (8 Hz)', bold: true, margin: [0, 5, 0, 5], fontSize: 10 },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '*', '*', '*'],
                            body: [
                                [ 
                                    { text: 'Ojo / Canal', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'Latencia N1 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'Latencia P1 (ms)', bold: true, color: 'white', fillColor: '#04346c' },
                                    { text: 'Amplitud N1-P1 (µV)', bold: true, color: 'white', fillColor: '#04346c' }
                                ],
                                [
                                    { text: 'Ojo Derecho (OD)' },
                                    { text: p1.b_od.n1.toFixed(1) + '' },
                                    { text: p1.b_od.p1.toFixed(1) + '' },
                                    { text: p1.b_od.amp.toFixed(1) + '', color: p1.b_od.color, bold: true }
                                ],
                                [
                                    { text: 'Ojo Izquierdo (OI)' },
                                    { text: p1.b_oi.n1.toFixed(1) + '' },
                                    { text: p1.b_oi.p1.toFixed(1) + '' },
                                    { text: p1.b_oi.amp.toFixed(1) + '', color: p1.b_oi.color, bold: true }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function () { return 0.5; },
                            vLineWidth: function () { return 0.5; },
                            hLineColor: function () { return '#aaaaaa'; },
                            vLineColor: function () { return '#aaaaaa'; },
                            paddingLeft: function() { return 4; },
                            paddingRight: function() { return 4; },
                            paddingTop: function() { return 4; },
                            paddingBottom: function() { return 4; }
                        },
                        fontSize: 9, margin: [0, 0, 0, 10], alignment: 'center'
                    },

                    { text: '3. Análisis Clínico', style: 'sectionTitle' },
                    {
                        ul: p1.analisis,
                        fontSize: 9.5, margin: [0, 0, 0, 8], lineHeight: 1.15
                    },

                    { text: '4. Impresión Diagnóstica', style: 'sectionTitle' },
                    {
                        ol: p1.impresion,
                        fontSize: 9.5, margin: [0, 0, 0, 8], lineHeight: 1.15
                    },
                    
                    { text: 'Sugerencia médica: Correlacionar con OCT de capa de fibras nerviosas de la retina y campimetría computarizada.', fontSize: 9.5, bold: true, margin: [15, 0, 0, 15] },

                    {
                        stack: [
                            (typeof FIRMA_INGRID_BASE64 !== 'undefined') ? { image: FIRMA_INGRID_BASE64, width: 120, margin: [0, 0, 0, 0] } : { text: '__________________________\nMédico Especialista\nOftalmólogo / Neurooftalmólogo', margin: [0, 10, 0, 0], fontSize: 9 }
                        ]
                    }
                ],
                styles: {
                    mainHeader: { fontSize: 16, bold: true, alignment: 'center', color: '#104d8c', margin: [0, 0, 0, 8] },
                    sectionTitle: { fontSize: 11, bold: true, color: '#104d8c', margin: [0, 0, 0, 5] }
                }
            };
        }
    }
};

// --- 2. VARIABLES DE ESTADO ---
let selectedStudy = null;
let excelData = [];
let signatures = [];
let isGenerating = false;
let outputFormat = 'zip';
let cotizacionServicios = []; // Listado de servicios agregados para cotización
let tarifasGuardadas = {}; // Cache de tarifas guardadas localmente
let facturaData = [];
let isGeneratingFactura = false;

// --- 3. REFERENCIAS DOM ---
const studySelect = document.getElementById('studySelect');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const requirementsBox = document.getElementById('requirementsBox');
const requiredColumnsList = document.getElementById('requiredColumnsList');
const btnDownloadSample = document.getElementById('btnDownloadSample');
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const filePreview = document.getElementById('filePreview');
const fileName = document.getElementById('fileName');
const fileRowsCount = document.getElementById('fileRows');
const btnRemoveFile = document.getElementById('btnRemoveFile');
const btnGenerate = document.getElementById('btnGenerate');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const progressPercentage = document.getElementById('progressPercentage');
const successMessage = document.getElementById('successMessage');

const signatureGallery = document.getElementById('signatureGallery');
const btnAddSignature = document.getElementById('btnAddSignature');
const signatureInput = document.getElementById('signatureInput');

const outputFormatContainer = document.getElementById('outputFormatContainer');
const toggleBtns = document.querySelectorAll('.toggle-btn');

// Nuevas referencias para Cotizaciones
const btnAddServicio = document.getElementById('btnAddServicio');
const tbodyServiciosCotizados = document.getElementById('tbodyServiciosCotizados');
const cotObservaciones = document.getElementById('cotObservaciones');
const cotDescuento = document.getElementById('cotDescuento');
const cotIva = document.getElementById('cotIva');
const resSubtotal = document.getElementById('resSubtotal');
const resDescuento = document.getElementById('resDescuento');
const resIva = document.getElementById('resIva');
const resTotal = document.getElementById('resTotal');

// Referencias DOM para Facturas
const uploadZoneFactura = document.getElementById('uploadZoneFactura');
const fileInputFactura = document.getElementById('fileInputFactura');
const filePreviewFactura = document.getElementById('filePreviewFactura');
const fileNameFactura = document.getElementById('fileNameFactura');
const fileSizeFactura = document.getElementById('fileSizeFactura');
const btnRemoveFileFactura = document.getElementById('btnRemoveFileFactura');
const btnGenerateFactura = document.getElementById('btnGenerateFactura');
const progressContainerFactura = document.getElementById('progressContainerFactura');
const progressBarFactura = document.getElementById('progressBarFactura');
const progressTextFactura = document.getElementById('progressTextFactura');
const progressPercentageFactura = document.getElementById('progressPercentageFactura');
const successMessageFactura = document.getElementById('successMessageFactura');
const tbodyFacturaEstudios = document.getElementById('tbodyFacturaEstudios');
const facturaSummaryText = document.getElementById('facturaSummaryText');

// --- 4. INICIALIZACIÓN ---
async function init() {
    try {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        loadSignatures();
        // Polling para sincronización en tiempo real (cada 3 segundos) con servidor local
        setInterval(loadSignatures, 3000);

        Object.values(CATALOG).forEach(study => {
            const option = document.createElement('option');
            option.value = study.id;
            option.textContent = study.name;
            studySelect.appendChild(option);
        });

        studySelect.addEventListener('change', handleStudySelection);
        btnDownloadSample.addEventListener('click', downloadSampleExcel);
        uploadZone.addEventListener('click', () => fileInput.click());
        uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
        uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]);
        });
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleFileUpload(e.target.files[0]);
        });
        btnRemoveFile.addEventListener('click', clearFile);
        btnGenerate.addEventListener('click', generatePdfs);

        btnAddSignature.addEventListener('click', () => signatureInput.click());
        signatureInput.addEventListener('change', handleSignatureUpload);

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                outputFormat = btn.dataset.value;
            });
        });
        
        // Tabs Navegación
        const tabBtns = document.querySelectorAll('.app-tabs .tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('soportesView').style.display = 'none';
                document.getElementById('cotizacionesView').style.display = 'none';
                document.getElementById('facturasView').style.display = 'none';
                document.getElementById(btn.dataset.target).style.display = 'block';
            });
        });
        document.getElementById('btnGenerarCotizacion').addEventListener('click', generarCotizacionPDF);

        // Configure PDF.js Global worker
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        }

        // Eventos Facturas
        if (uploadZoneFactura) {
            uploadZoneFactura.addEventListener('click', () => fileInputFactura.click());
            uploadZoneFactura.addEventListener('dragover', (e) => { e.preventDefault(); uploadZoneFactura.classList.add('dragover'); });
            uploadZoneFactura.addEventListener('dragleave', () => uploadZoneFactura.classList.remove('dragover'));
            uploadZoneFactura.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZoneFactura.classList.remove('dragover');
                if (e.dataTransfer.files.length) handleFacturaUpload(e.dataTransfer.files);
            });
        }
        if (fileInputFactura) {
            fileInputFactura.addEventListener('change', (e) => {
                if (e.target.files.length) handleFacturaUpload(e.target.files);
            });
        }
        if (btnRemoveFileFactura) btnRemoveFileFactura.addEventListener('click', clearFactura);
        if (btnGenerateFactura) btnGenerateFactura.addEventListener('click', generatePdfsFromFactura);

        // --- INICIALIZAR AUTOCOMPLETADO Y CONTROLES DE COTIZACIONES ---
        loadTarifas();
        if (typeof SERVICIOS_DATA !== 'undefined') {
            const listaCodigos = document.getElementById('listaCodigos');
            const listaNombres = document.getElementById('listaNombres');
            
            SERVICIOS_DATA.forEach(servicio => {
                const optCod = document.createElement('option');
                optCod.value = servicio.codigo;
                listaCodigos.appendChild(optCod);
                
                const optNom = document.createElement('option');
                optNom.value = servicio.descripcion;
                listaNombres.appendChild(optNom);
            });

            const inputCodigo = document.getElementById('cotServicioCodigo');
            const inputNombre = document.getElementById('cotServicioNombre');
            const inputValor = document.getElementById('cotServicioValor');

            inputCodigo.addEventListener('input', (e) => {
                const val = e.target.value;
                const match = SERVICIOS_DATA.find(s => s.codigo === val);
                if (match) {
                    inputNombre.value = match.descripcion;
                    if (tarifasGuardadas[match.codigo] !== undefined) {
                        inputValor.value = tarifasGuardadas[match.codigo];
                    }
                }
            });

            inputNombre.addEventListener('input', (e) => {
                const val = e.target.value;
                const match = SERVICIOS_DATA.find(s => s.descripcion === val);
                if (match) {
                    inputCodigo.value = match.codigo;
                    if (tarifasGuardadas[match.codigo] !== undefined) {
                        inputValor.value = tarifasGuardadas[match.codigo];
                    }
                }
            });

            // Enlazar eventos de múltiples servicios y resumen
            btnAddServicio.addEventListener('click', addServicioCotizacion);
            if (cotDescuento) cotDescuento.addEventListener('input', renderCotizacionResumen);
            if (cotIva) cotIva.addEventListener('input', renderCotizacionResumen);
        }
        
        console.log("✅ Aplicación inicializada.");
    } catch (error) {
        console.error("❌ Error init:", error);
    }
}

// --- 5. LÓGICA DE FIRMAS (SERVIDOR LOCAL) ---
async function loadSignatures() {
    try {
        const response = await fetch('/api/signatures');
        if (response.ok) {
            const data = await response.json();
            // Evitar re-renderizados innecesarios si no hay cambios
            if (JSON.stringify(signatures) !== JSON.stringify(data)) {
                signatures = data;
                renderSignatureGallery();
            }
        } else {
            throw new Error("Server response not ok");
        }
    } catch (e) {
        // Fallback a localStorage si el servidor falla o si se abre directo el archivo (file://)
        const saved = localStorage.getItem('diag_signatures');
        if (saved && signatures.length === 0) { 
            signatures = JSON.parse(saved); 
            renderSignatureGallery(); 
        }
    }
}

async function saveSignatures() { 
    // Guardar en local siempre como respaldo
    localStorage.setItem('diag_signatures', JSON.stringify(signatures));
    
    try {
        await fetch('/api/signatures', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signatures)
        });
    } catch (e) {
        console.log("No se pudo guardar en el servidor local. Se guardó de forma local en este PC.");
    }
}

async function handleSignatureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
        const compressedBase64 = await compressImage(file);
        signatures.push({ id: Date.now(), data: compressedBase64, selected: signatures.length === 0 });
        saveSignatures();
        renderSignatureGallery();
        signatureInput.value = '';
    } catch (err) { alert("Error: " + err.message); }
}

function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400; 
                let width = img.width, height = img.height;
                if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                canvas.width = width; canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/png', 0.5));
            };
        };
        reader.onerror = reject;
    });
}

function renderSignatureGallery() {
    signatureGallery.innerHTML = signatures.length ? '' : '<p style="grid-column: 1/-1; text-align: center; padding: 1rem; color: var(--text-muted);">No hay firmas cargadas.</p>';
    signatures.forEach(sig => {
        const card = document.createElement('div');
        card.className = 'signature-card';
        card.style.cursor = 'pointer';
        card.style.border = sig.selected ? '2.5px solid var(--primary)' : '1px solid var(--card-border)';
        card.style.boxShadow = sig.selected ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none';
        
        card.innerHTML = `<div class="signature-preview-container"><img src="${sig.data}"></div>
            <div class="signature-card-actions">
                ${sig.selected ? '<span class="badge" style="background: var(--primary); color: white;">Seleccionada</span>' : '<span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">Inactiva</span>'}
                <div class="signature-delete-btn" title="Eliminar"><i data-lucide="trash-2" style="width:16px;"></i></div>
            </div>`;

        // Al hacer clic en la firma se selecciona como activa
        card.querySelector('.signature-preview-container').addEventListener('click', () => {
            signatures.forEach(s => s.selected = (s.id === sig.id));
            saveSignatures();
            renderSignatureGallery();
        });

        card.querySelector('.signature-delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const wasSelected = sig.selected;
            signatures = signatures.filter(s => s.id !== sig.id);
            if (wasSelected && signatures.length > 0) {
                signatures[0].selected = true;
            }
            saveSignatures();
            renderSignatureGallery();
        });
        signatureGallery.appendChild(card);
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- 6. LÓGICA DE INTERFAZ ---
function handleStudySelection(e) {
    const studyId = e.target.value;
    selectedStudy = CATALOG[studyId];
    if (selectedStudy) {
        requiredColumnsList.innerHTML = '';
        selectedStudy.requiredFields.forEach(field => {
            const li = document.createElement('li'); li.textContent = field; requiredColumnsList.appendChild(li);
        });
        requirementsBox.style.display = 'block';
        outputFormatContainer.style.display = (studyId === 'lentes' || studyId === 'comprobante_recibido') ? 'block' : 'none';
        step2.classList.remove('disabled'); step2.classList.add('active'); step1.classList.remove('active');
        clearFile();
    }
}

function downloadSampleExcel() {
    if (!selectedStudy) return;
    const ws = XLSX.utils.aoa_to_sheet([selectedStudy.requiredFields]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, `Plantilla_${selectedStudy.id}.xlsx`);
}

function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
            if (json.length === 0) { alert('Excel vacío.'); return; }
            excelData = json;
            fileName.textContent = file.name;
            fileRowsCount.textContent = `${excelData.length} registros`;
            uploadZone.style.display = 'none'; filePreview.style.display = 'flex';
            step3.classList.remove('disabled'); step3.classList.add('active'); step2.classList.remove('active');
            btnGenerate.classList.remove('disabled');
        } catch (err) { alert("Error Excel: " + err.message); }
    };
    reader.readAsArrayBuffer(file);
}

function clearFile() {
    fileInput.value = ''; excelData = [];
    uploadZone.style.display = 'block'; filePreview.style.display = 'none';
    step3.classList.add('disabled'); btnGenerate.classList.add('disabled');
}

// --- 7. MOTOR DE GENERACIÓN ---
async function generatePdfs() {
    if (isGenerating) return;
    try {
        isGenerating = true;
        btnGenerate.classList.add('disabled');
        btnGenerate.innerHTML = '<span>Procesando...</span>';
        progressContainer.style.display = 'block';
        successMessage.style.display = 'none';
        const total = excelData.length;
        if (typeof pdfMake !== 'undefined' && !pdfMake.vfs && typeof pdfMake.vfs_fonts !== 'undefined') {
            pdfMake.vfs = pdfMake.vfs_fonts.pdfMake.vfs;
        }
        if (outputFormat === 'unified') {
            const unifiedContent = [];
            for (let i = 0; i < total; i++) {
                const rowData = excelData[i];
                let currentSig = signatures.find(s => s.selected) || (signatures.length ? signatures[0] : null);
                
                // Lógica de despacho para modo masivo o normal
                const template = selectedStudy.isMassive 
                    ? selectedStudy.generateTemplate(rowData, currentSig)
                    : selectedStudy.generateTemplate(rowData, currentSig);

                unifiedContent.push(...template.content);
                if (i < total - 1) unifiedContent.push({ text: '', pageBreak: 'after' });
                progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;
                progressText.textContent = `Preparando: ${i + 1} / ${total}`;
            }
            const firstTemplate = selectedStudy.generateTemplate(excelData[0], signatures.find(s => s.selected) || (signatures.length ? signatures[0] : null));
            const finalDocDef = { ...firstTemplate, content: unifiedContent };
            pdfMake.createPdf(finalDocDef).download(`Soportes_Unificados_${new Date().getTime()}.pdf`);
        } else {
            const zip = new JSZip();
            
            // Pre-escanear para contar las ocurrencias totales de cada identificación
            const totalCounts = {};
            for (let i = 0; i < total; i++) {
                const rowData = excelData[i];
                const baseId = String(rowData.PACIENTE_ID || rowData.IDENTIFICACION || i)
                    .replace(/^([A-Z]+)(\d+)/i, '$1 $2') 
                    .replace(/[^a-z0-9 ]/gi, '')
                    .trim();
                totalCounts[baseId] = (totalCounts[baseId] || 0) + 1;
            }

            const currentCounts = {};
            for (let i = 0; i < total; i++) {
                const rowData = excelData[i];
                let currentSig = signatures.find(s => s.selected) || (signatures.length ? signatures[0] : null);
                
                const docDef = selectedStudy.isMassive
                    ? selectedStudy.generateTemplate(rowData, currentSig)
                    : selectedStudy.generateTemplate(rowData, currentSig);
                
                const baseId = String(rowData.PACIENTE_ID || rowData.IDENTIFICACION || i)
                    .replace(/^([A-Z]+)(\d+)/i, '$1 $2') 
                    .replace(/[^a-z0-9 ]/gi, '')
                    .trim();

                currentCounts[baseId] = (currentCounts[baseId] || 0) + 1;

                // Si se repite el mismo documento, se guarda como 1234_1, 1234_2, etc.
                const filename = totalCounts[baseId] > 1 
                    ? `${baseId}_${currentCounts[baseId]}` 
                    : baseId;

                await new Promise((resolve) => {
                    pdfMake.createPdf(docDef).getBlob((blob) => {
                        zip.file(`${filename}.pdf`, blob);
                        resolve();
                    });
                });
                progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;
                progressText.textContent = `Procesando: ${i + 1} / ${total}`;
                if (i % 5 === 0) await new Promise(r => setTimeout(r, 10));
            }
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `Soportes_${selectedStudy.id}_${new Date().getTime()}.zip`);
        }
        successMessage.style.display = 'flex';
    } catch (error) {
        console.error(error); alert("💥 Error: " + error.message);
    } finally {
        isGenerating = false;
        btnGenerate.innerHTML = '<i data-lucide="zap"></i> Generar Soportes';
        btnGenerate.classList.remove('disabled');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// --- 7.5 GESTIÓN DE LISTADO DE SERVICIOS EN COTIZACIONES ---
function loadTarifas() {
    try {
        const saved = localStorage.getItem('diag_tarifas_guardadas');
        if (saved) {
            tarifasGuardadas = JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error al cargar tarifas:", e);
    }
}

function saveTarifa(codigo, valor) {
    if (!codigo || isNaN(parseFloat(valor))) return;
    tarifasGuardadas[codigo] = parseFloat(valor);
    localStorage.setItem('diag_tarifas_guardadas', JSON.stringify(tarifasGuardadas));
}

function addServicioCotizacion() {
    const inputCodigo = document.getElementById('cotServicioCodigo');
    const inputNombre = document.getElementById('cotServicioNombre');
    const inputValor = document.getElementById('cotServicioValor');

    const codigo = inputCodigo.value.trim();
    const descripcion = inputNombre.value.trim();
    const valor = parseFloat(inputValor.value);

    if (!codigo || !descripcion || isNaN(valor)) {
        alert("Por favor ingrese código, descripción y un valor válido para el servicio.");
        return;
    }

    // Agregar al listado en memoria
    const id = Date.now();
    cotizacionServicios.push({ id, codigo, descripcion, valor });

    // Guardar la tarifa en memoria persistente
    saveTarifa(codigo, valor);

    // Limpiar inputs de servicio
    inputCodigo.value = '';
    inputNombre.value = '';
    inputValor.value = '';

    // Renderizar listado y totales
    renderServiciosCotizados();
    renderCotizacionResumen();
}

function removeServicioCotizacion(id) {
    cotizacionServicios = cotizacionServicios.filter(s => s.id !== id);
    renderServiciosCotizados();
    renderCotizacionResumen();
}

function renderServiciosCotizados() {
    const tbody = document.getElementById('tbodyServiciosCotizados');
    tbody.innerHTML = '';

    if (cotizacionServicios.length === 0) {
        tbody.innerHTML = `
            <tr id="emptyRow">
                <td colspan="4" style="padding: 15px; text-align: center; color: var(--text-muted); font-style: italic;">No se han agregado servicios a esta cotización.</td>
            </tr>
        `;
        return;
    }

    cotizacionServicios.forEach(serv => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding: 10px; font-family: monospace;">${serv.codigo}</td>
            <td style="padding: 10px;">${serv.descripcion}</td>
            <td style="padding: 10px; text-align: right; font-weight: 500;">$ ${serv.valor.toLocaleString('es-CO')}</td>
            <td style="padding: 10px; text-align: center;">
                <button type="button" class="delete-service-btn" data-id="${serv.id}" title="Eliminar servicio">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                </button>
            </td>
        `;
        
        tr.querySelector('.delete-service-btn').addEventListener('click', () => {
            removeServicioCotizacion(serv.id);
        });

        tbody.appendChild(tr);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderCotizacionResumen() {
    const subtotal = cotizacionServicios.reduce((acc, curr) => acc + curr.valor, 0);
    
    let descPct = cotDescuento ? parseFloat(cotDescuento.value) : 0;
    if (isNaN(descPct) || descPct < 0) descPct = 0;
    if (descPct > 100) descPct = 100;
    
    let ivaPct = cotIva ? parseFloat(cotIva.value) : 0;
    if (isNaN(ivaPct) || ivaPct < 0) ivaPct = 0;
    if (ivaPct > 100) ivaPct = 100;

    const descuento = subtotal * (descPct / 100);
    const subtotalConDescuento = subtotal - descuento;
    const iva = subtotalConDescuento * (ivaPct / 100);
    const total = subtotalConDescuento + iva;

    if (resSubtotal) resSubtotal.textContent = `$ ${subtotal.toLocaleString('es-CO')}`;
    if (resDescuento) resDescuento.textContent = `$ ${descuento.toLocaleString('es-CO')}`;
    if (resIva) resIva.textContent = `$ ${iva.toLocaleString('es-CO')}`;
    if (resTotal) resTotal.textContent = `$ ${total.toLocaleString('es-CO')}`;
}

// --- 8. MÓDULO DE COTIZACIONES ---
let cotizacionCounter = localStorage.getItem('cotizacionCounter') ? parseInt(localStorage.getItem('cotizacionCounter')) : 850;

function generarCotizacionPDF() {
    const nombre = document.getElementById('cotNombre').value.trim();
    const idStr = document.getElementById('cotID').value.trim();
    const eps = document.getElementById('cotEPS').value;

    if (!nombre || !idStr || !eps) {
        alert("Por favor, completa los campos del Paciente, Identificación y selecciona la EPS.");
        return;
    }

    if (cotizacionServicios.length === 0) {
        alert("Por favor, agrega al menos un servicio a la cotización.");
        return;
    }

    // Fecha automática de hoy
    const dateObj = new Date();
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const fechaFormateada = `Barranquilla, ${dateObj.getDate()} ${meses[dateObj.getMonth()]} DE ${dateObj.getFullYear()}`;
    
    // Obtener valores de descuento e IVA
    let descPct = cotDescuento ? parseFloat(cotDescuento.value) : 0;
    if (isNaN(descPct) || descPct < 0) descPct = 0;
    if (descPct > 100) descPct = 100;
    
    let ivaPct = cotIva ? parseFloat(cotIva.value) : 0;
    if (isNaN(ivaPct) || ivaPct < 0) ivaPct = 0;
    if (ivaPct > 100) ivaPct = 100;

    const subtotal = cotizacionServicios.reduce((acc, curr) => acc + curr.valor, 0);
    const descuento = subtotal * (descPct / 100);
    const subtotalConDescuento = subtotal - descuento;
    const iva = subtotalConDescuento * (ivaPct / 100);
    const total = subtotalConDescuento + iva;

    // Observaciones
    const observaciones = cotObservaciones.value.trim();

    // Tabla de PDFMake
    const tableBody = [
        [
            { text: 'CÓDIGO', bold: true, fontSize: 9, fillColor: '#2e5a88', color: 'white', border: [false, false, false, true], margin: [0, 4, 0, 4] },
            { text: 'DESCRIPCIÓN', bold: true, fontSize: 9, fillColor: '#2e5a88', color: 'white', border: [false, false, false, true], margin: [0, 4, 0, 4] },
            { text: 'VALOR', bold: true, fontSize: 9, fillColor: '#2e5a88', color: 'white', alignment: 'right', border: [false, false, false, true], margin: [0, 4, 0, 4] }
        ]
    ];

    cotizacionServicios.forEach((serv, idx) => {
        const fillColor = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
        tableBody.push([
            { text: serv.codigo, fontSize: 9, fillColor, border: [false, false, false, true], borderColor: '#e2e8f0', margin: [0, 4, 0, 4] },
            { text: serv.descripcion.toUpperCase(), fontSize: 9, fillColor, border: [false, false, false, true], borderColor: '#e2e8f0', margin: [0, 4, 0, 4] },
            { text: `$ ${serv.valor.toLocaleString('es-CO')}`, fontSize: 9, fillColor, alignment: 'right', border: [false, false, false, true], borderColor: '#e2e8f0', margin: [0, 4, 0, 4] }
        ]);
    });

    // Subtotal
    tableBody.push([
        { text: 'SUBTOTAL', colSpan: 2, bold: true, fontSize: 9, alignment: 'right', border: [false, true, false, false], margin: [0, 5, 0, 5] },
        {},
        { text: `$ ${subtotal.toLocaleString('es-CO')}`, bold: true, fontSize: 9, alignment: 'right', border: [false, true, false, false], margin: [0, 5, 0, 5] }
    ]);

    // Descuento si aplica
    if (descuento > 0) {
        tableBody.push([
            { text: `DESCUENTO (${descPct}%)`, colSpan: 2, bold: true, fontSize: 9, alignment: 'right', border: [false, false, false, false], margin: [0, 4, 0, 4] },
            {},
            { text: `- $ ${descuento.toLocaleString('es-CO')}`, bold: true, fontSize: 9, alignment: 'right', border: [false, false, false, false], margin: [0, 4, 0, 4] }
        ]);
    }

    // IVA si aplica
    if (iva > 0) {
        tableBody.push([
            { text: `IVA (${ivaPct}%)`, colSpan: 2, bold: true, fontSize: 9, alignment: 'right', border: [false, false, false, false], margin: [0, 4, 0, 4] },
            {},
            { text: `$ ${iva.toLocaleString('es-CO')}`, bold: true, fontSize: 9, alignment: 'right', border: [false, false, false, false], margin: [0, 4, 0, 4] }
        ]);
    }

    // Total
    tableBody.push([
        { text: 'TOTAL', colSpan: 2, bold: true, fontSize: 10, alignment: 'right', color: '#2e5a88', border: [false, true, false, false], margin: [0, 6, 0, 6] },
        {},
        { text: `$ ${total.toLocaleString('es-CO')}`, bold: true, fontSize: 10, alignment: 'right', color: '#2e5a88', border: [false, true, false, false], margin: [0, 6, 0, 6] }
    ]);

    // Firma fija de Neider para Cotizaciones
    let signatureDef = { text: '__________________________\nFirma Autorizada', margin: [0, 40, 0, 0], fontSize: 9 };
    if (typeof FIRMA_NEIDER_BASE64 !== 'undefined') {
        signatureDef = { image: FIRMA_NEIDER_BASE64, width: 220, margin: [0, 10, 0, 5] };
    }

    const docDefinition = {
        pageSize: 'LETTER',
        pageMargins: [50, 40, 50, 80],
        images: { logo: getCurrentLogo() },
        background: function() { return { image: 'logo', width: 450, opacity: 0.05, absolutePosition: { x: 80, y: 250 } }; },
        content: [
            {
                columns: [
                    { image: 'logo', width: 140 },
                    { text: `Nº ${cotizacionCounter}`, alignment: 'right', bold: true, fontSize: 11, margin: [0, 20, 0, 0] }
                ]
            },
            { text: fechaFormateada, margin: [0, 35, 0, 15], fontSize: 10 },
            { text: [{ text: 'NOMBRE: ', bold: true }, nombre.toUpperCase()], fontSize: 10, margin: [0, 0, 0, 3] },
            { text: [{ text: 'ID: ', bold: true }, idStr], fontSize: 10, margin: [0, 0, 0, 3] },
            { text: [{ text: 'ENTIDAD / EPS: ', bold: true }, eps.toUpperCase()], fontSize: 10, margin: [0, 0, 0, 15] },
            { text: 'Ref. Cotización de Servicios Médicos', fontSize: 10, bold: true, margin: [0, 0, 0, 20] },
            { text: 'COTIZACIÓN', alignment: 'center', fontSize: 13, bold: true, color: '#2e5a88', margin: [0, 0, 0, 25] },
            {
                table: {
                    widths: ['20%', '60%', '20%'],
                    body: tableBody
                },
                layout: 'noBorders',
                margin: [0, 0, 0, 25]
            },
            // Observaciones si se ingresaron
            observaciones ? {
                stack: [
                    { text: 'Observaciones:', bold: true, fontSize: 9.5, color: '#2e5a88', margin: [0, 0, 0, 4] },
                    { text: observaciones, fontSize: 9, italics: true, color: '#475569', lineHeight: 1.25 }
                ],
                margin: [0, 0, 0, 30]
            } : [],
            signatureDef
        ],
        footer: function(currentPage, pageCount) {
            return {
                margin: [40, 0, 40, 0],
                stack: [
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 532, y2: 0, lineWidth: 1, lineColor: '#e2e8f0' }] },
                    { 
                        columns: [
                            { text: 'SANTA MARTA\nCarrera 2a No. 22-41', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 8, 0, 0] },
                            { text: 'RIOHACHA\nC.C. VIVA\nCalle 15 No 18 - 274 L. 218', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 8, 0, 0] },
                            { text: 'BARRANQUILLA\nSEDE 1: Calle 86 #50-158 | SEDE 2: Carrera 51b #86-17\nAlkarawi Plaza 51B Calle 90 #50-127 F1 - L.3\nC.C. VIVA Carrera 51b #87-50 P.3 L.337\nC.C. Alegra Calle 30 #4b-50 - P.2', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 8, 0, 0], width: '40%', bold: true },
                            { text: 'VALLEDUPAR\nC.C. Mega Mall\nCalle 15 No. 10B-36', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 8, 0, 0] },
                            { text: 'CARTAGENA\nAv. Piñango SA #6 - 76', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 8, 0, 0] }
                        ]
                    },
                    {
                        columns: [
                            { text: 'GALAPA\nCalle 11 # 10- 13 L.1', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 5, 0, 0] },
                            { text: 'BARANOA\nCarrera 19 # 9 - 04 L.2', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 5, 0, 0] },
                            { text: 'SABANALARGA\nSEDE 1: Carrera 19 # 24- 118\nSEDE 2: Calle 18 #18-106', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 5, 0, 0] },
                            { text: 'MALAMBO\nCarrera 17 # 9 - 35', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 5, 0, 0] },
                            { text: 'SANTO TOMÁS\nCarrera 13 # 11 - 002', fontSize: 6, color: '#89b2db', alignment: 'center', margin: [0, 5, 0, 0] }
                        ]
                    }
                ]
            };
        }
    };

    try {
        if (typeof pdfMake !== 'undefined' && !pdfMake.vfs && typeof pdfMake.vfs_fonts !== 'undefined') {
            pdfMake.vfs = pdfMake.vfs_fonts.pdfMake.vfs;
        }
        const fileNameObj = `Cotizacion_${cotizacionCounter}_${nombre.replace(/\s+/g, '_')}.pdf`;
        pdfMake.createPdf(docDefinition).download(fileNameObj);
        
        cotizacionCounter++; // Increment for next
        localStorage.setItem('cotizacionCounter', cotizacionCounter); // Save state
        alert(`Cotización Nº ${cotizacionCounter-1} generada con éxito.`);

        // Limpiar el estado y formulario tras éxito
        cotizacionServicios = [];
        renderServiciosCotizados();
        
        document.getElementById('cotNombre').value = '';
        document.getElementById('cotID').value = '';
        document.getElementById('cotEPS').value = '';
        document.getElementById('cotObservaciones').value = '';
        if (cotDescuento) document.getElementById('cotDescuento').value = '0';
        if (cotIva) document.getElementById('cotIva').value = '0';
        renderCotizacionResumen();

    } catch (error) {
        console.error("Error al generar cotización:", error);
        alert("Error al generar el PDF de la cotización.");
    }
}

// --- 8. PROCESADOR DE FACTURA ELECTRÓNICA ---
const CUP_MAP = {
    "951901": "tomografia_segmento_anterior",
    "952302": "potenciales_visuales",
    "951902": "tomografia",
    "950610": "recuento",
    "952001": "biometria",
    "952501": "paquimetria",
    "951102": "fotocolor",
    "951202": "angiografia",
    "954101": "otologia",
    "890302": "otologia",
    "951302": "ecografia_ocular",
    "951304": "ubm",
    "950505": "perimetria",
    "951501": "topografia_corneal",
    "950602": "interferometria",
    "954402": "videonistagmografia",
    "954621": "potencial_evocado_auditivo"
};

// Helper to extract invoice number from PDF text
function extractInvoiceNumberFromText(text) {
    const patterns = [
        /\b(?:FACTURA|FAC|FACTURA DE VENTA|FACTURA ELECTRONICA|FE|CONSECUTIVO)\b\s*(?:DE VENTA)?\s*(?:ELECTRONICA)?\s*(?:N[O°ºa-z]*|NUMERO|NRO|#)?\s*[:.-]?\s*([A-Z]{1,6})\s*[-_]?\s*(\d{1,12})\b/i,
        /\b(?:FACTURA|FAC|FACTURA DE VENTA|FACTURA ELECTRONICA|FE|CONSECUTIVO)\b\s*(?:DE VENTA)?\s*(?:ELECTRONICA)?\s*(?:N[O°ºa-z]*|NUMERO|NRO|#)?\s*[:.-]?\s*([A-Z]{0,6})\s*[-_]?\s*(\d{5,15})\b/i,
    ];
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            const prefix = match[1] ? match[1].trim().toUpperCase() : "";
            const num = match[2].trim();
            return prefix + num;
        }
    }
    
    // Fallback: search for explicit valid invoice prefixes provided by user
    const headerSnippet = text.substring(0, 1500);
    const genericMatch = headerSnippet.match(/\b(FEB|FEC|FER|CFE|FEV|FES|FEA|SETT|FE|FV|FC|FCE)\s*[-_]?\s*(\d{3,10})\b/i);
    if (genericMatch) {
        return genericMatch[1].trim().toUpperCase() + genericMatch[2].trim();
    }
    
    return "FACTURA_DESCONOCIDA";
}

// Helper to extract invoice number from filename
function extractInvoiceNumberFromFilename(filename) {
    if (!filename) return null;
    const cleanFilename = filename.replace(/\.[^/.]+$/, ""); // remove extension
    const match = cleanFilename.match(/\b(FEB|FEC|FER|CFE|FEV|FES|FEA|SETT|FE|FV|FC|FCE)\s*[-_]?\s*(\d{3,10})\b/i);
    if (match) {
        return match[1].toUpperCase() + match[2];
    }
    return null;
}

// Parse single file and return array of extracted lines
function parseSingleFacturaFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (file.name.toLowerCase().endsWith('.xml')) {
            reader.onload = function(e) {
                try {
                    const text = e.target.result;
                    const lines = parseXMLFacturaText(text, file.name);
                    resolve(lines);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(new Error("Error de lectura de archivo"));
            reader.readAsText(file);
        } else if (file.name.toLowerCase().endsWith('.pdf')) {
            reader.onload = async function(e) {
                try {
                    const arrayBuffer = e.target.result;
                    window.uploadedFacturaArrayBuffer = arrayBuffer.slice(0); // clone the buffer just in case
                    const pagesText = await extractPagesTextFromPDF(arrayBuffer);
                    
                    let allExtractedLines = [];
                    let currentInvoiceNumber = null;
                    const groupedPages = {};
                    
                    window.facturaPageMapping = {};
                    
                    for (let i = 0; i < pagesText.length; i++) {
                        const pageText = pagesText[i];
                        let invNum = extractInvoiceNumberFromText(pageText);
                        
                        if (invNum && invNum !== "FACTURA_DESCONOCIDA") {
                            currentInvoiceNumber = invNum;
                        }
                        
                        if (!currentInvoiceNumber) {
                            const fromFilename = extractInvoiceNumberFromFilename(file.name);
                            if (fromFilename) currentInvoiceNumber = fromFilename;
                            else currentInvoiceNumber = "FACTURA_DESCONOCIDA";
                        }
                        
                        if (!groupedPages[currentInvoiceNumber]) {
                            groupedPages[currentInvoiceNumber] = [];
                            window.facturaPageMapping[currentInvoiceNumber] = [];
                        }
                        groupedPages[currentInvoiceNumber].push(pageText);
                        window.facturaPageMapping[currentInvoiceNumber].push(i); // store 0-based page index
                    }
                    
                    for (const [invNum, pages] of Object.entries(groupedPages)) {
                        const combinedText = pages.join("\n");
                        const lines = parsePDFFacturaTextOnly(combinedText, file.name);
                        
                        if (lines.length === 0) {
                            if (window.facturaExceptions) {
                                window.facturaExceptions.push({ 
                                    factura: invNum, 
                                    motivo: "No se detectaron estudios válidos o mapeados para esta factura." 
                                });
                            }
                        }
                        
                        lines.forEach(line => {
                            if (line.INVOICE_NUMBER === "SIN_FACTURA" || line.INVOICE_NUMBER === "FACTURA_DESCONOCIDA") {
                                line.INVOICE_NUMBER = invNum;
                            }
                        });
                        
                        allExtractedLines.push(...lines);
                    }
                    
                    resolve(allExtractedLines);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(new Error("Error de lectura de archivo"));
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error("Formato no soportado. Debe ser XML o PDF."));
        }
    });
}

async function handleFacturaUpload(filesOrFile) {
    let files = [];
    if (filesOrFile instanceof FileList) {
        files = Array.from(filesOrFile);
    } else if (Array.isArray(filesOrFile)) {
        files = filesOrFile;
    } else if (filesOrFile) {
        files = [filesOrFile];
    }
    
    if (files.length === 0) return;
    
    window.uploadedFacturaFiles = files;
    window.facturaExceptions = [];
    
    // Update preview UI
    if (files.length === 1) {
        document.getElementById('fileNameFactura').textContent = files[0].name;
        document.getElementById('fileSizeFactura').textContent = `${Math.round(files[0].size / 1024)} KB`;
    } else {
        const totalSize = files.reduce((acc, f) => acc + f.size, 0);
        document.getElementById('fileNameFactura').textContent = `${files.length} facturas seleccionadas`;
        document.getElementById('fileSizeFactura').textContent = `${Math.round(totalSize / 1024)} KB`;
    }
    
    document.getElementById('uploadZoneFactura').style.display = 'none';
    document.getElementById('filePreviewFactura').style.display = 'flex';
    
    // Parse all files
    const allExtractedLines = [];
    
    for (const file of files) {
        try {
            const extracted = await parseSingleFacturaFile(file);
            allExtractedLines.push(...extracted);
        } catch (err) {
            console.error("Error al procesar archivo:", file.name, err);
            alert(`Error al procesar el archivo ${file.name}: ${err.message}`);
        }
    }
    
    consolidateAndDisplay(allExtractedLines);
}

function clearFactura() {
    document.getElementById('fileInputFactura').value = '';
    facturaData = [];
    window.uploadedFacturaFiles = [];
    document.getElementById('uploadZoneFactura').style.display = 'block';
    document.getElementById('filePreviewFactura').style.display = 'none';
    document.getElementById('step-factura-2').classList.add('disabled');
    document.getElementById('step-factura-2').classList.remove('active');
    document.getElementById('step-factura-3').classList.add('disabled');
    document.getElementById('step-factura-3').classList.remove('active');
    btnGenerateFactura.classList.add('disabled');
    tbodyFacturaEstudios.innerHTML = `
        <tr id="emptyRowFactura">
            <td colspan="5" style="padding: 15px; text-align: center; color: var(--text-muted); font-style: italic;">No se han procesado estudios de factura.</td>
        </tr>`;
    facturaSummaryText.textContent = "No hay datos procesados.";
    progressContainerFactura.style.display = 'none';
    successMessageFactura.style.display = 'none';
}

function parseXMLFacturaText(xmlText, filename) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    let invoiceNumber = "SIN_FACTURA";
    const invoiceIdEl = (xmlDoc.getElementsByTagNameNS ? xmlDoc.getElementsByTagNameNS("*", "ID")[0] : null) || 
                        xmlDoc.getElementsByTagName("cbc:ID")[0] || 
                        xmlDoc.getElementsByTagName("ID")[0];
    if (invoiceIdEl && invoiceIdEl.textContent.trim()) {
        invoiceNumber = invoiceIdEl.textContent.trim();
    } else {
        const fromFilename = extractInvoiceNumberFromFilename(filename);
        if (fromFilename) invoiceNumber = fromFilename;
    }
    
    let defaultFecha = "";
    const issueDateEl = (xmlDoc.getElementsByTagNameNS ? xmlDoc.getElementsByTagNameNS("*", "IssueDate")[0] : null) || 
                        xmlDoc.getElementsByTagName("cbc:IssueDate")[0] || 
                        xmlDoc.getElementsByTagName("IssueDate")[0];
    if (issueDateEl) {
        const parts = issueDateEl.textContent.trim().split("-");
        if (parts.length === 3) {
            defaultFecha = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }
    
    const lines = (xmlDoc.getElementsByTagNameNS ? xmlDoc.getElementsByTagNameNS("*", "InvoiceLine") : null) || 
                  xmlDoc.getElementsByTagName("cac:InvoiceLine") || 
                  xmlDoc.getElementsByTagName("InvoiceLine");
    const extractedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        let cup = "";
        const getChildElVal = (parent, tagName) => {
            const el = (parent.getElementsByTagNameNS ? parent.getElementsByTagNameNS("*", tagName)[0] : null) || 
                       parent.getElementsByTagName(tagName)[0] || 
                       parent.getElementsByTagName("cbc:" + tagName)[0] || 
                       parent.getElementsByTagName("cac:" + tagName)[0];
            return el ? el.textContent.trim() : null;
        };
        
        const sellersIdParent = (line.getElementsByTagNameNS ? line.getElementsByTagNameNS("*", "SellersItemIdentification")[0] : null) || 
                                line.getElementsByTagName("cac:SellersItemIdentification")[0] || 
                                line.getElementsByTagName("SellersItemIdentification")[0];
        const sellersId = sellersIdParent ? getChildElVal(sellersIdParent, "ID") : null;
        
        const standardIdParent = (line.getElementsByTagNameNS ? line.getElementsByTagNameNS("*", "StandardItemIdentification")[0] : null) || 
                                 line.getElementsByTagName("cac:StandardItemIdentification")[0] || 
                                 line.getElementsByTagName("StandardItemIdentification")[0];
        const standardId = standardIdParent ? getChildElVal(standardIdParent, "ID") : null;
        
        const itemParent = (line.getElementsByTagNameNS ? line.getElementsByTagNameNS("*", "Item")[0] : null) || 
                           line.getElementsByTagName("cac:Item")[0] || 
                           line.getElementsByTagName("Item")[0];
        const itemId = itemParent ? getChildElVal(itemParent, "ID") : null;
        
        if (sellersId) cup = sellersId;
        else if (standardId) cup = standardId;
        else if (itemId) cup = itemId;
        
        const descEl = itemParent ? ((itemParent.getElementsByTagNameNS ? itemParent.getElementsByTagNameNS("*", "Description")[0] : null) || 
                       itemParent.getElementsByTagName("cbc:Description")[0] || 
                       itemParent.getElementsByTagName("Description")[0]) : null;
        const desc = descEl ? descEl.textContent : "";
        
        if (!CUP_MAP[cup]) {
            const cupMatch = desc.match(/\b(95\d{4}|14\d{4}|08\d{4}|10\d{4}|12\d{4}|13\d{4}|89\d{4})\b/);
            if (cupMatch) cup = cupMatch[0];
        }
        
        if (CUP_MAP[cup]) {
            const extracted = extractPatientInfoFromText(desc, defaultFecha);
            extracted.CUP = cup;
            extracted.CODIGO_ESTUDIO = CUP_MAP[cup];
            extracted.INVOICE_NUMBER = invoiceNumber;
            extracted.FILE_NAME = filename;
            extractedLines.push(extracted);
        }
    }
    
    return extractedLines;
}

async function extractTextFromPDF(arrayBuffer) {
    const pages = await extractPagesTextFromPDF(arrayBuffer);
    return pages.join("\n");
}

async function extractPagesTextFromPDF(arrayBuffer) {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let pagesText = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Group items by Y coordinate to form proper lines
        const items = textContent.items;
        const linesArr = [];
        items.forEach(item => {
            const y = item.transform[5];
            const x = item.transform[4];
            // Find an existing line within 5 units
            let line = linesArr.find(l => Math.abs(l.y - y) < 5);
            if (!line) {
                line = { y: y, items: [] };
                linesArr.push(line);
            }
            line.items.push({ x: x, str: item.str });
        });
        
        // Sort Y coordinates descending (PDF origin is usually bottom-left)
        linesArr.sort((a, b) => b.y - a.y);
        
        const pageText = linesArr.map(line => {
            // Sort items by X coordinate
            line.items.sort((a, b) => a.x - b.x);
            return line.items.map(item => item.str).join(" ");
        }).join("\n");
        
        pagesText.push(pageText);
    }
    return pagesText;
}

function parsePDFFacturaTextOnly(text, filename) {
    let invoiceNumber = "SIN_FACTURA";
    const fromText = extractInvoiceNumberFromText(text);
    if (fromText && fromText !== "FACTURA_DESCONOCIDA") {
        invoiceNumber = fromText;
    } else {
        const fromFilename = extractInvoiceNumberFromFilename(filename);
        if (fromFilename) invoiceNumber = fromFilename;
    }
    
    let defaultFecha = "";
    const dateMatch = text.match(/\b(\d{2})[/-](\d{2})[/-](\d{4})\b/);
    if (dateMatch) {
        defaultFecha = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
    } else {
        const dateMatchISO = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
        if (dateMatchISO) {
            defaultFecha = `${dateMatchISO[3]}/${dateMatchISO[2]}/${dateMatchISO[1]}`;
        }
    }
    
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const extractedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        let foundCup = null;
        // Normalize line by removing dots, spaces for CUP matching
        const cleanLineForCup = line.replace(/[.\s-]/g, "");
        Object.keys(CUP_MAP).forEach(cup => {
            if (cleanLineForCup.includes(cup)) {
                foundCup = cup;
            }
        });
        
        if (!foundCup) {
            const cupMatch = line.match(/\b(95\d{4}|14\d{4}|08\d{4}|10\d{4}|12\d{4}|13\d{4}|89\d{4})\b/);
            if (cupMatch) {
                if (CUP_MAP[cupMatch[0]]) {
                    foundCup = cupMatch[0];
                } else {
                    if (window.facturaExceptions) {
                        window.facturaExceptions.push({
                            factura: invoiceNumber,
                            motivo: `Se detectó un servicio con código CUP ${cupMatch[0]} que no existe en el catálogo actual.`
                        });
                    }
                }
            }
        }
        
        if (foundCup) {
            const extracted = extractPatientInfoFromText(line, defaultFecha);
            
            const offsets = [1, -1, 2, -2, 3, -3, 4, -4, 5, -5];
            for (const offset of offsets) {
                const nearLine = lines[i + offset];
                if (nearLine) {
                    const candidate = extractPatientInfoFromText(nearLine, defaultFecha);
                    if (!extracted.PACIENTE_ID && candidate.PACIENTE_ID) {
                        extracted.PACIENTE_ID = candidate.PACIENTE_ID;
                        extracted.TIPO_DOCUMENTO = candidate.TIPO_DOCUMENTO;
                    }
                    if (!extracted.PACIENTE_NOMBRE && candidate.PACIENTE_NOMBRE) {
                        extracted.PACIENTE_NOMBRE = candidate.PACIENTE_NOMBRE;
                    }
                    if (extracted.ORDEN === "S/N" && candidate.ORDEN !== "S/N") {
                        extracted.ORDEN = candidate.ORDEN;
                    }
                    if (extracted.PACIENTE_NOMBRE && extracted.PACIENTE_ID) break;
                }
            }
            extracted.CUP = foundCup;
            extracted.CODIGO_ESTUDIO = CUP_MAP[foundCup];
            extracted.INVOICE_NUMBER = invoiceNumber;
            extracted.FILE_NAME = filename;
            
            if (!extracted.PACIENTE_NOMBRE) {
                for (let offset = -3; offset <= 3; offset++) {
                    const nearLine = lines[i + offset];
                    if (nearLine) {
                        // Strip out CC/ID to see if the rest looks like a name
                        let textWithoutID = nearLine.replace(/\b(CC|C\.C\.|TI|T\.I\.|RC|R\.C\.|CE|C\.E\.|PA|PEP|PPT|MS|AS|NIT|ID)\s*[:.-]?\s*\d+\b/ig, "").trim();
                        let cleanLine = textWithoutID.replace(/^[:.-]+|[:.-]+$/g, "").trim();
                        
                        if (/^[A-ZÑÁÉÍÓÚÜa-zñáéíóúü\s.:,()_-]+$/.test(cleanLine) && cleanLine.split(/\s+/).length >= 2) {
                            const candidate = cleanLine.toUpperCase();
                            if (isValidPatientName(candidate)) {
                                extracted.PACIENTE_NOMBRE = candidate.replace(/^(PACIENTE|PTE|NOMBRE|USUARIO|AFILIADO|MEDICO|DOCTOR|DR|DRA)\s*[:.-]?\s*/i, "").trim();
                                break;
                            }
                        }
                    }
                }
            }
            
            extractedLines.push(extracted);
        }
    }
    
    return extractedLines;
}

function extractPatientInfoFromText(text, defaultFecha) {
    const data = {
        TIPO_DOCUMENTO: "CC",
        PACIENTE_ID: "",
        PACIENTE_NOMBRE: "",
        FECHA: defaultFecha || new Date().toLocaleDateString('es-CO'),
        ORDEN: "S/N"
    };
    
    const ccMatch = text.match(/\b(CC|C\.C\.|TI|T\.I\.|RC|R\.C\.|CE|C\.E\.|PA|PEP|PPT|MS|AS|IDENTIFICACION|CEDULA|DOC)\s*[:.-]?\s*(\d{5,12})\b/i);
    if (ccMatch) {
        let typeRaw = ccMatch[1].toUpperCase().replace(/\./g, '').trim();
        if (["IDENTIFICACION", "CEDULA", "DOC"].includes(typeRaw)) {
            data.TIPO_DOCUMENTO = "CC";
        } else {
            data.TIPO_DOCUMENTO = typeRaw;
        }
        data.PACIENTE_ID = ccMatch[2].trim();
        
        const textAfterId = text.substring(ccMatch.index + ccMatch[0].length).trim();
        const possibleName = textAfterId.match(/^([A-ZÑÁÉÍÓÚÜa-zñáéíóúü\s]{3,45})\b/i);
        if (possibleName && possibleName[1].trim().split(/\s+/).length >= 2) {
            const candidate = possibleName[1].trim().toUpperCase();
            if (isValidPatientName(candidate)) {
                data.PACIENTE_NOMBRE = candidate;
            }
        }
    } else {
        const numMatch = text.match(/\b(\d{7,10})\b/g);
        if (numMatch) {
            for (const n of numMatch) {
                if (!CUP_MAP[n]) {
                    data.PACIENTE_ID = n;
                    data.TIPO_DOCUMENTO = "CC";
                    break;
                }
            }
        }
    }
    
    const nameMatch = text.match(/\b(?:PACIENTE|PTE|NOMBRE|USUARIO|AFILIADO)\s*[:.-]?\s*([A-ZÑÁÉÍÓÚÜa-zñáéíóúü\s]{3,45})\b/i);
    if (nameMatch) {
        const candidate = nameMatch[1].trim().replace(/\s+/g, ' ').toUpperCase();
        if (isValidPatientName(candidate)) {
            data.PACIENTE_NOMBRE = candidate.replace(/^(PACIENTE|PTE|NOMBRE|USUARIO|AFILIADO|MEDICO|DOCTOR|DR|DRA|CC|TI|RC|CE|PA|PEP|PPT|MS|AS)\s*[:.-]?\s*/i, "").trim();
        }
    }
    
    if (!data.PACIENTE_NOMBRE) {
        const upperWordsMatch = text.match(/\b([A-ZÑÁÉÍÓÚÜ]{3,}\s+[A-ZÑÁÉÍÓÚÜ]{3,}(?:\s+[A-ZÑÁÉÍÓÚÜ]{3,})*)\b/g);
        if (upperWordsMatch) {
            for (const w of upperWordsMatch) {
                const candidate = w.trim().toUpperCase();
                if (isValidPatientName(candidate)) {
                    data.PACIENTE_NOMBRE = candidate;
                    break;
                }
            }
        }
    }
    
    const osMatch = text.match(/\b(?:OS|ORDEN|AUT|AUTORIZACION|N[O°]?\s*OS|N[O°]?\s*ORDEN|N[O°]?\s*AUT)\s*[:.-]?\s*(\d{4,12})\b/i);
    if (osMatch) {
        data.ORDEN = osMatch[1].trim();
    }
    
    const dateMatch = text.match(/\b(\d{2})[/-](\d{2})[/-](\d{4})\b/);
    if (dateMatch) {
        data.FECHA = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
    } else {
        const dateMatchISO = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
        if (dateMatchISO) {
            data.FECHA = `${dateMatchISO[3]}/${dateMatchISO[2]}/${dateMatchISO[1]}`;
        }
    }
    
    return data;
}

function consolidateAndDisplay(extractedLines) {
    const grouped = {};
    extractedLines.forEach(item => {
        const id = item.PACIENTE_ID.trim();
        const name = cleanName(item.PACIENTE_NOMBRE);
        if (!id || !name) return;
        
        // Group by PACIENTE_ID, ORDEN, CUP, and INVOICE_NUMBER to prevent duplicate studies across invoices
        const key = `${id}_${item.ORDEN}_${item.CUP}_${item.INVOICE_NUMBER}`;
        if (!grouped[key]) {
            grouped[key] = {
                TIPO_DOCUMENTO: item.TIPO_DOCUMENTO || "CC",
                PACIENTE_ID: id,
                PACIENTE_NOMBRE: name,
                FECHA: item.FECHA,
                CUP: item.CUP,
                CODIGO_ESTUDIO: item.CODIGO_ESTUDIO,
                ORDEN: item.ORDEN,
                INVOICE_NUMBER: item.INVOICE_NUMBER || "SIN_FACTURA",
                count: 1
            };
        } else {
            grouped[key].count += 1;
        }
    });
    
    facturaData = Object.values(grouped);
    renderFacturaEstudios();
}

function renderFacturaEstudios() {
    tbodyFacturaEstudios.innerHTML = "";
    if (facturaData.length === 0) {
        tbodyFacturaEstudios.innerHTML = `
            <tr id="emptyRowFactura">
                <td colspan="5" style="padding: 15px; text-align: center; color: var(--text-muted); font-style: italic;">No se han procesado estudios de factura.</td>
            </tr>`;
        facturaSummaryText.textContent = "No hay datos procesados.";
        btnGenerateFactura.classList.add('disabled');
        return;
    }
    
    let countPacientes = new Set(facturaData.map(d => d.PACIENTE_ID)).size;
    let countEstudios = facturaData.length;
    let countBilaterales = facturaData.filter(d => d.count > 1).length;
    
    facturaSummaryText.innerHTML = `Se han detectado <strong class="badge-count">${countPacientes}</strong> pacientes y un consolidado de <strong class="badge-count">${countEstudios}</strong> estudios clínicos listos para procesar de forma masiva (fusión por bilateralidad aplicada a <strong>${countBilaterales}</strong> estudios con éxito).`;
    
    facturaData.forEach(item => {
        const studyName = CATALOG[item.CODIGO_ESTUDIO]?.name || item.CODIGO_ESTUDIO;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="padding: 10px;">
                <strong style="color: var(--text-main);">${item.PACIENTE_NOMBRE}</strong><br>
                <span style="color: var(--text-muted); font-size: 0.8rem;">ID: ${item.PACIENTE_ID}</span><br>
                <span style="color: var(--primary); font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; margin-top: 4px;">
                    <i data-lucide="file-text" style="width: 12px; height: 12px;"></i>
                    Factura: ${item.INVOICE_NUMBER}
                </span>
            </td>
            <td style="padding: 10px; color: var(--text-muted);">${item.FECHA}</td>
            <td style="padding: 10px;">
                <span style="color: var(--text-main); font-weight: 500;">${studyName}</span><br>
                <span style="color: var(--text-muted); font-size: 0.8rem;">CUP: ${item.CUP}</span>
            </td>
            <td style="padding: 10px; color: var(--text-muted);">${item.ORDEN}</td>
            <td style="padding: 10px; text-align: center;">
                ${item.count > 1 
                    ? '<span class="badge-bilateral">Bilateral</span>' 
                    : '<span class="badge-monocular">Monocular</span>'}
            </td>
        `;
        tbodyFacturaEstudios.appendChild(tr);
    });
    
    document.getElementById('step-factura-2').classList.remove('disabled');
    document.getElementById('step-factura-2').classList.add('active');
    document.getElementById('step-factura-3').classList.remove('disabled');
    document.getElementById('step-factura-3').classList.add('active');
    btnGenerateFactura.classList.remove('disabled');
    
    // Render Lucide icons for the newly added badges
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function generatePdfsFromFactura() {
    if (isGeneratingFactura) return;
    try {
        isGeneratingFactura = true;
        btnGenerateFactura.classList.add('disabled');
        btnGenerateFactura.innerHTML = '<span>Procesando...</span>';
        progressContainerFactura.style.display = 'block';
        successMessageFactura.style.display = 'none';
        
        const total = facturaData.length;
        const zip = new JSZip();
        
        // Track the total count of each patient ID per invoice to determine naming pattern
        // Key is invoiceFolder_documentType_patientId to ensure distinct grouping
        const totalCounts = {};
        facturaData.forEach(item => {
            const docTypeClean = (item.TIPO_DOCUMENTO || "CC").toString().trim().toUpperCase().replace(/[^A-Z]/g, "") || "CC";
            const patientIdClean = (item.PACIENTE_ID || "").toString().trim().replace(/\s+/g, "");
            let invoiceFolder = (item.INVOICE_NUMBER || "SIN_FACTURA").toString().trim();
            invoiceFolder = invoiceFolder.replace(/[\\/:*?"<>|]/g, "_").trim();
            if (!invoiceFolder) invoiceFolder = "SIN_FACTURA";
            
            const patientKey = `${invoiceFolder}_${docTypeClean}_${patientIdClean}`;
            totalCounts[patientKey] = (totalCounts[patientKey] || 0) + 1;
        });
        
        const currentCounts = {};
        
        const invoicesWithErrors = new Set(window.facturaExceptions ? window.facturaExceptions.map(e => e.factura.replace(/[\\/:*?"<>|]/g, "_").trim()) : []);
        
        for (let i = 0; i < total; i++) {
            const item = facturaData[i];
            
            let invoiceFolder = (item.INVOICE_NUMBER || "SIN_FACTURA").toString().trim();
            invoiceFolder = invoiceFolder.replace(/[\\/:*?"<>|]/g, "_").trim();
            if (!invoiceFolder) invoiceFolder = "SIN_FACTURA";
            
            if (invoicesWithErrors.has(invoiceFolder)) {
                continue;
            }
            
            let currentSig = signatures.find(s => s.selected) || (signatures.length ? signatures[0] : null);
            
            const rowData = {
                PACIENTE_NOMBRE: item.PACIENTE_NOMBRE,
                PACIENTE_ID: item.PACIENTE_ID,
                FECHA: item.FECHA
            };
            
            const study = CATALOG[item.CODIGO_ESTUDIO];
            const docDef = study.generateTemplate(rowData, currentSig);
            
            const docTypeClean = (item.TIPO_DOCUMENTO || "CC").toString().trim().toUpperCase().replace(/[^A-Z]/g, "") || "CC";
            const patientIdClean = (item.PACIENTE_ID || "").toString().trim().replace(/\s+/g, "");
            const patientKey = `${invoiceFolder}_${docTypeClean}_${patientIdClean}`;
            currentCounts[patientKey] = (currentCounts[patientKey] || 0) + 1;
            
            const count = currentCounts[patientKey];
            
            // Nomenclature: [TIPO_DOCUMENTO] [PACIENTE_ID][_SUFFIX].pdf
            // First study has no suffix, second has _1, third _2, and so on.
            const suffix = count > 1 ? `_${count - 1}` : "";
            const filename = `${docTypeClean} ${patientIdClean}${suffix}`;
            
            await new Promise((resolve) => {
                pdfMake.createPdf(docDef).getBlob((blob) => {
                    zip.file(`${invoiceFolder}/${filename}.pdf`, blob);
                    resolve();
                });
            });
            
            progressBarFactura.style.width = `${Math.round(((i + 1) / total) * 100)}%`;
            progressTextFactura.textContent = `Procesando: ${i + 1} / ${total}`;
            if (i % 5 === 0) await new Promise(r => setTimeout(r, 10));
        }
        
        // Determine ZIP filename based on the number of unique invoices processed
        const uniqueInvoices = Array.from(new Set(facturaData.map(d => {
            let invNum = (d.INVOICE_NUMBER || "SIN_FACTURA").toString().trim();
            invNum = invNum.replace(/[\\/:*?"<>|]/g, "_").trim();
            return invNum;
        }).filter(id => id && id !== "SIN_FACTURA" && id !== "")));
        
        // Include the original uploaded invoice files in the ZIP
        if (window.uploadedFacturaArrayBuffer && window.facturaPageMapping && window.PDFLib) {
            try {
                const { PDFDocument } = window.PDFLib;
                const originalPdfDoc = await PDFDocument.load(window.uploadedFacturaArrayBuffer);
                
                for (const [invNum, pageIndices] of Object.entries(window.facturaPageMapping)) {
                    if (!pageIndices || pageIndices.length === 0) continue;
                    let safeInvNum = invNum.replace(/[\\/:*?"<>|]/g, "_").trim();
                    if (!safeInvNum) safeInvNum = "SIN_FACTURA";
                    
                    if (invoicesWithErrors.has(safeInvNum)) {
                        continue;
                    }
                    
                    const newPdfDoc = await PDFDocument.create();
                    const copiedPages = await newPdfDoc.copyPages(originalPdfDoc, pageIndices);
                    copiedPages.forEach((page) => newPdfDoc.addPage(page));
                    
                    const pdfBytes = await newPdfDoc.save();
                    zip.file(`${safeInvNum}/${safeInvNum}.pdf`, pdfBytes);
                }
            } catch (err) {
                console.error("Error splitting PDF con pdf-lib:", err);
                fallbackIncludeOriginalFiles(zip, uniqueInvoices);
            }
        } else {
            fallbackIncludeOriginalFiles(zip, uniqueInvoices);
        }
        
        function fallbackIncludeOriginalFiles(zipObj, uniqueInvs) {
            if (window.uploadedFacturaFiles && window.uploadedFacturaFiles.length > 0) {
                for (const file of window.uploadedFacturaFiles) {
                    const match = facturaData.find(d => d.FILE_NAME === file.name);
                    let invoiceFolder = "SIN_FACTURA";
                    if (match) {
                        invoiceFolder = (match.INVOICE_NUMBER || "SIN_FACTURA").toString().trim().replace(/[\\/:*?"<>|]/g, "_").trim();
                    } else if (uniqueInvs.length === 1) {
                        invoiceFolder = uniqueInvs[0];
                    }
                    
                    if (!invoiceFolder) invoiceFolder = "SIN_FACTURA";
                    
                    const extension = file.name.split('.').pop();
                    zipObj.file(`${invoiceFolder}/${invoiceFolder}.${extension}`, file);
                }
            }
        }
        
        if (window.facturaExceptions && window.facturaExceptions.length > 0) {
            let errorText = "REPORTE DE ERRORES / EXCEPCIONES\n================================\n\n";
            window.facturaExceptions.forEach(ex => {
                errorText += `Factura: ${ex.factura}\nMotivo: ${ex.motivo}\n\n`;
            });
            zip.file("Reporte_Errores.txt", errorText);
        }
        
        const zipBlob = await zip.generateAsync({ type: "blob" });
        
        let zipFilename = "";
        if (uniqueInvoices.length === 1) {
            zipFilename = `${uniqueInvoices[0]}.zip`;
        } else if (uniqueInvoices.length > 1) {
            zipFilename = `Soportes_Facturas_${new Date().getTime()}.zip`;
        } else {
            zipFilename = `Soportes_Factura_${new Date().getTime()}.zip`;
        }
        
        saveAs(zipBlob, zipFilename);
        
        successMessageFactura.style.display = 'flex';
    } catch (error) {
        console.error(error);
        alert("💥 Error al generar soportes de factura: " + error.message);
    } finally {
        isGeneratingFactura = false;
        btnGenerateFactura.innerHTML = '<i data-lucide="zap"></i> Generar Soportes Clínicos';
        btnGenerateFactura.classList.remove('disabled');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', init);

