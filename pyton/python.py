import pandas as pd
import json
import glob

# 1. Leer todos los archivos que empiezan con "spotify" y terminan en .json
files = glob.glob("spotify*.json")

# 2. Unir todos los datos
all_data = []
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        all_data.extend(data)

# 3. Crear DataFrame
df = pd.DataFrame(all_data)

# 4. Mostrar columnas para asegurarnos que hay datos
if df.empty:
    print("❌ No se encontraron datos. Verificá que los archivos no estén vacíos.")
    exit()

# 5. Filtrar solo filas con álbum y artista (evita podcasts vacíos)
df = df[
    (df.get('master_metadata_album_album_name').notna()) &
    (df.get('master_metadata_album_artist_name').notna())
][['master_metadata_album_album_name', 'master_metadata_album_artist_name', 'ms_played']]

# 6. Agrupar por álbum y artista
agrupado = df.groupby(
    ['master_metadata_album_album_name', 'master_metadata_album_artist_name']
).agg(
    Reproducciones=('ms_played', 'count'),
    Milisegundos_reproducidos=('ms_played', 'sum')
).reset_index()

# 7. Calcular horas reproducidas
agrupado['Horas'] = (agrupado['Milisegundos_reproducidos'] / (1000 * 60 * 60)).round(2)

# 8. Renombrar columnas
agrupado.columns = ['Álbum', 'Artista', 'Reproducciones', 'Milisegundos', 'Horas']

# 9. Ordenar por más escuchado
agrupado = agrupado.sort_values(by='Horas', ascending=False)

# 10. Exportar a Excel
agrupado.to_excel("mis_albumes_escuchados.xlsx", index=False)
print("✅ ¡Archivo 'mis_albumes_escuchados.xlsx' creado con éxito!")
