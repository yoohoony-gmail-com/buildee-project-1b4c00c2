import React from 'react'
import { formatPrice } from '../../utils/formatPrice'
import { useCartStore } from '../../store/cartStore'

interface CartSummaryProps {
  showShipping?: boolean
}

const CartSummary: React.FC<CartSummaryProps> = ({ showShipping = true }) => {
  const cart = useCartStore((state) => state.cart)

  const subtotal = cart.totalPrice
  const shippingFee = subtotal >= 50000 ? 0 : 3000
  const total = subtotal + shippingFee

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
      <h3 className="text-white font-bold text-lg border-b border-white/10 pb-4">
        주문 요약
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">상품 수량</span>
          <span className="text-white">{cart.totalItems}개</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">상품 금액</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>
        {showShipping && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">배송비</span>
            <span className={shippingFee === 0 ? 'text-green-400' : 'text-white'}>
              {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
            </span>
          </div>
        )}
        {showShipping && subtotal < 50000 && subtotal > 0 && (
          <p className="text-xs text-gray-500">
            {formatPrice(50000 - subtotal)} 더 구매하시면 무료배송!
          </p>
        )}
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between">
          <span className="text-white font-bold text-lg">총 결제금액</span>
          <span className="text-blue-400 font-bold text-xl">
            {formatPrice(showShipping ? total : subtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartSummary