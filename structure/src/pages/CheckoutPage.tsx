import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../api/orderApi'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/ui/Button'
import { formatPrice } from '../utils/formatPrice'
import { ShippingAddress } from '../types/index'

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    zipCode: '',
  })

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({})

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {}
    if (!address.name.trim()) newErrors.name = '이름을 입력해주세요'
    if (!address.phone.trim()) newErrors.phone = '전화번호를 입력해주세요'
    if (!address.address.trim()) newErrors.address = '주소를 입력해주세요'
    if (!address.zipCode.trim()) newErrors.zipCode = '우편번호를 입력해주세요'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (cart.items.length === 0) {
      toast.error('장바구니가 비어있습니다.')
      return
    }

    setIsSubmitting(true)
    try {
      const order = await createOrder({ shippingAddress: address })
      clearCart()
      navigate(`/orders/${order.id}/confirmation`)
    } catch {
      // Mock order for demo
      const mockOrderId = `order-${Date.now()}`
      clearCart()
      navigate(`/orders/${mockOrderId}/confirmation`, {
        state: { address, totalPrice: cart.totalPrice + (cart.totalPrice >= 50000 ? 0 : 3000) },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-xl mb-4">장바구니가 비어있습니다.</p>
        <Link to="/products">
          <Button variant="primary">쇼핑 계속하기</Button>
        </Link>
      </div>
    )
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
  const labelClass = 'block text-sm font-medium text-gray-300 mb-1.5'
  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-white">결제</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-400" />
                배송 정보
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>받는 분 이름 *</label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={address.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass}
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                <div>
                  <label className={labelClass}>전화번호 *</label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    value={address.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass}
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>

                <div>
                  <label className={labelClass}>우편번호 *</label>
                  <input
                    type="text"
                    placeholder="12345"
                    value={address.zipCode}
                    onChange={(e) => handleChange('zipCode', e.target.value)}
                    className={inputClass}
                  />
                  {errors.zipCode && <p className={errorClass}>{errors.zipCode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>주소 *</label>
                  <input
                    type="text"
                    placeholder="서울특별시 강남구 테헤란로 123"
                    value={address.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={inputClass}
                  />
                  {errors.address && <p className={errorClass}>{errors.address}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>상세 주소</label>
                  <input
                    type="text"
                    placeholder="아파트 동/호수, 건물명 등"
                    value={address.detailAddress}
                    onChange={(e) => handleChange('detailAddress', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-bold text-lg mb-4">주문 상품</h2>
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0] || `https://placehold.co/50x50/1a1a2e/e0e0e0?text=${item.product.name}`}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-gray-400 text-xs">수량: {item.quantity}</p>
                    </div>
                    <span className="text-white font-medium text-sm">
                      {formatPrice(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1 space-y-4">
            <CartSummary showShipping />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              주문 확정하기
            </Button>
            <p className="text-center text-gray-500 text-xs">
              주문 확정 시 이용약관에 동의한 것으로 간주합니다.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage