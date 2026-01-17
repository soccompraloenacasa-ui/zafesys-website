/**
 * ZAFESYS - Ana Voice Assistant
 * Powered by Vapi AI (html-script-tag SDK)
 */

(function(d, t) {
    var g = d.createElement(t);
    var s = d.getElementsByTagName(t)[0];

    g.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    g.defer = true;
    g.async = true;

    s.parentNode.insertBefore(g, s);

    g.onload = function() {
        if (window.vapiSDK) {
            window.vapiSDK.run({
                apiKey: "0463d2c5-554c-4d1d-87d3-3b0eef1c66e7",
                assistant: "1f9f79c5-377a-4c1a-b51a-7dfe0b9060ee",
                config: {
                    position: "bottom-right",
                    offset: "100px",
                    width: "60px",
                    height: "60px",
                    idle: {
                        color: "rgb(34, 211, 238)",
                        type: "pill",
                        title: "Habla con Ana",
                        subtitle: "Asesora ZAFESYS",
                        icon: "https://unpkg.com/lucide-static@0.469.0/icons/mic.svg"
                    },
                    loading: {
                        color: "rgb(245, 158, 11)",
                        type: "pill",
                        title: "Conectando...",
                        subtitle: "Un momento",
                        icon: "https://unpkg.com/lucide-static@0.469.0/icons/loader-2.svg"
                    },
                    active: {
                        color: "rgb(16, 185, 129)",
                        type: "pill",
                        title: "Llamada activa",
                        subtitle: "Clic para colgar",
                        icon: "https://unpkg.com/lucide-static@0.469.0/icons/phone-off.svg"
                    }
                }
            });

            console.log("[ZAFESYS] Vapi widget initialized");
        } else {
            console.error("[ZAFESYS] vapiSDK not found");
        }
    };

    g.onerror = function() {
        console.error("[ZAFESYS] Failed to load Vapi SDK");
    };

    // Estilos personalizados para el botón de Vapi
    var style = d.createElement("style");
    style.textContent = [
        ".vapi-btn {",
        "    box-shadow: 0 4px 24px rgba(34, 211, 238, 0.4) !important;",
        "    font-family: 'Sora', sans-serif !important;",
        "    transition: all 0.3s ease !important;",
        "}",
        ".vapi-btn:hover {",
        "    transform: scale(1.05) !important;",
        "    box-shadow: 0 6px 32px rgba(34, 211, 238, 0.5) !important;",
        "}",
        ".vapi-btn-is-active {",
        "    box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4) !important;",
        "}",
        ".vapi-btn-is-loading {",
        "    box-shadow: 0 4px 24px rgba(245, 158, 11, 0.4) !important;",
        "}"
    ].join("\n");
    d.head.appendChild(style);

})(document, "script");
