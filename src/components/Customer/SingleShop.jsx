import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusIcon, MinusIcon, XIcon } from 'lucide-react';

const QuotationBuilder = () => {
  const navigate = useNavigate();
  const { shopName } = useParams();

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [factory, setFactory] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});  // Changed to object to track each product
  
  const HOST = import.meta.env.VITE_HOST_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFactory = async () => {
      try {

        const response = await axios.get(`${HOST}/api/factory?shopName=${shopName}`);
        if (response.data && response.data.length > 0) {
          setFactory(response.data[0]);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching factory:', error);
        navigate('/dashboard');
      }
    };
    fetchFactory();
  }, [shopName, navigate, HOST]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!factory || !factory._id) return;

      try {
        const response = await axios.get(`${HOST}/api/products?id=${factory._id}`);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [factory, HOST]);

  const [quotationDetails, setQuotationDetails] = useState({
    clientName: '',
    clientLogo: null,
    salesRep: '',
    notes: ''
  });

  const calculateProductTotal = (product) => {
    if (!product.selectedVariation) return 0;
    const baseAmount = product.quantity * product.selectedVariation.basePrice;
    const fees = product.fees?.reduce((sum, fee) => sum + fee.amount, 0) || 0;
    return baseAmount + fees;
  };

  const removeProductFromQuotation = (idx) => {
    setSelectedProducts((prev) => prev.filter((_, index) => index !== idx));
  };

  const calculateDiscount = (total) => {
    if (total > 10000) return 0.15;
    if (total > 5000) return 0.10;
    if (total > 2000) return 0.05;
    return 0;
  };

  const addProductToQuotation = (product, variation) => {
    const increment = product.increment || 1; // Add default increment value
    setSelectedProducts((prev) => [
      ...prev,
      {
        ...product,
        selectedVariation: variation,
        quantity: product.moq || 1,
        increment: increment
      }
    ]);
  };

  const toggleDescription = (productId) => {
    setIsExpanded(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const DownloadPDF = async () => {
    try {
      const response = await axios.post(
        `${HOST}/api/user/generate-pdf`,
        {
          factoryId: factory?._id,
          factoryName: factory?.name || "Unknown Factory",
          data: selectedProducts,
        },
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "quotation.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const calculateTotalAmount = () => {
    const total = selectedProducts.reduce((sum, product) => sum + calculateProductTotal(product), 0);
    const discount = calculateDiscount(total);
    return {
      total,
      discountAmount: total * discount,
      finalAmount: total - (total * discount)
    };
  };

  const { total, discountAmount, finalAmount } = calculateTotalAmount();

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
            Quotation Builder
          </h1>
          <button
            onClick={DownloadPDF}
            className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Download Quotation
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
          {/* Product Selection Panel */}
          <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold text-gray-700">Available Products</h2>
            <div className="space-y-4 sm:space-y-6">
              {products.map(product => (
                <div key={product._id} className="rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full sm:w-24 h-48 sm:h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {isExpanded[product._id]
                          ? product.description
                          : `${product.description?.slice(0, 100)}...`}
                      </p>
                      <button
                        className="mt-2 text-xs text-blue-500 hover:text-blue-600"
                        onClick={() => toggleDescription(product._id)}
                      >
                        {isExpanded[product._id] ? 'Read less' : 'Read more'}
                      </button>
                      <p className="mt-2 text-sm font-medium text-gray-700">
                        MOQ: {product.moq} units
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.variations?.map((variation, idx) => (
                          <button
                            key={idx}
                            onClick={() => addProductToQuotation(product, variation)}
                            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200"
                          >
                            Add {variation.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quotation Preview Panel */}
          <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md">
            <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
              <img
                src={factory?.logo_url}
                alt="Factory logo"
                className="h-12 w-auto"
              />
              <div className="text-center sm:text-right">
                <p className="font-semibold text-gray-800">{factory?.name || "Unknown Factory"}</p>
                <p className="text-sm text-gray-500">
                  Valid until: {new Date(Date.now() + 30 * 86400000).toLocaleDateString()}
                </p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Client Name"
              className="mb-6 w-full rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
              value={quotationDetails.clientName}
              onChange={(e) => setQuotationDetails(prev => ({ ...prev, clientName: e.target.value }))}
            />

            {selectedProducts.length > 0 ? (
              <div className="space-y-4">
                {selectedProducts.map((product, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {product.name} - {product.selectedVariation.size}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${product.selectedVariation.basePrice} per unit
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                          <button
                            className="rounded-md p-1 text-gray-700 hover:bg-gray-200"
                            onClick={() => {
                              const newProducts = [...selectedProducts];
                              newProducts[idx].quantity = Math.max(
                                product.moq,
                                product.quantity - (product.increment || 1)
                              );
                              setSelectedProducts(newProducts);
                            }}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium text-gray-800">
                            {product.quantity}
                          </span>
                          <button
                            className="rounded-md p-1 text-gray-700 hover:bg-gray-200"
                            onClick={() => {
                              const newProducts = [...selectedProducts];
                              newProducts[idx].quantity += product.increment || 1;
                              setSelectedProducts(newProducts);
                            }}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          className="rounded-lg bg-red-100 px-2 py-1.5 text-red-700 hover:bg-red-200 flex items-center gap-1"
                          onClick={() => removeProductFromQuotation(idx)}
                        >
                          <XIcon className="h-4 w-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-gray-500">
                No products added to the quotation yet.
              </div>
            )}

            <textarea
              placeholder="Additional Notes"
              className="mt-6 w-full rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none min-h-[100px]"
              value={quotationDetails.notes}
              onChange={(e) => setQuotationDetails(prev => ({ ...prev, notes: e.target.value }))}
            />

            {/* Summary Panel */}
            <div className="mt-6 border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="text-gray-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Discount:</span>
                <span className="text-gray-800">-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-800">Final Amount:</span>
                <span className="text-gray-800">${finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationBuilder;