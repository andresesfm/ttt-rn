import { Alert, Platform } from "react-native";
interface CustomAlertProps {
  title: string;
  message: string;
  onPress: () => void;
}
export const CustomAlert = ({ title, message, onPress }: CustomAlertProps) => {
  if (Platform.OS === "web") {
    // For web, use a simple window.alert
    window.alert(`${title}: ${message}`);
  } else {
    // For native, use React Native's Alert
    Alert.alert(title, message, [{ text: "OK", onPress }]);
  }
};
