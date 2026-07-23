const SERVICIOS_DATA = [
    {
        "codigo": "951503",
        "descripcion": "ABERROMETRIA OCULAR"
    },
    {
        "codigo": "142004",
        "descripcion": "ABLACION DE LESION CORIORETINAL"
    },
    {
        "codigo": "124304",
        "descripcion": "ABLACION DE LESIÓN DE CUERPO CILIAR VÍA EXTERNA"
    },
    {
        "codigo": "124303",
        "descripcion": "ABLACION DE LESION DE CUERPO CILIAR VIA INTERNA"
    },
    {
        "codigo": "082504",
        "descripcion": "ABLACION DE LESION DE PARPADO"
    },
    {
        "codigo": "103204",
        "descripcion": "ABLACION DE LESION O TEJIDO DE CONJUNTIVA"
    },
    {
        "codigo": "089104",
        "descripcion": "ABLACIÓN DE PESTAÑAS (SUPERIOR O INFERIOR)"
    },
    {
        "codigo": "142005",
        "descripcion": "ABLACIÓN DE RETINA AVASCULAR"
    },
    {
        "codigo": "124102",
        "descripcion": "ABLACIÓN DE LESIÓN DE IRIS"
    },
    {
        "codigo": "152003",
        "descripcion": "ACORTAMIENTO EN UN MÚSCULO EXTRAOCULAR"
    },
    {
        "codigo": "954305",
        "descripcion": "ACUFENOMETRIA (TINNITUGRAMA)"
    },
    {
        "codigo": "953401",
        "descripcion": "ADAPTACIÓN DE PRÓTESIS OCULAR"
    },
    {
        "codigo": "286101",
        "descripcion": "ADENOIDECTOMIA VIA ABIERTA"
    },
    {
        "codigo": "286102",
        "descripcion": "ADENOIDECTOMIA VIA ENDOSCOPICA"
    },
    {
        "codigo": "903401",
        "descripcion": "ADENOSIN DEAMINASA [ADA]"
    },
    {
        "codigo": "152001",
        "descripcion": "ALARGAMIENTO EN UN MÚSCULO EXTRAOCULAR"
    },
    {
        "codigo": "282101",
        "descripcion": "AMIGDALECTOMIA VIA ABIERTA"
    },
    {
        "codigo": "951202",
        "descripcion": "ANGIOGRAFIA OCULAR DE SEGMENTO ANTERIOR DEL OJO"
    },
    {
        "codigo": "951203",
        "descripcion": "ANGIOGRAFIA OCULAR DE SEGMENTO POSTERIOR DEL OJO"
    },
    {
        "codigo": "951903",
        "descripcion": "ANGIOTOMOGRAFÍA ÓPTICA COHERENTE"
    },
    {
        "codigo": "222104",
        "descripcion": "ANTROSTOMÍA MAXILAR POR MEATO INFERIOR VÍA TRANSNASAL"
    },
    {
        "codigo": "222105",
        "descripcion": "ANTROSTOMIA MAXILAR POR MEATO INFERIOR VIA TRANSNASAL ENDOSCOPICA"
    },
    {
        "codigo": "202401",
        "descripcion": "ASPIRACION DE OIDO MEDIO O CAVIDAD MASTOIDEA"
    },
    {
        "codigo": "147103",
        "descripcion": "ASPIRACIÓN DIAGNÓSTICA DE VÍTREO"
    },
    {
        "codigo": "162201",
        "descripcion": "ASPIRACIÓN DIAGNÓSTICA EN ÓRBITA"
    },
    {
        "codigo": "890116",
        "descripcion": "ATENCIÓN (VISITA) DOMICILIARIA POR OTRO PROFESIONAL DE LA SALUD"
    },
    {
        "codigo": "954107",
        "descripcion": "AUDIOMETRIA DE TONOS PUROS AEREOS Y OSEOS CON EMASCARAMIENTO [AUDIOMETRIA TONAL]"
    },
    {
        "codigo": "954108",
        "descripcion": "AUDIOMETRIA DETALLADA DE FRECUENCIAS ESPECIFICAS"
    },
    {
        "codigo": "954103",
        "descripcion": "AUDIOMETRIA POR REFUERZO VISUAL"
    },
    {
        "codigo": "952001",
        "descripcion": "BIOMETRIA OCULAR (POR INMERSION O CONTACTO)"
    },
    {
        "codigo": "952001",
        "descripcion": "BIOMETRIA OCULAR (OPTICA)"
    },
    {
        "codigo": "261002",
        "descripcion": "BIOPSIA ABIERTA DE GLANDULA SALIVAL MENOR (CON CONDUCTO SALIVAL)"
    },
    {
        "codigo": "261001",
        "descripcion": "BIOPSIA CERRADA DE GLÁNDULA O CONDUCTO SALIVAL (PUNCIÓN O ASPIRACIÓN CON AGUJA FINA O TRUCUT)"
    },
    {
        "codigo": "181102",
        "descripcion": "BIOPSIA DE CONDUCTO AUDITIVO EXTERNO"
    },
    {
        "codigo": "102101",
        "descripcion": "BIOPSIA DE CONJUNTIVA"
    },
    {
        "codigo": "162302",
        "descripcion": "BIOPSIA DE CONTENIDO ORBITARIO"
    },
    {
        "codigo": "112201",
        "descripcion": "BIOPSIA DE CORNEA"
    },
    {
        "codigo": "122301",
        "descripcion": "BIOPSIA DE ESCLERÓTICA"
    },
    {
        "codigo": "122201",
        "descripcion": "BIOPSIA DE IRIS"
    },
    {
        "codigo": "212201",
        "descripcion": "BIOPSIA NASAL VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "150101",
        "descripcion": "BIOPSIA DE MÚSCULO O TENDÓN EXTRAOCULAR"
    },
    {
        "codigo": "122401",
        "descripcion": "BIOPSIA DE CUERPO CILIAR"
    },
    {
        "codigo": "091101",
        "descripcion": "BIOPSIA DE GLANDULA LAGRIMAL"
    },
    {
        "codigo": "306102",
        "descripcion": "BIOPSIA DE LARINGE VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "291203",
        "descripcion": "BIOPSIA DE NASOFARINGE"
    },
    {
        "codigo": "162301",
        "descripcion": "BIOPSIA DE PARED DE ORBITA"
    },
    {
        "codigo": "081101",
        "descripcion": "BIOPSIA DE PARPADO"
    },
    {
        "codigo": "272101",
        "descripcion": "BIOPSIA DE UVULA"
    },
    {
        "codigo": "272103",
        "descripcion": "BIOPSIA ESCISIONAL DE PALADAR"
    },
    {
        "codigo": "212201",
        "descripcion": "BIOPSIA NASAL VIA ENDOSCOPICA"
    },
    {
        "codigo": "289102",
        "descripcion": "BIOPSIA DE AMÍGDALAS O VEGETACIONES ADENOIDES"
    },
    {
        "codigo": "221103",
        "descripcion": "BIOPSIA DE SENO PARANASAL VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "212101",
        "descripcion": "BIOPSIA NASAL VÍA ABIERTA"
    },
    {
        "codigo": "083806",
        "descripcion": "BLEFAROPLASTIA INFERIOR VÍA CONJUNTIVAL"
    },
    {
        "codigo": "083805",
        "descripcion": "BLEFAROPLASTIA INFERIOR VIA EXTERNA"
    },
    {
        "codigo": "083804",
        "descripcion": "BLEFAROPLASTIA SUPERIOR"
    },
    {
        "codigo": "083803",
        "descripcion": "CANTOPLASTIA"
    },
    {
        "codigo": "083802",
        "descripcion": "CANTORRAFIA"
    },
    {
        "codigo": "083801",
        "descripcion": "CANTOTOMIA"
    },
    {
        "codigo": "136505",
        "descripcion": "CAPSULOTOMIA ASISTIDA"
    },
    {
        "codigo": "136504",
        "descripcion": "CAPSULOTOMIA MANUAL"
    },
    {
        "codigo": "114202",
        "descripcion": "CAUTERIZACIÓN DE CÓRNEA ASISTIDA"
    },
    {
        "codigo": "125501",
        "descripcion": "CICLODIALISIS (DESINSERCION PARCIAL DEL CUERPO CILIAR)"
    },
    {
        "codigo": "112102",
        "descripcion": "CITOLOGIA DE IMPRESION DE CORNEA"
    },
    {
        "codigo": "194106",
        "descripcion": "CIERRE DE PERFORACIÓN DE MEMBRANA TIMPÁNICA [MIRINGOPLASTIA] VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "194105",
        "descripcion": "CIERRE DE PERFORACIÓN DE MEMBRANA TIMPÁNICA [MIRINGOPLASTIA]"
    },
    {
        "codigo": "219604",
        "descripcion": "CIERRE DE PERFORACIÓN SEPTAL"
    },
    {
        "codigo": "099002",
        "descripcion": "CIERRE TEMPORAL DE PUNTOS LAGRIMALES CON DISPOSITIVO"
    },
    {
        "codigo": "867001",
        "descripcion": "COLGAJO LOCAL SIMPLE DE PIEL HASTA DE DOS CENTIMETROS CUADRADOS"
    },
    {
        "codigo": "098202",
        "descripcion": "CONJUNTIVODACRIOCISTORRINOSTOMIA SIMPLE TRANSANASAL VIA ENDOSCOPICA"
    },
    {
        "codigo": "098201",
        "descripcion": "CONJUNTIVODACRIOCISTORRINOSTOMIA SIMPLE VIA EXTERNA"
    },
    {
        "codigo": "890326",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ANESTESIOLOGÍA"
    },
    {
        "codigo": "890376",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN OFTALMOLOGIA"
    },
    {
        "codigo": "890382",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN OTORRINOLARINGOLOGÍA"
    },
    {
        "codigo": "890307",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR OPTOMETRÍA"
    },
    {
        "codigo": "890371",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NEUMOLOGÍA"
    },
    {
        "codigo": "890383",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN PEDIATRÍA"
    },
    {
        "codigo": "890325",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ALERGOLOGÍA"
    },
    {
        "codigo": "890342",
        "descripcion": "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN DERMATOLOGÍA"
    },
    {
        "codigo": "890266",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA INTERNA"
    },
    {
        "codigo": "890226",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ANESTESIOLOGIA"
    },
    {
        "codigo": "890298",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA ESTÉTICA"
    },
    {
        "codigo": "890276",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN OFTALMOLOGIA"
    },
    {
        "codigo": "890282",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN OTORRINOLARINGOLOGÍA"
    },
    {
        "codigo": "890202",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR OTRAS ESPECIALIDADES MÉDICAS"
    },
    {
        "codigo": "890207",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR OPTOMETRIA"
    },
    {
        "codigo": "890207",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR OPTOMETRÍA (BAJO CICLOPEJIA)"
    },
    {
        "codigo": "890283",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN PEDIATRÍA"
    },
    {
        "codigo": "890271",
        "descripcion": "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NEUMOLOGÍA"
    },
    {
        "codigo": "890376",
        "descripcion": "CONSULTA DE URGENCIAS POR MEDICINA GENERAL"
    },
    {
        "codigo": "890376",
        "descripcion": "CONSULTA DE URGENCIAS POR OTRAS ESPECIALIDADES MÉDICAS"
    },
    {
        "codigo": "210001",
        "descripcion": "CONTROL DE EPISTAXIS POR ABLACION VIA TRANSNASAL"
    },
    {
        "codigo": "210002",
        "descripcion": "CONTROL DE EPISTAXIS POR ABLACION VIA TRANSNASAL ENDOSCOPICA"
    },
    {
        "codigo": "210901",
        "descripcion": "CONTROL DE EPISTAXIS POR DERMOPLASTIA VIA TRANSNASAL"
    },
    {
        "codigo": "210902",
        "descripcion": "CONTROL DE EPISTAXIS POR DERMOPLASTIA VÍA TRANSNASAL ENDOSCÓPICA"
    },
    {
        "codigo": "210402",
        "descripcion": "CONTROL DE EPISTAXIS, POR LIGADURA DE ARTERIAS ETMOIDALES VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "301402",
        "descripcion": "CORDECTOMÍA PARCIAL VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "301403",
        "descripcion": "CORDECTOMÍA TOTAL VÍA ABIERTA"
    },
    {
        "codigo": "123501",
        "descripcion": "COREOPLASTIA (PUPILOPLASTIA)"
    },
    {
        "codigo": "083811",
        "descripcion": "CORRECCIÓN DE EPICANTO"
    },
    {
        "codigo": "107301",
        "descripcion": "CORRECCION DE CONJUNTIVOCHALASIS"
    },
    {
        "codigo": "083702",
        "descripcion": "CORRECCION DE ECTROPION CON INJERTO"
    },
    {
        "codigo": "083701",
        "descripcion": "CORRECCIÓN DE ECTROPIÓN POR ACORTAMIENTO HORIZONTAL [CUÑA]"
    },
    {
        "codigo": "083703",
        "descripcion": "CORRECCIÓN DE ECTROPIÓN POR FIJACIÓN CANTAL"
    },
    {
        "codigo": "083602",
        "descripcion": "CORRECCIÓN DE ENTROPIÓN POR INJERTO"
    },
    {
        "codigo": "083601",
        "descripcion": "CORRECCION DE ENTROPION POR SUTURA (REINSERCION DE RETRACTORES)"
    },
    {
        "codigo": "083603",
        "descripcion": "CORRECCIÓN DE ENTROPIÓN POR ACORTAMIENTO HORIZONTAL [CUÑA]"
    },
    {
        "codigo": "083003",
        "descripcion": "CORRECCIÓN DE PTOSIS PALPEBRAL, POR RESECCIÓN EXTERNA DEL ELEVADOR VÍA ANTERIOR"
    },
    {
        "codigo": "083004",
        "descripcion": "CORRECCIÓN DE PTOSIS PALPEBRAL, POR RESECCIÓN EXTERNA DEL ELEVADOR VÍA CONJUNTIVAL"
    },
    {
        "codigo": "083002",
        "descripcion": "CORRECCIÓN DE PTOSIS PALPEBRAL, POR SUSPENSIÓN FRONTAL CON DESLIZAMIENTO DEL MÚSCULO FRONTAL"
    },
    {
        "codigo": "083001",
        "descripcion": "CORRECCIÓN DE PTOSIS PALPEBRAL, POR SUSPENSIÓN FRONTAL CON SUTURA O TEJIDO"
    },
    {
        "codigo": "083005",
        "descripcion": "CORRECCION DE PTOSIS PALPEBRAL, POR CONJUNTIVO MULLERECTOMIA VIA CONJUNTIVAL CON O SIN TARSO"
    },
    {
        "codigo": "089207",
        "descripcion": "CORRECCIÓN ESTÉTICA DE PTOSIS DE CEJAS POR ABORDAJE CORONAL"
    },
    {
        "codigo": "083810",
        "descripcion": "CORRECCIÓN DE TELECANTO TRANSNASAL"
    },
    {
        "codigo": "021205",
        "descripcion": "CORRECCIÓN FÍSTULA LCR EN BASE DE CRÁNEO ANTERIOR, VÍA ENDOSCÓPICA TRANSNASAL"
    },
    {
        "codigo": "890602",
        "descripcion": "CUIDADO (MANEJO) INTRAHOSPITALARIO POR MEDICINA ESPECIALIZADA"
    },
    {
        "codigo": "965203",
        "descripcion": "CURACIÓN DE OÍDO VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "952602",
        "descripcion": "CURVA DE PRESION INTRAOCULAR (DIURNA O 24 HORAS)"
    },
    {
        "codigo": "092002",
        "descripcion": "DACRIOADENECTOMIA TOTAL"
    },
    {
        "codigo": "092001",
        "descripcion": "DACRIOADENECTOMÍA PARCIAL"
    },
    {
        "codigo": "096101",
        "descripcion": "DACRIOCISTECTOMÍA"
    },
    {
        "codigo": "098102",
        "descripcion": "DACRIOCISTORRINOSTOMIA TRASNASAL VIA ENDOSCOPICA"
    },
    {
        "codigo": "098101",
        "descripcion": "DACRIOCISTORRINOSTOMÍA VÍA ABIERTA"
    },
    {
        "codigo": "2DS002",
        "descripcion": "DERECHOS DE SALA DE CIRUGÍA (QUIRÓFANOS) COMPLEJIDAD MEDIANA"
    },
    {
        "codigo": "168401",
        "descripcion": "DESCOMPRESIÓN DE ÓRBITA VÍA TECHO DE ÓRBITA"
    },
    {
        "codigo": "168405",
        "descripcion": "DESCOMPRESION DE ORBITA VIA INFERIOR O MEDIAL VIA ABIERTA"
    },
    {
        "codigo": "168403",
        "descripcion": "DESCOMPRESIÓN DE ÓRBITA VÍA INFERIOR O MEDIAL VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "168402",
        "descripcion": "DESCOMPRESION DE ORBITA VIA LATERAL"
    },
    {
        "codigo": "204301",
        "descripcion": "DESFUNCIONALIZACION DE LA MASTOIDES"
    },
    {
        "codigo": "228101",
        "descripcion": "DILATACIÓN DE TROMPA DE EUSTAQUIO CON DISPOSITIVO TRANSNASAL VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "169203",
        "descripcion": "DRENAJE DE COLECCION ANTERIOR DE ORBITA"
    },
    {
        "codigo": "169204",
        "descripcion": "DRENAJE DE COLECCIÓN POSTERIOR DE ÓRBITA"
    },
    {
        "codigo": "080101",
        "descripcion": "DRENAJE DE COLECCION POR BLEFAROTOMIA"
    },
    {
        "codigo": "095001",
        "descripcion": "DRENAJE DEL SACO LAGRIMAL"
    },
    {
        "codigo": "211301",
        "descripcion": "DRENAJE DE LESIÓN (COLECCIÓN) EN PIRÁMIDE NASAL"
    },
    {
        "codigo": "180201",
        "descripcion": "DRENAJE DE COLECCIÓN DE CONDUCTO AUDITIVO EXTERNO"
    },
    {
        "codigo": "951302",
        "descripcion": "ECOGRAFIA OCULAR MODO A Y B"
    },
    {
        "codigo": "951304",
        "descripcion": "ULTRABIOMICROSPIA CON TRANSDUCTOR (UBM)"
    },
    {
        "codigo": "895101",
        "descripcion": "ELECTROCARDIOGRAMA DE RITMO O DE SUPERFICIE"
    },
    {
        "codigo": "954602",
        "descripcion": "ELECTROCOCLEOGRAFIA [ECOG]"
    },
    {
        "codigo": "954402",
        "descripcion": "ELECTRONISTAGMOGRAFIA [ENG] O FOTOELECTRONISTAGMOGRAFIA"
    },
    {
        "codigo": "952201",
        "descripcion": "ELECTROOCULOGRAMA"
    },
    {
        "codigo": "952100",
        "descripcion": "ELECTRORRETINOGRAFIA"
    },
    {
        "codigo": "952101",
        "descripcion": "ELECTRORRETINOGRAMA MONOFOCAL"
    },
    {
        "codigo": "952102",
        "descripcion": "ELECTRORRETINOGRAMA MULTIFOCAL"
    },
    {
        "codigo": "954601",
        "descripcion": "EMISIONES OTOACUSTICAS"
    },
    {
        "codigo": "118303",
        "descripcion": "ENTRECRUZAMIENTO DE COLAGENO CORNEAL"
    },
    {
        "codigo": "164002",
        "descripcion": "ENUCLEACIÓN CON IMPLANTE PROTÉSICO"
    },
    {
        "codigo": "164004",
        "descripcion": "ENUCLEACION CON INJERTO DERMOGRASO"
    },
    {
        "codigo": "902219",
        "descripcion": "EOSINÓFILOS EN MOCO NASAL"
    },
    {
        "codigo": "219009",
        "descripcion": "ESCISIÓN O ABLACIÓN DE LESIÓN INTRANASAL"
    },
    {
        "codigo": "128802",
        "descripcion": "ESCLEROPLASTIA CON INJERTO"
    },
    {
        "codigo": "128801",
        "descripcion": "ESCLEROPLASTIA SIMPLE"
    },
    {
        "codigo": "116401",
        "descripcion": "ESCLEROQUERATOPLASTIA"
    },
    {
        "codigo": "226403",
        "descripcion": "ESFENOIDECTOMÍA VÍA TRANSNASAL"
    },
    {
        "codigo": "226404",
        "descripcion": "ESFENOIDECTOMÍA VÍA TRANSNASAL ENDOSCÓPICA"
    },
    {
        "codigo": "893805",
        "descripcion": "ESPIROMETRÍA O CURVA DE FLUJO VOLUMEN PRE Y POST BRONCODILATADORES"
    },
    {
        "codigo": "893808",
        "descripcion": "ESPIROMETRÍA O CURVA DE FLUJO VOLUMEN SIMPLE"
    },
    {
        "codigo": "193101",
        "descripcion": "ESTAPEDECTOMIA O ESTAPEDOTOMIA CON COLOCACION DE PROTESIS"
    },
    {
        "codigo": "954804",
        "descripcion": "ESTIMULACION ACUSTICA CON DISPOSITIVO"
    },
    {
        "codigo": "306003",
        "descripcion": "ESTROBOSCOPIA LARÍNGEA"
    },
    {
        "codigo": "950505",
        "descripcion": "ESTUDIO DE CAMPO VISUAL CENTRAL O PERIFÉRICO COMPUTARIZADO"
    },
    {
        "codigo": "950501",
        "descripcion": "ESTUDIO DE CAMPO VISUAL CENTRAL Y PERIFÉRICO CONVENCIONAL"
    },
    {
        "codigo": "950603",
        "descripcion": "ESTUDIO DE SENSIBILIDAD DE CONTRASTE"
    },
    {
        "codigo": "226304",
        "descripcion": "ETMOIDECTOMIA ANTERIOR VIA TRANSNASAL ENDOSCOPICA"
    },
    {
        "codigo": "225004",
        "descripcion": "ETMOIDECTOMIA ANTERIOR Y POSTERIOR REVISIONAL"
    },
    {
        "codigo": "226305",
        "descripcion": "ETMOIDECTOMÍA ANTERIOR Y POSTERIOR VÍA TRANSNASAL ENDOSCÓPICA"
    },
    {
        "codigo": "950201",
        "descripcion": "EVALUACIÓN PARA BAJA VISIÓN"
    },
    {
        "codigo": "954306",
        "descripcion": "EVALUACIÓN ELECTROACÚSTICA FUNCIONAL DE LA TROMPA DE EUSTAQUIO"
    },
    {
        "codigo": "950101",
        "descripcion": "EVALUACION ORTOPTICA"
    },
    {
        "codigo": "163002",
        "descripcion": "EVISCERACION DEL GLOBO OCULAR CON IMPLANTE"
    },
    {
        "codigo": "165001",
        "descripcion": "EXENTERACION DE LA ORBITA"
    },
    {
        "codigo": "290001",
        "descripcion": "EXPLORACIÓN DE ÁREA FARÍNGEA E HIPOFARÍNGEA VÍA ABIERTA"
    },
    {
        "codigo": "180300",
        "descripcion": "EXTRACCIÓN DE CERUMEN O CUERPO EXTRAÑO DE CONDUCTO AUDITIVO EXTERNO"
    },
    {
        "codigo": "180302",
        "descripcion": "EXTRACCIÓN DE CERUMEN O CUERPO EXTRAÑO DEL CONDUCTO AUDITIVO EXTERNO BAJO VISIÓN MICROSCÓPICA O ENDOSCÓPICA"
    },
    {
        "codigo": "180301",
        "descripcion": "EXTRACCION DE CUERPO EXTRANO DE CONDUCTO AUDITIVO EXTERNO, CON INCISION"
    },
    {
        "codigo": "094101",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO DEL SACO LAGRIMAL"
    },
    {
        "codigo": "161101",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO EN ÓRBITA"
    },
    {
        "codigo": "120001",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO INTRAOCULAR DEL SEGMENTO ANTERIOR DE OJO"
    },
    {
        "codigo": "110002",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO PROFUNDO EN CÓRNEA"
    },
    {
        "codigo": "100101",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO SUBCONJUNTIVAL"
    },
    {
        "codigo": "982101",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO SUPERFICIAL DE LA CONJUNTIVA"
    },
    {
        "codigo": "110001",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO SUPERFICIAL EN CÓRNEA"
    },
    {
        "codigo": "290301",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO ENCLAVADO EN FARINGE VÍA ABIERTA"
    },
    {
        "codigo": "118202",
        "descripcion": "EXTRACCION DE DISPOSITIVO EN CORNEA"
    },
    {
        "codigo": "138101",
        "descripcion": "EXTRACCIÓN DE LENTE INTRAOCULAR (PSEUDOCRISTALINO) DE CÁMARA ANTERIOR O POSTERIOR"
    },
    {
        "codigo": "130003",
        "descripcion": "EXTRACCIÓN EXTRACAPSULAR ASISTIDA DE CRISTALINO"
    },
    {
        "codigo": "130004",
        "descripcion": "EXTRACCIÓN EXTRACAPSULAR DE CRISTALINO EN PRESENCIA DE AMPOLLA FILTRANTE PREVIA"
    },
    {
        "codigo": "130002",
        "descripcion": "EXTRACCION EXTRACAPSULAR MANUAL DE CRISTALINO"
    },
    {
        "codigo": "130001",
        "descripcion": "EXTRACCION INTRACAPSULAR DE CRISTALINO"
    },
    {
        "codigo": "981101",
        "descripcion": "EXTRACCIÓN SIN INCISIÓN DE CUERPO EXTRAÑO DE CONDUCTO AUDITIVO EXTERNO"
    },
    {
        "codigo": "981201",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO DE LA NARIZ SIN INCISIÓN VÍA TRANSNASAL"
    },
    {
        "codigo": "982102",
        "descripcion": "EXTRACCIÓN DE CUERPO EXTRAÑO SUPERFICIAL EN CÓRNEA O ESCLERÓTICA"
    },
    {
        "codigo": "273301",
        "descripcion": "ESCISIÓN O RESECCIÓN O ABLACIÓN DE LESIÓN SUPERFICIAL DE PALADAR BLANDO"
    },
    {
        "codigo": "295101",
        "descripcion": "FARINGOPLASTIA CON COLGAJO FARÍNGEO"
    },
    {
        "codigo": "295604",
        "descripcion": "FARINGOPLASTIA CON COLGAJO FARÍNGEO POSTERIOR Y DESPLAZAMIENTO DE PILARES [TÉCNICA HOGAN]"
    },
    {
        "codigo": "951102",
        "descripcion": "FOTOGRAFIA A COLOR DE SEGMENTO ANTERIOR DEL OJO"
    },
    {
        "codigo": "951103",
        "descripcion": "FOTOGRAFÍA A COLOR DE SEGMENTO POSTERIOR DEL OJO"
    },
    {
        "codigo": "274101",
        "descripcion": "FRENILLECTOMÍA LABIAL VÍA ABIERTA"
    },
    {
        "codigo": "226301",
        "descripcion": "FRONTO ETMOIDECTOMÍA EXTERNA"
    },
    {
        "codigo": "255002",
        "descripcion": "GLOSOPEXIA ANTERIOR"
    },
    {
        "codigo": "255001",
        "descripcion": "GLOSOPLASTIA CON INJERTO CUTÁNEO O MUCOSO"
    },
    {
        "codigo": "903841",
        "descripcion": "GLUCOSA EN SUERO U OTRO FLUIDO DIFERENTE A ORINA"
    },
    {
        "codigo": "125101",
        "descripcion": "GONIOTOMIA"
    },
    {
        "codigo": "902208",
        "descripcion": "HEMOGRAMA II (HEMOGLOBINA HEMATOCRITO RECUENTO DE ERITROCITOS ÍNDICES ERITROCITARIOS LEUCOGRAMA RECUENTO DE PLAQUETAS E ÍNDICES PLAQUETARIOS) SEMIAUTOMATIZADO"
    },
    {
        "codigo": "209604",
        "descripcion": "IMPLANTACION O SUSTITUCION DE DISPOSITIVO DE CONDUCCION OSEA"
    },
    {
        "codigo": "209606",
        "descripcion": "IMPLANTACIÓN O SUSTITUCIÓN DE PRÓTESIS COCLEAR CON PRESERVACIÓN DE RESTOS AUDITIVOS"
    },
    {
        "codigo": "209607",
        "descripcion": "IMPLANTACIÓN O SUSTITUCIÓN DE PRÓTESIS COCLEAR SIN PRESERVACIÓN DE RESTOS AUDITIVOS"
    },
    {
        "codigo": "137007",
        "descripcion": "IMPLANTE DE DISPOSITIVO DE EXPANSION CAPSULAR"
    },
    {
        "codigo": "118204",
        "descripcion": "IMPLANTE DE DISPOSITIVO EN CORNEA ASISTIDO"
    },
    {
        "codigo": "118203",
        "descripcion": "IMPLANTE DE DISPOSITIVO EN CORNEA MANUAL"
    },
    {
        "codigo": "117302",
        "descripcion": "IMPLANTE DE PRÓTESIS CORNEANA [QUERATOPRÓTESIS] PERMANENTE"
    },
    {
        "codigo": "225301",
        "descripcion": "INCISIÓN DE MÚLTIPLES SENOS PARANASALES VÍA TRANSNASAL"
    },
    {
        "codigo": "954302",
        "descripcion": "INMITANCIA ACÚSTICA (IMPEDANCIOMETRÍA)"
    },
    {
        "codigo": "126702",
        "descripcion": "INSERCION DE DISPOSITIVO ANCLADO A ESCLERA"
    },
    {
        "codigo": "126704",
        "descripcion": "INSERCION DE DISPOSITIVO VIA EXTERNA"
    },
    {
        "codigo": "126703",
        "descripcion": "INSERCION DE DISPOSITIVO VIA GONIOSCOPICA"
    },
    {
        "codigo": "137001",
        "descripcion": "INSERCIÓN DE LENTE INTRAOCULAR EN CÁMARA ANTERIOR DE APOYO ANGULAR"
    },
    {
        "codigo": "137002",
        "descripcion": "INSERCION DE LENTE INTRAOCULAR EN CAMARA ANTERIOR FIJADO AL IRIS"
    },
    {
        "codigo": "137005",
        "descripcion": "INSERCION DE LENTE INTRAOCULAR EN CAMARA POSTERIOR FIJADO A ESCLERA"
    },
    {
        "codigo": "137003",
        "descripcion": "INSERCION DE LENTE INTRAOCULAR EN CAMARA POSTERIOR SOBRE RESTOS CAPSULARES"
    },
    {
        "codigo": "129302",
        "descripcion": "INSERCION DE LENTE INTRAOCULAR FAQUICO EN CAMARA ANTERIOR"
    },
    {
        "codigo": "126700",
        "descripcion": "INSERCIÓN O REVISIÓN DE DISPOSITIVOS PARA GLAUCOMA"
    },
    {
        "codigo": "166101",
        "descripcion": "INSERCIÓN SECUNDARIA DE PRÓTESIS CON FORMACIÓN DE FONDOS DE SACO CONJUNTIVALES"
    },
    {
        "codigo": "890476",
        "descripcion": "INTERCONSULTA POR ESPECIALISTA EN OFTALMOLOGIA"
    },
    {
        "codigo": "890482",
        "descripcion": "INTERCONSULTA POR ESPECIALISTA EN OTORRINOLARINGOLOGÍA"
    },
    {
        "codigo": "890402",
        "descripcion": "INTERCONSULTA POR OTRAS ESPECIALIDADES MÉDICAS"
    },
    {
        "codigo": "950602",
        "descripcion": "INTERFEROMETRIA"
    },
    {
        "codigo": "861411",
        "descripcion": "INYECCIÓN DE MATERIAL MIORELAJANTE (TOXINA BOTULÍNICA)"
    },
    {
        "codigo": "202501",
        "descripcion": "INYECCION DE SUSTANCIA TERAPEUTICA INTRATIMPANICA"
    },
    {
        "codigo": "169005",
        "descripcion": "INYECCION EN CAMARA ANTERIOR DE SUSTANCIA TERAPEUTICA"
    },
    {
        "codigo": "169907",
        "descripcion": "INYECCION EN MUSCULOS EXTRAOCULARES DE SUSTANCIA TERAPEUTICA"
    },
    {
        "codigo": "169004",
        "descripcion": "INYECCION INTRACORNEAL DE SUSTANCIA TERAPEUTICA"
    },
    {
        "codigo": "169006",
        "descripcion": "INYECCION INTRAVITREA DE SUSTANCIA TERAPEUTICA"
    },
    {
        "codigo": "992301",
        "descripcion": "INYECCION O INFILTRACION DE ESTEROIDE"
    },
    {
        "codigo": "169003",
        "descripcion": "INYECCION SUBCONJUNTIVAL DE SUSTANCIA TERAPEUTICA"
    },
    {
        "codigo": "306506",
        "descripcion": "INYECCIÓN EN PLIEGUE VOCAL DE SUSTANCIA TERAPÉUTICA VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "121401",
        "descripcion": "IRIDECTOMIA (BASAL, PERIFERICA Y TOTAL) SOD"
    },
    {
        "codigo": "124402",
        "descripcion": "IRIDOCICLECTOMIA"
    },
    {
        "codigo": "123002",
        "descripcion": "IRIDOPLASTIA ASISTIDA"
    },
    {
        "codigo": "123001",
        "descripcion": "IRIDOPLASTIA MANUAL"
    },
    {
        "codigo": "121102",
        "descripcion": "IRIDOTOMIA ASISTIDA"
    },
    {
        "codigo": "121101",
        "descripcion": "IRIDOTOMIA MANUAL"
    },
    {
        "codigo": "306004",
        "descripcion": "LARINGOSCOPIA"
    },
    {
        "codigo": "303201",
        "descripcion": "LARINGECTOMÍA TOTAL VÍA ABIERTA"
    },
    {
        "codigo": "129102",
        "descripcion": "LAVADO DE CÁMARA ANTERIOR DEL OJO"
    },
    {
        "codigo": "954610",
        "descripcion": "LIBERACION Y REPOSICIONAMIENTO CANALlCULAR (TERAPIA DE REHABILITACION VESTIBULAR PERIFERICA)"
    },
    {
        "codigo": "123203",
        "descripcion": "LISIS DE SINEQUIAS POSTERIORES"
    },
    {
        "codigo": "954301",
        "descripcion": "LOGOAUDIOMETRÍA"
    },
    {
        "codigo": "853204",
        "descripcion": "MAMOPLASTIA ESTETICA DE AUMENTO BILATERAL CON TEJIDO AUTÓLOGO"
    },
    {
        "codigo": "204003",
        "descripcion": "MASTOIDECTOMIA CON EPITIMPANECTOMIA O TIMPANOTOMIA POSTERIOR"
    },
    {
        "codigo": "204201",
        "descripcion": "MASTOIDECTOMIA SIN PRESERVACION DE LA PARED POSTERIOR"
    },
    {
        "codigo": "262001",
        "descripcion": "MARSUPIALIZACIÓN DE LA RÁNULA"
    },
    {
        "codigo": "226307",
        "descripcion": "MAXILOETMOIDECTOMÍA VÍA TRANSNASAL"
    },
    {
        "codigo": "950601",
        "descripcion": "MEDICIÓN DE AGUDEZA VISUAL"
    },
    {
        "codigo": "306002",
        "descripcion": "MICROENDOSCOPIA LARINGEA"
    },
    {
        "codigo": "954802",
        "descripcion": "MONITOREO DE PROTESIS Y AYUDAS AUDITIVAS"
    },
    {
        "codigo": "306001",
        "descripcion": "NASOLARINGOSCOPIA"
    },
    {
        "codigo": "306001",
        "descripcion": "NASOLARINGOSCOPIA (DIAGNOSTICA - SALA PROCEDIMIENTO)"
    },
    {
        "codigo": "160201",
        "descripcion": "ORBITOTOMIA CON INSERCION DE IMPLANTE ORBITAL"
    },
    {
        "codigo": "160101",
        "descripcion": "ORBITOTOMÍA CON COLGAJO ÓSEO"
    },
    {
        "codigo": "273203",
        "descripcion": "PALATECTOMÍA DE PALADAR ÓSEO PARCIAL"
    },
    {
        "codigo": "952501",
        "descripcion": "PAQUIMETRIA"
    },
    {
        "codigo": "103108",
        "descripcion": "PERITOMIA TOTAL"
    },
    {
        "codigo": "170005",
        "descripcion": "PETROSECTOMIA"
    },
    {
        "codigo": "853001",
        "descripcion": "PEXIA MAMARIA [MAMOPEXIA] UNILATERAL"
    },
    {
        "codigo": "255006",
        "descripcion": "PLASTIA DE FRENILLO LINGUAL"
    },
    {
        "codigo": "168301",
        "descripcion": "PLASTIA DE ÓRBITA CON RECONSTRUCCIÓN DE FONDOS DE SACO CON INJERTOS"
    },
    {
        "codigo": "097301",
        "descripcion": "PLASTIA DE PUNTO LAGRIMAL MODIFICADA CON SUTURAS"
    },
    {
        "codigo": "097201",
        "descripcion": "PLASTIA DE PUNTO LAGRIMAL SIMPLE"
    },
    {
        "codigo": "097101",
        "descripcion": "PLASTIA EN CANALÍCULOS LAGRIMALES"
    },
    {
        "codigo": "185104",
        "descripcion": "PLASTIA EN LÓBULO DE OREJA"
    },
    {
        "codigo": "089210",
        "descripcion": "PLASTIA DE CEJAS (FRONTOPLASTIA) POR VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "954626",
        "descripcion": "POTENCIALES EVOCADOS AUDITIVOS DE CORTA LATENCIA MEDICIÓN DE INTEGRIDAD"
    },
    {
        "codigo": "952302",
        "descripcion": "POTENCIALES VISUALES EVOCADOS MONOFOCALES"
    },
    {
        "codigo": "952303",
        "descripcion": "POTENCIALES VISUALES EVOCADOS MULTIFOCALES"
    },
    {
        "codigo": "115307",
        "descripcion": "QUERATECTOMÍA MANUAL"
    },
    {
        "codigo": "115308",
        "descripcion": "QUERATECTOMIA ASISTIDA"
    },
    {
        "codigo": "117502",
        "descripcion": "QUERATECTOMÍA FOTORREFRACTIVA MÁS QUERATOMILEUSIS ASISTIDA"
    },
    {
        "codigo": "116002",
        "descripcion": "QUERATOPLASTIA ENDOTELIAL ASISTIDA"
    },
    {
        "codigo": "116002",
        "descripcion": "QUERATOPLASTIA ENDOTELIAL ASISTIDA (DMEK)"
    },
    {
        "codigo": "116002",
        "descripcion": "QUERATOPLASTIA ENDOTELIAL ASISTIDA (DSAEK)"
    },
    {
        "codigo": "116001",
        "descripcion": "QUERATOPLASTIA ENDOTELIAL MANUAL"
    },
    {
        "codigo": "116102",
        "descripcion": "QUERATOPLASTIA LAMELAR ANTERIOR ASISTIDA"
    },
    {
        "codigo": "116101",
        "descripcion": "QUERATOPLASTIA LAMELAR ANTERIOR MANUAL"
    },
    {
        "codigo": "116104",
        "descripcion": "QUERATOPLASTIA LAMELAR PROFUNDA ASISTIDA"
    },
    {
        "codigo": "116103",
        "descripcion": "QUERATOPLASTIA LAMELAR PROFUNDA MANUAL"
    },
    {
        "codigo": "116202",
        "descripcion": "QUERATOPLASTIA PENETRANTE ASISTIDA"
    },
    {
        "codigo": "116201",
        "descripcion": "QUERATOPLASTIA PENETRANTE MANUAL"
    },
    {
        "codigo": "118101",
        "descripcion": "QUERATOPIGMENTACIÓN [TATUAJE DE CÓRNEA]"
    },
    {
        "codigo": "107203",
        "descripcion": "RECONSTRUCCION DE FONDOS DE SACO CON INJERTO DE TEJIDO OCULAR"
    },
    {
        "codigo": "186202",
        "descripcion": "RECONSTRUCCION DE MEATO AUDITIVO EXTERNO"
    },
    {
        "codigo": "086001",
        "descripcion": "RECONSTRUCCION DE PARPADOS CON COLGAJO"
    },
    {
        "codigo": "086002",
        "descripcion": "RECONSTRUCCIÓN DE PÁRPADOS CON INJERTO"
    },
    {
        "codigo": "086003",
        "descripcion": "RECONSTRUCCIÓN DE PÁRPADOS POR LIBERACIÓN DE COLGAJO"
    },
    {
        "codigo": "218605",
        "descripcion": "RECONSTRUCCIÓN DE VÁLVULA NASAL"
    },
    {
        "codigo": "219602",
        "descripcion": "RECONSTRUCCIÓN ENDONASAL VÍA TRANSNASAL ENDOSCÓPICA"
    },
    {
        "codigo": "187102",
        "descripcion": "RECONSTRUCCIÓN PROTÉSICA DE AURÍCULA, CON MINIPLACAS DE FIJACIÓN INTERNA (DISPOSITIVOS DE FIJACIÓN U OSTEOSÍNTESIS)"
    },
    {
        "codigo": "089215",
        "descripcion": "RECONSTRUCCIÓN DE CEJAS (FRONTOPLASTIA) POR VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "115401",
        "descripcion": "RECUBRIMIENTO DE CORNEA CON COLGAJO CONJUNTIVAL"
    },
    {
        "codigo": "950610",
        "descripcion": "RECUENTO DE CELULAS ENDOTELIALES"
    },
    {
        "codigo": "907104",
        "descripcion": "RECUENTO DE ADDIS"
    },
    {
        "codigo": "907105",
        "descripcion": "RECUENTO HAMBURGUER"
    },
    {
        "codigo": "902220",
        "descripcion": "RECUENTO DE PLAQUETAS AUTOMATIZADO"
    },
    {
        "codigo": "902221",
        "descripcion": "RECUENTO DE PLAQUETAS MANUAL"
    },
    {
        "codigo": "902218",
        "descripcion": "RECUENTO DE EOSINÓFILO EN CUALQUIER MUESTRA"
    },
    {
        "codigo": "218915",
        "descripcion": "REDUCCION ABIERTA DE FRACTURA NASAL"
    },
    {
        "codigo": "218914",
        "descripcion": "REDUCCIÓN CERRADA DE FRACTURA NASAL"
    },
    {
        "codigo": "121301",
        "descripcion": "REDUCCIÓN DE HERNIA DE IRIS"
    },
    {
        "codigo": "083807",
        "descripcion": "REFORMA DE PLIEGUE PALPEBRAL POR FIJACIÓN TARSAL"
    },
    {
        "codigo": "154001",
        "descripcion": "REINSERCIÓN DE MÚSCULOS RECTOS"
    },
    {
        "codigo": "154002",
        "descripcion": "REINSERCION DE MUSCULOS OBLICUOS"
    },
    {
        "codigo": "143401",
        "descripcion": "REPARACIÓN ASISTIDA DE LESIÓN RETINAL POR RETINOPEXIA"
    },
    {
        "codigo": "143403",
        "descripcion": "REPARACIÓN ASISTIDA DE LESIÓN RETINAL VÍA EXTERNA"
    },
    {
        "codigo": "143402",
        "descripcion": "REPARACIÓN ASISTIDA DE LESIÓN RETINAL VÍA INTERNA"
    },
    {
        "codigo": "115301",
        "descripcion": "REPARACION DE LACERACION O HERIDA CORNEAL CON INJERTO ESPESOR PARCIAL"
    },
    {
        "codigo": "115302",
        "descripcion": "REPARACION DE LACERACION O HERIDA CORNEAL CON INJERTO ESPESOR TOTAL"
    },
    {
        "codigo": "143501",
        "descripcion": "REPARACION DE LESION RETINAL POR INDENTACION ESCLERAL"
    },
    {
        "codigo": "143404",
        "descripcion": "REPARACION DE LESION RETINAL POR RETINOPEXIA NEUMATICA"
    },
    {
        "codigo": "104003",
        "descripcion": "REPARACION DE SIMBLEFARON CON INJERTO DE TEJIDO EXTRAOCULAR"
    },
    {
        "codigo": "104002",
        "descripcion": "REPARACIÓN DE SIMBLÉFARON CON INJERTO LIBRE EN CONJUNTIVA"
    },
    {
        "codigo": "104001",
        "descripcion": "REPARACIÓN SIMPLE DE SIMBLÉFARON"
    },
    {
        "codigo": "115201",
        "descripcion": "REPARACIÓN DE DEHISCENCIA DE HERIDA CORNEAL"
    },
    {
        "codigo": "123401",
        "descripcion": "REPARACION O SUTURA DE IRIDODIALISIS"
    },
    {
        "codigo": "137006",
        "descripcion": "REPOSICIONAMIENTO DE LENTE INTRAOCULAR"
    },
    {
        "codigo": "182201",
        "descripcion": "RESECCIÓN DE APÉNDICE PREAURICULAR"
    },
    {
        "codigo": "182301",
        "descripcion": "RESECCIÓN DE QUISTE DE PABELLÓN AURICULAR"
    },
    {
        "codigo": "284101",
        "descripcion": "RESECCIÓN DE RESTOS ADENOAMIGDALINOS"
    },
    {
        "codigo": "274301",
        "descripcion": "RESECCIÓN DE LESIÓN BENIGNA DE LA MUCOSA ORAL, HASTA DE DOS CENTÍMETROS DE DIÁMETRO"
    },
    {
        "codigo": "252002",
        "descripcion": "RESECCIÓN O ABLACIÓN PARCIAL DE LENGUA"
    },
    {
        "codigo": "124201",
        "descripcion": "RESECCIÓN DE TUMOR DE IRIS"
    },
    {
        "codigo": "082101",
        "descripcion": "RESECCION DE CHALAZION VIA ANTERIOR"
    },
    {
        "codigo": "082101",
        "descripcion": "RESECCIÓN DE CHALAZIÓN VÍA POSTERIOR"
    },
    {
        "codigo": "182101",
        "descripcion": "RESECCIÓN DE FÍSTULA O QUISTE PREAURICULAR"
    },
    {
        "codigo": "262002",
        "descripcion": "RESECCIÓN DE MUCOCELE DE GLÁNDULA SALIVAL"
    },
    {
        "codigo": "252001",
        "descripcion": "RESECCIÓN DE LENGUA EN CUÑA"
    },
    {
        "codigo": "226203",
        "descripcion": "RESECCION DE LESION BENIGNA EN SENO MAXILAR VIA TRANSNASAL"
    },
    {
        "codigo": "103101",
        "descripcion": "RESECCION DE LESION O TUMOR BENIGNO DE CONJUNTIVA"
    },
    {
        "codigo": "103102",
        "descripcion": "RESECCIÓN DE LESIÓN O TUMOR BENIGNO DE CONJUNTIVA CON INJERTO"
    },
    {
        "codigo": "293305",
        "descripcion": "RESECCION DE LESION O TUMOR BENIGNO DE FARINGE VIA ABIERTA"
    },
    {
        "codigo": "293306",
        "descripcion": "RESECCIÓN DE LESIÓN O TUMOR BENIGNO DE FARINGE VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "124401",
        "descripcion": "RESECCIÓN DE LESIÓN O TUMOR EN CUERPO CILIAR"
    },
    {
        "codigo": "103104",
        "descripcion": "RESECCION DE PTERIGION (NASAL O TEMPORAL) CON INJERTO"
    },
    {
        "codigo": "103105",
        "descripcion": "RESECCION DE PTERIGION REPRODUCIDO (NASAL O TEMPORAL) CON INJERTO"
    },
    {
        "codigo": "183101",
        "descripcion": "RESECCIÓN DE TUMOR BENIGNO DE CONDUCTO AUDITIVO EXTERNO"
    },
    {
        "codigo": "114101",
        "descripcion": "RESECCIÓN DE TUMOR BENIGNO DE CÓRNEA"
    },
    {
        "codigo": "219003",
        "descripcion": "RESECCION DE TUMOR BENIGNO DE FOSA NASAL VIA ABIERTA"
    },
    {
        "codigo": "219004",
        "descripcion": "RESECCIÓN DE TUMOR MALIGNO DE FOSA NASAL VÍA TRANSNASAL ENDOSCÓPICA"
    },
    {
        "codigo": "219002",
        "descripcion": "RESECCION DE TUMOR BENIGNO DE FOSA NASAL VIA TRANSNASAL ENDOSCOPICA"
    },
    {
        "codigo": "169202",
        "descripcion": "RESECCION DE TUMOR BENIGNO DE ORBITA"
    },
    {
        "codigo": "082302",
        "descripcion": "RESECCIÓN DE TUMOR BENIGNO O MALIGNO DE PÁRPADO, ESPESOR PARCIAL, DOS TERCIOS"
    },
    {
        "codigo": "082304",
        "descripcion": "RESECCION DE TUMOR BENIGNO O MALIGNO DE PARPADO, ESPESOR PARCIAL, MAYOR DE DOS TERCIOS"
    },
    {
        "codigo": "082301",
        "descripcion": "RESECCION DE TUMOR BENIGNO O MALIGNO DE PARPADO, ESPESOR PARCIAL, UN TERCIO"
    },
    {
        "codigo": "082403",
        "descripcion": "RESECCIÓN DE TUMOR BENIGNO O MALIGNO DE PÁRPADO, ESPESOR TOTAL, UN TERCIO"
    },
    {
        "codigo": "864203",
        "descripcion": "RESECCIÓN DE TUMOR BENIGNO O MALIGNO DE PIEL O TEJIDO CELULAR SUBCUTÁNEO DE ÁREA ESPECIAL, ENTRE DOS A TRES CENTÍMETROS"
    },
    {
        "codigo": "864204",
        "descripcion": "RESECCIÓN DE TUMOR BENIGNO O MALIGNO DE PIEL O TEJIDO CELULAR SUBCUTÁNEO DE ÁREA ESPECIAL, ENTRE TRES A CINCO CENTÍMETROS"
    },
    {
        "codigo": "128401",
        "descripcion": "RESECCIÓN DE TUMOR DE LA ESCLERÓTICA, VÍA ABIERTA"
    },
    {
        "codigo": "103106",
        "descripcion": "RESECCIÓN DE TUMOR MALIGNO DE CONJUNTIVA CON INJERTO"
    },
    {
        "codigo": "103107",
        "descripcion": "RESECCIÓN DE TUMOR MALIGNO DE CONJUNTIVA SIN INJERTO"
    },
    {
        "codigo": "169201",
        "descripcion": "RESECCION DE TUMOR MALIGNO DE ORBITA"
    },
    {
        "codigo": "040702",
        "descripcion": "RESECCIÓN DE TUMOR PRIMARIO DEL NERVIO ÓPTICO, POR ORBITOTOMÍA LATERAL"
    },
    {
        "codigo": "040701",
        "descripcion": "RESECCIÓN DE TUMOR PRIMARIO DEL NERVIO ÓPTICO, POR CRANEOTOMÍA SUBFRONTAL"
    },
    {
        "codigo": "300202",
        "descripcion": "RESECCIÓN ENDOSCÓPICA DE LESIÓN EN LARINGE"
    },
    {
        "codigo": "277201",
        "descripcion": "RESECCION PARCIAL DE UVULA"
    },
    {
        "codigo": "103103",
        "descripcion": "RESECCION SIMPLE DE PTERIGION (NASAL O TEMPORAL)"
    },
    {
        "codigo": "902039",
        "descripcion": "RESISTENCIA A LA PROTEÍNA C ACTIVADA (ASOCIADA A FACTOR V)"
    },
    {
        "codigo": "115801",
        "descripcion": "RETIRO DE SUTURA EN CORNEA"
    },
    {
        "codigo": "902041",
        "descripcion": "RETRACCIÓN DE COÁGULO"
    },
    {
        "codigo": "154004",
        "descripcion": "RETROINSERCION DE MUSCULOS OBLICUOS"
    },
    {
        "codigo": "154003",
        "descripcion": "RETROINSERCION DE MUSCULOS RECTO"
    },
    {
        "codigo": "126705",
        "descripcion": "REVISION ANTERIOR DE TUBO DE DISPOSITIVO"
    },
    {
        "codigo": "126601",
        "descripcion": "REVISIÓN DE AMPOLLA FILTRANTE"
    },
    {
        "codigo": "209101",
        "descripcion": "REVISION DE MASTOIDECTOMIAS O MASTOIDOPLASTIAS"
    },
    {
        "codigo": "317401",
        "descripcion": "REVISIÓN DE TRAQUEOSTOMÍA VÍA ABIERTA"
    },
    {
        "codigo": "166301",
        "descripcion": "REVISIÓN E INSERCIÓN DE IMPLANTE ORBITARIO"
    },
    {
        "codigo": "954903",
        "descripcion": "REVISIÓN Y AJUSTE O SUSTITUCIÓN DE COMPONENTES EXTERNOS DE DISPOSITIVO AUDITIVO IMPLANTABLE"
    },
    {
        "codigo": "218604",
        "descripcion": "RINOPLASTIA VÍA ABIERTA"
    },
    {
        "codigo": "219501",
        "descripcion": "SEPTOPLASTIA PRIMARIA TRANSNASAL"
    },
    {
        "codigo": "218405",
        "descripcion": "SEPTORRINOPLASTIA SECUNDARIA VÍA TRANSNASAL"
    },
    {
        "codigo": "263204",
        "descripcion": "SIALOADENECTOMÍA DE GLÁNDULA SUBMAXILAR (SUBMANDIBULAR)"
    },
    {
        "codigo": "225005",
        "descripcion": "SINUSOTOMIA FRONTAL REVISIONAL"
    },
    {
        "codigo": "224102",
        "descripcion": "SINUSOTOMÍA FRONTAL VÍA TRANSNASAL ENDOSCÓPICA"
    },
    {
        "codigo": "306007",
        "descripcion": "SOMNOSCOPIA"
    },
    {
        "codigo": "094201",
        "descripcion": "SONDEO Y LAVADO DE LAS VÍAS LAGRIMALES VÍA EXTERNA"
    },
    {
        "codigo": "115306",
        "descripcion": "SUTURA DE CORNEA"
    },
    {
        "codigo": "128101",
        "descripcion": "SUTURA DE LA ESCLERA [ESCLERORRAFIA]"
    },
    {
        "codigo": "088403",
        "descripcion": "SUTURA DE PARPADO Y RECONSTRUCCION CON INJERTO O COLGAJO"
    },
    {
        "codigo": "106101",
        "descripcion": "SUTURA EN LA CONJUNTIVA"
    },
    {
        "codigo": "088402",
        "descripcion": "SUTURA PROFUNDA DE HERIDA MULTIPLE DE PARPADO"
    },
    {
        "codigo": "088401",
        "descripcion": "SUTURA PROFUNDA DE HERIDA UNICA DE PARPADO"
    },
    {
        "codigo": "088202",
        "descripcion": "SUTURA SUPERFICIAL DE HERIDA MULTIPLE DE PARPADO [BLEFARORRA"
    },
    {
        "codigo": "088201",
        "descripcion": "SUTURA SUPERFICIAL DE HERIDA ÚNICA DE PÁRPADO"
    },
    {
        "codigo": "126603",
        "descripcion": "SUTUROLISIS SUBCONJUNTIVAL DE COLGAJO ESCLERAL ASISTIDA"
    },
    {
        "codigo": "255101",
        "descripcion": "SUTURA DE LACERACIÓN DE LENGUA (GLOSORRAFIA) VÍA ABIERTA"
    },
    {
        "codigo": "317102",
        "descripcion": "SUTURA DE LACERACIÓN DE TRÁQUEA VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "082602",
        "descripcion": "TARSORRAFIA"
    },
    {
        "codigo": "937202",
        "descripcion": "TERAPIA FONOAUDIOLOGICA DE LA VOZ"
    },
    {
        "codigo": "937301",
        "descripcion": "TERAPIA FONOAUDIOLOGICA PARA DESORDENES AUDITIVOS COMUNICATIVOS"
    },
    {
        "codigo": "953501",
        "descripcion": "TERAPIA ORTOPTICA"
    },
    {
        "codigo": "902045",
        "descripcion": "TIEMPO DE PROTROMBINA [TP]"
    },
    {
        "codigo": "902049",
        "descripcion": "TIEMPO DE TROMBOPLASTINA PARCIAL [TTP]"
    },
    {
        "codigo": "194107",
        "descripcion": "TIMPANOPLASTIA CON REVISION DE LA CADENA OSICULAR"
    },
    {
        "codigo": "200104",
        "descripcion": "TIMPANOSTOMIA CON COLOCACION DE DISPOSITIVO"
    },
    {
        "codigo": "200102",
        "descripcion": "TIMPANOTOMÍA CON DRENAJE DE MEMBRANA TIMPÁNICA"
    },
    {
        "codigo": "202301",
        "descripcion": "TIMPANOTOMIA EXPLORATORIA"
    },
    {
        "codigo": "202302",
        "descripcion": "TIMPANOTOMÍA EXPLORATORIA VÍA ENDOSCÓPICA"
    },
    {
        "codigo": "951902",
        "descripcion": "TOMOGRAFÍA ÓPTICA DE SEGMENTO ANTERIOR"
    },
    {
        "codigo": "951902",
        "descripcion": "TOMOGRAFÍA ÓPTICA DE SEGMENTO POSTERIOR"
    },
    {
        "codigo": "951902",
        "descripcion": "TOMOGRAFÍA ÓPTICA DE SEGMENTO POSTERIOR"
    },
    {
        "codigo": "951902",
        "descripcion": "TOMOGRAFIA ÓPTICA DE SEGMENTO POSTERIOR (MACULA)"
    },
    {
        "codigo": "951902",
        "descripcion": "TOMOGRAFÍA ÓPTICA DE SEGMENTO POSTERIOR (NERVIO OPTICO)"
    },
    {
        "codigo": "952601",
        "descripcion": "TONOGRAFIA OCULAR CON PRUEBAS PROVOCATIVAS"
    },
    {
        "codigo": "891101",
        "descripcion": "TONOMETRÍA"
    },
    {
        "codigo": "951502",
        "descripcion": "TOPOGRAFIA COMPUTADA CORNEAL POR ELEVACION"
    },
    {
        "codigo": "951502",
        "descripcion": "TOPOGRAFIA COMPUTADA CORNEAL POR ELEVACION (PENTACAM)"
    },
    {
        "codigo": "951501",
        "descripcion": "TOPOGRAFÍA COMPUTADA CORNEAL SIMPLE"
    },
    {
        "codigo": "126301",
        "descripcion": "TRABECULECTOMÍA AB-EXTERNO"
    },
    {
        "codigo": "126403",
        "descripcion": "TRABECULECTOMIA CONVENCIONAL"
    },
    {
        "codigo": "127501",
        "descripcion": "TRABECULOPLASTIA ASISTIDA"
    },
    {
        "codigo": "125401",
        "descripcion": "TRABECULOTOMIA"
    },
    {
        "codigo": "311301",
        "descripcion": "TRAQUEOSTOMÍA VÍA ABIERTA"
    },
    {
        "codigo": "219302",
        "descripcion": "TURBINOPLASTIA VÍA TRANSNASAL"
    },
    {
        "codigo": "219303",
        "descripcion": "TURBINOPLASTIA VIA TRANSNASAL ENDOSCOPICA"
    },
    {
        "codigo": "219201",
        "descripcion": "TURBINECTOMÍA VÍA TRANSNASAL"
    },
    {
        "codigo": "951304",
        "descripcion": "ULTRABIOMICROSCOPIA OCULAR"
    },
    {
        "codigo": "276207",
        "descripcion": "UVULO-PALATO-FARINGOPLASTIA"
    },
    {
        "codigo": "276210",
        "descripcion": "UVULO-PALATO-FARINGOPLASTIA POR ABLACION"
    },
    {
        "codigo": "147101",
        "descripcion": "VITRECTOMIA ANTERIOR"
    },
    {
        "codigo": "147104",
        "descripcion": "VITRECTOMIA ANTERIOR CON RETIRO DE MATERIAL IMPLANTADO"
    },
    {
        "codigo": "147403",
        "descripcion": "VITRECTOMÍA POSTERIOR ASISTIDA"
    },
    {
        "codigo": "147401",
        "descripcion": "VITRECTOMÍA POSTERIOR CON INSERCIÓN DE SILICÓN O GASES"
    },
    {
        "codigo": "147402",
        "descripcion": "VITRECTOMÍA POSTERIOR CON RETINOPEXIA"
    },
    {
        "codigo": "147405",
        "descripcion": "VITRECTOMÍA POSTERIOR CON RETIRO DE MATERIAL IMPLANTADO"
    },
    {
        "codigo": "147503",
        "descripcion": "VITREOLISIS ASISTIDA"
    },
    {
        "codigo": "088601",
        "descripcion": "RITIDECTOMÍA DE PÁRPADO INFERIOR"
    },
    {
        "codigo": "088701",
        "descripcion": "RITIDECTOMÍA DE PÁRPADO SUPERIOR"
    },
    {
        "codigo": "117301",
        "descripcion": "IMPLANTE DE PRÓTESIS CORNEANA [QUERATOPRÓTESIS] TEMPORAL"
    }
];
