import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    stockQuantity: '',
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await client.get('/api/products/seller', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleRemoveImage = () => {
    setNewProduct({ ...newProduct, image: null });
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;
    try {
      const token = localStorage.getItem('token');
      await client.delete(`/api/products/${productToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== productToDelete._id));
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    }
  };

  const confirmDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('stockQuantity', newProduct.stockQuantity);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await client.post('/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts([...products, response.data]);
      setIsAddModalOpen(false);
      setNewProduct({
        title: '',
        description: '',
        price: '',
        stockQuantity: '',
        image: null,
      });
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editingProduct.title);
    formData.append('description', editingProduct.description);
    formData.append('price', editingProduct.price);
    formData.append('stockQuantity', editingProduct.stockQuantity);

    try {
      const token = localStorage.getItem('token');
      const response = await client.put(`/api/products/${editingProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts(products.map((product) => (product._id === editingProduct._id ? response.data : product)));
      setIsEditModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to update product. Please try again.');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-gray-800">Your Products</h2>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add New Product
              </button>
            </div>
          </div>

          {/* Table Container with responsive scrolling */}
          <div className="mt-4 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              src={product.imageUrl || 'https://via.placeholder.com/150'}
                              alt={product.title}
                              className="h-16 w-16 object-cover rounded-md"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.stockQuantity}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {product.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-yellow-600 hover:text-yellow-900 bg-yellow-100 px-3 py-1 rounded transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDeleteProduct(product)}
                              className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Keep the existing Modal components */}
        {/* Add Modal */}
      <Modal isOpen={isAddModalOpen}>
        <div className="flex flex-col justify-start pt-10 px-[0.5rem] items-center w-screen h-screen overflow-y-auto bg-black/50 backdrop-blur-lg">
          <div className="flex">
            <div className="flex md:min-w-[40rem] flex-col w-full rounded-[1.25rem] px-[1rem] pb-[2.2rem] bg-white">
              <div onClick={() => setIsAddModalOpen(false)} className="cursor-pointer mt-[0.69rem] ml-auto">
                x
              </div>
              <div className="text-2xl px-4 font-black text-blue-600">Add Product</div>
              <form onSubmit={handleAddProduct} className="space-y-6 mt-6 px-4">
                <div>
                  <div className="flex">
                    {!newProduct.image ? (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center cursor-pointer"
                        onClick={() => document.getElementById('image-input').click()}
                      >
                        <div>Add image</div>
                        <input
                          id="image-input"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src={URL.createObjectURL(newProduct.image)}
                          alt="Preview"
                          className="w-24 h-24 object-cover mb-4 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500 text-xs font-extrabold hover:text-red-600"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-semibold text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Price</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      value={newProduct.stockQuantity}
                      onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-semibold text-gray-700">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-white bg-blue-500 hover:bg-blue-600 mt-4"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen}>
        <div className="flex flex-col justify-start pt-10 px-[0.5rem] items-center w-screen h-screen overflow-y-auto bg-black/50 backdrop-blur-lg">
          <div className="flex">
            <div className="flex md:min-w-[40rem] flex-col w-full rounded-[1.25rem] px-[1rem] pb-[2.2rem] bg-white">
              <div onClick={() => setIsEditModalOpen(false)} className="cursor-pointer mt-[0.69rem] ml-auto">
                x
              </div>
              <div className="text-2xl px-4 font-black text-blue-600">Edit Product</div>
              <form onSubmit={handleUpdateProduct} className="space-y-6 mt-6 px-4">
                <div>
                  <div className="flex">
                    <div className="flex flex-col items-center">
                      <img
                        src={editingProduct?.imageUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover mb-4 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-semibold text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editingProduct?.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Price</label>
                    <input
                      type="number"
                      value={editingProduct?.price || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      value={editingProduct?.stockQuantity || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-semibold text-gray-700">Description</label>
                  <textarea
                    value={editingProduct?.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-white bg-blue-500 hover:bg-blue-600 mt-4"
                >
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteProduct}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;