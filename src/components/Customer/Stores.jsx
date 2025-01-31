import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';

const ShopsPage = () => {
  const HOST = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/api/factory/factories`);
        console.log("API Response:", response.data); // Debugging
        setShops(response.data || []); // Ensure it’s always an array
      } catch (error) {
        console.error("Error fetching shops:", error);
        setShops([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredShops = shops.filter(shop =>
    (shop.factoryName && shop.factoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (shop.address && shop.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleShopClick = (shopId) => {
    navigate(`/${shopId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <h1 className="text-2xl font-semibold">Discover Shops</h1>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-4 md:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full pl-10"
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Shops Grid */}
      <ScrollArea className="h-[calc(100vh-8rem)] px-4 md:px-6 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading shops...</p>
        ) : filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8">
            {filteredShops.map((shop) => (
              <Card
                key={shop._id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleShopClick(shop.factoryName)}
              >
                <img
                  src={shop.logo_url || "/placeholder.jpg"}
                  alt={shop.factoryName || "Shop"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{shop.factoryName || "Unnamed Shop"}</CardTitle>
                  <CardDescription>{shop.address || "No address available"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{shop.email || "No email provided"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No shops found.</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default ShopsPage;
