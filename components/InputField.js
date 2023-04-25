import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "@react-native-material/core";

export default function InputField({
  label,
  icon,
  inputType,
  value,
  onChangeText,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 10,
        marginBottom: 10,
      }}
    >
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
