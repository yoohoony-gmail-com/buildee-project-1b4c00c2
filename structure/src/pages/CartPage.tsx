import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import CartItemComponent from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/ui/Button'
import { formatPrice } from '../utils/formatPrice'

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag size={80} className="mx-auto text-gray-600 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">장바구니가 비어있습니다</h1>
          <p className="text-gray-400 mb-8">
            마음에 드는 상품을 장바구니에 담아보세요!
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              쇼핑 시작하기
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">장바구니</h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
          전체 삭제
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}

          <div className="pt-4 border-t border-white/10">
            <Link to="/products">
              <Button variant="ghost" size="sm">
                <- 계속 쇼핑하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
          <div className="mt-4">
            <Link to="/checkout">
              <Button variant="primary" size="lg" fullWidth>
                결제하기
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
          <p className="text-center text-gray-500 text-xs mt-3">
            안전한 결제를 보장합니다 🔒
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartPage