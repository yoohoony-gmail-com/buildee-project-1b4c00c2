import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react'
import { getOrderById } from '../api/orderApi'
import Button from '../components/ui/Button'
import { Order, ShippingAddress } from '../types/index'
import { formatPrice } from '../utils/formatPrice'

interface LocationState {
  address?: ShippingAddress
  totalPrice?: number
}

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const state = location.state as LocationState | null

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return
      try {
        const data = await getOrderById(id)
        setOrder(data)
      } catch {
        // Use state data as fallback
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const steps = [
    { label: '주문 접수', icon: CheckCircle, done: true },
    { label: '결제 완료', icon: CheckCircle, done: true },
    { label: '배송 준비', icon: Package, done: false },
    { label: '배송 중', icon: Package, done: false },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success Icon */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-6">
          <CheckCircle size={48} className="text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">주문이 완료되었습니다!</h1>
        <p className="text-gray-400">
          주문번호:{' '}
          <span className="text-blue-400 font-mono font-semibold">{id}</span>
        </p>
      </div>

      {/* Order Status Steps */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-white font-bold mb-6">주문 진행 상태</h2>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.done
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-white/5 border-white/20 text-gray-500'
                  }`}
                >
                  <step.icon size={20} />
                </div>
                <span
                  className={`text-xs font-medium text-center ${
                    step.done ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    steps[index + 1].done ? 'bg-green-500/50' : 'bg-white/10'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Shipping Info */}
      {state?.address && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-white font-bold mb-4">배송 정보</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">받는 분</span>
              <span className="text-white">{state.address.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">전화번호</span>
              <span className="text-white">{state.address.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">배송 주소</span>
              <span className="text-white text-right max-w-[60%]">
                {state.address.address} {state.address.detailAddress}
              </span>
            </div>
            {state.totalPrice !== undefined && (
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-gray-400 font-medium">결제 금액</span>
                <span className="text-blue-400 font-bold text-lg">
                  {formatPrice(state.totalPrice)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order from API */}
      {order && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-white font-bold mb-4">주문 상세</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-white">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 border-t border-white/10">
              <span className="text-white font-bold">총 결제금액</span>
              <span className="text-blue-400 font-bold">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Notice */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 text-sm text-blue-300">
        📧 주문 확인 이메일이 발송되었습니다. 배송 현황은 마이페이지에서 확인하실 수 있습니다.
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/" className="flex-1">
          <Button variant="outline" size="lg" fullWidth>
            <Home size={18} />
            홈으로
          </Button>
        </Link>
        <Link to="/products" className="flex-1">
          <Button variant="primary" size="lg" fullWidth>
            <ShoppingBag size={18} />
            계속 쇼핑하기
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmationPage