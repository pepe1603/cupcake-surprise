<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'


const mensaje = ref('')
const nombreChica = 'Jasmin' // Aquí pones su nombre
const mensajeCompleto = `A veces las palabras sobran, pero los detalles no. 🧁\n\nQuería que supieras lo mucho que valoro tenerte cerca y lo especial que eres para mí.\n\n¡Disfrútalo mucho! ❤️`
const mostrarCursor = ref(true)
const cartaVisible = ref(false)
const hearts = ref<Array<{id: number; left: string; top: string; delay: number; size: number; duration: number}>>([])

const obtenerFechaActual = () => {
  const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date().toLocaleDateString('es-ES', opciones);
}

const fechaHoy = obtenerFechaActual();

const initHearts = () => {
  hearts.value = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    size: 16 + Math.random() * 24,
    duration: 3 + Math.random() * 2
  }))
}

onMounted(() => {
  initHearts()
  
  gsap.fromTo('.hero-content', 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
  )
  
  setTimeout(() => {
    cartaVisible.value = true
    gsap.fromTo('.carta-container',
      { opacity: 0, scale: 0.8, rotateX: -15 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 1, ease: 'back.out(1.7)' }
    )
    typewriterEffect()
  }, 1500)
})

const typewriterEffect = () => {
  let i = 0
  const interval = setInterval(() => {
    if (i < mensajeCompleto.length) {
      mensaje.value += mensajeCompleto.charAt(i)
      i++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        mostrarCursor.value = false
      }, 500)
    }
  }, 50)
}
</script>

<template>
  <div class="min-h-screen relative bg-black">
    <!-- Parallax Background -->
    <div class="parallax-bg fixed inset-0 -z-10"></div>
    
    <!-- Floating Hearts -->
    <div v-if="hearts.length > 0">
      <div 
        v-for="heart in hearts" 
        :key="heart.id"
        class="heart-float absolute"
        :style="{
          left: heart.left,
          top: heart.top,
          animationDelay: `${heart.delay}s`,
          animationDuration: `${heart.duration}s`,
          width: `${heart.size}px`,
          height: `${heart.size}px`
        }"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          class="text-pink-500"
          :style="{ width: `${heart.size}px`, height: `${heart.size}px` }"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div class="hero-content text-center">
        <div class="flex justify-center mb-6 float-animation">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-pink-400">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
        </div>
        
        <h1 class="text-5xl md:text-7xl neon-text text-pink-400 mb-4" style="font-family: 'Knewave', cursive;">
          CUPcake Surprise
        </h1>
        
        <p class="text-2xl md:text-3xl text-pink-300 mb-8" style="font-family: 'Sour Gummy', cursive;" data-aos="fade-up">
          ¡Has sido sorpresa! ✨
        </p>
        
        <div class="flex justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500">
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/>
          </svg>
          <span class="text-rose-400" style="font-family: 'Sour Gummy', cursive;">Desliza para descubrir</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500">
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Carta Section -->
    <section class="min-h-screen flex items-center justify-center px-4 py-20" v-show="cartaVisible">
      <div 
        class="carta-container rounded-3xl p-8 md:p-12 max-w-2xl w-full"
        data-aos="zoom-in"
      >
        <div class="text-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="mx-auto text-pink-500 mb-4">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <h2 class="text-3xl md:text-4xl text-pink-400 neon-text" style="font-family: 'Knewave', cursive;">
            Para Ti {{ nombreChica }}
          </h2>
        </div>
        
        <div class="text-lg md:text-xl  text-center text-gray-200 leading-relaxed whitespace-pre-line" style="font-family: 'Sour Gummy', cursive;">
          <span :class="{ 'typing-cursor': mostrarCursor }">{{ mensaje }}</span>
        </div>
        
        <div class="mt-8 flex justify-center">
          <div class="h-px w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20" data-aos="fade-up">
      <div class="text-center">
        <p class="text-2xl md:text-3xl text-pink-300 mb-4" style="font-family: 'Sour Gummy', cursive;">
          Espero que te haya gustado la sorpresa... ✨
        </p>

        <p class="text-lg text-gray-400 mb-8 italic" style="font-family: 'Sour Gummy', cursive;">
          "A veces los mejores mensajes no necesitan remitente."
        </p>
        
        <div class="flex justify-center items-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-rose-500">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span class="text-rose-400" style="font-family: 'Knewave', cursive;">Cupcake Surprise Edition</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-rose-500">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <!-- WhatsApp Button -->
        <a 
          href="https://wa.me/9625216439?text=¡Me encantó la sorpresa! 🧁❤️"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
          style="font-family: 'Sour Gummy', cursive;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Enviar un mensaje
        </a>

        <p class="text-gray-500 text-sm opacity-70 mt-8" style="font-family: 'Sour Gummy', cursive">
          Creado especialmente para ti • {{ fechaHoy }}
        </p>
      </div>
      
      <!-- Decorative Bottom -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-600 to-transparent opacity-50"></div>
    </footer>
  </div>
</template>
