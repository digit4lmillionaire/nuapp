"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Eye,
  EyeOff,
  Settings,
  ArrowRight,
  CreditCard,
  Shield,
  Zap,
  QrCode,
  Receipt,
  ArrowUpRight,
  PiggyBank,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    fullName: "",
    cpf: "",
    birthDate: "",
  })
  const [showBalance, setShowBalance] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)

      const nameParts = parsedData.fullName.split(" ")
      setFirstName(nameParts[0])
      setIsVerifying(false)
    } else {
      router.push("/")
    }
  }, [router])

  const handleIndenizacaoClick = () => {
    router.push("/resultado")
  }

  const handleInformacoesClick = () => {
    router.push("/informacoes")
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen nubank-bg flex flex-col items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="flex justify-center mb-4">
            <Image src="/nubank-logo.png" alt="Nubank Logo" width={200} height={80} />
          </div>
          <h2 className="text-xl font-medium mb-2">Verificando seu acesso</h2>
          <p className="text-white/80">Por favor, aguarde um momento...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <header className="nubank-bg p-4 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-300 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
              {firstName ? firstName.charAt(0).toUpperCase() : "U"}
            </div>
            <h1 className="text-white text-lg font-medium">Olá, {firstName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowBalance(!showBalance)} className="text-white">
              {showBalance ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
            <button className="text-white">
              <Settings size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Account Balance */}
        <div className="card">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm text-gray-500">Saldo disponível</h2>
            <ArrowRight size={18} className="text-gray-500" />
          </div>
          <div className="text-2xl font-medium text-gray-900">{showBalance ? "R$ 7.854,63" : "R$ ••••••"}</div>
        </div>

        {/* Promotional Card */}
        <div
          className="card bg-gradient-to-r from-purple-600 to-purple-700 text-white"
          onClick={handleIndenizacaoClick}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-medium">Indenização disponível</h3>
              <p className="text-sm opacity-90">Você tem direito a uma indenização</p>
              <div className="flex items-center gap-1 text-sm">
                <span>Ver detalhes</span>
                <ArrowRight size={14} />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src="/nubank-card-icon.png" alt="Cartão Nubank" width={60} height={60} />
            </div>
          </div>
        </div>

        {/* Informações do CPF Card */}
        <div
          className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          onClick={handleInformacoesClick}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-medium">Consulta de CPF</h3>
              <p className="text-sm opacity-90">Verifique a situação do seu CPF</p>
              <div className="flex items-center gap-1 text-sm">
                <span>Ver informações</span>
                <ArrowRight size={14} />
              </div>
            </div>
            <div className="flex-shrink-0 bg-purple-400 p-3 rounded-full">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="py-2">
          <h2 className="text-base font-medium mb-3 px-1">Ações rápidas</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 px-1">
            <button className="action-button">
              <QrCode className="action-icon" />
              <span className="text-xs">Pix</span>
            </button>
            <button className="action-button">
              <Receipt className="action-icon" />
              <span className="text-xs">Pagar</span>
            </button>
            <button className="action-button">
              <ArrowUpRight className="action-icon" />
              <span className="text-xs">Transferir</span>
            </button>
            <button className="action-button">
              <PiggyBank className="action-icon" />
              <span className="text-xs">Depositar</span>
            </button>
          </div>
        </div>

        {/* Cashback */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="nubank-text" />
                <h3 className="font-medium">Cashback e Benefícios</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">R$ 42,75 disponível</p>
            </div>
            <ArrowRight size={18} className="text-gray-500" />
          </div>
        </div>

        {/* My Cards */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="nubank-text" />
                <h3 className="font-medium">Meus cartões</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Gerencie seus cartões</p>
            </div>
            <ArrowRight size={18} className="text-gray-500" />
          </div>
        </div>

        {/* Protection Center */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="nubank-text" />
                <h3 className="font-medium">Central de Proteção</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Segurança para sua conta</p>
            </div>
            <ArrowRight size={18} className="text-gray-500" />
          </div>
        </div>

        {/* Indemnification Button */}
        <Button onClick={handleIndenizacaoClick} className="w-full nubank-bg hover:bg-purple-700 rounded-xl mt-4">
          Ver minha indenização
        </Button>
      </div>
    </main>
  )
}