/**
 * ZAFESYS - Ana Voice Assistant
 * ElevenLabs Conversational AI Integration
 * Uses @11labs/client SDK via CDN
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
        console.log('[ZAFESYS] Ana voice button initialized');
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ana-voice-container {
                position: fixed;
                bottom: 115px;
                right: 24px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .ana-voice-label {
                background: linear-gradient(135deg, rgba(34, 211, 238, 0.9) 0%, rgba(8, 145, 178, 0.9) 100%);
                color: #fff;
                padding: 8px 14px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                font-family: "Sora", sans-serif;
                white-space: nowrap;
                animation: labelBounce 2s ease-in-out infinite;
                box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3);
            }
            
            @keyframes labelBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
            }
            
            .ana-voice-btn {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #22d3ee 0%, #0891b2 100%);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(34, 211, 238, 0.4);
                transition: all 0.3s ease;
                position: relative;
            }
            
            .ana-voice-btn::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(34, 211, 238, 0.3);
                animation: pulse-ring 2s ease-out infinite;
            }
            
            @keyframes pulse-ring {
                0% { transform: scale(1); opacity: 0.6; }
                100% { transform: scale(1.5); opacity: 0; }
            }
            
            .ana-voice-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(34, 211, 238, 0.5);
            }
            
            .ana-voice-btn:active { transform: scale(0.95); }
            
            .ana-voice-btn svg { 
                width: 28px; 
                height: 28px; 
                fill: white;
                position: relative;
                z-index: 1;
            }
            
            .ana-voice-btn.active {
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                box-shadow: 0 4px 20px rgba(34, 197, 94, 0.4);
            }
            
            .ana-voice-btn.active::before {
                background: rgba(34, 197, 94, 0.3);
            }
            
            .ana-voice-btn.active:hover { 
                box-shadow: 0 6px 30px rgba(34, 197, 94, 0.5); 
            }
            
            .ana-voice-container.active .ana-voice-label {
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%);
                box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
            }
            
            .ana-voice-btn.connecting {
                background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
                pointer-events: none;
            }
            
            .ana-voice-btn.connecting::before {
                background: rgba(245, 158, 11, 0.3);
            }
            
            .ana-voice-container.connecting .ana-voice-label {
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%);
                box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
            }
            
            @media (max-width: 768px) {
                .ana-voice-container { 
                    bottom: 105px; 
                    right: 18px; 
                }
                .ana-voice-btn { 
                    width: 56px; 
                    height: 56px; 
                }
                .ana-voice-btn svg { 
                    width: 26px; 
                    height: 26px; 
                }
                .ana-voice-label {
                    font-size: 12px;
                    padding: 6px 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createCustomButton() {
        // Container
        const container = document.createElement('div');
        container.className = 'ana-voice-container';
        container.id = 'ana-voice-container';
        
        // Label
        const label = document.createElement('div');
        label.className = 'ana-voice-label';
        label.textContent = '💬 ¡Hablemos!';
        label.id = 'ana-voice-label';
        
        // Button
        btn = document.createElement('button');
        btn.className = 'ana-voice-btn';
        btn.setAttribute('aria-label', 'Iniciar llamada con Ana, asesora virtual de ZAFESYS');
        btn.appendChild(createMicIcon());
        btn.addEventListener('click', handleButtonClick);
        
        container.appendChild(label);
        container.appendChild(btn);
        document.body.appendChild(container);
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
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('[Ana] Microphone permission granted');
            
            // Stop the stream immediately, SDK will request its own
            stream.getTracks().forEach(track => track.stop());

            // Cargar SDK dinámicamente
            console.log('[Ana] Loading ElevenLabs SDK...');
            const { Conversation } = await import('https://cdn.jsdelivr.net/npm/@11labs/client@latest/+esm');

            // Iniciar sesión de conversación
            console.log('[Ana] Starting conversation session...');
            conversation = await Conversation.startSession({
                agentId: AGENT_ID,
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
                    console.log('[Ana] Mode:', mode.mode);
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
        const container = document.getElementById('ana-voice-container');
        const label = document.getElementById('ana-voice-label');
        
        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        }

        btn.classList.remove('active', 'connecting');
        container.classList.remove('active', 'connecting');

        if (state === 'connecting') {
            btn.classList.add('connecting');
            container.classList.add('connecting');
            label.textContent = '⏳ Conectando...';
            btn.appendChild(createMicIcon());
        } else if (state === 'active') {
            isActive = true;
            btn.classList.add('active');
            container.classList.add('active');
            label.textContent = '🎙️ En llamada';
            btn.appendChild(createHangupIcon());
        }
    }

    function resetButton() {
        isActive = false;
        conversation = null;
        
        const container = document.getElementById('ana-voice-container');
        const label = document.getElementById('ana-voice-label');

        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        }

        btn.classList.remove('active', 'connecting');
        container.classList.remove('active', 'connecting');
        label.textContent = '💬 ¡Hablemos!';
        btn.appendChild(createMicIcon());
    }

    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
