/**
 * ZAFESYS - Ana Voice Assistant
 * ElevenLabs Conversational AI Integration
 * Uses @elevenlabs/client SDK via CDN
 */

(function() {
    'use strict';

    const AGENT_ID = 'agent_0001kf74phvbew39yn2s1r4fzhbf';
    let conversation = null;
    let isActive = false;
    let btn = null;

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
        console.log('[ZAFESYS] Ana voice assistant ready');
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = [
            '.ana-voice-btn {',
            '    position: fixed;',
            '    bottom: 90px;',
            '    right: 24px;',
            '    width: 56px;',
            '    height: 56px;',
            '    background: linear-gradient(135deg, #00A3E0 0%, #0077B5 100%);',
            '    border: none;',
            '    border-radius: 50%;',
            '    cursor: pointer;',
            '    z-index: 1000;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '    box-shadow: 0 4px 20px rgba(0, 163, 224, 0.4);',
            '    transition: all 0.3s ease;',
            '}',
            '.ana-voice-btn:hover {',
            '    transform: scale(1.1);',
            '    box-shadow: 0 6px 30px rgba(0, 163, 224, 0.5);',
            '}',
            '.ana-voice-btn:active { transform: scale(0.95); }',
            '.ana-voice-btn svg { width: 24px; height: 24px; fill: white; }',
            '.ana-voice-btn.active {',
            '    background: linear-gradient(135deg, #10B981 0%, #059669 100%);',
            '    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);',
            '    animation: pulse-call 2s infinite;',
            '}',
            '.ana-voice-btn.active:hover { box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5); }',
            '.ana-voice-btn.connecting {',
            '    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);',
            '    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);',
            '    pointer-events: none;',
            '}',
            '@keyframes pulse-call {',
            '    0%, 100% { box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); }',
            '    50% { box-shadow: 0 4px 30px rgba(16, 185, 129, 0.6); }',
            '}',
            '.ana-voice-btn::before {',
            '    content: attr(data-tooltip);',
            '    position: absolute;',
            '    right: 70px;',
            '    top: 50%;',
            '    transform: translateY(-50%);',
            '    background: rgba(0, 0, 0, 0.8);',
            '    color: white;',
            '    padding: 8px 12px;',
            '    border-radius: 8px;',
            '    font-size: 13px;',
            '    font-family: "Sora", sans-serif;',
            '    white-space: nowrap;',
            '    opacity: 0;',
            '    pointer-events: none;',
            '    transition: opacity 0.3s;',
            '}',
            '.ana-voice-btn:hover::before { opacity: 1; }',
            '@media (max-width: 768px) {',
            '    .ana-voice-btn { bottom: 85px; right: 20px; width: 52px; height: 52px; }',
            '    .ana-voice-btn svg { width: 22px; height: 22px; }',
            '    .ana-voice-btn::before { display: none; }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function createCustomButton() {
        btn = document.createElement('button');
        btn.className = 'ana-voice-btn';
        btn.setAttribute('data-tooltip', 'Habla con Ana');
        btn.setAttribute('aria-label', 'Iniciar llamada con Ana, asesora virtual de ZAFESYS');
        btn.appendChild(createMicIcon());

        btn.addEventListener('click', handleButtonClick);
        document.body.appendChild(btn);
    }

    async function handleButtonClick() {
        if (isActive && conversation) {
            await endConversation();
        } else {
            await startConversation();
        }
    }

    async function startConversation() {
        try {
            updateButtonState('connecting');

            // Solicitar permiso del micrófono
            console.log('[Ana] Requesting microphone permission...');
            await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('[Ana] Microphone permission granted');

            // Cargar SDK dinámicamente
            console.log('[Ana] Loading ElevenLabs SDK...');
            const { Conversation } = await import('https://cdn.jsdelivr.net/npm/@elevenlabs/client@latest/+esm');

            // Iniciar sesión de conversación
            console.log('[Ana] Starting conversation session...');
            conversation = await Conversation.startSession({
                agentId: AGENT_ID,
                connectionType: 'webrtc',
                onConnect: function() {
                    console.log('[Ana] Connected!');
                    updateButtonState('active');
                },
                onDisconnect: function() {
                    console.log('[Ana] Disconnected');
                    resetButton();
                },
                onError: function(error) {
                    console.error('[Ana] Error:', error);
                    resetButton();
                },
                onModeChange: function(mode) {
                    console.log('[Ana] Mode:', mode);
                }
            });

            isActive = true;
            updateButtonState('active');
            console.log('[Ana] Conversation started successfully');

        } catch (error) {
            console.error('[Ana] Failed to start conversation:', error);

            if (error.name === 'NotAllowedError') {
                alert('Para hablar con Ana, necesitas permitir el acceso al micrófono.');
            } else {
                alert('Error al conectar con Ana. Por favor intenta de nuevo.');
            }

            resetButton();
        }
    }

    async function endConversation() {
        try {
            if (conversation) {
                console.log('[Ana] Ending conversation...');
                await conversation.endSession();
                conversation = null;
            }
        } catch (error) {
            console.error('[Ana] Error ending conversation:', error);
        }
        resetButton();
    }

    function updateButtonState(state) {
        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        }

        btn.classList.remove('active', 'connecting');

        if (state === 'connecting') {
            btn.classList.add('connecting');
            btn.setAttribute('data-tooltip', 'Conectando...');
            btn.appendChild(createMicIcon());
        } else if (state === 'active') {
            isActive = true;
            btn.classList.add('active');
            btn.setAttribute('data-tooltip', 'Finalizar llamada');
            btn.appendChild(createHangupIcon());
        }
    }

    function resetButton() {
        isActive = false;
        conversation = null;

        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        }

        btn.classList.remove('active', 'connecting');
        btn.setAttribute('data-tooltip', 'Habla con Ana');
        btn.appendChild(createMicIcon());
    }

    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
