import { TopHeader, NotificationCard } from '@/components';

const Notification = () => {
  return (
    <section className="flex flex-col gap-5">
      <TopHeader title="알림" isShowIcon />
      <main className="flex flex-col gap-5">
        <NotificationCard
          buddyName="최강두팔바보똥개1"
          notificationTime="2024-09-07 17:14:00"
        />
        <NotificationCard
          type="exchangeRequest"
          buddyName="최강두팔바보똥개2"
          notificationTime="2024-06-24 00:00:00"
        />
        <NotificationCard
          buddyName="최강두팔바보똥개3"
          notificationTime="2024-09-02 17:14:00"
        />
        <NotificationCard
          type="exchangeRequest"
          buddyName="최강두팔바보똥개4"
          notificationTime="2024-08-06 00:00:00"
        />
      </main>
    </section>
  );
};

export default Notification;
