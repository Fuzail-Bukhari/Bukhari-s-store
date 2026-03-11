import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart, ArrowLeft, Package, Tag, CheckCircle } from "lucide-react";

// Extra product images (shown as thumbnails)
const extraImages = [
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [mainImage, setMainImage]   = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity]     = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    for (let i = 0; i < quantity; i++) addToCart({ ...product, selectedSize });
    toast.success(`${product.name} (${selectedSize}) × ${quantity} added to cart!`);
  };

  // Build thumbnail list: product image + extras
  const thumbnails = product
    ? [product.image, ...extraImages.filter(img => img !== product.image).slice(0, 3)]
    : [];

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"/>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <p className="text-4xl">😕</p>
      <p className="font-black text-xl">Product not found</p>
      <Link to="/" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition">
        Back to Store
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-black transition font-medium flex items-center gap-1">
            <ArrowLeft size={14}/> Back
          </Link>
          <span>/</span>
          <span className="text-gray-400">{product.category}</span>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ══════════ LEFT — IMAGES ══════════ */}
          <div className="flex flex-col gap-4">

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gray-50 aspect-square">
              <img
                src={mainImage}
                alt={product.name}
                onError={e => e.target.src = "https://placehold.co/600x600?text=No+Image"}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Category badge */}
              <span className="absolute top-4 left-4 bg-black text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {product.category}
              </span>
              {/* Stock badge */}
              {product.countInStock > 0 ? (
                <span className="absolute top-4 right-4 bg-white border-2 border-black text-black text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <CheckCircle size={12}/> In Stock
                </span>
              ) : (
                <span className="absolute top-4 right-4 bg-black text-white text-xs font-black px-3 py-1.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img)}
                  className={`overflow-hidden rounded-xl border-2 transition-all aspect-square ${
                    mainImage === img ? "border-black shadow-md" : "border-gray-100 hover:border-gray-400"
                  }`}>
                  <img src={img} alt={`view-${i}`}
                    onError={e => e.target.src = "https://placehold.co/200x200?text=Img"}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"/>
                </button>
              ))}
            </div>
          </div>

          {/* ══════════ RIGHT — DETAILS ══════════ */}
          <div className="flex flex-col">

            {/* Brand + Name */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={13} className="text-gray-400"/>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-black text-black leading-tight mb-2">{product.name}</h1>
              <div className="w-12 h-1 bg-black rounded-full"/>
            </div>

            {/* Price */}
            <div className="bg-black text-white rounded-2xl px-6 py-5 mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Price</p>
                <p className="text-3xl font-black">Rs. {product.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Stock</p>
                <p className="text-white font-bold flex items-center gap-1">
                  <Package size={14}/> {product.countInStock} left
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-black text-black text-sm uppercase tracking-widest mb-2">Description</h3>
              <p className="text-gray-500 leading-relaxed text-sm border-l-4 border-gray-100 pl-4">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-black text-sm uppercase tracking-widest">Select Size</h3>
                {selectedSize && (
                  <span className="text-xs text-gray-400 font-semibold">Selected: <span className="text-black font-black">{selectedSize}</span></span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border-2 font-black text-sm transition-all hover:scale-105 ${
                      selectedSize === size
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-black border-gray-200 hover:border-black"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-gray-400 text-xs mt-2">* Please select a size to continue</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-black text-black text-sm uppercase tracking-widest mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-black font-black hover:bg-gray-100 transition text-lg">
                    −
                  </button>
                  <span className="px-5 py-3 font-black text-black text-lg border-x-2 border-gray-200 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.countInStock, q + 1))}
                    className="px-4 py-3 text-black font-black hover:bg-gray-100 transition text-lg">
                    +
                  </button>
                </div>
                <p className="text-gray-400 text-sm">
                  Total: <span className="text-black font-black">Rs. {(product.price * quantity).toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all ${
                product.countInStock === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 active:scale-95 shadow-lg hover:shadow-xl"
              }`}>
              <ShoppingCart size={22}/>
              {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* Info strips */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                {icon:"🚚", title:"Free Delivery", sub:"Above Rs. 5,000"},
                {icon:"↩️", title:"Easy Returns", sub:"Within 7 days"},
                {icon:"✅", title:"100% Original", sub:"Guaranteed"},
              ].map(f => (
                <div key={f.title} className="border-2 border-gray-100 rounded-xl p-3 text-center hover:border-black transition">
                  <p className="text-2xl mb-1">{f.icon}</p>
                  <p className="font-black text-black text-xs">{f.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{f.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}