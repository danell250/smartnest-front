import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SiteFooter from "@/components/SiteFooter";
import { Star, Zap, Droplet, MapPin, Smartphone, ArrowRight, ChevronLeft, ChevronRight, Shield, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { catalogProducts } from "@/data/catalog";

/**
 * SmartNest SA Home Page
 * Design Philosophy: Premium tech-forward aesthetic with clean minimalism
 * - Color: Professional blue (#0066cc) with white backgrounds
 * - Typography: Poppins for headlines, Sora for body
 * - Layout: Asymmetric sections with strategic whitespace
 * - Interactions: Smooth transitions and hover effects
 * - Brand: South African smart home cleaning platform
 */

export default function Home() {
  const [, setLocation] = useLocation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  
  // Slideshow logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = catalogProducts.slice(0, 5).map(p => p.image || p.images?.[0] || '');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

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
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <button onClick={() => setLocation("/products")} className="text-foreground hover:text-primary transition-colors">Products</button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/cart")}
              className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            <Button onClick={() => setLocation("/products")} className="bg-primary hover:bg-blue-700 text-white">Browse Catalog</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Smart Cleaning for <span className="text-primary">South African</span> Homes
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover premium robot vacuum cleaners with clear Rand pricing, modern smart features, and dependable performance for everyday South African living.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setLocation("/products")}
                  className="bg-primary hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold gap-2"
                >
                  Browse Catalog <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </div>

            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src={heroImages[currentSlide]} 
                  alt="Premium Robot Vacuum"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {/* Navigation buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentSlide === idx ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-lg p-4 max-w-xs">
                <p className="font-semibold text-foreground mb-1">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over R10,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Why Choose SmartNest SA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a cleaner, smarter home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Smartphone,
                title: "Smart Control",
                description: "WiFi-enabled products with app control for modern customers"
              },
              {
                icon: Zap,
                title: "High Performance",
                description: "5500Pa+ suction power with advanced navigation technology"
              },
              {
                icon: Droplet,
                title: "Wet & Dry",
                description: "Multi-function vacuums that clean and mop simultaneously"
              },
              {
                icon: MapPin,
                title: "South African Pricing",
                description: "Exact Rand pricing with VAT included, no hidden costs"
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why SmartNest SA Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">A Store You Can Trust</h2>
              <p className="text-muted-foreground italic">"We're a small South African team dedicated to making smart cleaning accessible and reliable for every local household."</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">Secure Checkout</h4>
                <p className="text-sm text-muted-foreground">Pay securely online. Your data is always encrypted and protected.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">Local Support</h4>
                <p className="text-sm text-muted-foreground">Based in South Africa. Our local team is just a WhatsApp message away if you need help.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">Quality Guaranteed</h4>
                <p className="text-sm text-muted-foreground">We only source products with high reliability ratings and proven performance in SA homes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-blue-50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Loved in Homes Across South Africa</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from customers enjoying easier daily cleaning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Thabo Mthembu",
                location: "Johannesburg",
                text: "Ordered the Teendow D10S MAX and it arrived within 5 days. Setup was simple and it keeps our floors spotless during the week.",
                rating: 5
              },
              {
                name: "Nomsa Khumalo",
                location: "Cape Town",
                text: "The AIRROBO 5500Pa has been excellent for our home. It handles pet hair well and the app controls are easy to use.",
                rating: 5
              },
              {
                name: "David Chen",
                location: "Durban",
                text: "We wanted something reliable for daily cleaning and this has been a great upgrade. The mapping is accurate and the finish feels premium.",
                rating: 4.8
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Upgrade Your Home Cleaning?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Browse our premium robot vacuum collection and find the right fit for your space, routine, and budget.
            </p>
          </div>
          <Button 
            onClick={() => setLocation("/products")}
            className="bg-white text-primary hover:bg-blue-50 px-8 py-6 text-lg font-semibold gap-2"
          >
            View All Products <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
