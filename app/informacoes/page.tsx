"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, User, CreditCard, Calendar, TrendingUp, Building } from "lucide-react"
import Image from "next/image"

type SituacaoCPF = "limpo" | "negativado"

interface ResultadoCPF {
  nome: string
  cpf: string
  dataNascimento: string
  situacao: SituacaoCPF
  motivo?: string
  score?: number
  orgaos?: string[]
}

export default function InformacoesPage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    fullName: "",
    cpf: "",
    birthDate: "",
  })
  const [resultado, setResultado] = useState<ResultadoCPF | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)

      setTimeout(() => {
        setResultado({
          nome: parsedData.fullName,
          cpf: parsedData.cpf,
          dataNascimento: parsedData.birthDate,
          situacao: "negativado",
          motivo: "Dívida ativa com Empresa XPTO no valor de R$ 1.245,30",
          score: 580,
          orgaos: ["Serasa", "SPC Brasil", "Boa Vista"],
        })

        setLoading(false)
      }, 1500)
    } else {
      router.push("/")
    }
  }, [router])

  const handleBack = () => {
    router.push("/home")
  }

  const handleSolicitarNegociacao = () => {
    alert("Funcionalidade de negociação em desenvolvimento!")
  }

  return (
    <main className="min-h-screen bg-purple-50 pb-20">
      {/* Header */}
      <header className="nubank-bg p-4 pt-12 pb-6">
        <div className="flex items-center">
          <button onClick={handleBack} className="text-white mr-3">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-medium">Informações do CPF</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        <Card className="rounded-2xl">
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col items-center justify-center py-4 space-y-2">
              <Image src="/nubank-logo.png" alt="Nubank Logo" width={120} height={48} className="mb-2" />
              <h2 className="text-xl font-bold text-center">Resultado da análise do seu CPF</h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
                <p className="mt-4 text-gray-600">Consultando informações...</p>
              </div>
            ) : resultado ? (
              <>
                {/* Informações pessoais */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="text-purple-600 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Nome completo</p>
                      <p className="font-medium">{resultado.nome}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard className="text-purple-600 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">CPF</p>
                      <p className="font-medium">{resultado.cpf}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="text-purple-600 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Data de nascimento</p>
                      <p className="font-medium">{resultado.dataNascimento}</p>
                    </div>
                  </div>
                </div>

                {/* Status da situação */}
                <div className="p-4 rounded-lg bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-red-700">
                        Atenção! Seu CPF está com pendências financeiras registradas.
                      </h3>
                      {resultado.motivo && <p className="text-sm mt-1 text-gray-600">Motivo: {resultado.motivo}</p>}
                    </div>
                  </div>
                </div>

                {/* Score de crédito */}
                {resultado.score && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="text-purple-600 h-5 w-5" />
                      <h3 className="font-medium">Score de crédito</h3>
                    </div>
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-red-500"
                        style={{ width: `${(resultado.score - 500) / 3}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">500</span>
                      <span className="text-xs font-medium">{resultado.score}</span>
                      <span className="text-xs text-gray-500">800</span>
                    </div>
                    <p className="text-xs text-red-600 mt-2">
                      Seu score está abaixo da média. Isso pode dificultar a aprovação de crédito.
                    </p>
                  </div>
                )}

                {/* Órgãos consultados */}
                {resultado.orgaos && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="text-purple-600 h-5 w-5" />
                      <h3 className="font-medium">Órgãos consultados</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {resultado.orgaos.map((orgao, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-xs">
                          {orgao}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detalhes da negativação */}
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-medium text-red-700 mb-2">Detalhes da negativação</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm font-medium">Empresa XPTO</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Valor: <span className="font-medium text-gray-700">R$ 1.245,30</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Desde: <span className="font-medium text-gray-700">15/03/2025</span>
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm font-medium">Banco ABC</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Valor: <span className="font-medium text-gray-700">R$ 785,45</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Desde: <span className="font-medium text-gray-700">22/02/2025</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão de ação */}
                <Button onClick={handleSolicitarNegociacao} className="w-full nubank-bg hover:bg-purple-700 rounded-xl">
                  Solicitar negociação
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Não foi possível carregar as informações. Tente novamente mais tarde.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}