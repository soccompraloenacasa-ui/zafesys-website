/**
 * ZAFESYS Chatbot - Ana, Asesora de Ventas
 * Agente conversacional para recomendación de cerraduras inteligentes
 */

(function() {
    'use strict';

    // ===========================================
    // BASE DE CONOCIMIENTO DE PRODUCTOS
    // ===========================================
    const PRODUCTOS = {
        'OS566F': {
            sku: 'OS566F',
            nombre: 'Cerradura Digital Básica',
            precio: 345000,
            precioFormateado: '$345,000',
            categoria: 'Básica',
            wifi: false,
            app: false,
            faceId: false,
            videoLlamada: false,
            desbloqueoRemoto: false,
            alarma: false,
            bateria: '4 pilas AA',
            capacidad: 145,
            ideal: ['Hogares simples', 'Oficinas pequeñas', 'Alquileres básicos'],
            ventajas: ['La más económica', '100% offline', 'Sin configuración de app', 'Instalación simple'],
            metodos: ['Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica'],
            url: '/productos/os566f.html'
        },
        'OS514F': {
            sku: 'OS514F',
            nombre: 'Cerradura con App Tuya (Bluetooth)',
            precio: 360000,
            precioFormateado: '$360,000',
            categoria: 'Smart Básica',
            wifi: false,
            app: true,
            faceId: false,
            videoLlamada: false,
            desbloqueoRemoto: false,
            alarma: false,
            bateria: '4 pilas AA',
            capacidad: 145,
            ideal: ['Hogares modernos', 'Tech enthusiasts', 'Alquileres con códigos'],
            ventajas: ['Control desde app (Bluetooth local)', 'Códigos temporales', 'Historial de accesos', 'No requiere WiFi'],
            metodos: ['Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica', 'App Bluetooth'],
            nota: 'Solo Bluetooth local, NO WiFi real',
            url: '/productos/os514f.html'
        },
        'OS809TYE': {
            sku: 'OS809TYE',
            nombre: 'Cerradura WiFi con Desbloqueo Remoto',
            precio: 370000,
            precioFormateado: '$370,000',
            categoria: 'WiFi Smart',
            wifi: true,
            app: true,
            faceId: false,
            videoLlamada: false,
            desbloqueoRemoto: true,
            alarma: false,
            bateria: '4 pilas AA',
            capacidad: 460,
            ideal: ['Trabajadores remotos', 'Oficinas', 'Airbnb', 'Familias con control remoto'],
            ventajas: ['Desbloqueo remoto real', 'Mayor capacidad (460 usuarios)', 'Códigos temporales remotos', 'Notificaciones push'],
            metodos: ['Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica', 'App remota'],
            destacado: 'Mejor para Airbnb',
            url: '/productos/os809tye.html'
        },
        'OS833TYFA': {
            sku: 'OS833TYFA',
            nombre: 'Face ID 3D con Video Llamada',
            precio: 680000,
            precioFormateado: '$680,000',
            categoria: 'Face ID',
            wifi: true,
            app: true,
            faceId: true,
            videoLlamada: true,
            desbloqueoRemoto: true,
            alarma: false,
            bateria: '3200mAh recargable',
            capacidad: 191,
            ideal: ['Familias con niños', 'Hogares smart', 'Adultos mayores'],
            ventajas: ['Entrada a Face ID', 'Solo mirar para abrir', 'Video llamada con visitantes', 'Funciona en oscuridad'],
            metodos: ['Face ID 3D', 'Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica', 'App remota'],
            destacado: 'Ideal para adultos mayores',
            url: '/productos/os833tyfa.html'
        },
        'OS784TYFA': {
            sku: 'OS784TYFA',
            nombre: 'Face ID 3D + Video + ALARMA',
            precio: 700000,
            precioFormateado: '$700,000',
            categoria: 'Face ID + Alarma',
            wifi: true,
            app: true,
            faceId: true,
            videoLlamada: true,
            desbloqueoRemoto: true,
            alarma: true,
            bateria: '3200mAh recargable',
            capacidad: 291,
            ideal: ['Máxima seguridad', 'Empresas/oficinas', 'Zonas de alto riesgo'],
            ventajas: ['Sistema ALARMA triple', 'Mayor capacidad (291 usuarios)', 'Disuasivo para intrusos', '9 administradores'],
            metodos: ['Face ID 3D', 'Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica', 'App remota'],
            alarmas: ['Antipalanca', 'Bajo voltaje', 'Intentos fallidos'],
            destacado: 'Mejor seguridad',
            url: '/productos/os784tyfa.html'
        },
        'OS709TYFA': {
            sku: 'OS709TYFA',
            nombre: 'Face ID 3D Batería Premium 4200mAh',
            precio: 790000,
            precioFormateado: '$790,000',
            categoria: 'Face ID Premium',
            wifi: true,
            app: true,
            faceId: true,
            videoLlamada: true,
            desbloqueoRemoto: true,
            alarma: false,
            bateria: '4200mAh recargable (LA MÁS GRANDE)',
            capacidad: 191,
            ideal: ['Viajeros frecuentes', 'Hogares exigentes', 'Propiedades de alquiler'],
            ventajas: ['Mayor autonomía (meses sin recargar)', 'Menos mantenimiento', 'Face ID + Video completo'],
            metodos: ['Face ID 3D', 'Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica', 'App remota'],
            destacado: 'Mejor batería',
            url: '/productos/os709tyfa.html'
        },
        'OS840TYFA': {
            sku: 'OS840TYFA',
            nombre: 'Face ID 3D Premium Máxima Capacidad',
            precio: 830000,
            precioFormateado: '$830,000',
            categoria: 'Premium',
            wifi: true,
            app: true,
            faceId: true,
            videoLlamada: true,
            desbloqueoRemoto: true,
            alarma: true,
            bateria: 'Recargable USB-C',
            capacidad: 256,
            capacidadFaceId: 100,
            ideal: ['Empresas grandes', 'Familias numerosas', 'Quien quiere lo mejor'],
            ventajas: ['Modelo más completo', 'Mayor capacidad Face ID (100 rostros)', 'Intercomunicador bidireccional', 'Premium en todo'],
            metodos: ['Face ID 3D', 'Huella', 'Código', 'Tarjeta RFID', 'Llave mecánica', 'App remota'],
            destacado: 'El más completo',
            url: '/productos/os840tyfa.html'
        }
    };

    // ===========================================
    // RESPUESTAS Y FLUJOS DE CONVERSACIÓN
    // ===========================================
    const RESPUESTAS = {
        saludo: [
            "¡Hola! Soy Ana, tu asesora de cerraduras inteligentes ZAFESYS. Me encanta ayudar a encontrar la cerradura perfecta para cada hogar. ¿Cómo te puedo ayudar hoy?",
            "¡Qué tal! Soy Ana de ZAFESYS. Estoy aquí para asesorarte con nuestras cerraduras inteligentes. ¿Buscas algo en particular?"
        ],
        preguntas_descubrimiento: {
            wifi: "Para recomendarte la mejor opción, cuéntame: ¿Necesitas poder abrir la puerta desde tu celular cuando estés lejos de casa? Por ejemplo, para dejar entrar a alguien.",
            presupuesto: "¿Tienes un presupuesto aproximado en mente? Tenemos opciones desde $345,000 hasta $830,000.",
            uso: "¿Es para casa o para oficina/negocio?",
            familia: "¿Vives solo o con familia? ¿Hay niños o adultos mayores en casa?",
            seguridad: "¿La seguridad extra es prioridad? Por ejemplo, alarmas antipalanca o notificaciones de intentos fallidos."
        },
        faq: {
            envio: "¡El envío es GRATIS a toda Colombia! Llega en 3-5 días hábiles con seguimiento.",
            cuotas: "¡Claro! Manejamos ADDI hasta 12 cuotas sin interés. La aprobación tarda solo 2 minutos desde tu celular, solo necesitas tu cédula. Sin papeleos ni fiadores.",
            instalacion: "La instalación tarda entre 30 minutos y 1 hora. No está incluida en el precio, pero puedes hacerla tú mismo con el manual o contratar un cerrajero. No daña la puerta porque funciona con batería, sin cables.",
            bateria: "¡Nunca te quedas afuera! Todas incluyen llave mecánica de emergencia y opción de USB externo para conectar un power bank. Además, te avisa cuando la batería está baja.",
            sin_internet: "Todos los métodos locales funcionan sin internet: huella, código, tarjeta y llave. Solo el desbloqueo remoto y video llamada necesitan internet.",
            garantia: "Incluye 1 año de garantía por defectos de fabricación más soporte por WhatsApp 24/7.",
            puerta: "Funcionan en puertas de madera, metal y seguridad con grosor entre 30mm y 110mm. Si tienes dudas, envíame foto por WhatsApp y te asesoro gratis."
        },
        objeciones: {
            caro: "Entiendo que es una inversión. Pero mira, con ADDI puedes pagarlo hasta en 12 cuotas sin interés. Por ejemplo, la OS809TYE con WiFi quedaría en cuotas de ~$31,000 mensuales. Además, piensa en la tranquilidad de no preocuparte por llaves perdidas.",
            miedo_afuera: "¡Esa es una preocupación muy común! Pero todas nuestras cerraduras incluyen 2 llaves mecánicas de emergencia y puerto USB externo. Si se agota la batería, conectas un power bank y listo. Además, te avisan antes de que se agote completamente.",
            no_internet: "¡Perfecto que no tengas internet! La OS566F funciona 100% offline con huella, código, tarjeta o llave. O si quieres app, la OS514F funciona con Bluetooth local, sin necesitar WiFi.",
            no_se_instalar: "No te preocupes, es como cambiar una cerradura normal. Puedes hacerlo tú mismo con el manual paso a paso, o contratar cualquier cerrajero de tu ciudad. No requiere cables ni electricidad."
        }
    };

    // Rutas de upselling
    const UPSELL_PATHS = {
        'OS566F': { to: 'OS514F', diff: '$15,000', razon: 'tiene app Tuya para control desde el celular' },
        'OS514F': { to: 'OS809TYE', diff: '$10,000', razon: 'tiene WiFi real y desbloqueo remoto desde cualquier lugar' },
        'OS833TYFA': { to: 'OS784TYFA', diff: '$20,000', razon: 'incluye sistema de ALARMA triple para máxima seguridad' }
    };

    // ===========================================
    // MOTOR DE RECOMENDACIÓN
    // ===========================================
    function recomendarProducto(perfil) {
        let candidatos = Object.values(PRODUCTOS);

        if (perfil.presupuesto) {
            if (perfil.presupuesto === 'bajo') {
                candidatos = candidatos.filter(p => p.precio <= 400000);
            } else if (perfil.presupuesto === 'medio') {
                candidatos = candidatos.filter(p => p.precio <= 700000);
            }
        }

        let puntuaciones = candidatos.map(p => {
            let puntos = 0;

            if (perfil.wifi && p.desbloqueoRemoto) puntos += 30;
            if (perfil.wifi === false && !p.wifi) puntos += 20;
            if (perfil.seguridad && p.alarma) puntos += 25;
            if (perfil.adultosMayores && p.faceId) puntos += 30;
            if (perfil.ninos && p.faceId) puntos += 20;
            if (perfil.airbnb && p.desbloqueoRemoto && p.capacidad > 200) puntos += 35;
            if (perfil.empresa && p.capacidad > 200) puntos += 25;
            if (perfil.viajero && p.bateria.includes('4200')) puntos += 30;

            if (p.sku === 'OS809TYE') puntos += 10;
            if (p.sku === 'OS784TYFA') puntos += 5;

            return { producto: p, puntos };
        });

        puntuaciones.sort((a, b) => b.puntos - a.puntos);
        return puntuaciones[0]?.producto || PRODUCTOS['OS809TYE'];
    }

    function formatearRecomendacion(producto) {
        let mensaje = 'Te recomiendo el ' + producto.nombre + ' (' + producto.precioFormateado + ').\n\n';
        mensaje += '✅ ' + producto.ventajas.slice(0, 3).join('\n✅ ') + '\n\n';
        mensaje += 'Métodos de acceso: ' + producto.metodos.join(', ') + '.\n\n';

        if (producto.destacado) {
            mensaje += '💡 ' + producto.destacado + '\n\n';
        }

        const upsell = UPSELL_PATHS[producto.sku];
        if (upsell) {
            const upgrade = PRODUCTOS[upsell.to];
            mensaje += '\n💰 Por solo ' + upsell.diff + ' más, el ' + upgrade.nombre + ' ' + upsell.razon + '.';
        }

        return mensaje;
    }

    // ===========================================
    // PROCESAMIENTO DE MENSAJES (NLU Simple)
    // ===========================================
    function detectarIntencion(mensaje) {
        const msg = mensaje.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (/^(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|ola|hi|hello|que tal|saludos)/i.test(msg)) {
            return { tipo: 'saludo' };
        }
        if (/envio|enviar|despacho|llega|entrega|domicilio/i.test(msg)) {
            return { tipo: 'faq', tema: 'envio' };
        }
        if (/cuota|financ|pago|addi|tarjeta|credito|debito|nequi|daviplata/i.test(msg)) {
            return { tipo: 'faq', tema: 'cuotas' };
        }
        if (/instal|poner|colocar|armar|montar/i.test(msg)) {
            return { tipo: 'faq', tema: 'instalacion' };
        }
        if (/bateria|pila|carga|agotar|quedarse afuera|sin energia/i.test(msg)) {
            return { tipo: 'faq', tema: 'bateria' };
        }
        if (/internet|wifi|sin luz|sin conexion|offline/i.test(msg)) {
            return { tipo: 'faq', tema: 'sin_internet' };
        }
        if (/garantia|devolucion|cambio|reclamo|soporte/i.test(msg)) {
            return { tipo: 'faq', tema: 'garantia' };
        }
        if (/puerta|grosor|sirve|compatible|madera|metal|seguridad/i.test(msg)) {
            return { tipo: 'faq', tema: 'puerta' };
        }
        if (/car[oa]|costoso|mucho|plata|dinero|presupuesto bajo/i.test(msg)) {
            return { tipo: 'objecion', tema: 'caro' };
        }
        if (/miedo|quedar afuera|encerrar|atascar/i.test(msg)) {
            return { tipo: 'objecion', tema: 'miedo_afuera' };
        }

        const skuMatch = msg.match(/os\s?(\d{3}[a-z]*)/i);
        if (skuMatch) {
            const sku = 'OS' + skuMatch[1].toUpperCase();
            if (PRODUCTOS[sku]) {
                return { tipo: 'producto_especifico', sku };
            }
        }

        if (/compr|quiero|llevar|pedir|ordenar|whatsapp|contactar/i.test(msg)) {
            return { tipo: 'compra' };
        }
        if (/recomi|cual|mejor|suger|ayuda|asesora|necesito|busco/i.test(msg)) {
            return { tipo: 'recomendacion' };
        }
        if (/precio|cuesta|vale|cuanto|valor|catalogo/i.test(msg)) {
            return { tipo: 'precios' };
        }
        if (/face|facial|rostro|cara|reconocimiento/i.test(msg)) {
            return { tipo: 'caracteristica', caracteristica: 'faceId' };
        }
        if (/wifi|remoto|lejos|distancia|afuera/i.test(msg)) {
            return { tipo: 'caracteristica', caracteristica: 'wifi' };
        }
        if (/alarma|seguridad|antipalanca|robo|intruso/i.test(msg)) {
            return { tipo: 'caracteristica', caracteristica: 'alarma' };
        }
        if (/airbnb|alquiler|huespedes|temporal|visita/i.test(msg)) {
            return { tipo: 'caso_uso', caso: 'airbnb' };
        }
        if (/empresa|oficina|negocio|empleados|trabajadores/i.test(msg)) {
            return { tipo: 'caso_uso', caso: 'empresa' };
        }

        return { tipo: 'general' };
    }

    // ===========================================
    // GENERADOR DE RESPUESTAS
    // ===========================================
    class AnaBot {
        constructor() {
            this.estado = 'inicio';
            this.perfil = {};
            this.productoRecomendado = null;
            this.historial = [];
        }

        responder(mensaje) {
            const intencion = detectarIntencion(mensaje);
            this.historial.push({ usuario: mensaje, intencion });

            let respuesta = '';

            switch (intencion.tipo) {
                case 'saludo':
                    respuesta = RESPUESTAS.saludo[Math.floor(Math.random() * RESPUESTAS.saludo.length)];
                    this.estado = 'descubrimiento';
                    break;

                case 'faq':
                    respuesta = RESPUESTAS.faq[intencion.tema] || "Déjame consultarlo. ¿Puedes ser más específico?";
                    break;

                case 'objecion':
                    respuesta = RESPUESTAS.objeciones[intencion.tema] || "Entiendo tu preocupación. Cuéntame más para ayudarte mejor.";
                    break;

                case 'producto_especifico':
                    const prod = PRODUCTOS[intencion.sku];
                    respuesta = this.describirProducto(prod);
                    this.productoRecomendado = prod;
                    break;

                case 'compra':
                    respuesta = this.gestionarCompra();
                    break;

                case 'recomendacion':
                    if (Object.keys(this.perfil).length < 2) {
                        respuesta = this.hacerPreguntaDescubrimiento();
                    } else {
                        this.productoRecomendado = recomendarProducto(this.perfil);
                        respuesta = formatearRecomendacion(this.productoRecomendado);
                    }
                    break;

                case 'precios':
                    respuesta = this.listarPrecios();
                    break;

                case 'caracteristica':
                    respuesta = this.filtrarPorCaracteristica(intencion.caracteristica);
                    break;

                case 'caso_uso':
                    this.perfil[intencion.caso] = true;
                    this.productoRecomendado = recomendarProducto(this.perfil);
                    respuesta = formatearRecomendacion(this.productoRecomendado);
                    break;

                default:
                    this.extraerPerfil(mensaje);

                    if (this.estado === 'inicio') {
                        respuesta = RESPUESTAS.saludo[0];
                        this.estado = 'descubrimiento';
                    } else if (Object.keys(this.perfil).length >= 2) {
                        this.productoRecomendado = recomendarProducto(this.perfil);
                        respuesta = formatearRecomendacion(this.productoRecomendado);
                    } else {
                        respuesta = this.hacerPreguntaDescubrimiento();
                    }
            }

            this.historial.push({ bot: respuesta });
            return respuesta;
        }

        extraerPerfil(mensaje) {
            const msg = mensaje.toLowerCase();

            if (/si.*(wifi|remoto|lejos)|necesito.*(remoto|abrir.*lejos)|quiero.*control/i.test(msg)) {
                this.perfil.wifi = true;
            }
            if (/no.*(wifi|remoto)|sin.*wifi|no.*necesito.*remoto/i.test(msg)) {
                this.perfil.wifi = false;
            }
            if (/economic|barat|poco.*presupuesto|bajo.*presupuesto|345|360|370/i.test(msg)) {
                this.perfil.presupuesto = 'bajo';
            }
            if (/medio|normal|680|700/i.test(msg)) {
                this.perfil.presupuesto = 'medio';
            }
            if (/premium|mejor|completo|no.*importa.*precio|790|830/i.test(msg)) {
                this.perfil.presupuesto = 'alto';
            }
            if (/casa|hogar|apartamento|residencia/i.test(msg)) {
                this.perfil.uso = 'casa';
            }
            if (/oficina|empresa|negocio|local|trabajo/i.test(msg)) {
                this.perfil.uso = 'oficina';
                this.perfil.empresa = true;
            }
            if (/solo|soltero|vivo.*solo/i.test(msg)) {
                this.perfil.familia = 'solo';
            }
            if (/familia|hijos|ninos|esposa|esposo/i.test(msg)) {
                this.perfil.familia = 'familia';
                this.perfil.ninos = true;
            }
            if (/adulto.*mayor|abuelo|abuela|papa|mama.*mayor|tercera.*edad/i.test(msg)) {
                this.perfil.adultosMayores = true;
            }
            if (/seguridad|alarma|robo|zona.*peligrosa|peligro/i.test(msg)) {
                this.perfil.seguridad = true;
            }
            if (/airbnb|alquilo|arriendo|hospedaje/i.test(msg)) {
                this.perfil.airbnb = true;
                this.perfil.wifi = true;
            }
            if (/viaj|fuera.*mucho|ausent/i.test(msg)) {
                this.perfil.viajero = true;
            }
        }

        hacerPreguntaDescubrimiento() {
            if (!('wifi' in this.perfil)) {
                return RESPUESTAS.preguntas_descubrimiento.wifi;
            }
            if (!this.perfil.presupuesto) {
                return RESPUESTAS.preguntas_descubrimiento.presupuesto;
            }
            if (!this.perfil.uso) {
                return RESPUESTAS.preguntas_descubrimiento.uso;
            }
            if (!this.perfil.familia) {
                return RESPUESTAS.preguntas_descubrimiento.familia;
            }
            return "Cuéntame más sobre lo que buscas para darte la mejor recomendación.";
        }

        describirProducto(producto) {
            let desc = producto.nombre + ' (' + producto.precioFormateado + ')\n\n';
            desc += 'Categoría: ' + producto.categoria + '\n';
            desc += 'Capacidad: ' + producto.capacidad + ' usuarios\n';
            desc += 'Batería: ' + producto.bateria + '\n\n';

            desc += 'Características:\n';
            desc += (producto.wifi ? '✅' : '❌') + ' WiFi\n';
            desc += (producto.faceId ? '✅' : '❌') + ' Face ID 3D\n';
            desc += (producto.videoLlamada ? '✅' : '❌') + ' Video llamada\n';
            desc += (producto.desbloqueoRemoto ? '✅' : '❌') + ' Desbloqueo remoto\n';
            desc += (producto.alarma ? '✅' : '❌') + ' Alarma\n\n';

            desc += 'Ideal para: ' + producto.ideal.join(', ') + '\n\n';

            if (producto.nota) {
                desc += '⚠️ ' + producto.nota + '\n\n';
            }

            desc += '¿Te gustaría ver más detalles o proceder con la compra?';
            return desc;
        }

        listarPrecios() {
            let lista = "Catálogo ZAFESYS:\n\n";
            Object.values(PRODUCTOS).forEach(p => {
                lista += '• ' + p.nombre + ' - ' + p.precioFormateado;
                if (p.destacado) lista += ' ⭐';
                lista += '\n';
            });
            lista += "\n¿Cuál te interesa? Te puedo dar más detalles.";
            return lista;
        }

        filtrarPorCaracteristica(caract) {
            const filtrados = Object.values(PRODUCTOS).filter(p => p[caract]);

            if (filtrados.length === 0) {
                return "No tenemos productos con esa característica específica. ¿Te puedo ayudar con otra cosa?";
            }

            const nombreCaract = caract === 'faceId' ? 'Face ID' : caract === 'wifi' ? 'WiFi/Remoto' : 'Alarma';
            let resp = 'Cerraduras con ' + nombreCaract + ':\n\n';
            filtrados.forEach(p => {
                resp += '• ' + p.nombre + ' - ' + p.precioFormateado + '\n';
            });
            resp += "\n¿Cuál te llama más la atención?";
            return resp;
        }

        gestionarCompra() {
            if (this.productoRecomendado) {
                return '¡Excelente elección con el ' + this.productoRecomendado.nombre + '! 🎉\n\nPara continuar con tu compra, escríbenos al WhatsApp:\n\n📱 +57 300 123 4567\n\nAhí te ayudamos con el pago (contado o cuotas ADDI) y coordinamos el envío gratis a tu ciudad.\n\n¿Tienes alguna otra pregunta antes de continuar?';
            }
            return "¡Genial que quieras comprar! Cuéntame qué cerradura te interesa o qué necesitas para recomendarte la ideal. También puedes escribirnos directo al WhatsApp +57 300 123 4567.";
        }
    }

    // ===========================================
    // SANITIZACIÓN DE TEXTO
    // ===========================================
    function sanitizarTexto(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.textContent;
    }

    function textoANodos(texto) {
        // Convierte texto con saltos de línea en nodos DOM seguros
        const fragment = document.createDocumentFragment();
        const lineas = texto.split('\n');

        lineas.forEach((linea, index) => {
            const span = document.createElement('span');
            span.textContent = linea;
            fragment.appendChild(span);

            if (index < lineas.length - 1) {
                fragment.appendChild(document.createElement('br'));
            }
        });

        return fragment;
    }

    // ===========================================
    // INTERFAZ DE USUARIO (UI)
    // ===========================================
    function inyectarEstilos() {
        const css = `
            #zafesys-chatbot {
                --chat-primary: #22d3ee;
                --chat-primary-dark: #0891b2;
                --chat-bg: #0a0a0f;
                --chat-surface: #111118;
                --chat-border: rgba(255,255,255,0.1);
                --chat-text: #fff;
                --chat-text-muted: #9ca3af;
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 9999;
                font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
            }
            #zafesys-chat-toggle {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--chat-primary), var(--chat-primary-dark));
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 24px rgba(34, 211, 238, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                position: relative;
            }
            #zafesys-chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 32px rgba(34, 211, 238, 0.5);
            }
            #zafesys-chat-toggle svg {
                width: 28px;
                height: 28px;
                fill: white;
                transition: transform 0.3s ease;
            }
            #zafesys-chat-toggle.open svg {
                transform: rotate(90deg);
            }
            #zafesys-chat-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                width: 20px;
                height: 20px;
                background: #ef4444;
                border-radius: 50%;
                font-size: 11px;
                font-weight: 700;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: zafesys-pulse 2s infinite;
            }
            @keyframes zafesys-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            #zafesys-chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 48px);
                height: 520px;
                max-height: calc(100vh - 120px);
                background: var(--chat-bg);
                border-radius: 20px;
                border: 1px solid var(--chat-border);
                box-shadow: 0 12px 48px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s ease;
            }
            #zafesys-chat-window.open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }
            #zafesys-chat-header {
                background: var(--chat-surface);
                padding: 16px 20px;
                border-bottom: 1px solid var(--chat-border);
                display: flex;
                align-items: center;
                gap: 12px;
            }
            #zafesys-chat-avatar {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--chat-primary), var(--chat-primary-dark));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            #zafesys-chat-info h4 {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
                color: var(--chat-text);
            }
            #zafesys-chat-info span {
                font-size: 12px;
                color: var(--chat-text-muted);
                display: flex;
                align-items: center;
                gap: 6px;
            }
            #zafesys-chat-info span::before {
                content: '';
                width: 8px;
                height: 8px;
                background: #22c55e;
                border-radius: 50%;
            }
            #zafesys-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            #zafesys-chat-messages::-webkit-scrollbar {
                width: 6px;
            }
            #zafesys-chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }
            #zafesys-chat-messages::-webkit-scrollbar-thumb {
                background: var(--chat-border);
                border-radius: 3px;
            }
            .zafesys-msg {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 16px;
                font-size: 14px;
                line-height: 1.5;
                animation: zafesys-msgIn 0.3s ease;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            @keyframes zafesys-msgIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .zafesys-msg.bot {
                background: var(--chat-surface);
                color: var(--chat-text);
                border-bottom-left-radius: 4px;
                align-self: flex-start;
            }
            .zafesys-msg.user {
                background: linear-gradient(135deg, var(--chat-primary), var(--chat-primary-dark));
                color: white;
                border-bottom-right-radius: 4px;
                align-self: flex-end;
            }
            .zafesys-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: var(--chat-surface);
                border-radius: 16px;
                border-bottom-left-radius: 4px;
                align-self: flex-start;
                max-width: 60px;
            }
            .zafesys-typing span {
                width: 8px;
                height: 8px;
                background: var(--chat-text-muted);
                border-radius: 50%;
                animation: zafesys-typing 1.4s infinite ease-in-out;
            }
            .zafesys-typing span:nth-child(2) { animation-delay: 0.2s; }
            .zafesys-typing span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes zafesys-typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-6px); }
            }
            #zafesys-quick-replies {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                padding: 0 20px 12px;
            }
            .zafesys-quick-btn {
                padding: 8px 14px;
                background: var(--chat-surface);
                border: 1px solid var(--chat-border);
                border-radius: 20px;
                color: var(--chat-text);
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
            }
            .zafesys-quick-btn:hover {
                background: var(--chat-primary);
                border-color: var(--chat-primary);
                color: black;
            }
            #zafesys-chat-input-area {
                padding: 16px 20px;
                background: var(--chat-surface);
                border-top: 1px solid var(--chat-border);
                display: flex;
                gap: 12px;
            }
            #zafesys-chat-input {
                flex: 1;
                background: var(--chat-bg);
                border: 1px solid var(--chat-border);
                border-radius: 12px;
                padding: 12px 16px;
                color: var(--chat-text);
                font-size: 14px;
                font-family: inherit;
                outline: none;
                transition: border-color 0.2s ease;
            }
            #zafesys-chat-input:focus {
                border-color: var(--chat-primary);
            }
            #zafesys-chat-input::placeholder {
                color: var(--chat-text-muted);
            }
            #zafesys-chat-send {
                width: 44px;
                height: 44px;
                border-radius: 12px;
                background: linear-gradient(135deg, var(--chat-primary), var(--chat-primary-dark));
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s ease;
            }
            #zafesys-chat-send:hover {
                transform: scale(1.05);
            }
            #zafesys-chat-send svg {
                width: 20px;
                height: 20px;
                fill: white;
            }
            @media (max-width: 480px) {
                #zafesys-chatbot {
                    bottom: 16px;
                    right: 16px;
                }
                #zafesys-chat-window {
                    width: calc(100vw - 32px);
                    height: calc(100vh - 100px);
                    bottom: 76px;
                    right: -8px;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    function crearHTML() {
        const container = document.createElement('div');
        container.id = 'zafesys-chatbot';

        // Toggle button
        const toggle = document.createElement('button');
        toggle.id = 'zafesys-chat-toggle';
        toggle.setAttribute('aria-label', 'Abrir chat');

        const toggleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        toggleSvg.setAttribute('viewBox', '0 0 24 24');
        const togglePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        togglePath.setAttribute('d', 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z');
        toggleSvg.appendChild(togglePath);
        toggle.appendChild(toggleSvg);

        const badge = document.createElement('span');
        badge.id = 'zafesys-chat-badge';
        badge.textContent = '1';
        toggle.appendChild(badge);

        // Chat window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'zafesys-chat-window';

        // Header
        const header = document.createElement('div');
        header.id = 'zafesys-chat-header';

        const avatar = document.createElement('div');
        avatar.id = 'zafesys-chat-avatar';
        avatar.textContent = '👩‍💼';

        const info = document.createElement('div');
        info.id = 'zafesys-chat-info';
        const infoTitle = document.createElement('h4');
        infoTitle.textContent = 'Ana - ZAFESYS';
        const infoStatus = document.createElement('span');
        infoStatus.textContent = 'En línea';
        info.appendChild(infoTitle);
        info.appendChild(infoStatus);

        header.appendChild(avatar);
        header.appendChild(info);

        // Messages container
        const messages = document.createElement('div');
        messages.id = 'zafesys-chat-messages';

        // Quick replies
        const quickReplies = document.createElement('div');
        quickReplies.id = 'zafesys-quick-replies';

        // Input area
        const inputArea = document.createElement('div');
        inputArea.id = 'zafesys-chat-input-area';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'zafesys-chat-input';
        input.placeholder = 'Escribe tu mensaje...';
        input.autocomplete = 'off';

        const sendBtn = document.createElement('button');
        sendBtn.id = 'zafesys-chat-send';
        sendBtn.setAttribute('aria-label', 'Enviar');

        const sendSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sendSvg.setAttribute('viewBox', '0 0 24 24');
        const sendPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        sendPath.setAttribute('d', 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z');
        sendSvg.appendChild(sendPath);
        sendBtn.appendChild(sendSvg);

        inputArea.appendChild(input);
        inputArea.appendChild(sendBtn);

        // Assemble chat window
        chatWindow.appendChild(header);
        chatWindow.appendChild(messages);
        chatWindow.appendChild(quickReplies);
        chatWindow.appendChild(inputArea);

        // Assemble container
        container.appendChild(toggle);
        container.appendChild(chatWindow);

        document.body.appendChild(container);
    }

    // ===========================================
    // CONTROLADOR DEL CHAT
    // ===========================================
    class ChatController {
        constructor() {
            this.bot = new AnaBot();
            this.isOpen = false;
            this.elements = {};
        }

        init() {
            inyectarEstilos();
            crearHTML();
            this.cacheElements();
            this.bindEvents();

            setTimeout(() => {
                this.mostrarMensajeBot(RESPUESTAS.saludo[0]);
                this.mostrarQuickReplies(['Ver catálogo', '¿Cuál me recomiendan?', 'Tengo Airbnb', 'Hablar por WhatsApp']);
            }, 1000);
        }

        cacheElements() {
            this.elements = {
                toggle: document.getElementById('zafesys-chat-toggle'),
                window: document.getElementById('zafesys-chat-window'),
                messages: document.getElementById('zafesys-chat-messages'),
                input: document.getElementById('zafesys-chat-input'),
                send: document.getElementById('zafesys-chat-send'),
                quickReplies: document.getElementById('zafesys-quick-replies'),
                badge: document.getElementById('zafesys-chat-badge')
            };
        }

        bindEvents() {
            this.elements.toggle.addEventListener('click', () => this.toggleChat());
            this.elements.send.addEventListener('click', () => this.enviarMensaje());
            this.elements.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.enviarMensaje();
            });
        }

        toggleChat() {
            this.isOpen = !this.isOpen;
            this.elements.window.classList.toggle('open', this.isOpen);
            this.elements.toggle.classList.toggle('open', this.isOpen);

            if (this.isOpen) {
                this.elements.badge.style.display = 'none';
                this.elements.input.focus();
            }
        }

        enviarMensaje() {
            const texto = this.elements.input.value.trim();
            if (!texto) return;

            this.mostrarMensajeUsuario(texto);
            this.elements.input.value = '';
            this.elements.quickReplies.textContent = '';

            this.mostrarTyping();

            setTimeout(() => {
                this.ocultarTyping();
                const respuesta = this.bot.responder(texto);
                this.mostrarMensajeBot(respuesta);
                this.actualizarQuickReplies(texto);
            }, 800 + Math.random() * 700);
        }

        mostrarMensajeUsuario(texto) {
            const msg = document.createElement('div');
            msg.className = 'zafesys-msg user';
            msg.textContent = sanitizarTexto(texto);
            this.elements.messages.appendChild(msg);
            this.scrollToBottom();
        }

        mostrarMensajeBot(texto) {
            const msg = document.createElement('div');
            msg.className = 'zafesys-msg bot';
            msg.appendChild(textoANodos(texto));
            this.elements.messages.appendChild(msg);
            this.scrollToBottom();
        }

        mostrarTyping() {
            const typing = document.createElement('div');
            typing.className = 'zafesys-typing';
            typing.id = 'zafesys-typing';
            for (let i = 0; i < 3; i++) {
                typing.appendChild(document.createElement('span'));
            }
            this.elements.messages.appendChild(typing);
            this.scrollToBottom();
        }

        ocultarTyping() {
            const typing = document.getElementById('zafesys-typing');
            if (typing) typing.remove();
        }

        mostrarQuickReplies(opciones) {
            this.elements.quickReplies.textContent = '';

            opciones.forEach(op => {
                const btn = document.createElement('button');
                btn.className = 'zafesys-quick-btn';
                btn.textContent = op;
                btn.addEventListener('click', () => {
                    this.elements.input.value = op;
                    this.enviarMensaje();
                });
                this.elements.quickReplies.appendChild(btn);
            });
        }

        actualizarQuickReplies(ultimoMensaje) {
            const intencion = detectarIntencion(ultimoMensaje);
            let opciones = [];

            switch (intencion.tipo) {
                case 'saludo':
                case 'general':
                    opciones = ['Ver precios', '¿Cuál me recomiendan?', 'Tengo Airbnb', '¿Hacen envíos?'];
                    break;
                case 'precios':
                case 'recomendacion':
                    opciones = ['Ver más detalles', 'Quiero comprar', '¿Hay cuotas?', '¿Y la instalación?'];
                    break;
                case 'producto_especifico':
                    opciones = ['Quiero este', '¿Hay cuotas?', 'Ver otros modelos'];
                    break;
                case 'faq':
                    opciones = ['Ver catálogo', 'Recomendar uno', 'Hablar por WhatsApp'];
                    break;
                default:
                    opciones = ['Ver catálogo', '¿Hay financiación?', 'Contactar WhatsApp'];
            }

            this.mostrarQuickReplies(opciones);
        }

        scrollToBottom() {
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        }
    }

    // ===========================================
    // INICIALIZACIÓN
    // ===========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const chat = new ChatController();
            chat.init();
        });
    } else {
        const chat = new ChatController();
        chat.init();
    }

})();
