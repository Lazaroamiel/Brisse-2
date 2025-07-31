// Función para inicializar el mapa usando OpenStreetMap (gratuito, sin API key)
function initMap() {
    try {
        console.log('Inicializando mapa con OpenStreetMap...');
        
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Elemento #map no encontrado');
            return;
        }
        
        // Coordenadas de 878, Avenida Sayago, Sayago, Montevideo, 12900, Uruguay
        const lat = -34.836287844809625;
        const lng = -56.217009674668006;
        const zoom = 15;
        
        // Crear iframe con OpenStreetMap
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`;
        
        mapElement.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="${mapUrl}"
                style="border-radius: 15px;">
            </iframe>
        `;
        
        console.log('Mapa OpenStreetMap cargado exitosamente');
        
    } catch (error) {
        console.error('Error al cargar OpenStreetMap:', error);
        initMapFallback();
    }
}

// Función de respaldo con diseño atractivo
function initMapFallback() {
    console.log('Usando mapa de respaldo...');
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #E8F5E8, #A8D5BA); border-radius: 15px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"><path d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"%23A8D5BA\" stroke-width=\"0.5\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grid)\"/></svg>') repeat; opacity: 0.3;"></div>
                <div style="text-align: center; padding: 30px; background: rgba(255,255,255,0.9); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 300px;">
                    <div style="position: relative; margin-bottom: 20px;">
                        <i class="fas fa-map-marker-alt" style="font-size: 4rem; color: #7FB069; margin-bottom: 1rem; display: block;"></i>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background: #7FB069; border-radius: 50%; animation: pulse 2s infinite;"></div>
                    </div>
                    <h3 style="color: #2C3E50; margin-bottom: 10px; font-size: 1.5rem;">Brises Residencial</h3>
                    <p style="color: #5D6D7E; margin-bottom: 15px; font-size: 1rem;">Clínica Psiquiátrica</p>
                    <div style="background: #F8F9FA; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #7FB069;">
                        <p style="color: #2C3E50; font-size: 1rem; font-weight: 500; margin: 0; line-height: 1.4;">
                            878, Avenida Sayago<br>
                            Sayago, Montevideo<br>
                            12900, Uruguay
                        </p>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <a href="https://maps.google.com/?q=878+Avenida+Sayago+Sayago+Montevideo+12900+Uruguay" 
                           target="_blank" 
                           style="display: inline-block; background: #7FB069; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease;">
                            <i class="fas fa-map" style="margin-right: 5px;"></i>
                            Ver en Google Maps
                        </a>
                        <a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=${zoom}" 
                           target="_blank" 
                           style="display: inline-block; background: #2C3E50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease;">
                            <i class="fas fa-globe" style="margin-right: 5px;"></i>
                            Ver en OSM
                        </a>
                    </div>
                </div>
            </div>
            <style>
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            </style>
        `;
    }
}

// Función para cargar el mapa cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando mapa...');
    setTimeout(() => {
        initMap();
    }, 1000);
});

// Si la función initMap no se llama automáticamente, llamarla después de 2 segundos
setTimeout(() => {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Google Maps no disponible, usando OpenStreetMap');
        initMap();
    }
}, 2000); 