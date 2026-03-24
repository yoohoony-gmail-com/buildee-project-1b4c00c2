import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const displayImages =
    images.length > 0
      ? images
      : [`https://placehold.co/600x400/1a1a2e/e0e0e0?text=${encodeURIComponent(productName)}`]

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10">
        <img
          src={displayImages[selectedIndex]}
          alt={`${productName} - ${selectedIndex + 1}`}
          className="w-full aspect-square object-cover cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        />
        <button
          className="absolute top-3 right-3 p-2 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setLightboxOpen(true)}
          aria-label="확대"
        >
          <ZoomIn size={18} />
        </button>

        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="이전 이미지"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="다음 이미지"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-blue-500 opacity-100'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`썸네일 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
            onClick={() => setLightboxOpen(false)}
            aria-label="닫기"
          >
            ✕
          </button>
          <img
            src={displayImages[selectedIndex]}
            alt={productName}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery