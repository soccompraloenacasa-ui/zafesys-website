/**
 * ZAFESYS - Ana Voice Assistant
 * Custom ElevenLabs Integration
 * Botón personalizado que inicia llamada de voz
 */

(function() {
    'use strict';

    const AGENT_ID = 'agent_0001kf74phvbew39yn2s1r4fzhbf';

    // Crear icono SVG de micrófono
    function createMicIcon() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z');
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z');
        svg.appendChild(path1);
        svg.appendChild(path2);
        return svg;
    }

    // Crear icono SVG de colgar
    function createHangupIcon() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z');
        svg.appendChild(path);
        return svg;
    }

    function init() {
        injectStyles();
        createCustomButton();
        loadElevenLabsWidget();
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ocultar widget de ElevenLabs */
            elevenlabs-convai {
                position: fixed !important;
                bottom: -9999px !important;
                right: -9999px !important;
                opacity: 0 !important;
                pointer-events: none !important;
                z-index: -1 !important;
            }

            /* Botón personalizado Ana */
            .ana-voice-btn {
                position: fixed;
                bottom: 90px;
                right: 24px;
                width: 56px;
                height: 56px;
                background: linear-gradient(135deg, #00A3E0 0%, #0077B5 100%);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(0, 163, 224, 0.4);
                transition: all 0.3s ease;
            }

            .ana-voice-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 163, 224, 0.5);
            }

            .ana-voice-btn:active {
                transform: scale(0.95);
            }

            .ana-voice-btn svg {
                width: 24px;
                height: 24px;
                fill: white;
            }

            /* Estado activo (en llamada) */
            .ana-voice-btn.active {
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
                animation: pulse-call 2s infinite;
            }

            .ana-voice-btn.active:hover {
                box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5);
            }

            /* Estado conectando */
            .ana-voice-btn.connecting {
                background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
            }

            @keyframes pulse-call {
                0%, 100% { box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); }
                50% { box-shadow: 0 4px 30px rgba(16, 185, 129, 0.6); }
            }

            /* Tooltip */
            .ana-voice-btn::before {
                content: attr(data-tooltip);
                position: absolute;
                right: 70px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 13px;
                font-family: 'Sora', sans-serif;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
            }

            .ana-voice-btn:hover::before { opacity: 1; }

            /* Responsive */
            @media (max-width: 768px) {
                .ana-voice-btn {
                    bottom: 85px;
                    right: 20px;
                    width: 52px;
                    height: 52px;
                }
                .ana-voice-btn svg { width: 22px; height: 22px; }
                .ana-voice-btn::before { display: none; }
            }
        `;
        document.head.appendChild(style);
    }

    function createCustomButton() {
        const btn = document.createElement('button');
        btn.className = 'ana-voice-btn';
        btn.setAttribute('data-tooltip', 'Habla con Ana');
        btn.setAttribute('aria-label', 'Iniciar llamada con Ana, asesora virtual de ZAFESYS');
        btn.appendChild(createMicIcon());

        let isActive = false;

        btn.addEventListener('click', function() {
            const widget = document.querySelector('elevenlabs-convai');
            if (!widget) {
                console.error('[Ana] Widget no encontrado');
                return;
            }

            const shadowRoot = widget.shadowRoot;
            if (shadowRoot) {
                const widgetButton = shadowRoot.querySelector('button') ||
                                    shadowRoot.querySelector('[role="button"]');

                if (widgetButton) {
                    widgetButton.click();
                    isActive = !isActive;
                    updateButtonState(btn, isActive);
                } else {
                    // Mostrar widget temporalmente
                    widget.style.cssText = 'position:fixed!important;bottom:90px!important;right:24px!important;opacity:1!important;pointer-events:auto!important;z-index:1001!important;';
                    setTimeout(function() { widget.style.cssText = ''; }, 100);
                }
            }
        });

        document.body.appendChild(btn);
        console.log('[ZAFESYS] Ana voice button initialized');
    }

    function updateButtonState(btn, isActive) {
        // Limpiar contenido actual
        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        }

        if (isActive) {
            btn.classList.add('connecting');
            btn.setAttribute('data-tooltip', 'Conectando...');
            btn.appendChild(createMicIcon());

            setTimeout(function() {
                if (btn.classList.contains('connecting')) {
                    btn.classList.remove('connecting');
                    btn.classList.add('active');
                    btn.setAttribute('data-tooltip', 'Finalizar llamada');
                    while (btn.firstChild) {
                        btn.removeChild(btn.firstChild);
                    }
                    btn.appendChild(createHangupIcon());
                }
            }, 2000);
        } else {
            btn.classList.remove('active', 'connecting');
            btn.setAttribute('data-tooltip', 'Habla con Ana');
            btn.appendChild(createMicIcon());
        }
    }

    function loadElevenLabsWidget() {
        if (document.querySelector('elevenlabs-convai')) return;

        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', AGENT_ID);

        if (!document.querySelector('script[src*="elevenlabs/convai-widget"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
            script.async = true;
            script.type = 'text/javascript';
            document.head.appendChild(script);
        }

        document.body.appendChild(widget);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
