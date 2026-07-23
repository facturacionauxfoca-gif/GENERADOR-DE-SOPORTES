import re

eps_list = """SOCIEDAD MEDICA LTDA (CLINICA RIOHACHA)                                                             
COMFAMILIAR DEL ATLCO.                                                                              
COOMEVA E.P.S.  S.A.                                                                                
CEDEC                                                                                               
ELECTRIFICADORA DEL CARIBE S.A. E.S.P                                                               
CHILDREN INTERNATIONAL COLOMBIA                                                                     
OPTICA PANORAMA                                                                                     
PARTICULARES                                                                                        
POLICIA NACIONAL DE COLOMBIA                                                                        
ALIANSALUD E.P.S                                                                                    
SALUDCOOP E.P.S.                                                                                    
E.P.S Y MED PREP SURAMERICANA                                                                       
AXA COLPATRIA SEGUROS DE VIDA S.A.                                                                  
A.R.P. COLMENA                                                                                      
SALUD TOTAL                                                                                         
MEDPLUS MEDICINA PREPAGADA S.A.                                                                     
COLPATRIA E.P.S.                                                                                    
A.R.L. SURA                                                                                         
SEGUROS BOLIVAR                                                                                     
A.R.P. SEGUROS BOLIVAR                                                                              
CAFESALUD ENTIDAD.PROM.SALUD-CAPITACION                                                             
COOTRATEL                                                                                           
CARTON DE COLOMBIA SMURFIT                                                                          
SERVICIO NACIONAL DE APREDIZAJE SENA                                                                
TRIPLE A.A.A.                                                                                       
ALLIANZ SEGUROS DE VIDA S.A                                                                         
COOMEVA MEDICINA PREPAGADA S.A.                                                                     
CLINICA DE FRACTURAS                                                                                
LIBERTY SEGUROS  S.A                                                                                
ENTIDAD PROMOTORA DE SALUD SANITAS S.A.S                                                            
FUNDACION HUELLAS                                                                                   
TRABAJOS TECNICOS DE COLOMBIA LTDA                                                                  
COOSALUD EPS                                                                                        
CLINICA DEL CARIBE S.A.                                                                             
CLINICA DE LA COSTA LTDA.                                                                           
DOW AGROSCIENCES DE COLOMBIA                                                                        
FUNDACION OFTALMOLOGICA DEL CARIBE-STAMT                                                            
CLINICA GENERAL DEL NORTE  S.A.S                                                                    
PROGRESALUD                                                                                         
CENTRO CIRUGIA OCULAR                                                                               
COOMEVA - SANTA MARTA -                                                                             
CLINICA SAN VICENTE                                                                                 
MEDISANITAS S.A.S                                                                                   
ALMACENES EXITO                                                                                     
CAFESALUD ENTIDAD PROMOTORA  DE SALUD                                                               
CLINICA VALLEDUPAR LTDA                                                                             
A.R.S. HUMANA VIVIR                                                                                 
INSTITUTO ONCOHEMATOLOGICO BETANIA                                                                  
COOPERATIVA DE TRABAJADORES ENERGETICOS                                                             
GASES DEL CARIBE                                                                                    
BIENESTAR UNIVERSITARIO UNIATLANTICO                                                                
RED SALUD EPS                                                                                       
E.P.S.Y MED PREP. SURAMERICANA-EVENTOS                                                              
SABORES LTDA                                                                                        
BAVARIA  CIA S.C.A                                                                                  
NOVARTIS DE COLOMBIA                                                                                
MEDICSANAR IPS                                                                                      
CENTRO CIRUGIA AMBULATORIA                                                                          
PAN AMERICAN LIFE DE COLOMBIA COMPAÑIA DE SEGUROS SA                                                
FUNDACION MEDICO PREVENTIVA -VALLEDUPAR-                                                            
A.R.P. AGRICOLA DE SEGUROS                                                                          
OPTHA                                                                                               
CLINICA DE LA VISION OAB LTDA                                                                       
COMFACOR A.R.S.                                                                                     
EQUIDAD SEGUROS DE VIDA A.R.P.                                                                      
SOCIEDAD MEDICA CLINICA MAICAO                                                                      
ALIANSALUD E.P.S. (EVENTOS)                                                                         
CELTA S.A.S.                                                                                        
OFTAMAR LTDA                                                                                        
COOMEVA E.P.S. (MURILLO)                                                                            
ORGANIZACION CLINICA BONNADONA PREVENIR                                                             
ACEROS CORTADOS S.A.                                                                                
APPLUS NORCONTROL COLOMBIA LTDA                                                                     
VYGON COLOMBIA S.A.                                                                                 
FONDO DE EMPLEADOS DE PROCAPS                                                                       
CLINICA ATENAS                                                                                      
NUEVA E.P.S.                                                                                        
NUEVA EPS S.A. (CAPITACION)                                                                         
FONDO DE EMPLEADOS ALMACENES EXITO                                                                  
PUNTO SALUD I.P.S                                                                                   
SALUD AL DIA I.P.S                                                                                  
BIENESTAR I.P.S. LTDA                                                                               
EPS FAMISANAR S.A.S                                                                                 
MAPFRE COLOMBIA VIDA SEGUROS                                                                        
POSITIVA COMPAÑIA DE SEGUROS S.A                                                                    
SALUDVIDA EPS                                                                                       
CLINICA NUEVA CAMPBELL                                                                              
QUINTAL S.A                                                                                         
FUNDACION  VALDERRAMA                                                                               
COOMEVA E.P.S (SAN VICENTE)                                                                         
CLINICA SAN MARTIN                                                                                  
VIVIR S.A MEDICINA PREPAGADA                                                                        
SALUD GRUPAL IPS                                                                                    
COLMENA A.R.P                                                                                       
COLMEDICA MED. PREPAGADA                                                                            
COLSANITAS                                                                                          
ECOPETROL  S. A.                                                                                    
METLIFE COLOMBIA SEGUROS DE VIDA S.A (AL                                                            
SALUD COLPATRIA                                                                                     
SEGUROS DE VIDA SURAMERICANA SA                                                                     
CECAM BIENESTAR                                                                                     
CLINICA OFTALMOLOGICA DE VALLEDUPAR                                                                 
UNIDAD DE CUIDADOS INTENSIVOS RENACER LT                                                            
PARTICULARES FOCA                                                                                   
PARTICULARES COFCA                                                                                  
FISA                                                                                                
FONDO EMPLEADOS FEPIMSA                                                                             
CLUB DE LEONES BARRANQUILLA MONARCA                                                                 
FUNDACION COLOMBIA SUBSIDIAR                                                                        
REDYPLAN CDI SAS                                                                                    
JOHNSON & JOHNSON                                                                                   
OFTALMOLOGOS ASOCIADOS DE LA COSTA                                                                  
CAJA DE COMPENSACION FAMILIAR CAJACOPI A                                                            
EPSI ANAS WAYUU                                                                                     
ASOCIACION INDIGENA DEL CAUCA  AIC EPS-I                                                            
COMPARTA EPS-S                                                                                      
ESPECIALIDADES OFTALMOLOGICAS S.A                                                                   
SCANDINAVIA PHARMA LTDA                                                                             
WASSER CHEMICAL S.A.S                                                                               
COMFAGUAJIRA EPS-S                                                                                  
PEREZ RADIOLOGOS & CIA LTDA                                                                         
LEASING BANCOLOMBIA S.A                                                                             
HERMANAS  DOMINICAS DE LA PRESENTACION                                                              
CERVECERÍA DEL VALLE S.A                                                                            
GALENOS CASTROS PACHECO S.A.S                                                                       
UNION TEMPORAL OFTAMAR                                                                              
EPS-S AMBUQ E.S.S.                                                                                  
DEPARTAMENTO DE POLICIA DE LA GUAJIRA                                                               
DUSAKAWI E.P.S I                                                                                    
COOTRATEL                                                                                           
FERNANDO GARCIA MOYANO                                                                              
LUZ MARINA MELO SANMIGUEL                                                                           
CLINICA LA ASUNCION                                                                                 
MUSICAR S.A                                                                                         
ROHM AND HAAS COLOMBIA LTDA                                                                         
FONDO DE EMPLEADOS DEL GRUPO EMPRESARIAL INASSA                                                     
SEGUROS GENERALES SURAMERICANA S.A                                                                  
INDUSTRIAS NACIONAL DE GASEOSAS                                                                     
TERMOBARRANQUILLA - TEBSA                                                                           
CORPORACIÓN ACCIÓN POR EL ATLANTICO ACTU                                                            
SEGUROS COLPATRIA S.A.                                                                              
SUPEREFECTIVO S.A.                                                                                  
CLINICA INTEGRAL LA ESPERANZA S.A.S.                                                                
SECRETARIA DE SALUD DISTRITAL DE BARRANQ                                                            
LAFAM S.A.S.                                                                                        
UNION TEMPORAL OFTALMOLOGOS ASOCIADOS                                                               
FONDO DE EMPLEADOS DE PIZANO                                                                        
EDGARDO MAURICIO DIAZ BORELLY                                                                       
COMPAÑIA MUNDIAL DE SEGUROS S.A.                                                                    
SEGUROS DEL ESTADO S.A                                                                              
MUNDIAL SEGUROS                                                                                     
FUERZA AEREA CACOM3                                                                                 
AXA COLPATRIA  MEDICINA PREPAGADA                                                                   
BRAVO TRANS SAS                                                                                     
FUNDACION MEDICO PREVENTIVA PARA EL BIEN                                                            
FONDO DE EMPLEADOS AV VILLAS FEVI                                                                   
LEASING CORFICOLOMBIANA SA CF                                                                       
KAIKA S.A.S                                                                                         
MEDICINA ALTA COMPLEJIDAD MACSA                                                                     
QBE SEGUROS SA                                                                                      
ROCOL S.A.                                                                                          
LENTECH S.A.                                                                                        
LABORATORIOS ALCON DE COLOMBIA S.A.                                                                 
BAYER S.A                                                                                           
GUSOR LTDA                                                                                          
MSD (MERCK SHARP & DOHME COLOMBIA SAS)                                                              
EQUIOFTALMOS LTDA                                                                                   
TECNOQUIMICAS S.A                                                                                   
VISION & HEALTH LAB S.A.S                                                                           
LABORATORIOS SOPHIA DE COLOMBIA LTDA                                                                
PANAMERICAN INSTRUMENTS LTDA                                                                        
EVOLUCIA SAS                                                                                        
INVERSIONES CHAHIN                                                                                  
BIOFTALM LTDA                                                                                       
LABORATORIOS OFTALMICOS                                                                             
INVERTECNOLOGICAS                                                                                   
ANDREC CORPORATION S.A.                                                                             
OPIMED SAS                                                                                          
LABORATORIO OFTALMICO DE LA COSTA SAS                                                               
LUIS GUILLERMO VASQUEZ VELEZ                                                                        
GUERRA Y GUERRA  SAS                                                                                
PROCAPS                                                                                             
CAMARA DE COMERCIO                                                                                  
FREXEN                                                                                              
BIONEXO                                                                                             
LABORATORIOS RETINA  S.A.S.                                                                         
US MEDICAL SOLUTIONS                                                                                
EL HERALDO                                                                                          
EYE SURGICAL TECNOLOGY LTDA                                                                         
PROMOTORES DEL CARIBE SAS                                                                           
ALLERGAN DE COLOMBIA SA                                                                             
ARMADA NACIONAL ESM 1034                                                                            
BUSINESS TRADE GROUP SAS                                                                            
COOTRASENA COOPERATIVA MULTIACTIVA DE TRABAJADORES DEL SENA                                         
CESAR SALGADO GARCIA                                                                                
IGLESIA CENTRO BIBLICO INTERNACIONAL                                                                
FINOTEX S.A.                                                                                        
FONLITOPLAS                                                                                         
COOPERATIVA MULTIACTIVA DEL SECTOR ENERGETICO COOTRAELECTRA                                         
SEGUROS DE VIDA ALFA S.A VIDALFA S.A                                                                
FONDO DE EMPLEADOS DEL DEPARTAMENTO DEL ATLANTICO FONDEATLAN                                        
FONDO DE EMPLEADOS DEL CERREJON                                                                     
FONDO DE EMPLEADOS CAMARA DE COMERCIO FECAMARA                                                      
FUNDACION PROCIENCIAS                                                                               
FUNDACION NU3                                                                                       
SINERGIA GLOBAL EN SALUD S.A.S.                                                                     
PREVISORA - SOAT                                                                                    
CODILENTES COLOMBIA S.A.                                                                            
UT COFCA-OTOCEN                                                                                     
CENTRALCO LTDA                                                                                      
PROBIENESTAR                                                                                        
PEREZ RADIOLOGOS S.A.S                                                                              
MAPFRE SEGUROS GENERALES DE COLOMBIA S.A.                                                           
D.T.SALUD S.A.S.                                                                                    
CENTRO DE FORMACION INTEGRAL MAHANAIN                                                               
FUNDACION CENTRA DE VIDA INTEGRAL                                                                   
FUNDACION  UNIVERSIDAD DEL NORTE                                                                    
SECRETARIA DE SALUD DEPARTAMENTAL                                                                   
SECRETARIA DE SALUD DEPARTAMENTO  GUAJIRA                                                           
SECRETARIA DE SALUD DEPARTAMENTO SUCRE                                                              
SECRETARIA DE SALUD DEPARTAMENTO MAGDALENA                                                          
SECRETARIA DE SALUD DEPARTAMENTAL CORDOBA                                                           
SECRETARIA DE SALUD DEPARTAMENTAL BOLIVAR                                                           
SECRETARIA DE SALUD DEPARTAMENTAL CESAR                                                             
FONDO DE EMPLEADOS DEL GRUPO COREMAR                                                                
FUTBOL CON CORAZÓN                                                                                  
KGP CONSULTORIAS & LOGISTICAS S.A.S                                                                 
EJERCITO NACIONAL ESM 1015                                                                          
EUROPEAN DREDGING COMPANY SUCURSAL COLOMBIA                                                         
CARDIF COLOMBIA SEGUROS S.A                                                                         
CLINICA OFTALMOLOGICA DE SUCRE                                                                      
FONDEATLAN                                                                                          
INSTITUTO EDUCATIVO DISTRITAL MADRE MARCELINA                                                       
GRUPO VIVIR BARRANQUILLA SAS                                                                        
ZONA FRANCA CELSIA S.A.  E.S.P.                                                                     
COM  BARRANQUILLA                                                                                   
FUNDACION INTEGRAL DE SALUD Y EDUCACION PARA LA REINTEGRACIN                                        
AXA COLPATRIA                                                                                       
FUNDACION DEL CARIBE PARA LA INVESTIGACION BIOMEDICA                                                
PARTICULARES FOTOCOPIAS                                                                             
SERVICIOS INTEGRALES EN ENTIDADES DE SALUD S.A.S                                                    
IQVIA RDS COLOMBIA SAS                                                                              
DEXCO S.A.S                                                                                         
ACESCO   SAS                                                                                        
OINSAMED SAS                                                                                        
MEDIMAS EPS SAS                                                                                     
PARTICULAR EXCEDENTES                                                                               
ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS-S                                              
FUNDACION OFTALMOLOGICA DEL CARIBE                                                                  
NETCARE                                                                                             
COOSALUD ENTIDAD PROMOTORA DE SALUD S.A                                                             
IVANTIS                                                                                             
ForSight VISION6 Inc                                                                                
NETCARE PARTICULARES                                                                                
ISTAR Medical S.A.                                                                                  
UNION TEMPORAL UT RED INTEGRADA FOSCAL-CUB                                                          
PARTICULARES EGLE                                                                                   
INTERNATIONAL BERCKLEY SCHOOL S.A.S.                                                                
ASOCIACION COLEGIO CRISTIANO J VENDER MURPHY                                                        
FONDO DE EMPLEADOS DE INTERCOR FONDECOR                                                             
FUNDACION SONREIR                                                                                   
COMITE PARALIMPICO COLOMBIANO                                                                       
CLUB DEPORTIVO POPULAR JUNIOR F.C. S.A                                                              
PARTICULARES OPTICA SANTA MARTA                                                                     
PARTIICULARES FOCA SANTA MARTA                                                                      
OFTALMODIAGNOSTICO S.A.S                                                                            
SOCIEDAD DE CIRUGIA OCULAR CARIBE S.A.S                                                             
PARTICULAR EXCEDENTE COFCA                                                                          
AZURA OPHTALMICS                                                                                    
JOSE CARLOS LORA MARTINLEYES - OFTALMOLOGO                                                          
CENTRO OPTICO DE LA COSTA S.A.S.                                                                    
TE OIGO, CENTRO AUDIOLOGICO S.A.S.                                                                  
CAJA DE COMPENSACION FAMILIAR DE SUCRE                                                              
INC RESEARCH COLOMBIA LTDA                                                                          
CENTRO DE OFTALMOLOGIA INTEGRAL COFIN S.A.S                                                         
FINSOCIAL S.A.S                                                                                     
SERVIPROTECCION S.A.S.                                                                              
EXTREME TECHNOLOGIES S.A.                                                                           
SYNEOS HEALTH, LLC                                                                                  
AUDIOSALUD INTEGRAL LTDA                                                                            
PORTMAGDALENA S.A                                                                                   
ADVANTI S.A.S                                                                                       
CLINICA PORTOAZUL S.A.                                                                              
COCHLEAR COLOMBIA SAS                                                                               
JAG INGENIERIA & REFRIGERACION S.A.S.                                                               
TECNI-SLOT S.A.S.                                                                                   
FUNDACION PREMATUROS SIN FRONTERAS                                                                  
FUNDACION POLICLINICA CIENAGA                                                                       
CENTROS HOSPITALARIOS DEL CARIBE S.A.S                                                              
SOCIEDAD MEDICA DE SANTA MARTA S.A.S                                                                
CLINICA DE LA MUJER S.A                                                                             
H.V. INGENIERIA Y CONSTRUCCIONES S.A.S.                                                             
FUNCOLEHF                                                                                           
POLICIA METROPOLITANA DE SANTA MARTA                                                                
CURE LATAM SAS                                                                                      
CLINICA LA MILAGROSA S.A.                                                                           
FEDERACION HANDICAP INTERNATIONAL                                                                   
CENTRO TERAPEUTICO RE-ENCONTRARSE S.A.S                                                             
CLINICA SANTA ANA DE DIOS S.A.S                                                                     
CLINICA BENEDICTO S.A                                                                               
PREMEDIC COLOMBIA                                                                                   
CLINICA OFTALMOLOGICA DE SINCELEJO LTDA                                                             
POLICIA NACIONAL SECCIONAL DE SANIDAD                                                               
EMPRESA PROMOTORA DE SALUD ECOOPSOS EPS S.A.S.                                                      
PRIME TERMOFLORES S.A.S. E.S.P.                                                                     
TRINITY PARTNERS, LLC                                                                               
CAJA DE COMPENSACIÓN FAMILIAR COMPENSAR                                                             
INSTITUTO SALVADOREÑO DEL SEGURO SOCIAL                                                             
JAASIEL SAS                                                                                         
FUNDACION OPERACION SONRISA COLOMBIA                                                                
FIDEICOMISO FONDO NACIONAL DE SALUD                                                                 
C.I. LA SAMARIA S.A.S.                                                                              
INDUSTRIA METALICA COLOMBIANA SAS                                                                   
ESM BATALLÓN DE ASPC NO 2 "CACIQUE ALFONSO XEQUE" (NIVEL I)                                         
PRODUCTOS ROCHE S.A.                                                                                
DISPENSARIO MEDICO NIVEL II BARRANQUILLA                                                            
BIOTECH HEALTHCARE HOLDING GMBH                                                                     
SANAMED MEDICINA ESPECIALIZADA S.A.S.                                                               
GALEANO BECERRA ANA OLIVA                                                                           
EPS FAMILIAR DE COLOMBIA S.A.S.                                                                     
DROGUERIA AMERICANA S.A DE CV                                                                       
JOHNSON  JOHNSON VISION                                                                             
REGIONAL DE ASEGURAMIENTO EN SALUD N°8                                                              
ALMACEN Y TALLER TORNIACCESORIOS                                                                    
PRUEBA CLINICA OFTAL DE CALI                                                                        
IQVIA RDS INC                                                                                       
CAJACOPI EPS S.A.S                                                                                  
CLINICA COLSANITAS S.A.                                                                             
UNIDAD DE SALUD DE LA UNIVERSIDAD DEL ATLANTICO                                                     
SUMIMEDICAL S.A.S                                                                                   
FORTREA INC.                                                                                        
IMH ASSETS CORP                                                                                     
UNIVERSIDAD NACIONAL DE COLOMBIA                                                                    
CLINICA SAN RAFAEL ALTA COMPLEJIDAD S.A.S.                                                          
COMPAÑIA DE SEGUROS COLSANITAS S.A.                                                                 
BIENESTAR IPS S.A.S.                                                                                
CENTRO DE ESPECIALIDADES PEDIATRICAS DEL CESAR "PAIDEIA" SAS                                        
QUIMIOSALUD S.A.S.                                                                                  
FIDEICOMISOS PATRIMONIOS AUTONOMOS FIDUCIARIA LA PREVISORA                                          
UNIVERSIDAD DEL ATLANTICO                                                                           
EYEFLOW INC                                                                                         
GLOBAL SUPPLIES SOLUTIONS S.A.S.                                                                    
SENSES CONSULTORIOS IPS S.A.S.                                                                      
UNION TEMPORAL  VIVA 1A ARMADA                                                                      
CENTRO DE INVESTIGACION MEDICO ASISTENCIAL SAS                                                      
FUNDACION GRUPO FAMILIA                                                                             
COLSALUD  S.A                                                                                       
PERFECT BODY MEDICAL CENTER LTDA                                                                    
HDI  SEGUROS COLOMBIA S.A                                                                           
CUPON VIDA S.A.S.                                                                                   
UNION TEMPORAL NORSALUD PPL                                                                         
TFS Trial Form Support, International                                                               
CLINICA JALLER S.A.S.                                                                               
EMPRESA MULTIACTIVA DE SALUD SERMULTISALUD S.A.S.                                                   
FUNDACION MARIA ELENA RESTREPO - FUNDAVÉ                                                            
CLINICA LA MERCED I.P.S                                                                             
MUNICIPIO DE SABANALARGA ATLANTICO                                                                  
OPERACIONES GENERALES SURAMERICANA S.A.S.                                                           
PREVENIR 1-A S.A.                                                                                   
UNION TEMPORAL SALUD INTEGRAL MAISFEN                                                               
FUNDACION RENACER                                                                                   
CLINICA REINA CATALINA SAS"""

import urllib.request
import re

# Unique, stripped entries
unique_eps = sorted(list(set(filter(None, [line.strip().replace('"', '&quot;') for line in eps_list.split('\n')]))))

html = '                                    <datalist id="epsList">\n'
for eps in unique_eps:
    html += f'                                        <option value="{eps}"></option>\n'
html += '                                    </datalist>'

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the existing datalist block
new_content = re.sub(
    r'<datalist id="epsList">.*?</datalist>', 
    html, 
    content, 
    flags=re.DOTALL
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Done! Inserted", len(unique_eps), "EPS into index.html")
