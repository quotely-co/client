import React, { useState } from 'react';

const QuotationBuilder = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customFees, setCustomFees] = useState({});

  // Sample product data structure
  const sampleProducts = [
    {
      id: 1,
      name: "Paper Cup",
      variants: [
        { size: "6oz", basePrice: 0.05, moq: 1000 },
        { size: "8oz", basePrice: 0.06, moq: 1000 },
        { size: "12oz", basePrice: 0.08, moq: 800 },
      ],
      customFees: [
        { name: "Plate Fee", defaultAmount: 50 },
        { name: "Print Fee", defaultAmount: 30 },
        { name: "Color Fee", defaultAmount: 20 },
      ],
      image: "/api/placeholder/200/200",
      description: "High-quality paper cups for hot and cold beverages",
      incrementSize: 100,
      cbmRates: [
        { minQuantity: 1000, cbm: 0.5 },
        { minQuantity: 5000, cbm: 2.0 },
        { minQuantity: 10000, cbm: 3.5 },
      ]
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const handleAddProduct = () => {
    if (!selectedProduct || !selectedVariant || quantity < selectedVariant.moq) {
      return;
    }

    const newProduct = {
      ...selectedProduct,
      variant: selectedVariant,
      quantity,
      fees: customFees[selectedProduct.id] || {},
      subtotal: calculateSubtotal(selectedVariant, quantity, customFees[selectedProduct.id] || {})
    };

    setSelectedProducts([...selectedProducts, newProduct]);
  };

  const calculateSubtotal = (variant, qty, fees) => {
    const baseTotal = variant.basePrice * qty;
    const feesTotal = Object.values(fees).reduce((sum, fee) => sum + fee, 0);
    return baseTotal + feesTotal;
  };

  return (
    <div className="p-4">
      <div className="section-heading mb-8">
        <h1 className="section-title">Create New Quotation</h1>
        <p className="section-description">Select products and customize your quotation</p>
      </div>

      <div className="card mb-8">
        {/* Product Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sampleProducts.map(product => (
            <div 
              key={product.id} 
              className="card cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-[22px] font-bold tracking-tight mb-2">{product.name}</h3>
              <p className="text-[#010d3e]">{product.description}</p>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="space-y-6">
            {/* Variant Selection */}
            <div className="flex gap-2">
              {selectedProduct.variants.map(variant => (
                <button
                  key={variant.size}
                  onClick={() => setSelectedVariant(variant)}
                  className={`btn ${selectedVariant?.size === variant.size ? 'btn-primary' : 'btn-text'}`}
                >
                  {variant.size}
                </button>
              ))}
            </div>

            {/* Quantity Input */}
            {selectedVariant && (
              <div>
                <label className="block text-[#010d3e] mb-2">
                  Quantity (MOQ: {selectedVariant.moq})
                </label>
                <div className="flex gap-2">
                  <button
                    className="btn btn-text"
                    onClick={() => setQuantity(Math.max(0, quantity - selectedProduct.incrementSize))}
                    disabled={quantity <= 0}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={selectedVariant.moq}
                    step={selectedProduct.incrementSize}
                    className="w-full rounded-lg border border-[#222]/10 px-3 py-2"
                  />
                  <button
                    className="btn btn-text"
                    onClick={() => setQuantity(quantity + selectedProduct.incrementSize)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Custom Fees */}
            {selectedVariant && (
              <div className="space-y-4">
                {selectedProduct.customFees.map(fee => (
                  <div key={fee.name} className="flex gap-4 items-center">
                    <label className="text-[#010d3e] w-24">{fee.name}</label>
                    <input
                      type="number"
                      defaultValue={fee.defaultAmount}
                      onChange={(e) => {
                        setCustomFees({
                          ...customFees,
                          [selectedProduct.id]: {
                            ...customFees[selectedProduct.id],
                            [fee.name]: Number(e.target.value)
                          }
                        });
                      }}
                      className="rounded-lg border border-[#222]/10 px-3 py-2"
                    />
                  </div>
                ))}
              </div>
            )}

            <button 
              onClick={handleAddProduct}
              disabled={!selectedVariant || quantity < selectedVariant.moq}
              className="btn btn-primary w-full"
            >
              Add to Quotation
            </button>
          </div>
        )}
      </div>

      {/* Selected Products Summary */}
      {selectedProducts.length > 0 && (
        <div className="card">
          <h2 className="text-[22px] font-bold tracking-tight mb-6">Quotation Summary</h2>
          <div className="space-y-4">
            {selectedProducts.map((product, index) => (
              <div key={index} className="border-b border-[#F1F1F1] pb-4">
                <h4 className="font-bold">{product.name} - {product.variant.size}</h4>
                <p className="text-[#010d3e]">Quantity: {product.quantity}</p>
                <p className="text-[#010d3e]">Subtotal: ${product.subtotal.toFixed(2)}</p>
              </div>
            ))}
            <div className="font-bold text-right text-[#010d3e]">
              Total: ${selectedProducts.reduce((sum, product) => sum + product.subtotal, 0).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationBuilder;