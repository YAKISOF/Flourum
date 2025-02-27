import React, { useState } from 'react';
import { SubscriptionBlock } from './SubscriptionBlock';
import { SubscriptionState } from '../../types/subscription';

export const ProfileSubscription: React.FC = () => {
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>(SubscriptionState.INITIAL);
  const [email, setEmail] = useState<string>(''); // Локальное состояние для email

  const handleEmailSubmit = async (email: string) => {
    // Здесь вы бы обычно делали API-запрос для валидации/сохранения email
    console.log('Email submitted:', email);
    setEmail(email); // Обновляем локальное состояние email
  };

  const handleCancel = async () => {
    // Здесь вы бы обычно делали API-запрос для отмены подписки
    try {
      // Пример API-запроса:
      // await api.cancelSubscription();
      console.log('Subscription cancelled');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  return (
      <SubscriptionBlock
          currentState={subscriptionState}
          email={email} // Передаём email, если он нужен
          onStateChange={setSubscriptionState}
          onEmailSubmit={handleEmailSubmit}
          onCancel={handleCancel}
      />
  );
};