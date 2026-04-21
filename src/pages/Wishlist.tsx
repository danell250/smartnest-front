import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StoreAccountButton from "@/components/StoreAccountButton";
import { Star, Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useLocation } from "wouter";
import { toast } from "sonner";

/**
 * Wishlist Page
 * Design Philosophy: Clean, minimal interface for saved products
 * - Shows all wishlist items with quick add-to-cart functionality
 * - Allows users to remove items from wishlist
 * - Empty state when no items are saved
 */

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const totalPrice = wishlist.reduce((sum, item) => sum + item.priceZAR, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/smartnest-sa-logo-4SozQvwRC7AYGTMjDcFgTA.webp" 
              alt="SmartNest SA" 
              className="w-10 h-10"
            />
            <span className="font-bold text-xl text-foreground">SmartNest SA</span>
          </div>
          <div className="flex items-center gap-4">
            <StoreAccountButton />
            <button
              onClick={() => setLocation("/")}
              className="text-primary hover:text-blue-700 font-medium transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </nav>

      {/* Wishlist Content */}
      <div className="container py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              {wishlist.length === 0
                ? "Your wishlist is empty. Start adding your favorite products!"
                : `You have ${wishlist.length} item${wishlist.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>

          {wishlist.length > 0 ? (
            <>
              {/* Wishlist Summary */}
              <Card className="p-6 bg-blue-50 border-primary/20">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Items</p>
                    <p className="text-3xl font-bold text-foreground">{wishlist.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                    <p className="text-3xl font-bold text-primary">R{totalPrice.toLocaleString()}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button
                      onClick={() => clearWishlist()}
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    >
                      Clear Wishlist
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    <div className="relative overflow-hidden bg-muted h-48">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-4 left-4 bg-white text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {product.brand}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground mb-4 line-clamp-2">{product.name}</h3>

                      <div className="border-t border-border pt-4 space-y-3 mt-auto">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Price (incl. VAT):</span>
                          <span className="text-2xl font-bold text-primary">R{product.priceZAR.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-primary hover:bg-blue-700 text-white gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive/10"
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">No Saved Products</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start building your wishlist by clicking the heart icon on any product. Your saved items will appear here.
              </p>
              <Button
                onClick={() => setLocation("/")}
                className="bg-primary hover:bg-blue-700 text-white gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
