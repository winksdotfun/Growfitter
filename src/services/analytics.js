import { logAnalyticsEvent } from '../firebase';

export const AnalyticsEvents = {
  // Page Views
  PAGE_VIEW: 'page_view',
  
  // Spin Events
  SPIN_STARTED: 'spin_started',
  SPIN_COMPLETED: 'spin_completed',
  REWARD_CLAIMED: 'reward_claimed',
  
  // Button Clicks
  BUTTON_CLICK: 'button_click',
  
  // User Journey
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  
  // Authentication
  LOGIN_STARTED: 'login_started',
  LOGIN_COMPLETED: 'login_completed',
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  
  // Engagement
  SHARE_INITIATED: 'share_initiated',
  SHARE_COMPLETED: 'share_completed',
  
  // Error Events
  ERROR_OCCURRED: 'error_occurred'
};

// Analytics tracking functions
export const trackPageView = (pageName) => {
  logAnalyticsEvent(AnalyticsEvents.PAGE_VIEW, { page_name: pageName });
};

export const trackSpinEvent = (action, rewardType = null, rewardValue = null) => {
  const eventName = action === 'start' ? AnalyticsEvents.SPIN_STARTED : 
                    action === 'complete' ? AnalyticsEvents.SPIN_COMPLETED :
                    AnalyticsEvents.REWARD_CLAIMED;
  
  const params = {
    action,
    ...(rewardType && { reward_type: rewardType }),
    ...(rewardValue && { reward_value: rewardValue })
  };
  
  logAnalyticsEvent(eventName, params);
};

export const trackButtonClick = (buttonName, screenName) => {
  logAnalyticsEvent(AnalyticsEvents.BUTTON_CLICK, {
    button_name: buttonName,
    screen_name: screenName
  });
};

export const trackOnboarding = (step, isCompleted) => {
  const eventName = isCompleted ? 
    AnalyticsEvents.ONBOARDING_COMPLETED : 
    AnalyticsEvents.ONBOARDING_STARTED;
  
  logAnalyticsEvent(eventName, { step });
};

export const trackAuthentication = (action, method, isSuccess) => {
  const eventName = action === 'login' ? 
    (isSuccess ? AnalyticsEvents.LOGIN_COMPLETED : AnalyticsEvents.LOGIN_STARTED) :
    (isSuccess ? AnalyticsEvents.SIGNUP_COMPLETED : AnalyticsEvents.SIGNUP_STARTED);
  
  logAnalyticsEvent(eventName, { method, success: isSuccess });
};

export const trackShare = (platform, contentType, isCompleted) => {
  const eventName = isCompleted ? 
    AnalyticsEvents.SHARE_COMPLETED : 
    AnalyticsEvents.SHARE_INITIATED;
  
  logAnalyticsEvent(eventName, { platform, content_type: contentType });
};

export const trackError = (errorCode, errorMessage, componentName) => {
  logAnalyticsEvent(AnalyticsEvents.ERROR_OCCURRED, {
    error_code: errorCode,
    error_message: errorMessage,
    component: componentName
  });
};
