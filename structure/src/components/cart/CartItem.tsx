import React from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem as CartItemType } from '../../types/index'
import { formatPrice } from '../../utils/formatPrice'
import { useCart } from '../../hooks/useCart'

interface CartItemProps {
  item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCart()

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return
    updateQuantity(item.id, newQty)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/8 transition-colors">
      {/* Product Image */}
      <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
        <img
          src={item.product.images[0] || `https://placehold.co/80x80/1a1a2e/e0e0e0?text=${encodeURIComponent(item.product.name)}`}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.product.id}`}>
          <h3 className="text-white font-semibold text-base hover:text-blue-400 transition-colors truncate">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mt-0.5">{item.product.category.name}</p>
        <div className="flex items-center gap-2 mt-1">
          {item.product.discountPrice ? (
            <>
              <span className="text-blue-400 font-semibold">
                {formatPrice(item.product.discountPrice)}
              </span>
              <span className="text-gray-500 text-sm line-through">
                {formatPrice(item.product.price)}
              </span>
            </>
          ) : (
            <span className="text-blue-400 font-semibold">
              {formatPrice(item.product.price)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="수량 감소"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="수량 증가"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[80px]">
        <p className="text-white font-bold">{formatPrice(item.subtotal)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id, item.product.name)}
        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        aria-label="상품 제거"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}

export default CartItem