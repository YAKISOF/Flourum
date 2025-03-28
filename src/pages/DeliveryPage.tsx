import React, { useState } from 'react';
import styles from './DeliveryPage.module.css';

const DeliveryPage: React.FC = () => {
    const [radiusEnabled, setRadiusEnabled] = useState(false);
    const [fixedEnabled, setFixedEnabled] = useState(false);
    const [yandexGoEnabled, setYandexGoEnabled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        const enabledCount = [radiusEnabled, fixedEnabled, yandexGoEnabled].filter(Boolean).length;
        if (enabledCount === 0) {
            setError('Ошибка при сохранении. Можно включить только один способ доставки');
        } else {
            setError(null);
            // Здесь можно добавить логику сохранения, если нужно
            console.log('Сохранение выполнено:', {
                radiusEnabled,
                fixedEnabled,
                yandexGoEnabled,
            });
        }
    };

    return (
        <div className={styles.container}>

            {/* Секция "Радиус" */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={radiusEnabled}
                            onChange={() => setRadiusEnabled(!radiusEnabled)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <h3 className={styles.sectionTitle}>Радиус</h3>
                </div>
                <p className={styles.sectionDescription}>
                    Расчёт стоимости доставки будет производить в зависимости от радиуса удаления клиента от точки продаж
                </p>
                <div className={styles.optionColumns}>
                    <div className={styles.optionColumn}>
                        <div className={styles.optionRow}>
                            <input
                                type="text"
                                placeholder="Радиус 1 км"
                                className={styles.optionInput}
                                disabled={!radiusEnabled}
                            />
                            <button
                                className={styles.changeButton}
                                disabled={!radiusEnabled}
                                onClick={handleSave}
                            >
                                Изменить
                            </button>
                        </div>
                        <div className={styles.optionRow}>
                            <input
                                type="text"
                                placeholder="Радиус 5 км"
                                className={styles.optionInput}
                                disabled={!radiusEnabled}
                            />
                            <button
                                className={styles.changeButton}
                                disabled={!radiusEnabled}
                                onClick={handleSave}
                            >
                                Изменить
                            </button>
                        </div>
                    </div>
                    <div className={styles.optionColumn}>
                        <div className={styles.optionRow}>
                            <input
                                type="text"
                                placeholder="Радиус 10 км"
                                className={styles.optionInput}
                                disabled={!radiusEnabled}
                            />
                            <button
                                className={styles.changeButton}
                                disabled={!radiusEnabled}
                                onClick={handleSave}
                            >
                                Изменить
                            </button>
                        </div>
                        <div className={styles.optionRow}>
                            <input
                                type="text"
                                placeholder="Радиус 20 км"
                                className={styles.optionInput}
                                disabled={!radiusEnabled}
                            />
                            <button
                                className={styles.changeButton}
                                disabled={!radiusEnabled}
                                onClick={handleSave}
                            >
                                Изменить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Секция "Фиксированная" */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={fixedEnabled}
                            onChange={() => setFixedEnabled(!fixedEnabled)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <h3 className={styles.sectionTitle}>Фиксированная</h3>
                </div>
                <p className={styles.sectionDescription}>
                    Стоимость доставки будет фиксирована
                </p>
                <div className={styles.optionRow}>
                    <input
                        type="text"
                        placeholder="Стоимость доставки"
                        className={styles.optionInput}
                        disabled={!fixedEnabled}
                    />
                    <button
                        className={styles.changeButton}
                        disabled={!fixedEnabled}
                        onClick={handleSave}
                    >
                        Изменить
                    </button>
                </div>
            </div>

            {/* Секция "Яндекс GO" */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={yandexGoEnabled}
                            onChange={() => setYandexGoEnabled(!yandexGoEnabled)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <h3 className={styles.sectionTitle}>Яндекс GO</h3>
                </div>
                <p className={styles.sectionDescription}>
                    Стоимость доставки будет динамично рассчитываться, исходя из текущей стоимости через приложение Яндекс GO (от двери до двери)
                </p>
            </div>

            {/* Кнопка "Сохранить" */}
            <button className={styles.saveButton} onClick={handleSave}>
                Сохранить
            </button>

            {/* Сообщение об ошибке */}
            {error && (
                <div className={styles.errorMessage}>
                    <span className={styles.errorText}>{error}</span>
                </div>
            )}
        </div>
    );
};

export default DeliveryPage;