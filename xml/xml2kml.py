import xml.etree.ElementTree as ET

def xml_to_kml(archivoXML):
    # Cargar el archivo XML
    arbol = ET.parse(archivoXML)
    raiz = arbol.getroot()
    i = 0

    # Espacio de nombres
    ns = {'ns': 'https://www.uniovi.es'}
    
    # Rutas del archivo
    for ruta in raiz.findall('.//ns:ruta', namespaces=ns):
        i += 1
        # Nombre del archivo
        nombre_archivo_kml = 'ruta' + str(i) + '.kml'

        nombre_ruta = ruta.find('ns:nombre', namespaces=ns).text
        with open(nombre_archivo_kml, 'w', encoding='utf-8') as kml_file:
            # Prólogo del archivo KML
            kml_file.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            kml_file.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
            kml_file.write('<Document>\n')

            kml_file.write('<Placemark>\n')
            kml_file.write(f'<name>{nombre_ruta}</name>\n')
            kml_file.write('<LineString>\n')
            kml_file.write('<extrude>1</extrude>\n<tessellate>1</tessellate>')
            kml_file.write(f'<coordinates>\n')
            
            # Coordenadas de cada hito
            for hito in ruta.findall('.//ns:hito', namespaces=ns):
                coordenadas = hito.find('.//ns:coordenadas', namespaces=ns)
                latitud = coordenadas.find('ns:latitud', namespaces=ns).text
                longitud = coordenadas.find('ns:longitud', namespaces=ns).text
                altitud = coordenadas.find('ns:altitud', namespaces=ns).text
                kml_file.write(f'{latitud},{longitud},{altitud}\n')
            
            # Epílogo del archivo KML
            kml_file.write('</coordinates>\n')
            kml_file.write('<altitudeMode>relativeToGround</altitudeMode>\n')
            kml_file.write('</LineString><Style> id=\'lineaRoja\'>\n<LineStyle>\n<color>#ff0000ff\n</color>\n<width>5</width>\n</LineStyle>\n</Style>\n')
            kml_file.write('</Placemark>\n')
            kml_file.write('</Document>\n')
            kml_file.write('</kml>\n')

    print('Archivos KML creados con éxito.')

def main():
    #miArchivoXML = input('Introduzca un archivo XML = ')
    xml_to_kml('rutasEsquema.xml')
    #verXPath(miArchivoXML)

if __name__ == "__main__":
    main()
