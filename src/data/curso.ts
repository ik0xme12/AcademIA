export interface Leccion {
  id: string;
  titulo: string;
  duracion: string;
  tipo: 'lectura' | 'quiz' | 'practica';
  contenido: string;
  videoUrl?: string; // URL de YouTube o HeyGen embed
  quiz?: {
    pregunta: string;
    opciones: string[];
    correcta: number;
    explicacion: string;
  }[];
}

export interface Modulo {
  id: string;
  numero: number;
  titulo: string;
  descripcion: string;
  icono: string;
  lecciones: Leccion[];
}

export const modulos: Modulo[] = [
  {
    id: 'mod-1',
    numero: 1,
    titulo: '¿Qué es Claude?',
    descripcion: 'Descubre qué es la inteligencia artificial y cómo Claude puede ayudarte en tu vida diaria.',
    icono: '🤖',
    lecciones: [
      {
        id: 'l1-1',
        titulo: '¿Qué es la Inteligencia Artificial?',
        duracion: '5 min',
        tipo: 'lectura',
        videoUrl: 'https://www.youtube.com/embed/dGvvuXfmU7k',
        contenido: `## ¿Qué es la Inteligencia Artificial?

La **Inteligencia Artificial (IA)** es tecnología que permite a las computadoras realizar tareas que normalmente requieren inteligencia humana, como entender texto, responder preguntas o generar ideas.

### Imagínalo así:
Piensa en la IA como un asistente muy inteligente que ha leído millones de libros, artículos y conversaciones. Gracias a eso, puede ayudarte con casi cualquier tema.

### ¿Para qué sirve?
- ✍️ Escribir textos y correos
- 💡 Generar ideas y soluciones
- 📚 Explicar conceptos complejos de forma sencilla
- 🔍 Buscar y analizar información
- 🌐 Traducir idiomas

### Lo que NO es la IA:
La IA no es mágica ni perfecta. Es una herramienta muy poderosa, pero necesita que tú la guíes correctamente para obtener buenos resultados.`,
      },
      {
        id: 'l1-2',
        titulo: '¿Quién es Claude?',
        duracion: '4 min',
        tipo: 'lectura',
        contenido: `## ¿Quién es Claude?

**Claude** es un asistente de inteligencia artificial creado por **Anthropic**, una empresa especializada en IA segura y confiable.

### ¿Qué hace especial a Claude?
- 🛡️ **Seguro y honesto**: Está diseñado para ser transparente y no engañar
- 💬 **Conversacional**: Puedes hablar con él de forma natural, como con una persona
- 🧠 **Muy capaz**: Entiende contexto, matices y puede ayudarte con tareas complejas
- 🌍 **Multilingüe**: Habla perfectamente en español

### ¿Dónde puedo usar Claude?
Puedes acceder a Claude en **claude.ai** desde tu computadora o celular. Solo necesitas crear una cuenta gratuita.

### ¿Es de pago?
Claude tiene una versión **gratuita** con acceso básico y versiones de pago con más funcionalidades. Para la mayoría de las tareas del día a día, la versión gratuita es más que suficiente.`,
      },
      {
        id: 'l1-3',
        titulo: 'Quiz: ¿Qué aprendiste?',
        duracion: '3 min',
        tipo: 'quiz',
        contenido: 'Pon a prueba lo que aprendiste sobre Claude y la Inteligencia Artificial.',
        quiz: [
          {
            pregunta: '¿Quién creó a Claude?',
            opciones: ['Google', 'Anthropic', 'OpenAI', 'Meta'],
            correcta: 1,
            explicacion: 'Claude fue creado por Anthropic, una empresa especializada en inteligencia artificial segura.',
          },
          {
            pregunta: '¿Para qué sirve la Inteligencia Artificial?',
            opciones: [
              'Solo para juegos de video',
              'Para reemplazar completamente a los humanos',
              'Para ayudar a realizar tareas como escribir, analizar y generar ideas',
              'Solo para empresas grandes',
            ],
            correcta: 2,
            explicacion: 'La IA es una herramienta que ayuda con muchas tareas como escribir, analizar información y generar ideas.',
          },
          {
            pregunta: '¿Cómo puedes acceder a Claude?',
            opciones: ['Solo en computadoras', 'En claude.ai desde cualquier dispositivo', 'Necesitas descargar un programa especial', 'Solo en México'],
            correcta: 1,
            explicacion: 'Puedes usar Claude en claude.ai desde cualquier dispositivo con internet.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-2',
    numero: 2,
    titulo: 'Tu primera conversación',
    descripcion: 'Aprende a iniciar y mantener conversaciones efectivas con Claude.',
    icono: '💬',
    lecciones: [
      {
        id: 'l2-1',
        titulo: 'Cómo empezar a usar Claude',
        duracion: '5 min',
        tipo: 'lectura',
        contenido: `## Cómo empezar a usar Claude

### Paso 1: Crear tu cuenta
1. Ve a **claude.ai** en tu navegador
2. Haz clic en **"Sign up"** o **"Crear cuenta"**
3. Ingresa tu correo electrónico
4. Crea una contraseña
5. ¡Listo! Ya tienes acceso

### Paso 2: Tu primera conversación
Cuando abres Claude, verás una caja de texto en la parte inferior. Ahí es donde escribes tus mensajes.

### ¿Qué puedo decirle?
Literalmente cualquier cosa. Algunos ejemplos para empezar:

- *"Hola Claude, ¿puedes presentarte?"*
- *"¿Puedes ayudarme a escribir un correo formal?"*
- *"Explícame qué es la inflación de forma sencilla"*

### Consejo importante:
Claude recuerda todo lo que dices **dentro de la misma conversación**. Si empiezas una conversación nueva, tendrás que volver a dar el contexto.`,
      },
      {
        id: 'l2-2',
        titulo: '¿Qué son los prompts?',
        duracion: '6 min',
        tipo: 'lectura',
        contenido: `## ¿Qué son los prompts?

Un **prompt** es simplemente el mensaje o instrucción que le das a Claude. Es la forma en que le dices qué quieres que haga.

### La analogía perfecta:
Imagina que Claude es un chef extraordinario. Tú eres el cliente. Si le dices:

❌ *"Quiero comida"* → Te dará algo genérico

✅ *"Quiero una pasta italiana con salsa de tomate, sin picante, para 2 personas"* → Te dará exactamente lo que necesitas

### Los 3 elementos de un buen prompt:

**1. Contexto** — ¿Quién eres y cuál es la situación?
> *"Soy dueño de una pequeña tienda de ropa..."*

**2. Tarea** — ¿Qué quieres que haga?
> *"...necesito un mensaje para publicar en Instagram..."*

**3. Detalles** — ¿Cómo lo quieres?
> *"...que sea divertido, corto y promocione mi venta de fin de año."*

### Resultado completo:
*"Soy dueño de una pequeña tienda de ropa. Necesito un mensaje para publicar en Instagram que sea divertido, corto y promocione mi venta de fin de año."*

¡Así obtienes resultados increíbles!`,
      },
      {
        id: 'l2-3',
        titulo: 'Quiz: Prompts básicos',
        duracion: '3 min',
        tipo: 'quiz',
        contenido: 'Pon a prueba tu conocimiento sobre cómo comunicarte con Claude.',
        quiz: [
          {
            pregunta: '¿Qué es un prompt?',
            opciones: [
              'Un tipo de computadora',
              'El mensaje o instrucción que le das a Claude',
              'Una aplicación de pago',
              'El nombre del creador de Claude',
            ],
            correcta: 1,
            explicacion: 'Un prompt es simplemente el mensaje o instrucción que escribes para decirle a Claude qué quieres.',
          },
          {
            pregunta: '¿Cuál es un prompt más efectivo?',
            opciones: [
              '"Escríbeme algo"',
              '"Ayuda"',
              '"Escribe un correo formal para pedir vacaciones a mi jefe, de 3 párrafos, tono profesional"',
              '"Correo vacaciones"',
            ],
            correcta: 2,
            explicacion: 'Un prompt efectivo incluye contexto, tarea clara y detalles sobre el resultado esperado.',
          },
          {
            pregunta: '¿Claude recuerda conversaciones anteriores?',
            opciones: [
              'Sí, recuerda todo para siempre',
              'No recuerda nada',
              'Solo recuerda dentro de la misma conversación',
              'Solo si pagas la versión premium',
            ],
            correcta: 2,
            explicacion: 'Claude recuerda el contexto dentro de una misma conversación, pero no entre conversaciones distintas.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-3',
    numero: 3,
    titulo: 'Claude en tu vida diaria',
    descripcion: 'Casos prácticos para usar Claude en situaciones cotidianas.',
    icono: '🌟',
    lecciones: [
      {
        id: 'l3-1',
        titulo: 'Correos y mensajes',
        duracion: '7 min',
        tipo: 'lectura',
        contenido: `## Claude para correos y mensajes

Una de las tareas más útiles de Claude es ayudarte a escribir mejor. Ya sea un correo de trabajo, un mensaje a un amigo o una queja formal.

### Ejemplos prácticos:

#### Correo formal al jefe:
*"Necesito pedirle vacaciones a mi jefe del 15 al 22 de enero. Escríbeme un correo formal, respetuoso y profesional."*

#### Respuesta a un cliente molesto:
*"Tengo una tienda online. Un cliente está enojado porque su pedido llegó tarde. Escríbeme una respuesta empática que ofrezca disculpas y solución."*

#### Mensaje difícil a un amigo:
*"Necesito decirle a un amigo que no puedo ir a su boda porque estoy fuera del país. Ayúdame a escribir un mensaje cálido y honesto."*

### Tip: Pide variaciones
Si no te gusta el primer resultado, dile:
- *"Hazlo más corto"*
- *"Usa un tono más amigable"*
- *"Dame 3 versiones diferentes"*

Claude puede reescribir el mismo mensaje tantas veces como necesites.`,
      },
      {
        id: 'l3-2',
        titulo: 'Aprender y entender temas',
        duracion: '6 min',
        tipo: 'lectura',
        contenido: `## Usar Claude para aprender

Claude es como tener un maestro personal disponible las 24 horas. Puedes preguntarle sobre cualquier tema y él lo explicará a tu nivel.

### Cómo pedir explicaciones:

**Para principiantes:**
*"Explícame qué es la bolsa de valores como si tuviera 10 años"*

**Para profundizar:**
*"Entiendo lo básico de la bolsa de valores. Ahora explícame qué son las acciones y cómo funcionan los dividendos"*

**Con ejemplos:**
*"Explícame qué es el interés compuesto y dame un ejemplo con números reales"*

### Casos de uso:
- 📰 Entender noticias complicadas
- 🏥 Comprender diagnósticos médicos (siempre consulta tu doctor)
- ⚖️ Entender contratos o documentos legales
- 🔧 Aprender a usar tecnología o programas

### Importante:
Claude puede cometer errores, especialmente en temas muy específicos o actuales. Siempre verifica información importante con fuentes oficiales.`,
      },
      {
        id: 'l3-3',
        titulo: 'Quiz: Usos cotidianos',
        duracion: '3 min',
        tipo: 'quiz',
        contenido: 'Evalúa lo que aprendiste sobre los usos de Claude en tu vida diaria.',
        quiz: [
          {
            pregunta: '¿Qué pasa si no te gusta la respuesta de Claude?',
            opciones: [
              'No puedes hacer nada',
              'Debes pagar más para obtener mejores respuestas',
              'Puedes pedirle que lo reescriba con ajustes específicos',
              'Tienes que empezar desde cero',
            ],
            correcta: 2,
            explicacion: 'Puedes pedirle a Claude que modifique su respuesta: "hazlo más corto", "cambia el tono", "dame otras opciones".',
          },
          {
            pregunta: '¿Claude puede explicarte temas complicados?',
            opciones: [
              'Solo temas de tecnología',
              'Sí, puede explicar casi cualquier tema a tu nivel',
              'No, solo responde preguntas simples',
              'Solo en inglés',
            ],
            correcta: 1,
            explicacion: 'Claude puede explicar temas complejos de medicina, finanzas, ciencia y más, adaptándose a tu nivel de conocimiento.',
          },
          {
            pregunta: '¿Debes verificar información importante que te da Claude?',
            opciones: [
              'No, Claude siempre tiene razón',
              'Solo si es sobre tecnología',
              'Sí, siempre es bueno verificar con fuentes oficiales',
              'Solo si usas la versión gratuita',
            ],
            correcta: 2,
            explicacion: 'Claude puede cometer errores. Para decisiones importantes (médicas, legales, financieras), siempre verifica con expertos.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-4',
    numero: 4,
    titulo: 'Claude en el trabajo',
    descripcion: 'Potencia tu productividad laboral con Claude como asistente.',
    icono: '💼',
    lecciones: [
      {
        id: 'l4-1',
        titulo: 'Productividad y organización',
        duracion: '7 min',
        tipo: 'lectura',
        contenido: `## Claude para ser más productivo

Claude puede convertirse en tu mejor aliado en el trabajo, ayudándote a hacer más en menos tiempo.

### Ideas y lluvia de propuestas:
*"Tengo una reunión mañana para presentar ideas de marketing para una cafetería. Dame 10 ideas creativas y económicas"*

### Resúmenes ejecutivos:
*"Te voy a pegar un artículo largo. Necesito un resumen de 5 puntos clave en español"*

### Preparar presentaciones:
*"Necesito una presentación de 10 diapositivas sobre los beneficios del trabajo remoto. Dame el título y contenido de cada diapositiva"*

### Analizar opciones:
*"Estoy decidiendo entre dos proveedores para mi empresa. Proveedor A: [detalles]. Proveedor B: [detalles]. ¿Cuál me conviene más y por qué?"*

### Redactar documentos:
- Propuestas comerciales
- Políticas internas
- Descripciones de puestos
- Reportes mensuales`,
      },
      {
        id: 'l4-2',
        titulo: 'Quiz final del módulo',
        duracion: '4 min',
        tipo: 'quiz',
        contenido: 'Demuestra que dominas el uso de Claude para el trabajo.',
        quiz: [
          {
            pregunta: '¿Claude puede ayudarte a generar ideas para tu negocio?',
            opciones: [
              'No, solo responde preguntas',
              'Sí, puede dar ideas creativas sobre cualquier tema de negocio',
              'Solo si tienes la versión de pago',
              'Solo ideas tecnológicas',
            ],
            correcta: 1,
            explicacion: 'Claude es excelente para generar ideas, estrategias y soluciones creativas para cualquier tipo de negocio.',
          },
          {
            pregunta: '¿Cómo pedirías a Claude que resuma un documento largo?',
            opciones: [
              '"Resume esto"',
              '"Necesito un resumen ejecutivo de 5 puntos clave del siguiente texto: [texto]"',
              '"Lee esto"',
              '"Hazlo más corto"',
            ],
            correcta: 1,
            explicacion: 'Un buen prompt especifica el formato (resumen ejecutivo), la cantidad (5 puntos) y proporciona el contenido a resumir.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-5',
    numero: 5,
    titulo: 'Técnicas avanzadas',
    descripcion: 'Domina las técnicas que te harán experto en usar Claude.',
    icono: '🚀',
    lecciones: [
      {
        id: 'l5-1',
        titulo: 'El arte de dar contexto',
        duracion: '8 min',
        tipo: 'lectura',
        contenido: `## Cómo dar el contexto perfecto

El contexto es la información de fondo que le das a Claude para que entienda mejor tu situación. A más contexto, mejores resultados.

### Técnica: El rol
Dile a Claude qué papel quieres que juegue:

*"Actúa como un experto en nutrición deportiva..."*
*"Eres un abogado especialista en contratos laborales en México..."*
*"Eres un profesor de primaria explicando a niños de 8 años..."*

### Técnica: El formato
Especifica cómo quieres la respuesta:

*"Responde en forma de lista"*
*"Organiza tu respuesta con títulos y subtítulos"*
*"Dame una tabla comparativa"*
*"Responde en máximo 100 palabras"*

### Técnica: El ejemplo
Muéstrale lo que quieres:

*"Quiero algo similar a esto: [ejemplo]. Pero adaptado a [tu caso]"*

### Técnica: El iterativo
Construye sobre respuestas anteriores:

1. Primera respuesta → *"Está bien, ahora hazlo más formal"*
2. Segunda respuesta → *"Perfecto, agrega un párrafo sobre los beneficios"*
3. Tercera respuesta → *"Ahora tradúcelo al inglés"*`,
      },
      {
        id: 'l5-2',
        titulo: 'Quiz final: Técnicas avanzadas',
        duracion: '4 min',
        tipo: 'quiz',
        contenido: 'Demuestra que dominas las técnicas avanzadas de Claude.',
        quiz: [
          {
            pregunta: '¿Qué es la técnica del "rol" en prompts?',
            opciones: [
              'Pedirle a Claude que juegue videojuegos',
              'Decirle a Claude qué papel o experto debe interpretar para responder mejor',
              'Una función de pago de Claude',
              'Un error de programación',
            ],
            correcta: 1,
            explicacion: 'La técnica del rol consiste en decirle a Claude que actúe como un experto específico, lo que mejora la calidad de sus respuestas.',
          },
          {
            pregunta: '¿Qué significa "iterar" con Claude?',
            opciones: [
              'Cerrar y abrir la aplicación repetidamente',
              'Pagar más dinero',
              'Construir sobre respuestas anteriores, ajustando y mejorando poco a poco',
              'Escribir en otro idioma',
            ],
            correcta: 2,
            explicacion: 'Iterar significa ir refinando las respuestas de Claude de forma progresiva, construyendo sobre cada resultado anterior.',
          },
          {
            pregunta: '¿Para qué sirve especificar el formato en un prompt?',
            opciones: [
              'Solo para hacer el texto más bonito',
              'Para controlar cómo Claude organiza y presenta su respuesta',
              'No sirve de nada, Claude siempre responde igual',
              'Solo funciona en inglés',
            ],
            correcta: 1,
            explicacion: 'Especificar el formato (lista, tabla, títulos, longitud) ayuda a que Claude entregue exactamente el tipo de respuesta que necesitas.',
          },
        ],
      },
    ],
  },
];

export const totalLecciones = modulos.reduce((acc, m) => acc + m.lecciones.length, 0);
