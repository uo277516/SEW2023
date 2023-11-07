import xml.etree.ElementTree as ET

def verXPath(archivoXML):
    # Cargar el archivo XML
    arbol = ET.parse(archivoXML)
    raiz = arbol.getroot()
    i = 0
    factor_escala_altitud=4
    factor_escala_distancia=2
    base_altitud=180
    margen=10

    # Espacio de nombres
    ns = {'ns': 'https://www.uniovi.es'}
    
    # Rutas del archivo
    for ruta in raiz.findall('.//ns:ruta', namespaces=ns):
        i += 1
        # Nombre del archivo
        nombre_archivo_kml = 'perfil' + str(i) + '.svg'

        nombre_ruta = ruta.find('ns:nombre', namespaces=ns).text
        with open(nombre_archivo_kml, 'w', encoding='utf-8') as kml_file:
            kml_file.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            kml_file.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0" height="1700" width="1500">\n')
            kml_file.write('<polyline points="\n')
            
            distacia_acumulada=10 #para empezar en el punto 10
            inicio = ruta.find('.//ns:inicio', namespaces=ns)
            coordenadas_inicio = inicio.find('.//ns:coordenadas', namespaces=ns)
            altitud_inicio = coordenadas_inicio.find('.//ns:altitud', namespaces=ns).text
            print(altitud_inicio)

            #Linea vertical inicial
            kml_file.write(f'{distacia_acumulada},{base_altitud}\n') #para el inicio
            kml_file.write(f'{distacia_acumulada},{base_altitud-float(altitud_inicio)}\n') #para el inicio
            
            
            # Para el grafico de cada hito
            for hito in ruta.findall('.//ns:hito', namespaces=ns):
                distancia = hito.find('.//ns:distancia', namespaces=ns).text
                distacia_acumulada=(float(distancia)+distacia_acumulada)*factor_escala_distancia
                coordenadas = hito.find('.//ns:coordenadas', namespaces=ns)
                altitud = coordenadas.find('ns:altitud', namespaces=ns).text
                altitud_escala = (base_altitud-float(altitud)*factor_escala_altitud)
                kml_file.write(f'{distacia_acumulada},{altitud_escala}\n')
           
            #Linea vertical inicial
            kml_file.write(f'{distacia_acumulada},{base_altitud}\n') 

            #Para unir
            kml_file.write(f'{margen},{base_altitud}\n') 
            kml_file.write('"\nstyle="fill:white;stroke:red;stroke-width:4" />\n')
           
            distacia_acumulada=10

            kml_file.write(f'<text x="{distacia_acumulada}" y="{base_altitud+margen}" style="writing-mode: tb; glyph-orientation-vertical: 0;">\nInicio\n</text>\n')


            # Para el texto de debajo de cada hito
            for hito in ruta.findall('.//ns:hito', namespaces=ns):
                nombre_hito = hito.find('.//ns:nombre', namespaces=ns).text
                distancia = hito.find('.//ns:distancia', namespaces=ns).text
                distacia_acumulada=(float(distancia)+distacia_acumulada)*factor_escala_distancia
                kml_file.write(f'<text x="{distacia_acumulada}" y="{base_altitud+margen}" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n{nombre_hito}\n</text>\n')
        

            # Epílogo del archivo KML
            kml_file.write('</svg>')

    print('Archivos SVG creados con éxito.')

def main():
    #miArchivoXML = input('Introduzca un archivo XML = ')
    verXPath('rutasEsquema.xml')
    #verXPath(miArchivoXML)

if __name__ == "__main__":
    main()
