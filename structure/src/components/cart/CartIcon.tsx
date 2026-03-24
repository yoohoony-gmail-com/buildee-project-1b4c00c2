import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const CartIcon: React.FC = () => {
  const totalItems = useCartStore((state) => state.cart.totalItems)

  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center justify-center p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
      aria-label={`장바구니 (${totalItems}개)`}
    >
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full px-1 shadow-lg">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}

export default CartIcon