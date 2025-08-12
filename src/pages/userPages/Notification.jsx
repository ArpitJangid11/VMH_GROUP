import React, { useState } from 'react';
import { FaArrowLeft, FaRegEye, FaTruck, FaCommentDots, FaGift, FaCheckDouble, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Dummy notifications (replace with real data)
const dummyNotifications = [
  {
    id: 1,
    message: "Your profile was viewed",
    time: "2 min ago",
    unread: true,
    type: "profile",
  },
  {
    id: 2,
    message: "Order #1723 shipped",
    time: "45 min ago",
    unread: false,
    type: "shipping",
  },
  {
    id: 3,
    message: "New message from Alice",
    time: "1 hour ago",
    unread: true,
    type: "message",
  },
  {
    id: 4,
    message: "Welcome to our platform!",
    time: "Yesterday",
    unread: false,
    type: "welcome",
  },
];

// Pick icon based on notification type
function getNotificationIcon(type) {
  switch (type) {
    case "profile":
      return <FaRegEye className="text-blue-400 text-lg mr-2" />;
    case "shipping":
      return <FaTruck className="text-green-400 text-lg mr-2" />;
    case "message":
      return <FaCommentDots className="text-purple-500 text-lg mr-2" />;
    case "welcome":
      return <FaGift className="text-yellow-500 text-lg mr-2" />;
    default:
      return null;
  }
}

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleBack = () => navigate(-1);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => setNotifications([]);

  return (
    <main className="min-h-screen flex justify-center py-12 px-2">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5">
        {/* Back button & Title */}
        <div className="relative mb-4">
          <button
            onClick={handleBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition"
            aria-label="Back"
          >
            <FaArrowLeft size={22} />
          </button>
          <h2 className="text-center text-3xl font-bold text-blue-600">
            Notification
          </h2>
        </div>
        {/* Action bar */}
        <div className="flex justify-end space-x-2 mb-3">
          <button
            className="flex items-center gap-2 transition-colors px-3 py-1 rounded text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={markAllAsRead}
            disabled={notifications.every(n => !n.unread)}
          >
            <FaCheckDouble />
            Mark all as read
          </button>
          <button
            className="flex items-center gap-2 transition-colors px-3 py-1 rounded text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <FaTrashAlt />
            Clear all
          </button>
        </div>
        {/* Notification list */}
        <ul className="flex-1 flex flex-col gap-3">
          {notifications.length === 0 ? (
            <li className="text-center text-gray-400 py-8">
              No notifications
            </li>
          ) : (
            notifications.map((note) => (
              <li
                key={note.id}
                className={`
                  group flex items-center justify-between p-4 rounded-lg 
                  transition-all cursor-pointer
                  ${note.unread
                    ? "bg-blue-50 hover:bg-blue-100 shadow-md"
                    : "bg-gray-100 hover:bg-blue-50"}
                  hover:scale-[1.015]
                  hover:shadow-lg
                  border border-transparent hover:border-blue-300
                `}
                tabIndex={0}
                aria-label={note.message}
              >
                <span
                  className={`
                    flex items-center truncate transition-colors
                    ${note.unread ? "font-semibold text-blue-800" : "text-gray-700"}
                    group-hover:text-blue-900
                  `}
                >
                  {getNotificationIcon(note.type)}
                  {note.message}
                  {note.unread && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" aria-label="unread" />
                  )}
                </span>
                <span className="text-xs text-gray-400 ml-3 whitespace-nowrap group-hover:text-blue-600 transition-colors">
                  {note.time}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
};

export default Notification;
