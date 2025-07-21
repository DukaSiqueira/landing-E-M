"use client"

import { useState, useEffect } from "react"
import { Heart, Calendar, Music, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Adicionar import da fonte cursiva via Google Fonts
import Head from "next/head"

export default function RomanticWebsite() {
  // 🌹 CONFIGURAÇÕES FÁCEIS DE EDITAR 🌹
  const RELATIONSHIP_START_DATE = "2022-03-24" // Formato: YYYY-MM-DD
  const COUPLE_PHOTOS = [
    "/arena.jpg?height=400&width=600",
    "/beatz.jpg?height=400&width=600",
    "/beatz2.jpg?height=400&width=600",
    "/festa-foz.jpg?height=400&width=600",
    "/formatura.jpg?height=400&width=600",
    "/praia.jpg?height=400&width=600",
    "/sh.jpg?height=400&width=600",
    "/sh2.jpg?height=400&width=600",
  ]
  const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/track/6hiKXxS7pgPKnKfCU7UJ6O?si=2f73c07d31ca4295" // Cole aqui o link embed do Spotify

  // Estados para o carrossel e contador
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Estado para os corações flutuantes
  const [hearts, setHearts] = useState<
    { left: number; top: number; fontSize: number; animationDelay: number }[]
  >([])

  // Função para calcular tempo de relacionamento
  const calculateTimeElapsed = () => {
    const startDate = new Date(RELATIONSHIP_START_DATE)
    const currentDate = new Date()

    let years = currentDate.getFullYear() - startDate.getFullYear()
    let months = currentDate.getMonth() - startDate.getMonth()
    let days = currentDate.getDate() - startDate.getDate()
    let hours = currentDate.getHours() - startDate.getHours()
    let minutes = currentDate.getMinutes() - startDate.getMinutes()
    let seconds = currentDate.getSeconds() - startDate.getSeconds()

    if (seconds < 0) {
      minutes--
      seconds += 60
    }
    if (minutes < 0) {
      hours--
      minutes += 60
    }
    if (hours < 0) {
      days--
      hours += 24
    }
    if (days < 0) {
      months--
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
      days += lastMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    setTimeElapsed({ years, months, days, hours, minutes, seconds })
  }

  // Atualizar contador a cada segundo
  useEffect(() => {
    calculateTimeElapsed()
    const interval = setInterval(calculateTimeElapsed, 1000)
    return () => clearInterval(interval)
  }, [])

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % COUPLE_PHOTOS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Só roda no cliente!
    const generated = Array.from({ length: 6 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 20 + 10,
      animationDelay: i * 0.5,
    }))
    setHearts(generated)
  }, [])

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % COUPLE_PHOTOS.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length)
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 relative overflow-x-hidden">
        {/* Corações flutuantes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {hearts.map((h, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-300 animate-pulse opacity-30 ${i % 2 === 0 ? "animate-bounce" : ""}`}
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                animationDelay: `${h.animationDelay}s`,
                fontSize: `${h.fontSize * 1.3}px`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6 animate-pulse">
                <Heart className="w-20 h-20 text-red-400 mx-auto mb-2" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Nossa História de Amor
              </h1>

              {/* Frase de amor em destaque */}
              <p className="text-2xl md:text-3xl text-pink-600 mb-8 font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                "Você é o meu para sempre. Te amo mais a cada dia!"
              </p>

              {/* Divisor decorativo com corações */}
              <div className="flex items-center justify-center mb-8">
                <span className="h-1 w-12 bg-pink-200 rounded-full mr-2" />
                <Heart className="w-6 h-6 text-pink-400 mx-2 animate-bounce" />
                <span className="h-1 w-12 bg-pink-200 rounded-full ml-2" />
              </div>

              {/* Contador de Tempo */}
              <Card className="bg-white/90 backdrop-blur-sm border-pink-100 shadow-2xl mb-10 rounded-3xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-pink-500 mr-2" />
                    <span className="text-gray-700 font-semibold text-xl md:text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Eu te amo há:</span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-pink-600" style={{ fontFamily: "'Dancing Script', cursive" }}>{timeElapsed.years}</div>
                      <div className="text-base md:text-lg text-gray-500">{timeElapsed.years === 1 ? "Ano" : "Anos"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-red-500" style={{ fontFamily: "'Dancing Script', cursive" }}>{timeElapsed.months}</div>
                      <div className="text-base md:text-lg text-gray-500">{timeElapsed.months === 1 ? "Mês" : "Meses"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-pink-600" style={{ fontFamily: "'Dancing Script', cursive" }}>{timeElapsed.days}</div>
                      <div className="text-base md:text-lg text-gray-500">{timeElapsed.days === 1 ? "Dia" : "Dias"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-red-400" style={{ fontFamily: "'Dancing Script', cursive" }}>{String(timeElapsed.hours).padStart(2, '0')}</div>
                      <div className="text-base md:text-lg text-gray-500">{timeElapsed.hours === 1 ? "Hora" : "Horas"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-pink-400" style={{ fontFamily: "'Dancing Script', cursive" }}>{String(timeElapsed.minutes).padStart(2, '0')}</div>
                      <div className="text-base md:text-lg text-gray-500">{timeElapsed.minutes === 1 ? "Minuto" : "Minutos"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-red-300" style={{ fontFamily: "'Dancing Script', cursive" }}>{String(timeElapsed.seconds).padStart(2, '0')}</div>
                      <div className="text-base md:text-lg text-gray-500">{timeElapsed.seconds === 1 ? "Segundo" : "Segundos"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção de Música */}
              <section className="py-8 px-2 md:px-8 bg-gradient-to-r from-pink-100/80 to-rose-100/80 rounded-3xl shadow-xl mb-12">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="mb-4">
                    <Music className="w-12 h-12 text-pink-500 mx-auto mb-2 animate-bounce" />
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      Nossa Música
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl">A trilha sonora do nosso amor <span className="animate-pulse">🎵</span></p>
                  </div>
                  <Card className="bg-white/95 backdrop-blur-sm border-pink-100 shadow-xl rounded-2xl">
                    <CardContent className="p-3 md:p-6">
                      <iframe
                        src={SPOTIFY_EMBED_URL}
                        width="100%"
                        height="100px"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-lg min-h-[80px] md:min-h-[120px]"
                      ></iframe>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </section>

          {/* Carrossel de Fotos */}
          <section className="py-10 px-2 md:px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Nossos Momentos Especiais
              </h2>
              {/* Divisor decorativo */}
              <div className="flex items-center justify-center mb-6">
                <span className="h-1 w-10 bg-pink-200 rounded-full mr-2" />
                <Heart className="w-5 h-5 text-pink-400 mx-2 animate-pulse" />
                <span className="h-1 w-10 bg-pink-200 rounded-full ml-2" />
              </div>
              <div className="relative">
                <Card className="overflow-hidden bg-white/95 backdrop-blur-sm border-pink-100 shadow-2xl rounded-3xl">
                  <CardContent className="p-0">
                    <div className="relative flex items-center justify-center bg-white min-h-[200px] max-h-[500px]" style={{height: 'auto'}}>
                      <img
                        src={COUPLE_PHOTOS[currentPhotoIndex] || "/placeholder.svg"}
                        alt={`Foto do casal ${currentPhotoIndex + 1}`}
                        className="max-h-[400px] w-auto max-w-full mx-auto transition-all duration-500 rounded-2xl object-contain bg-white"
                        style={{ background: "#fff" }}
                      />
                      {/* Controles do Carrossel */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-pink-600 rounded-full shadow-lg"
                        onClick={prevPhoto}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-pink-600 rounded-full shadow-lg"
                        onClick={nextPhoto}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </div>
                    {/* Indicadores */}
                    <div className="flex justify-center space-x-2 p-4 bg-gradient-to-r from-pink-50 to-rose-50">
                      {COUPLE_PHOTOS.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentPhotoIndex ? "bg-pink-500 scale-125" : "bg-pink-200 hover:bg-pink-300"
                          }`}
                          onClick={() => setCurrentPhotoIndex(index)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Footer Romântico */}
          <footer className="py-12 text-center">
            <div className="max-w-2xl mx-auto px-4">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-4 animate-pulse" />
              <p className="text-pink-700 text-2xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                "O amor não se vê com os olhos, mas com o coração" 💕
              </p>
              <p className="text-sm text-gray-400 mt-4">Feito com muito amor para celebrar nossa história</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
