import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "@/styles";


const Input: React.FC<InputProps> = ({
  placeholder,
  keyboardType = 'default',
  onChangeText,
  value,
  error = false,
}) => {

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.neutral.light,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  input: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
  },
});