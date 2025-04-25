import React, { useState } from 'react';
import styles from './StoresPage.module.css';

interface Store {
  name: string;
  color: string;
  inn: string;
  businessPhone: string;
  telegram: string;
  whatsapp: string;
  addresses: string[];
  logo?: string;
  textLogo?: string;
}

type StoreState = 'empty' | 'creating' | 'viewing' | 'editing';
type FormStep = 'step1' | 'step2';

const StoresPage: React.FC = () => {
  const [currentState, setCurrentState] = useState<StoreState>('empty');
  const [store, setStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState<Store>({
    name: '',
    color: '',
    inn: '',
    businessPhone: '',
    telegram: '',
    whatsapp: '',
    addresses: [],
    logo: '',
    textLogo: '',
  });
  const [addressInputs, setAddressInputs] = useState<string[]>(['']);
  const [currentStep, setCurrentStep] = useState<FormStep>('step1');
  const [isTextLogoActive, setIsTextLogoActive] = useState(false);
  const [isFileLogoActive, setIsFileLogoActive] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInput = (name: string, value: string | undefined) => {
    if (value === undefined || value === '') {
      setErrors(prev => ({ ...prev, [name]: 'Поле обязательно для заполнения' }));
      return false;
    }

    let error = '';
    switch (name) {
      case 'name':
        if (/[А-Яа-яЁё]/.test(value)) {
          error = 'Русские буквы не допускаются, используйте английские';
        }
        break;
      case 'color':
        if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value)) {
          error = 'Введите HEX-код (#FFF или #FFFFFF)';
        }
        break;
      case 'inn':
        if (!/^\d{10}$|^\d{12}$/.test(value)) {
          error = 'ИНН должен содержать 10 или 12 цифр';
        }
        break;
      case 'businessPhone':
        if (!/^\+?\d+$/.test(value)) {
          error = 'Только цифры, может начинаться с +';
        } else {
          const digitCount = value.startsWith('+') ? value.length - 1 : value.length;
          if (digitCount < 10 || digitCount > 12) {
            error = 'Номер телефона должен содержать 10–12 цифр';
          }
        }
        break;
      case 'telegram':
      case 'whatsapp':
        if (!/^\d+$/.test(value)) {
          error = 'Только цифры';
        } else if (value.length < 10 || value.length > 12) {
          error = 'Номер должен содержать 10–12 цифр';
        }
        break;
      case 'logo':
      case 'textLogo':
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const validateAddresses = (addresses: string[]) => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    addresses.forEach((address, index) => {
      if (!address) {
        newErrors[`address${index}`] = 'Поле обязательно для заполнения';
        isValid = false;
      } else {
        newErrors[`address${index}`] = '';
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleAddressInputChange = (index: number, value: string) => {
    const newAddressInputs = [...addressInputs];
    newAddressInputs[index] = value;
    setAddressInputs(newAddressInputs);
    validateAddresses(newAddressInputs);
  };

  const handleAddAddress = () => {
    setAddressInputs(prev => [...prev, '']);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let cleanedValue = value;
    switch (name) {
      case 'name':
        cleanedValue = value;
        break;
      case 'color':
        cleanedValue = value;
        if (!cleanedValue.startsWith('#')) {
          cleanedValue = '#' + cleanedValue;
        }
        cleanedValue = cleanedValue.replace(/[^#0-9A-Fa-f]/g, '');
        if (cleanedValue.length > 9) {
          cleanedValue = cleanedValue.slice(0, 9);
        }
        break;
      case 'inn':
        cleanedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'businessPhone':
        cleanedValue = value.replace(/[^0-9+]/g, '');
        if (cleanedValue.startsWith('+') && cleanedValue.indexOf('+', 1) !== -1) {
          cleanedValue = '+' + cleanedValue.slice(1).replace(/\+/g, '');
        }
        break;
      case 'telegram':
      case 'whatsapp':
        cleanedValue = value.replace(/[^0-9]/g, '');
        break;
      default:
        break;
    }

    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
    validateInput(name, cleanedValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'image/png') {
        alert('Пожалуйста, загрузите файл в формате PNG.');
        e.target.value = '';
        return;
      }
      const logoUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logo: logoUrl, textLogo: '' }));
      setIsFileLogoActive(true);
      setIsTextLogoActive(false);
      validateInput('logo', logoUrl);
    }
  };

  const handleTextLogoToggle = () => {
    setIsTextLogoActive(true);
    setIsFileLogoActive(false);
    setFormData(prev => ({ ...prev, logo: '', textLogo: prev.name }));
    validateInput('textLogo', formData.name);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldsToValidate = ['name', 'color', 'inn'] as const;
    let isValid = true;
    fieldsToValidate.forEach(field => {
      const value = formData[field];
      if (typeof value === 'string' || value === undefined) {
        if (!validateInput(field, value)) {
          isValid = false;
        }
      }
    });
    if (!validateAddresses(addressInputs)) {
      isValid = false;
    }
    if (isValid) {
      setFormData(prev => ({ ...prev, addresses: addressInputs }));
      setCurrentStep('step2');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldsToValidate = ['businessPhone', 'telegram', 'whatsapp'] as const;
    let isValid = true;
    fieldsToValidate.forEach(field => {
      const value = formData[field];
      if (typeof value === 'string' || value === undefined) {
        if (!validateInput(field, value)) {
          isValid = false;
        }
      }
    });
    if (isValid) {
      setStore(formData);
      setCurrentState('viewing');
    }
  };

  const handleEdit = () => {
    if (store) {
      setFormData(store);
      setAddressInputs(store.addresses.length > 0 ? store.addresses : ['']);
      setCurrentState('editing');
      setCurrentStep('step1');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldsToValidate = ['name', 'color', 'inn', 'businessPhone', 'telegram', 'whatsapp'] as const;
    let isValid = true;
    fieldsToValidate.forEach(field => {
      const value = formData[field];
      if (typeof value === 'string' || value === undefined) {
        if (!validateInput(field, value)) {
          isValid = false;
        }
      }
    });
    if (!validateAddresses(formData.addresses)) {
      isValid = false;
    }
    if (isValid) {
      setStore(formData);
      setCurrentState('viewing');
    }
  };

  const handleDelete = () => {
    setStore(null);
    setCurrentState('empty');
    setFormData({
      name: '',
      color: '',
      inn: '',
      businessPhone: '',
      telegram: '',
      whatsapp: '',
      addresses: [],
      logo: '',
      textLogo: '',
    });
    setAddressInputs(['']);
    setErrors({});
  };

  const renderStep1 = (isEditing: boolean) => (
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleNextStep}>
          <h2>{isEditing ? 'Редактирование магазина' : 'Создание магазина'}</h2>

          <div className={styles.formGroup}>
            <input
                type="text"
                name="name"
                placeholder="Название на английском"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? styles.inputError : ''}
                required
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <input
                type="text"
                name="color"
                placeholder="#FFFFFF"
                value={formData.color}
                onChange={handleInputChange}
                className={errors.color ? styles.inputError : ''}
                pattern="#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})"
                required
            />
            {errors.color && <p className={styles.error}>{errors.color}</p>}
          </div>

          <div className={styles.formGroup}>
            <input
                type="text"
                name="inn"
                placeholder="ИНН"
                value={formData.inn}
                onChange={handleInputChange}
                className={errors.inn ? styles.inputError : ''}
                pattern="\d{10}|\d{12}"
                required
            />
            {errors.inn && <p className={styles.error}>{errors.inn}</p>}
          </div>

          {addressInputs.map((address, index) => (
              <div key={index} className={styles.addressGroup}>
                <input
                    type="text"
                    name={`address${index}`}
                    placeholder="Адрес точки продаж"
                    value={address}
                    onChange={(e) => handleAddressInputChange(index, e.target.value)}
                    className={errors[`address${index}`] ? styles.inputError : ''}
                    required
                />
                {errors[`address${index}`] && <p className={styles.error}>{errors[`address${index}`]}</p>}
                {index === addressInputs.length - 1 && (
                    <button
                        type="button"
                        onClick={handleAddAddress}
                        className={styles.addAddressButton}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                )}
              </div>
          ))}

          <div className={styles.buttonGroup}>
            <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setCurrentState(isEditing ? 'viewing' : 'empty')}
            >
              Отмена
            </button>
            <button type="submit" className={styles.button}>
              Далее
            </button>
          </div>
        </form>
      </div>
  );

  const renderStep2 = (isEditing: boolean) => (
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={isEditing ? handleSave : handleCreate}>
          <h2>{isEditing ? 'Редактирование магазина' : 'Создание магазина'}</h2>

          <div className={styles.formGroup}>
            <input
                type="tel"
                name="businessPhone"
                placeholder="Рабочий номер телефона"
                value={formData.businessPhone}
                onChange={handleInputChange}
                className={errors.businessPhone ? styles.inputError : ''}
                pattern="\+?\d{10,12}"
                required
            />
            {errors.businessPhone && <p className={styles.error}>{errors.businessPhone}</p>}
          </div>

          <div className={styles.formGroup}>
            <input
                type="text"
                name="telegram"
                placeholder="Номер Telegram"
                value={formData.telegram}
                onChange={handleInputChange}
                className={errors.telegram ? styles.inputError : ''}
                pattern="\d{10,12}"
                required
            />
            {errors.telegram && <p className={styles.error}>{errors.telegram}</p>}
          </div>

          <div className={styles.formGroup}>
            <input
                type="text"
                name="whatsapp"
                placeholder="Номер WhatsApp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className={errors.whatsapp ? styles.inputError : ''}
                pattern="\d{10,12}"
                required
            />
            {errors.whatsapp && <p className={styles.error}>{errors.whatsapp}</p>}
          </div>

          <div className={styles.logoButtonGroup}>
            <button
                type="button"
                className={`${styles.logoButton} ${isTextLogoActive ? styles.activeButton : ''}`}
                onClick={handleTextLogoToggle}
            >
              Использовать название, как логотип
            </button>
            <label
                htmlFor="logoUpload"
                className={`${styles.logoButton} ${isFileLogoActive ? styles.activeButton : ''}`}
            >
              Загрузить логотип
            </label>
            <input
                id="logoUpload"
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <p className={styles.uploadHint}>Изображение в формате PNG без фона.</p>
          </div>

          <div className={styles.buttonGroup}>
            <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setCurrentStep('step1')}
            >
              Назад
            </button>
            <button type="submit" className={styles.button}>
              {isEditing ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
  );

  const renderForm = (isEditing: boolean) => {
    if (currentStep === 'step1') {
      return renderStep1(isEditing);
    }
    return renderStep2(isEditing);
  };

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
              <th>Логотип</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{store.name}</td>
              <td>{storeLink}</td>
              <td>{store.color}</td>
              <td>
                {store.textLogo ? (
                    <span className={styles.textLogo}>{store.textLogo}</span>
                ) : store.logo ? (
                    <img src={store.logo} alt="Store Logo" className={styles.logoImage} />
                ) : (
                    'Нет логотипа'
                )}
              </td>
              <td className={styles.actionsCell}>
                <button className={styles.actionButton}>Открыть</button>
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
