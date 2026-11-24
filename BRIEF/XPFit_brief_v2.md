# XPFit · Brief v2

**Convierte tus entrenos en un videojuego.**

## Qué hacemos
XPFit transforma entrenos, partidos y viajes en una partida: ganas experiencia, subes de nivel y compites en clanes con tus amigos. Atacamos el abandono del deporte por aburrimiento y falta de constancia, usando la presión social positiva de jugar en equipo.

## Para quién
Jóvenes de **18 a 30 años**, criados entre videojuegos, que van al gym o practican fútbol, pádel o running, pero sin constancia. **Cuña de entrada:** grupos de amigos que ya entrenan juntos. También, quien quiere empezar y no sabe por dónde.
**Lo que les frustra hoy:** apps frías (hojas de registro), sin motivo para volver, sin competición divertida y con rutinas genéricas.

## Servicios
**Fase 1 (producto mínimo)**
1. **Personaje y progresión:** avatar, XP, niveles, estadísticas, rachas, logros y jefes finales. Incluye **temporadas de 4-6 semanas** con retos nuevos.
2. **Clanes y retos entre amigos:** ranking del grupo, misiones cooperativas, ligas y piques 1 contra 1. Con **modo solitario** (compites contra tu yo del mes pasado) para que la app valga con un solo usuario.

**Fase 2 (visión)**
3. **Entrenador de IA con misiones personalizadas** y **Modo Viaje**: retos locales cuando estás en otra ciudad.

## Diferenciación
Comunidad en torno a grupos reales, temporadas de contenido y datos propios de entreno que alimentan la IA. *(Por validar: es lo que nos haría difíciles de copiar.)*

## Hoja de ruta y éxito
| Paso | Qué | Tecnología |
|---|---|---|
| 1 | Entrevistas con 10 usuarios objetivo | — |
| 2 | **XPFit Bot** (MVP): registro, XP, ranking y día de descanso | Python, python-telegram-bot, SQLite |
| 3 | **Piloto** con 5-10 grupos durante 4 semanas | — |
| 4 | **App Alpha**: personaje, niveles, clanes | Kotlin + Jetpack Compose, Firebase (o Flutter); diseño en Figma |
| 5 | **Coach IA + Modo Viaje** (demo) | FastAPI, API de IA, Google Maps |

**Éxito del piloto (umbral propuesto, a confirmar):** al menos la mitad de los grupos activos en la semana 4 y al menos un grupo nuevo traído por cada dos grupos.

## Principios de diseño
- **Cero culpa:** una racha rota nunca se castiga; hay "congelar racha" una vez al mes.
- **El descanso también puntúa:** misiones de recuperación y límite de XP diaria.
- **Progreso real sobre cantidad:** premiamos constancia, no volumen.
- **Datos mínimos:** solo lo necesario, con política de privacidad clara (RGPD).

## Riesgos y respuestas
| Riesgo | Respuesta |
|---|---|
| Efecto novedad | Temporadas y recompensas cíclicas |
| Efecto red (clanes vacíos) | Modo solitario + recompensa por invitar |
| Entrenos falsos | Importar datos de relojes/Health Connect y validación entre amigos |
| Coste de la IA | Misiones por plantillas; IA completa solo en premium |

## Modelo de negocio (hipótesis a probar en el piloto)
Gratis con progresión y clanes; **premium** con coach IA completo, Modo Viaje y personalización de avatar. En el piloto preguntaremos: *"¿pagarías X al mes por esto?"*

## Tono
Un colega gamer que te pica para que entrenes. **Ni sargento de gimnasio ni coach de frases de taza.** **Épico · Cercano · Motivador**

> *"¡LEVEL UP! 🎉 Ya eres nivel 12. Tus piernas han desbloqueado una nueva habilidad: subir escaleras sin sufrir."*
> *"Racha rota, pero los héroes también reaparecen. Hoy tienes misión de vuelta: 20 minutos y estás dentro."*

## Colores
Estética oscura de videojuego.

| Rol | Hex | Uso |
|---|---|---|
| Principal (morado eléctrico) | `#7C3AED` | Logo, botones (no para texto pequeño: bajo contraste) |
| Acento 1 (verde neón) | `#39FF88` | XP, progreso, misión completada |
| Acento 2 (ámbar dorado) | `#FFB020` | Logros y recompensas |
| Fondo (negro azulado) | `#0F0F1A` | Fondo de app y web |
| Texto (blanco roto) | `#F5F5FA` | Textos principales |

## Equipo
Tres recién titulados en **DAM**: **David Guillera, Paúl Cebrián y Mario Cano**. Los tres cumplen el mismo rol y lo alternan. *(Pendiente: fortalezas y responsable principal por área.)*
