import { useState, useEffect } from 'react';
const API_URL = '/api/notifications/';
export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setNotifications(data);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };
      fetchNotifications();
    }, []);
    return notifications;
  };
  
  export const fetchNotifications = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      return null;
    }
  };
  
  export const createNotification = async (message: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to create notification:", error);
      return null;
    }
  };
  