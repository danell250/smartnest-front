import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";
import { useLocation } from "wouter";

export default function StoreAccountButton({
  variant = "ghost",
  className = "",
}: {
  variant?: "default" | "ghost" | "outline";
  className?: string;
}) {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  return (
    <Button
      variant={variant}
      onClick={() => setLocation("/account")}
      className={`gap-2 ${className}`.trim()}
    >
      <User className="w-4 h-4" />
      {isLoading ? "Account" : user ? "My Account" : "Sign In"}
    </Button>
  );
}
