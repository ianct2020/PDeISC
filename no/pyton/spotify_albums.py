import os
import json
import pandas as pd
from collections import defaultdict
from datetime import datetime

def cargar_datos_desde_json():
    datos = []
    for archivo in os.listdir():
        if archivo.startswith("spotify") and archivo.endswith(".json"):
            with open(archivo, "r", encoding="utf-8") as f:
                datos.extend(json.load(f))
    return datos

def agrupar_por_album(datos):
    albums = defaultdict(list)
    for entry in datos:
        if "master_metadata_album_name" in entry:
            album = entry["master_metadata_album_name"]
            albums[album].append(entry)
    return albums

def agrupar_por_artista(datos):
    artistas = defaultdict(list)
    for entry in datos:
        if "master_metadata_album_artist_name" in entry:
            artista = entry["master_metadata_album_artist_name"]
            artistas[artista].append(entry)
    return artistas

def convertir_duracion(ms):
    minutos = ms / 60000
    horas = minutos / 60
    return round(minutos, 2), round(horas, 2)

def top_canciones_por_album(album_tracks):
    cuenta = defaultdict(int)
    for track in album_tracks:
        cuenta[track["master_metadata_track_name"]] += 1
    top3 = sorted(cuenta.items(), key=lambda x: x[1], reverse=True)[:3]
    return [f"{nombre} ({veces}x)" for nombre, veces in top3]

def top_canciones_por_artista(artista_tracks):
    cuenta = defaultdict(int)
    for track in artista_tracks:
        cuenta[track["master_metadata_track_name"]] += 1
    top10 = sorted(cuenta.items(), key=lambda x: x[1], reverse=True)[:10]
    return [f"{nombre} ({veces}x)" for nombre, veces in top10]

def procesar_datos():
    datos = cargar_datos_desde_json()
    albumes = agrupar_por_album(datos)
    artistas = agrupar_por_artista(datos)

    filas = []
    for album, canciones in albumes.items():
        artista = canciones[0].get("master_metadata_album_artist_name", "Desconocido")
        minutos_totales = sum(track["ms_played"] for track in canciones) / 60000
        horas_totales = minutos_totales / 60
        top3 = top_canciones_por_album(canciones)
        top10_artista = top_canciones_por_artista(artistas[artista])

        filas.append({
            "Álbum": album,
            "Álbum (extra)": album,
            "Artista": artista,
            "Minutos escuchados": round(minutos_totales, 2),
            "Horas escuchadas": round(horas_totales, 2),
            "Top 3 canciones del álbum": "\n".join(top3),
            "Top 10 canciones del artista": "\n".join(top10_artista)
        })

    df = pd.DataFrame(filas)
    return df

def exportar_a_excel(df, nombre_archivo="mis_albumes_escuchados1.xlsx"):
    df.to_excel(nombre_archivo, index=False)

df = procesar_datos()
exportar_a_excel(df)
