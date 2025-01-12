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
    <div className="flex flex-col flex-1 relative px-5 pt-5">
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
                          onChange={(e) => handleImageChange(e)}
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
                          onClick={() => handleRemoveImage()}
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
                <div className='flex gap-2'>
                  <div className='flex-1'>
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Price</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className='flex-1'>
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
                        src={(editingProduct?.imageUrl)}
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
                <div className='flex gap-2'>
                  <div className='flex-1'>
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Price</label>
                    <input
                      type="number"
                      value={editingProduct?.price || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className='flex-1'>
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

      <Modal isOpen={isDeleteModalOpen}>
        <div className="flex flex-col justify-start pt-10 px-[0.5rem] items-center w-screen h-screen overflow-y-auto bg-black/50 backdrop-blur-lg">

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the product "{productToDelete?.title}"?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex">
        <button onClick={() => setIsAddModalOpen(true)} className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add New Product
        </button>
      </div>
      <div className="bg-white gap-4 border border-gray-300 shadow rounded-lg">
        <div className="border-b border-gray-300 font-black p-4 rounded w-full grid grid-cols-5">
          <div className="col-span-2">Product Name</div>
          <div className="text-right">Unit Price</div>
          <div className="text-right">Stock Quantity</div>
          <div className="flex">
            <div className="ml-auto">Actions</div>
          </div>
        </div>
        {products.map((product) => (
          <div key={product._id} className="border-b border-gray-300 p-4 rounded w-full grid grid-cols-5">
            <div className="font-semibold col-span-2">{product.title}</div>
            <div className="text-right">${product.price.toFixed(2)}</div>
            <div className="text-right">Stock: {product.stockQuantity}</div>
            <div className="flex">
              <button
                onClick={() => handleEditProduct(product)}
                className="ml-auto mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;
