/**
 * ZAFESYS - Ana Voice Assistant
 * Powered by Vapi AI Web SDK
 */

(function() {
    'use strict';

    var VAPI_PUBLIC_KEY = '0463d2c5-554c-4d1d-87d3-3b0eef1c66e7';
    var VAPI_ASSISTANT_ID = '1f9f79c5-377a-4c1a-b51a-7dfe0b9060ee';

    var vapi = null;
    var isCallActive = false;
    var button = null;

    // SVG paths for icons
    var ICON_MIC = 'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z';
    var ICON_PHONE = 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z';
    var ICON_LOADING = 'M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8zm0 18v-2c4.41 0 8-3.59 8-8h2c0 5.52-4.48 10-10 10z';

    // Create SVG element safely
    function createSvgIcon(pathData) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('width', '28');
        svg.setAttribute('height', '28');
        svg.style.fill = 'white';

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        svg.appendChild(path);

        return svg;
    }

    // Inject button styles
    function injectStyles() {
        var css = [
            '#vapi-ana-btn {',
            '    position: fixed;',
            '    bottom: 100px;',
            '    right: 24px;',
            '    width: 64px;',
            '    height: 64px;',
            '    border-radius: 50%;',
            '    border: none;',
            '    cursor: pointer;',
            '    z-index: 9999;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '    transition: all 0.3s ease;',
            '    background: linear-gradient(135deg, #22d3ee, #0891b2);',
            '    box-shadow: 0 4px 24px rgba(34, 211, 238, 0.4);',
            '}',
            '#vapi-ana-btn:hover {',
            '    transform: scale(1.1);',
            '    box-shadow: 0 6px 32px rgba(34, 211, 238, 0.5);',
            '}',
            '#vapi-ana-btn.active {',
            '    background: linear-gradient(135deg, #10b981, #059669);',
            '    box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4);',
            '    animation: vapi-pulse 2s infinite;',
            '}',
            '#vapi-ana-btn.loading {',
            '    background: linear-gradient(135deg, #f59e0b, #d97706);',
            '    box-shadow: 0 4px 24px rgba(245, 158, 11, 0.4);',
            '}',
            '#vapi-ana-btn.loading svg {',
            '    animation: vapi-spin 1s linear infinite;',
            '}',
            '@keyframes vapi-pulse {',
            '    0%, 100% { box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4); }',
            '    50% { box-shadow: 0 6px 32px rgba(16, 185, 129, 0.6); }',
            '}',
            '@keyframes vapi-spin {',
            '    from { transform: rotate(0deg); }',
            '    to { transform: rotate(360deg); }',
            '}',
            '#vapi-ana-tooltip {',
            '    position: fixed;',
            '    bottom: 172px;',
            '    right: 24px;',
            '    background: rgba(0, 0, 0, 0.9);',
            '    color: white;',
            '    padding: 8px 16px;',
            '    border-radius: 8px;',
            '    font-size: 13px;',
            '    font-family: "Sora", sans-serif;',
            '    z-index: 9998;',
            '    opacity: 0;',
            '    transition: opacity 0.3s;',
            '    pointer-events: none;',
            '    white-space: nowrap;',
            '}',
            '#vapi-ana-btn:hover + #vapi-ana-tooltip,',
            '#vapi-ana-tooltip.visible {',
            '    opacity: 1;',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Create floating button
    function createButton() {
        button = document.createElement('button');
        button.id = 'vapi-ana-btn';
        button.setAttribute('aria-label', 'Hablar con Ana');
        button.appendChild(createSvgIcon(ICON_MIC));

        var tooltip = document.createElement('div');
        tooltip.id = 'vapi-ana-tooltip';
        tooltip.textContent = 'Habla con Ana';

        document.body.appendChild(button);
        document.body.appendChild(tooltip);

        button.addEventListener('click', toggleCall);
    }

    // Load Vapi SDK from CDN
    function loadVapiSDK() {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.src = 'https://unpkg.com/@vapi-ai/web@2.2.3/dist/vapi.js';
            script.onload = function() {
                console.log('[ZAFESYS] Vapi SDK loaded');
                resolve();
            };
            script.onerror = function() {
                console.error('[ZAFESYS] Failed to load Vapi SDK');
                reject(new Error('Failed to load Vapi SDK'));
            };
            document.head.appendChild(script);
        });
    }

    // Initialize Vapi
    function initVapi() {
        loadVapiSDK().then(function() {
            if (typeof window.Vapi === 'undefined') {
                console.error('[ZAFESYS] Vapi not found in window');
                return;
            }

            vapi = new window.Vapi(VAPI_PUBLIC_KEY);
            console.log('[ZAFESYS] Vapi initialized');

            vapi.on('call-start', function() {
                console.log('[ZAFESYS] Call started');
                isCallActive = true;
                updateButtonState('active');
                updateTooltip('Ana te escucha...');
            });

            vapi.on('call-end', function() {
                console.log('[ZAFESYS] Call ended');
                isCallActive = false;
                updateButtonState('idle');
                updateTooltip('Habla con Ana');
            });

            vapi.on('speech-start', function() {
                console.log('[ZAFESYS] User speaking');
                updateTooltip('Escuchando...');
            });

            vapi.on('speech-end', function() {
                console.log('[ZAFESYS] User stopped speaking');
                updateTooltip('Ana te escucha...');
            });

            vapi.on('message', function(msg) {
                console.log('[ZAFESYS] Message:', msg);
            });

            vapi.on('error', function(err) {
                console.error('[ZAFESYS] Error:', err);
                isCallActive = false;
                updateButtonState('idle');
                updateTooltip('Error - Intenta de nuevo');
            });

        }).catch(function(error) {
            console.error('[ZAFESYS] Init error:', error);
        });
    }

    // Toggle call
    function toggleCall() {
        if (!vapi) {
            console.error('[ZAFESYS] Vapi not initialized');
            return;
        }

        if (isCallActive) {
            console.log('[ZAFESYS] Stopping call...');
            vapi.stop();
        } else {
            console.log('[ZAFESYS] Starting call...');
            updateButtonState('loading');
            updateTooltip('Conectando...');

            vapi.start(VAPI_ASSISTANT_ID).catch(function(error) {
                console.error('[ZAFESYS] Start error:', error);
                updateButtonState('idle');
                updateTooltip('Error al conectar');
            });
        }
    }

    // Update button visual state
    function updateButtonState(state) {
        if (!button) return;

        button.classList.remove('active', 'loading');

        // Clear existing icon
        while (button.firstChild) {
            button.removeChild(button.firstChild);
        }

        if (state === 'active') {
            button.classList.add('active');
            button.appendChild(createSvgIcon(ICON_PHONE));
        } else if (state === 'loading') {
            button.classList.add('loading');
            button.appendChild(createSvgIcon(ICON_LOADING));
        } else {
            button.appendChild(createSvgIcon(ICON_MIC));
        }
    }

    // Update tooltip text
    function updateTooltip(text) {
        var tooltip = document.getElementById('vapi-ana-tooltip');
        if (tooltip) {
            tooltip.textContent = text;
            tooltip.classList.add('visible');
            setTimeout(function() {
                tooltip.classList.remove('visible');
            }, 3000);
        }
    }

    // Initialize when DOM is ready
    function init() {
        injectStyles();
        createButton();
        initVapi();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
