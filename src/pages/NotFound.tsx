import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Page Not Found | DreamDestination"
        description="The page you are looking for does not exist or has been moved."
        canonicalUrl="/"
        noIndex
      />
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto space-y-6 animate-fade-in">
          <p className="text-7xl md:text-8xl font-black text-primary/20">404</p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Try
            going back to the homepage.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
