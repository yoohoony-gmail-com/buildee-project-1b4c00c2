import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <ShoppingBag size={24} />
              <span>쇼핑몰 사이트</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              최고의 상품을 합리적인 가격에 제공합니다. 고객 만족을 최우선으로 생각합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors">
                  전체 상품
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white text-sm transition-colors">
                  장바구니
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} />
                <span>support@shopping.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} />
                <span>1588-0000</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} />
                <span>서울특별시 강남구</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 쇼핑몰 사이트. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer