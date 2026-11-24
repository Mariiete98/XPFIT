# Plan: estructura web de XPFit

## Context
XPFit no tiene aún web. Necesitamos una landing de una sola página (HTML + CSS puro, sin build ni framework, coherente con que el equipo es DAM y el repo no tiene tooling) que presente la startup según [BRIEF/XPFit_brief_v2.md](../BRIEF/XPFit_brief_v2.md). Todo el texto sigue la skill [SKILLS/VOZ-XPFIT/SKILL.md](../SKILLS/VOZ-XPFIT/SKILL.md) y la paleta del brief. Solo plan: no se escribe código en esta fase.

## Archivos
```
XPFIT/
├── index.html          # página única con 5 secciones (anclas)
├── css/estilos.css     # todo el estilo
└── equipo/
    ├── david-guillera.html
    ├── paul-cebrian.html
    └── mario-cano.html
```
(Sin carpeta de imágenes ni JS por ahora; se añaden si hacen falta. Rutas relativas, para abrir con doble clic.)

## index.html — secciones
Cabecera fija con navegación por anclas: Inicio · Servicios · Proyectos · Equipo · Contacto.

1. **#inicio (hero):** titular "Convierte tus entrenos en un videojuego." + subtítulo (entrenos, partidos y viajes → XP, niveles, clanes) + CTA a #contacto. Una línea sobre el público (18-30, grupos de amigos). Cita "LEVEL UP" como detalle.
2. **#servicios:** tarjetas.
   - Fase 1: Personaje y progresión (avatar, XP, niveles, rachas, logros, jefes finales, temporadas 4-6 semanas); Clanes y retos entre amigos (ranking, misiones cooperativas, ligas, 1 vs 1, modo solitario).
   - Fase 2 marcada "próximamente": Entrenador IA con misiones personalizadas y Modo Viaje.
   - Mini-bloque de principios: cero culpa, descanso puntúa, constancia sobre volumen.
3. **#proyectos:** hoja de ruta como línea de misiones: XPFit Bot (MVP, Telegram), Piloto 5-10 grupos/4 semanas, App Alpha, Coach IA + Modo Viaje (demo). Estado honesto: ninguno publicado aún; indicar "en curso/próximo".
4. **#equipo:** tres tarjetas (nombre, "DAM", enlace a su ficha). Texto común: mismo rol, lo alternan.
5. **#contacto:** invitación a unirse al piloto con tu grupo de amigos. Opción A (sin backend): enlace `mailto:` / enlace a Telegram. Pie con nota de privacidad (RGPD, datos mínimos).

## equipo/*.html — ficha por persona
Misma plantilla en las tres, enlazando `../css/estilos.css` y con enlace de vuelta a `../index.html#equipo`. Contenido: nombre, "recién titulado en DAM", rol alternado, bloque "Fortalezas" y "Responsable de" marcados como pendientes (el brief no los define; no inventar), enlaces de contacto vacíos/por rellenar. Estilo tipo "ficha de personaje" (clase, nivel, stats) con humor, sin datos inventados.

## css/estilos.css
- Variables `:root` con la paleta: `--morado #7C3AED` (botones/logo; no texto pequeño), `--verde #39FF88` (XP, progreso), `--ambar #FFB020` (logros), `--fondo #0F0F1A`, `--texto #F5F5FA`.
- Secciones: reset y tipografía, cabecera/nav, hero, rejilla de tarjetas (servicios, equipo), línea de hoja de ruta, formulario/CTA, pie, página de ficha.
- Responsive móvil primero (rejilla con `auto-fit`), foco visible y contraste AA.

## Decisiones abiertas (confirmar al implementar)
- ¿Contacto por `mailto:`/Telegram (recomendado, sin backend) o formulario real?
- ¿Datos de contacto y fotos del equipo? Pendientes de que los den.

## Verificación
Abrir `index.html` en el navegador; probar anclas y enlaces a las 3 fichas y vuelta; comprobar en ancho móvil (~375px) y escritorio; revisar contraste de texto sobre fondo y que los textos pasen la lista "Antes de entregar" de la skill voz-xpfit.
