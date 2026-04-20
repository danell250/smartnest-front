import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SiteFooter from "@/components/SiteFooter";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Star, ChevronRight, ShoppingCart, ChevronDown, Search, X, Heart, Check, ChevronsUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { catalogProducts } from "@/data/catalog";
import { useLocation } from "wouter";
import { toast } from "sonner";

/**
 * Products Page
 * Design Philosophy: Premium tech-forward aesthetic with clean minimalism
 * - Color: Professional blue (#0066cc) with white backgrounds
 * - Typography: Poppins for headlines, Sora for body
 * - Layout: Asymmetric sections with strategic whitespace
 * - Interactions: Smooth transitions and hover effects
 * - Brand: South African smart home cleaning platform
 */

export default function Products() {
  const { addToCart, getItemCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, getWishlistCount } = useWishlist();
  const [, setLocation] = useLocation();
  const itemCount = getItemCount();
  const wishlistCount = getWishlistCount();

  // Sorting and filtering state
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating" | "newest">("newest");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilterOpen, setBrandFilterOpen] = useState(false);

  // Get unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(catalogProducts.map((p) => p.brand))).sort();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = catalogProducts;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    // Apply brand filter
    if (selectedBrands.size > 0) {
      filtered = filtered.filter(p => selectedBrands.has(p.brand));
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.priceZAR - b.priceZAR);
        break;
      case "price-high":
        sorted.sort((a, b) => b.priceZAR - a.priceZAR);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Keep original order
        break;
    }

    return sorted;
  }, [sortBy, selectedBrands, searchQuery]);

  const toggleBrand = (brand: string) => {
    const newBrands = new Set(selectedBrands);
    if (newBrands.has(brand)) {
      newBrands.delete(brand);
    } else {
      newBrands.add(brand);
    }
    setSelectedBrands(newBrands);
  };

  const clearFilters = () => {
    setSelectedBrands(new Set());
    setSortBy("newest");
    setSearchQuery("");
  };

  const selectedBrandLabel =
    selectedBrands.size === 0
      ? "All brands"
      : selectedBrands.size === 1
        ? Array.from(selectedBrands)[0]
        : `${selectedBrands.size} brands selected`;

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
            <button
              onClick={() => setLocation("/")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => setLocation("/wishlist")}
              className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors"
              title="Wishlist"
            >
              <Heart className="w-6 h-6 text-foreground" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
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

      {/* Products Section */}
      <section className="py-12 bg-background">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Premium Robot Vacuum Collection</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked products with exact South African pricing. No hidden costs, no surprises. Each product includes 15% VAT.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name, brand, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters and Sorting - Compact Horizontal */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-border rounded-lg p-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-foreground whitespace-nowrap">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-foreground whitespace-nowrap">Brand:</label>
                <Popover open={brandFilterOpen} onOpenChange={setBrandFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-48 justify-between bg-white text-foreground hover:bg-white"
                    >
                      <span className="truncate">{selectedBrandLabel}</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search brands..." />
                      <CommandList>
                        <CommandEmpty>No brand found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="all-brands"
                            onSelect={() => {
                              setSelectedBrands(new Set());
                              setBrandFilterOpen(false);
                            }}
                          >
                            <Check className={`mr-2 h-4 w-4 ${selectedBrands.size === 0 ? "opacity-100" : "opacity-0"}`} />
                            All brands
                          </CommandItem>
                          {brands.map((brand) => (
                            <CommandItem
                              key={brand}
                              value={brand}
                              onSelect={() => {
                                toggleBrand(brand);
                              }}
                            >
                              <Check className={`mr-2 h-4 w-4 ${selectedBrands.has(brand) ? "opacity-100" : "opacity-0"}`} />
                              {brand}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Results count and Clear */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedProducts.length} products
              </p>
              {(selectedBrands.size > 0 || sortBy !== "newest" || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group" onClick={() => setLocation(`/product/${product.id}`)}>
                  <div className="relative overflow-hidden bg-muted aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-foreground px-2 py-1 rounded text-xs font-medium">
                      {product.brand}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current text-red-500" : "text-foreground"}`} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm hover:text-primary transition-colors">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>

                    <div className="space-y-1 mb-3 flex-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-1">
                          <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Price:</span>
                        <span className="text-lg font-bold text-primary">R{product.priceZAR.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Min: {product.minOrder}</p>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        toast.success(`${product.name} added to cart!`);
                      }}
                      className="w-full bg-primary hover:bg-blue-700 text-white mt-3"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No products match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-blue-700 font-medium mt-4"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
