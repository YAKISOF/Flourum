import { useState } from 'react';
import styles from './AdministratorsPage.module.css';

interface Administrator {
  telegramId: string;
}

export default function AdministratorsPage() {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [newTelegramId, setNewTelegramId] = useState('');

  const handleAddAdmin = () => {
    if (!newTelegramId.trim()) return;

    setAdministrators([...administrators, { telegramId: newTelegramId.trim() }]);
    setNewTelegramId('');
  };

  const handleDeleteAdmin = (telegramId: string) => {
    setAdministrators(administrators.filter(admin => admin.telegramId !== telegramId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAdmin();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTelegramId}
          onChange={(e) => setNewTelegramId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Новый Telegram ID"
          className={styles.input}
        />
        <button
          onClick={handleAddAdmin}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      {administrators.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Администраторов пока нет</h2>
          <p>Создавайте и управляйте администраторами в этом разделе</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Telegram ID для отправки сообщений ботом</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {administrators.map((admin) => (
                <tr key={admin.telegramId}>
                  <td>{admin.telegramId}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteAdmin(admin.telegramId)}
                      className={styles.deleteButton}
                    >
                      <img src="/trash.svg" alt="Delete" width="16" height="16" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
