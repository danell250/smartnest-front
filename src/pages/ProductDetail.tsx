import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StoreAccountButton from "@/components/StoreAccountButton";
import SiteFooter from "@/components/SiteFooter";
import { catalogProducts, getProductById } from "@/data/catalog";
import { Star, ChevronLeft, ShoppingCart, Heart, Check, Truck, Shield, RotateCcw, CheckCircle, ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLocation } from "wouter";
import { toast } from "sonner";

/**
 * Product Detail Page
 * Design Philosophy: Premium tech-forward aesthetic with clean minimalism
 * - Comprehensive product information with multiple images
 * - Supplier details and specifications
 * - Related products recommendations
 */

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const productId = parseInt(params?.id || "1");
  const product = getProductById(productId);
  const { addToCart, getItemCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<any[]>([]);
  const itemCount = getItemCount();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Product Not Found</h1>
          <Button onClick={() => setLocation("/products")} className="bg-primary hover:bg-blue-700 text-white">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = catalogProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} unit(s) added to cart!`);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        priceZAR: product.priceZAR,
        image: product.image
      });
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewTitle.trim() || !reviewText.trim() || !reviewerName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newReview = {
      id: (product?.reviews?.length || 0) + submittedReviews.length + 1,
      author: reviewerName,
      location: "South Africa",
      rating: reviewRating,
      title: reviewTitle,
      text: reviewText,
      verified: false,
      date: "just now",
      helpful: 0
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    setReviewTitle("");
    setReviewText("");
    setReviewerName("");
    setReviewerEmail("");
    setReviewRating(5);
    setShowReviewForm(false);
    toast.success("Thank you! Your review has been submitted for moderation.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/products")}
            className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/smartnest-sa-logo-4SozQvwRC7AYGTMjDcFgTA.webp" 
              alt="SmartNest SA" 
              className="w-8 h-8"
            />
            <span className="font-bold text-lg text-foreground">SmartNest SA</span>
          </div>
          <div className="flex items-center gap-3">
            <StoreAccountButton />
            <button
              onClick={() => setLocation("/cart")}
              className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="py-8 bg-background">
        <div className="container space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-3">
              <div className="bg-muted rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-colors aspect-square ${
                      selectedImage === idx ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-primary font-semibold mb-1">{product.brand}</p>
                  <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>

                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              {/* Pricing */}
              <Card className="p-4 bg-white border border-border">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground">Price (incl. VAT)</p>
                  <p className="text-2xl font-bold text-primary">R{product.priceZAR.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Min Order: {product.minOrder}</span>
                </div>
              </Card>

              {/* Quantity and Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-foreground hover:bg-muted transition-colors text-lg"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center border-l border-r border-border py-2 focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-foreground hover:bg-muted transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleWishlist}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      isInWishlist(product.id)
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-blue-700 text-white py-3 font-semibold gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">South African</p>
                    <p className="text-xs font-semibold text-foreground">Owned & Operated</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50/50 rounded-lg border border-green-100">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Local Warranty</p>
                    <p className="text-xs font-semibold text-foreground">Support Included</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fast Shipping</p>
                    <p className="text-xs font-semibold text-foreground">3-7 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">30-Day</p>
                    <p className="text-xs font-semibold text-foreground">Returns</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Door-to-Door</p>
                    <p className="text-xs font-semibold text-foreground">Local Courier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <Card className="p-5">
              <h2 className="text-lg font-bold text-foreground mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center pb-3 border-b border-border last:border-b-0">
                    <span className="text-xs text-muted-foreground">{key}</span>
                    <span className="text-xs font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Highlights */}
          <Card className="p-5 bg-white border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Why Choose This Product?</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {product.highlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Customer Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-3">
                {product.reviews.map((review: any) => (
                  <Card key={review.id} className="p-4 border border-border">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                              ))}
                              {[...Array(5 - review.rating)].map((_, i) => (
                                <Star key={i + review.rating} className="w-3 h-3 text-border" />
                              ))}
                            </div>
                            {review.verified && (
                              <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </div>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-foreground">{review.title}</h4>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{review.date}</span>
                      </div>

                      <p className="text-xs text-foreground leading-relaxed">{review.text}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">{review.author}</span>
                          <span className="mx-1">•</span>
                          <span>{review.location}</span>
                        </div>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs">
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setLocation(`/product/${relatedProduct.id}`)}>
                    <div className="relative overflow-hidden bg-muted aspect-square">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-primary font-semibold mb-1">{relatedProduct.brand}</p>
                      <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-primary">R{relatedProduct.priceZAR.toLocaleString()}</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="text-xs text-foreground">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="mt-20">
        <SiteFooter />
      </div>
    </div>
  );
}
