/**
 * ZAFESYS - Ana Voice Assistant
 * Powered by Vapi AI
 */

(function() {
    'use strict';

    const VAPI_ASSISTANT_ID = '1f9f79c5-377a-4c1a-b51a-7dfe0b9060ee';

    // Configuración del botón flotante
    const buttonConfig = {
        position: 'bottom-right',
        offset: '24px',
        width: '64px',
        height: '64px',
        idle: {
            color: 'linear-gradient(135deg, #22d3ee, #0891b2)',
            type: 'round',
            title: 'Habla con Ana',
            subtitle: 'Asesora ZAFESYS',
            icon: 'https://unpkg.com/lucide-static@0.321.0/icons/mic.svg'
        },
        loading: {
            color: 'linear-gradient(135deg, #22d3ee, #0891b2)',
            type: 'round',
            title: 'Conectando...',
            subtitle: 'Un momento',
            icon: 'https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg'
        },
        active: {
            color: 'linear-gradient(135deg, #10b981, #059669)',
            type: 'round',
            title: 'Ana te escucha',
            subtitle: 'Haz tu pregunta',
            icon: 'https://unpkg.com/lucide-static@0.321.0/icons/phone.svg'
        }
    };

    // Estilos personalizados para el botón
    function injectStyles() {
        const css = `
            .vapi-btn {
                box-shadow: 0 4px 24px rgba(34, 211, 238, 0.4) !important;
                transition: all 0.3s ease !important;
                font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif !important;
            }
            .vapi-btn:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 6px 32px rgba(34, 211, 238, 0.5) !important;
            }
            .vapi-btn-is-active {
                box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4) !important;
                animation: vapi-pulse 2s infinite !important;
            }
            .vapi-btn-is-active:hover {
                box-shadow: 0 6px 32px rgba(16, 185, 129, 0.5) !important;
            }
            .vapi-btn-is-loading {
                animation: vapi-spin 1s linear infinite !important;
            }
            .vapi-btn-is-speaking {
                animation: vapi-speaking 0.5s ease-in-out infinite alternate !important;
            }
            @keyframes vapi-pulse {
                0%, 100% { box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4); }
                50% { box-shadow: 0 4px 32px rgba(16, 185, 129, 0.6); }
            }
            @keyframes vapi-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes vapi-speaking {
                from { transform: scale(1); }
                to { transform: scale(1.05); }
            }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Cargar Vapi SDK
    function loadVapiSDK() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
        script.defer = true;
        script.async = true;

        script.onload = function() {
            if (window.vapiSDK) {
                window.vapiSDK.run({
                    apiKey: '', // No se necesita API key cuando se usa assistant ID público
                    assistant: VAPI_ASSISTANT_ID,
                    config: buttonConfig
                });
            }
        };

        document.head.appendChild(script);
    }

    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            injectStyles();
            loadVapiSDK();
        });
    } else {
        injectStyles();
        loadVapiSDK();
    }

})();
