import React, { useState } from 'react';
import styles from './AssortmentPage.module.css';
import plussIcon from '../assets/pluss.svg';
import shopIcon from '../assets/shop.svg';
import trashIcon from '../assets/trashW.svg';

interface Category {
  id: string;
  name: string;
  products?: string;
  image?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  composition: string;
  category: string;
  price: number;
  images?: string[];
  parameters?: { name: string; value: string }[];
}

interface NewProductForm {
  id?: string;
  name?: string;
  description?: string;
  composition?: string;
  category?: string;
  price?: string;
  images?: string[];
  inStock?: boolean;
}

interface NewCategoryForm {
  name?: string;
  products?: string;
  image?: string;
}

interface Parameter {
  name: string;
  value: string;
}

export const AssortmentPage: React.FC = () => {
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<NewProductForm>({ inStock: true });
  const [newCategory, setNewCategory] = useState<NewCategoryForm>({});
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [newParameter, setNewParameter] = useState<Parameter>({ name: '', value: '' });
  const [error, setError] = useState<string | null>(null);

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImages([e.target.files[0]]);
    }
  };

  const handleCategorySave = () => {
    if (!newCategory.name) {
      setError('Ошибка при сохранении. Укажите название категории');
      return;
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      products: newCategory.products || '',
      image: selectedImages.length > 0 ? URL.createObjectURL(selectedImages[0]) : undefined,
    };

    setCategories([...categories, category]);
    setNewCategory({});
    setSelectedImages([]);
    setIsCreatingCategory(false);
    setError(null);
  };

  const handleCategoryDelete = () => {
    setIsCreatingCategory(false);
    setNewCategory({});
    setSelectedImages([]);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const sanitizedValue = value.replace(/[^\d.,]/g, '');
      setNewProduct(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleParameterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewParameter(prev => ({ ...prev, [name]: value }));
  };

  const handleAddParameter = () => {
    if (!newParameter.name || !newParameter.value) {
      setError('Ошибка при добавлении параметра. Заполните название и значение');
      return;
    }

    setParameters(prev => [...prev, { name: newParameter.name, value: newParameter.value }]);
    setNewParameter({ name: '', value: '' });
    setError(null);
  };

  const handleDeleteParameter = (index: number) => {
    setParameters(prev => prev.filter((_, i) => i !== index));
  };

  const handleInStockToggle = () => {
    setNewProduct(prev => ({ ...prev, inStock: !prev.inStock }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalImages = selectedImages.length + newFiles.length;

      if (totalImages > 5) {
        setError('Можно загрузить не более 5 фотографий');
        return;
      }

      setSelectedImages(prev => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!newProduct.name || !newProduct.price) {
      setError('Ошибка при сохранении. Заполните название и цену');
      return;
    }

    if (selectedImages.length === 0) {
      setError('Ошибка при сохранении. Загрузите хотя бы одно фото');
      return;
    }

    const priceValue = parseFloat(newProduct.price.replace(',', '.'));
    if (isNaN(priceValue)) {
      setError('Ошибка при сохранении. Укажите корректную цену');
      return;
    }

    const product: Product = {
      id: isEditingProduct && newProduct.id ? newProduct.id : Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description || '',
      composition: newProduct.composition || '',
      category: newProduct.category || '',
      price: priceValue,
      images: selectedImages.map(file => URL.createObjectURL(file)),
      parameters: parameters,
    };

    if (isEditingProduct) {
      setProducts(products.map(p => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, product]);
    }

    setNewProduct({ inStock: true });
    setSelectedImages([]);
    setParameters([]);
    setNewParameter({ name: '', value: '' });
    setIsCreatingProduct(false);
    setIsEditingProduct(false);
    setError(null);
  };

  const handleDelete = () => {
    setIsCreatingProduct(false);
    setIsEditingProduct(false);
    setNewProduct({ inStock: true });
    setSelectedImages([]);
    setParameters([]);
    setNewParameter({ name: '', value: '' });
    setError(null);
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      composition: product.composition,
      category: product.category,
      price: product.price.toString(),
      images: product.images,
      inStock: true,
    });
    setParameters(product.parameters || []);
    setSelectedImages([]);
    setIsEditingProduct(true);
    setIsCreatingProduct(true);
  };

  if (isCreatingCategory) {
    return (
        <div className={styles.container}>
          <h2 className={styles.pageTitle}>Создание категории</h2>
          <div className={styles.form}>
            <h3 className={styles.formTitle}>Новая категория</h3>
            <input
                type="text"
                name="name"
                placeholder="Название категории"
                value={newCategory.name || ''}
                onChange={handleCategoryInputChange}
                className={styles.input}
            />
            <input
                type="text"
                name="products"
                placeholder="Товары"
                value={newCategory.products || ''}
                onChange={handleCategoryInputChange}
                className={styles.input}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleCategoryImageUpload}
                style={{ display: 'none' }}
                id="categoryImageUpload"
            />
            {selectedImages.length > 0 && (
                <div className={styles.previewImages}>
                  {selectedImages.map((image, index) => (
                      <div key={index} className={styles.previewImage}>
                        <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className={styles.removeImageButton}
                        >
                          ×
                        </button>
                      </div>
                  ))}
                </div>
            )}
            <div className={styles.buttonContainer}>
              <label htmlFor="categoryImageUpload" className={styles.uploadButton}>
                Загрузите фото
              </label>
              <div className={styles.actionButtons}>
                <button onClick={handleCategorySave} className={styles.saveButton}>
                  Сохранить
                </button>
                <button onClick={handleCategoryDelete} className={styles.deleteButton}>
                  Удалить
                </button>
              </div>
            </div>
            {error && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>×</span>
                  <span>{error}</span>
                </div>
            )}
          </div>
        </div>
    );
  }

  if (isCreatingProduct) {
    return (
        <div className={styles.container}>
          <h2 className={styles.pageTitle}>
            {isEditingProduct ? 'Редактирование товара' : 'Создание товара'}
          </h2>
          <div className={styles.form}>
            <h3 className={styles.formTitle}>
              {isEditingProduct ? 'Редактировать товар' : 'Новый товар'}
            </h3>
            <div className={styles.formColumns}>
              {/* Left Column: Form Fields */}
              <div className={styles.leftColumn}>
                <input
                    type="text"
                    name="name"
                    placeholder="Название"
                    value={newProduct.name || ''}
                    onChange={handleInputChange}
                    className={styles.inputName}
                />
                <textarea
                    name="description"
                    placeholder="Описание"
                    value={newProduct.description || ''}
                    onChange={handleInputChange}
                    className={styles.inputDescription}
                />
                <textarea
                    name="composition"
                    placeholder="Состав"
                    value={newProduct.composition || ''}
                    onChange={handleInputChange}
                    className={styles.inputComposition}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Категория"
                    value={newProduct.category || ''}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Цена"
                    value={newProduct.price || ''}
                    onChange={handleInputChange}
                    className={styles.input}
                />
              </div>
              {/* Right Column: In-Stock, Image Upload, Parameters */}
              <div className={styles.rightColumn}>
                <button
                    onClick={handleInStockToggle}
                    className={styles.inStockButton}
                >
                  {newProduct.inStock ? 'Товар в наличии' : 'Товар скрыт'}
                </button>
                <label htmlFor="imageUpload" className={styles.uploadButton}>
                  Загрузите до 5 фото
                </label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="imageUpload"
                />
                {selectedImages.length > 0 && (
                    <div className={styles.previewImages}>
                      {selectedImages.map((image, index) => (
                          <div key={index} className={styles.previewImage}>
                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className={styles.removeImageButton}
                            >
                              ×
                            </button>
                          </div>
                      ))}
                    </div>
                )}
                <div className={styles.parameterContainer}>
                  <div className={styles.parameterFieldsRow}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Название"
                        value={newParameter.name}
                        onChange={handleParameterInputChange}
                        className={styles.parameterNameInput}
                    />
                    <input
                        type="text"
                        name="value"
                        placeholder="Значение"
                        value={newParameter.value}
                        onChange={handleParameterInputChange}
                        className={styles.parameterValueInput}
                    />
                  </div>
                  <div className={styles.parameterButtonsRow}>
                    <button onClick={handleAddParameter} className={styles.addParamsButton}>
                      Добавить параметры товара
                    </button>
                    <button
                        onClick={() => handleDeleteParameter(parameters.length - 1)}
                        className={styles.deleteParamButton}
                        disabled={parameters.length === 0}
                    >
                      <img src={trashIcon} alt="Delete parameter" className={styles.trashIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons (Centered at the Bottom) */}
            <div className={styles.actionButtons}>
              <button onClick={handleSave} className={styles.saveButton}>
                Сохранить
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                Удалить
              </button>
            </div>
            {error && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>×</span>
                  <span>{error}</span>
                </div>
            )}
          </div>
        </div>
    );
  }

  return (
      <div className={styles.container}>
        {/* Секция категорий */}
        <div className={styles.section}>
          <h2 className={styles.pageTitle}>Категории</h2>
          {categories.length === 0 ? (
              <div className={styles.categoriesGrid}>
                <button
                    onClick={() => setIsCreatingCategory(true)}
                    className={styles.categoryCard}
                >
                  <div className={styles.hoverRectangle}></div>
                  <div className={styles.categoryImage}>
                    <img src={plussIcon} alt="Add category" className={styles.categoryIcon} />
                  </div>
                  <p className={styles.categoryName}>
                    Добавить<br />категорию
                  </p>
                </button>
              </div>
          ) : (
              <div className={styles.categoriesGrid}>
                {categories.map(category => (
                    <div key={category.id} className={styles.categoryCard}>
                      <div className={styles.hoverRectangle}></div>
                      <div className={styles.categoryImage}>
                        {category.image ? (
                            <img src={category.image} alt={category.name} />
                        ) : (
                            <span className={styles.categoryPlaceholder}>img</span>
                        )}
                      </div>
                      <p className={styles.categoryName}>{category.name}</p>
                    </div>
                ))}
              </div>
          )}
        </div>

        {/* Секция ассортимента */}
        <div className={styles.section}>
          <h2 className={styles.pageTitle}>Ассортимент</h2>
          {products.length === 0 ? (
              <div className={styles.productsGrid}>
                <div className={styles.productCard}>
                  <div className={styles.productImage}>
                    <div className={styles.productPlaceholder}>
                      <img src={shopIcon} alt="Add product" className={styles.productIcon} />
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <button
                        onClick={() => setIsCreatingProduct(true)}
                        className={styles.addProductButton}
                    >
                      + Добавить товар
                    </button>
                  </div>
                </div>
              </div>
          ) : (
              <div className={styles.productsGrid}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                      <div className={styles.productImage}>
                        {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} />
                        ) : (
                            <div className={styles.productPlaceholder}>
                              <img src={shopIcon} alt="Product placeholder" className={styles.productIcon} />
                            </div>
                        )}
                      </div>
                      <div className={styles.productInfo}>
                        <div className={styles.textInfo}>
                          <p className={styles.price}>{product.price} ₽</p>
                          <p className={styles.name}>{product.name}</p>
                        </div>
                        <button
                            onClick={() => handleEditProduct(product)}
                            className={styles.editButton}
                        >
                          Редактировать
                        </button>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default AssortmentPage;
