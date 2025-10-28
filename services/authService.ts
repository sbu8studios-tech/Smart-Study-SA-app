// This file is intended to house all authentication-related services,
// acting as a bridge between the UI and the backend API or native device features.

// --- Biometric Authentication Service ---

// In a real React Native / Expo application, you would use a library like 'expo-local-authentication'.
// Since we are in a web environment, we will simulate its behavior.
const mockLocalAuthentication = {
  async hasHardwareAsync(): Promise<boolean> {
    // Simulate that the device has biometric hardware.
    console.log("Checking for biometric hardware support... (Simulated)");
    return true;
  },
  async authenticateAsync(options: { promptMessage: string }): Promise<{ success: boolean }> {
    // Simulate a successful biometric scan after a short delay.
    console.log(`Showing biometric prompt: "${options.promptMessage}" (Simulated)`);
    return new Promise(resolve => {
        setTimeout(() => {
            const success = window.confirm("Simulating Biometric Scan: Do you want to approve authentication?");
            resolve({ success });
        }, 500);
    });
  }
};

/**
 * Service for handling Biometric Authentication (e.g., Face ID, Touch ID, Fingerprint).
 * This is a simulated service that mimics the API of a native biometrics library.
 */
export const BiometricAuth = {
  /**
   * Checks if the device has hardware support for biometrics.
   * @returns {Promise<boolean>} - True if supported, false otherwise.
   */
  isSupported: async (): Promise<boolean> => {
    return await mockLocalAuthentication.hasHardwareAsync();
  },
  
  /**
   * Attempts to authenticate the user via biometrics.
   * @returns {Promise<boolean>} - True if authentication is successful, false otherwise.
   */
  authenticate: async (): Promise<boolean> => {
    try {
        const result = await mockLocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to access SmartStudy SA',
        });
        return result.success;
    } catch (error) {
        console.error("Biometric authentication error (Simulated):", error);
        return false;
    }
  }
};