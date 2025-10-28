// This file will house all services related to user notifications.

/**
 * Defines the different types of notifications available for each user role.
 * This can be used to configure user notification settings and to categorize
 * notifications within the system.
 */
export const NotificationSystem = {
  // Teacher Notifications
  teacher: [
    'assignment_submitted',
    'parent_message',
    'student_alert',
    'system_announcement'
  ],
  
  // Parent Notifications  
  parent: [
    'grade_posted',
    'attendance_alert', 
    'teacher_message',
    'payment_reminder'
  ],
  
  // Admin Notifications
  admin: [
    'system_alert',
    'user_report',
    'billing_notification',
    'compliance_reminder'
  ]
};

// In the future, this file could also contain functions for managing notifications,
// such as sending, fetching, and marking them as read.