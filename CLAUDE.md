# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Estado del repositorio

Todavía **no hay código**: solo el brief del producto en [BRIEF/XPFit_brief_v2.md](BRIEF/XPFit_brief_v2.md) (en español). No existen sistema de build, linter ni tests, y no es un repositorio git. Cuando se añada código, actualiza este archivo con los comandos reales.

El brief es la fuente de verdad: léelo antes de diseñar o implementar nada. Idioma del producto y de la documentación: **español**.

## Qué es XPFit

App/bot que gamifica entrenos (gym, fútbol, pádel, running): XP, niveles, rachas, logros, temporadas de 4-6 semanas y clanes de amigos. Público: 18-30 años; cuña de entrada: grupos de amigos que ya entrenan juntos. Equipo: tres titulados DAM (David Guillera, Paúl Cebrián, Mario Cano), roles intercambiables.

## Hoja de ruta y stack previsto (orden importa)

1. Entrevistas con 10 usuarios (sin código).
2. **XPFit Bot (MVP):** Python + python-telegram-bot + SQLite. Registro de entrenos, XP, ranking, día de descanso.
3. Piloto con 5-10 grupos durante 4 semanas.
4. **App Alpha:** Kotlin + Jetpack Compose + Firebase (o Flutter); diseño en Figma.
5. **Coach IA + Modo Viaje:** FastAPI, API de IA, Google Maps.

En el brief, Fase 1 = personaje/progresión + clanes/retos (con **modo solitario**: competir contra tu yo del mes pasado) y Fase 2 = Coach IA y Modo Viaje. **La web usa tres fases** por decisión del equipo: Fase 1 personaje y progresión, Fase 2 clanes y retos, Fase 3 coach IA y Modo Viaje. No implementes la Fase 3 antes.

## Reglas de diseño que afectan a la lógica

- **Sin presiones** (en el brief: "cero culpa"; en la web se dice "sin presiones"): una racha rota nunca se castiga; "congelar racha" una vez al mes.
- **El descanso puntúa:** misiones de recuperación y **límite de XP diaria**.
- **Constancia sobre volumen:** el sistema de XP debe premiar regularidad, no cantidad.
- **Datos mínimos** y cumplimiento RGPD.
- Anti-trampas previsto: importar de relojes/Health Connect y validación entre amigos.
- Costes de IA: misiones por plantillas; IA completa solo en premium.

## Tono y marca

Tono: colega gamer, épico/cercano/motivador; ni sargento ni frases de taza. Paleta oscura. En el brief: principal `#7C3AED`, XP `#39FF88`, logros `#FFB020`, fondo `#0F0F1A`, texto `#F5F5FA`. **La web usa otra paleta** (decisión del equipo, ver variables en `css/estilos.css`): magenta `#E5007D` (estrella), morado `#7C3AED`, cian `#22D3EE` para XP y progreso, lila `#C4B5FD`, fondo `#0F0F1A`, texto `#F5F5FA`. Sin verde ni naranja. No dejes notas internas ("pendiente", "por definir") visibles en la web.
