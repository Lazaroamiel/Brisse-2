// Función para inicializar el mapa de Google Maps
function initMap() {
    try {
        console.log('Inicializando mapa...');
        
        // Verificar que el elemento del mapa existe
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Elemento #map no encontrado');
            return;
        }
        
        // Coordenadas de 878, Avenida Sayago, Sayago, Montevideo, 12900, Uruguay
        const brisesResidencial = { 
            lat: -34.8581, 
            lng: -56.1708 
        };
        
        console.log('Coordenadas:', brisesResidencial);
        
        // Crear el mapa
        const map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: brisesResidencial,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
        
        console.log('Mapa creado exitosamente');
        
        // Agregar marcador
        const marker = new google.maps.Marker({
            position: brisesResidencial,
            map: map,
            title: 'Brises Residencial - Clínica Psiquiátrica',
            animation: google.maps.Animation.DROP
        });
        
        console.log('Marcador agregado');
        
        // Agregar ventana de información
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 200px;">
                    <h3 style="margin: 0 0 5px 0; color: #2E7D32;">Brises Residencial</h3>
                    <p style="margin: 0; color: #666;">Clínica Psiquiátrica</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #888;">
                        878, Avenida Sayago<br>
                        Sayago, Montevideo<br>
                        12900, Uruguay
                    </p>
                </div>
            `
        });
        
        // Mostrar ventana de información al hacer clic en el marcador
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        // Mostrar ventana de información automáticamente después de 1 segundo
        setTimeout(() => {
            infoWindow.open(map, marker);
        }, 1000);
        
        console.log('Mapa inicializado completamente');
        
    } catch (error) {
        console.error('Error al inicializar el mapa:', error);
        
        // Mostrar mensaje de error en el elemento del mapa
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; border-radius: 15px;">
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #7FB069; margin-bottom: 1rem;"></i>
                        <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Brises Residencial</h3>
                        <p style="color: #5D6D7E; margin-bottom: 0.5rem;">Clínica Psiquiátrica</p>
                        <p style="color: #888; font-size: 0.9rem;">
                            878, Avenida Sayago<br>
                            Sayago, Montevideo<br>
                            12900, Uruguay
                        </p>
                        <p style="color: #999; font-size: 0.8rem; margin-top: 1rem;">
                            Mapa temporalmente no disponible
                        </p>
                    </div>
                </div>
            `;
        }
    }
}

// Función de respaldo en caso de que Google Maps no cargue
function initMapFallback() {
    console.log('Usando mapa de respaldo...');
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #E8F5E8, #A8D5BA); border-radius: 15px;">
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-map-marker-alt" style="font-size: 4rem; color: #7FB069; margin-bottom: 1rem;"></i>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Brises Residencial</h3>
                    <p style="color: #5D6D7E; margin-bottom: 0.5rem;">Clínica Psiquiátrica</p>
                    <p style="color: #2C3E50; font-size: 1rem; font-weight: 500;">
                        878, Avenida Sayago<br>
                        Sayago, Montevideo<br>
                        12900, Uruguay
                    </p>
                    <div style="margin-top: 1rem;">
                        <a href="https://maps.google.com/?q=878+Avenida+Sayago+Sayago+Montevideo+12900+Uruguay" 
                           target="_blank" 
                           style="display: inline-block; background: #7FB069; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: 500;">
                            Ver en Google Maps
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Verificar si Google Maps está disponible después de 3 segundos
setTimeout(() => {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Google Maps no disponible, usando respaldo');
        initMapFallback();
    }
}, 3000); 