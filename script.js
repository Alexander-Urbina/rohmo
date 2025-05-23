// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// GSAP animations
function initAnimations() {
    // Nav animation
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Hero animations
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6');

    // Feature cards animation
    gsap.registerPlugin(ScrollTrigger);
    
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card) => {
        const delay = card.getAttribute('data-delay') || 0;
        
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: parseFloat(delay),
            ease: 'power3.out'
        });
    });

    // Timeline steps animation
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Contact section animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
}

// THREE.js Road Visualization
function initRoadVisualization() {
    const container = document.getElementById('road-3d-canvas');
    
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x180408);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x3a86ff, 1, 20);
    pointLight1.position.set(5, 2, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff006e, 1, 20);
    pointLight2.position.set(-5, 2, 0);
    scene.add(pointLight2);
    
    // Road
    const roadGeometry = new THREE.PlaneGeometry(10, 30, 20, 20);
    const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8,
        metalness: 0.2
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -5;
    scene.add(road);
    
    // Road markings
    const lineGeometry = new THREE.PlaneGeometry(0.2, 20);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.01;
    line.position.z = -5;
    scene.add(line);

    // Pothole 1
    const pothole1Geometry = new THREE.CircleGeometry(0.8, 32);
    const pothole1Material = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 1,
        metalness: 0,
        side: THREE.DoubleSide
    });
    const pothole1 = new THREE.Mesh(pothole1Geometry, pothole1Material);
    pothole1.rotation.x = -Math.PI / 2;
    pothole1.position.set(2, 0.02, -8);
    scene.add(pothole1);

    // Highlighting pothole 1
    const highlight1Geometry = new THREE.RingGeometry(0.8, 1.2, 32);
    const highlight1Material = new THREE.MeshBasicMaterial({
        color: 0xff006e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    const highlight1 = new THREE.Mesh(highlight1Geometry, highlight1Material);
    highlight1.rotation.x = -Math.PI / 2;
    highlight1.position.set(2, 0.03, -8);
    scene.add(highlight1);

    // Pothole 2
    const pothole2Geometry = new THREE.CircleGeometry(0.5, 32);
    const pothole2Material = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 1,
        metalness: 0,
        side: THREE.DoubleSide
    });
    const pothole2 = new THREE.Mesh(pothole2Geometry, pothole2Material);
    pothole2.rotation.x = -Math.PI / 2;
    pothole2.position.set(-2.5, 0.02, -3);
    scene.add(pothole2);

    // Highlighting pothole 2
    const highlight2Geometry = new THREE.RingGeometry(0.5, 0.9, 32);
    const highlight2Material = new THREE.MeshBasicMaterial({
        color: 0xff006e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    const highlight2 = new THREE.Mesh(highlight2Geometry, highlight2Material);
    highlight2.rotation.x = -Math.PI / 2;
    highlight2.position.set(-2.5, 0.03, -3);
    scene.add(highlight2);

    // Crack
    const crackPoints = [];
    crackPoints.push(new THREE.Vector3(-3, 0, 0));
    crackPoints.push(new THREE.Vector3(-2, 0, -2));
    crackPoints.push(new THREE.Vector3(-1, 0, -3));
    crackPoints.push(new THREE.Vector3(0, 0, -5));
    crackPoints.push(new THREE.Vector3(1, 0, -7));
    
    const crackGeometry = new THREE.BufferGeometry().setFromPoints(crackPoints);
    const crackMaterial = new THREE.LineBasicMaterial({ 
        color: 0x222222,
        linewidth: 3
    });
    const crack = new THREE.Line(crackGeometry, crackMaterial);
    crack.position.y = 0.03;
    scene.add(crack);
    
    // Highlighted crack (animation)
    const crackHighlightMaterial = new THREE.LineBasicMaterial({
        color: 0x3a86ff,
        linewidth: 3,
        transparent: true,
        opacity: 0.8
    });
    const crackHighlight = new THREE.Line(crackGeometry, crackHighlightMaterial);
    crackHighlight.position.y = 0.04;
    scene.add(crackHighlight);

    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime();
        
        // Animate highlight rings
        highlight1.scale.set(
            1 + Math.sin(time * 2) * 0.2,
            1 + Math.sin(time * 2) * 0.2,
            1
        );
        highlight1.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
        
        highlight2.scale.set(
            1 + Math.sin(time * 2 + 1) * 0.2,
            1 + Math.sin(time * 2 + 1) * 0.2,
            1
        );
        highlight2.material.opacity = 0.3 + Math.sin(time * 2 + 1) * 0.2;

        // Animate crack highlight
        crackHighlight.material.opacity = 0.3 + Math.sin(time * 1.5) * 0.3;
        
        // Slight camera movement for more dynamic feel
        camera.position.y = 5 + Math.sin(time * 0.5) * 0.2;
        camera.position.x = Math.sin(time * 0.3) * 0.5;
        camera.lookAt(0, 0, -5);
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Form handling
function initFormHandling() {
    const form = document.getElementById('demo-request');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real implementation, you would send the form data to your server
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', formValues);
        
        // Show success message
        form.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your interest!</h3>
                <p>We'll get back to you within 24 hours.</p>
            </div>
        `;
    });
}

// Initialize everything when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initRoadVisualization();
    initFormHandling();
}); 