import React, { useState } from 'react';
import styles from './StoresPage.module.css';

interface Store {
  name: string;
  color: string;
  businessPhone: string;
  telegram: string;
  whatsapp: string;
  address: string;
  logo?: string;
}

type StoreState = 'empty' | 'creating' | 'viewing' | 'editing';

const StoresPage: React.FC = () => {
  const [currentState, setCurrentState] = useState<StoreState>('empty');
  const [store, setStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState<Store>({
    name: '',
    color: '',
    businessPhone: '',
    telegram: '',
    whatsapp: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setStore(formData);
    setCurrentState('viewing');
  };

  const handleEdit = () => {
    if (store) {
      setFormData(store);
      setCurrentState('editing');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStore(formData);
    setCurrentState('viewing');
  };

  const handleDelete = () => {
    setStore(null);
    setCurrentState('empty');
    setFormData({
      name: '',
      color: '',
      businessPhone: '',
      telegram: '',
      whatsapp: '',
      address: '',
    });
  };

  const renderForm = (isEditing: boolean) => (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={isEditing ? handleSave : handleCreate}>
        <h2>{isEditing ? 'Редактирование магазина' : 'Создание магазина'}</h2>
        
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Название на английском"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="color"
            placeholder="Выбор цвета"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel"
            name="businessPhone"
            placeholder="Рабочий номер телефона"
            value={formData.businessPhone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="telegram"
            placeholder="Номер Telegram"
            value={formData.telegram}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="whatsapp"
            placeholder="Номер WhatsApp"
            value={formData.whatsapp}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="address"
            placeholder="Адрес(а) точки продаж (описание)"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.uploadButton}>
          <button type="button" className={styles.secondaryButton}>
            Загрузить логотип
          </button>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setCurrentState(isEditing ? 'viewing' : 'empty')}
          >
            Отмена
          </button>
          <button type="submit" className={styles.button}>
            {isEditing ? 'Сохранить' : 'Создать'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <h1 className={styles.emptyStateTitle}>Магазина нет</h1>
      <p className={styles.createNowText}>Создайте его прямо сейчас</p>
      <button 
        className={styles.button}
        onClick={() => setCurrentState('creating')}
      >
        Создать магазин
      </button>
    </div>
  );

  const renderViewingState = () => {
    if (!store) return null;
    const storeLink = `${store.name.toLowerCase()}.forum.ru`;

    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Ссылка</th>
              <th>Цвет</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{store.name}</td>
              <td>{storeLink}</td>
              <td>
                <span className={styles.colorCell}>
                  {store.color}
                </span>
              </td>
              <td className={styles.actionsCell}>
                <button className={styles.actionButton}>
                  Открыть
                </button>
                <button className={styles.actionButton} onClick={handleEdit}>
                  Изменить
                </button>
                <button className={styles.actionButtonIcon} onClick={handleDelete}>
                  <span className={styles.trashIcon}>🗑</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {currentState === 'empty' && renderEmptyState()}
      {currentState === 'creating' && renderForm(false)}
      {currentState === 'viewing' && renderViewingState()}
      {currentState === 'editing' && renderForm(true)}
    </div>
  );
};

export default StoresPage;
