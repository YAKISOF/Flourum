import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации
import styles from './PolicyPage.module.css';

const PolicyPage: React.FC = () => {
    console.log('Rendering PolicyPage');
    return (
        <div className={styles.policyContainer}>
            <h1>Политика по обработке персональных данных</h1>
            <p>
                Запрашивать у Оператора информацию о составе и порядке обработки своих персональных данных;
            </p>
            <p>
                Требовать уточнения, блокирования или уничтожения персональных данных, если они устарели, недостоверны или получены незаконно;
            </p>
            <p>
                Отозвать согласие на обработку персональных данных в любой момент;
            </p>
            <p>
                Обращаться с жалобами в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор) или в суд.
            </p>
            <h2>6.2. Обязанности Пользователя:</h2>
            <p>Предоставлять достоверные и актуальные персональные данные;</p>
            <p>Сообщать Оператору об изменении данных, влияющих на исполнение договора (например, смена номера телефона или карты).</p>
            <h2>6.3. Обязанности Оператора:</h2>
            <p>Обеспечивать безопасность и конфиденциальность персональных данных;</p>
            <p>Предоставлять Пользователю информацию об обработке его данных по запросу в течение 30 дней;</p>
            <p>Прекращать обработку данных при отзыве согласия или по требованию закона;</p>
            <p>Уведомлять Пользователя об изменениях в Политике.</p>
            <h2>7. Меры по обеспечению безопасности персональных данных</h2>
            <h3>7.1. Оператор применяет следующие меры для защиты персональных данных:</h3>
            <p>Ограничение доступа к данным только уполномоченным лицам;</p>
            <p>Регулярное обновление программного обеспечения для предотвращения уязвимостей;</p>
            <p>Ведение учета операций с персональными данными.</p>
            <h3>7.2.</h3>
            <p>
                Оператор не несет ответственности за утрату данных, вызванную действиями третьих лиц (например, хакерскими атаками), если принял все разумные меры для их защиты.
            </p>
            <h2>8. Порядок отзыва согласия на обработку персональных данных</h2>
            <h3>8.1.</h3>
            <p>Пользователь вправе отозвать согласие на обработку персональных данных, направив письменное уведомление:</p>
            <p>По почте: 453837, Россия, Республика Башкортостан, г. Сибай, ул. Дзержинского, д. 29;</p>
            <p>По электронной почте: prometeysmm@gmail.com.</p>
            <h3>8.2.</h3>
            <p>Уведомление должно содержать ФИО, контактные данные и указание на отзыв согласия.</p>
            <h3>8.3.</h3>
            <p>
                После получения уведомления Оператор прекращает обработку персональных данных в течение 30 календарных дней, если иное не предусмотрено законодательством. Прекращение обработки может привести к невозможности дальнейшего использования услуг Сайта.
            </p>
            <h2>9. Заключительные положения</h2>
            <h3>9.1.</h3>
            <p>
                Настоящая Политика вступает в силу с момента её размещения на Сайте и действует бессрочно до замены новой редакцией.
            </p>
            <h3>9.2.</h3>
            <p>
                Все споры, связанные с обработкой персональных данных, разрешаются путем переговоров, а при недостижении согласия — в судебном порядке по месту регистрации Оператора (г. Сибай, Республика Башкортостан), если иное не предусмотрено законодательством РФ.
            </p>
            <h3>9.3.</h3>
            <p>
                В случае противоречия условий Политики нормам законодательства применяются нормы законодательства РФ.
            </p>
            <h2>10. Реквизиты Оператора</h2>
            <p>Индивидуальный предприниматель Семенов Илья Сергеевич</p>
            <p>ИНН: 026706792471</p>
            <p>ОГРНИП: 321028000159589</p>
            <p>Адрес: 453837, Россия, Республика Башкортостан, г. Сибай, ул. Дзержинского, д. 29</p>
            <p>Расчетный счет: 40802810200002645004</p>
            <p>Банк: АО «ТБанк»</p>
            <p>БИК: 044525974</p>
            <p>Email: prometeysmm@gmail.com</p>
            <p>Телефон: +7 (996) 404-76-12</p>

            {/* Добавляем ссылку для возврата на главную */}
            <div className={styles.backLinkContainer}>
                <Link to="/" className={styles.backLink}>Вернуться на главную</Link>
            </div>
        </div>
    );
};

export default PolicyPage;