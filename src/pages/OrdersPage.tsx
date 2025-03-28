import React from 'react';
import styles from './OrdersPage.module.css';

const OrdersPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Заказы</h2>
            {/* Добавляем поле поиска и кнопку "Начать" */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Поиск по заказам"
                    className={styles.searchInput}
                />
                <button className={styles.startButton}>Начать</button>
            </div>
            {/* Добавляем заголовки таблицы */}
            <div className={styles.tableHeader}>
                <div className={styles.tableHeaderItem}>Все заказы</div>
                <div className={styles.tableHeaderItem}>ФИО</div>
                <div className={styles.tableHeaderItem}>Телефон</div>
                <div className={styles.tableHeaderItem}>Дата</div>
                <div className={styles.tableHeaderItem}>Адрес</div>
                <div className={styles.tableHeaderItem}>Статус оплаты</div>
            </div>
            {/* Сообщение о пустом состоянии */}
            <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>Заказов пока нет</p>
                <p className={styles.emptySubtitle}>Начинайте действовать ссылок на вашу витрину</p>
            </div>
        </div>
    );
};

export default OrdersPage;