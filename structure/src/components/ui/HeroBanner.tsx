import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const HeroBanner: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: '60vh', minHeight: '400px' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://picsum.photos/1600/900?random=1')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          최고의 상품을 만나보세요!
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow">
          편리하고 다양한 상품을 제공합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" variant="primary">
              쇼핑 시작하기
            </Button>
          </Link>
          <Link to="/products?featured=true">
            <Button size="lg" variant="outline">
              인기 상품 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner