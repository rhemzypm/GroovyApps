import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CheckoutProduct= () => {
  const handleBuy = () => {
    // Implementasikan logika pembelian sesuai dengan kebutuhan Anda
    // Misalnya, lakukan integrasi dengan sistem pembayaran atau lanjutkan ke halaman pembayaran

    // Tampilkan pesan atau aksi setelah pembelian berhasil
    console.log('Pembelian berhasil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Ini adalah deskripsi produk internet yang ingin Anda beli.
      </Text>
      <Button title="Beli" onPress={handleBuy} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CheckoutProduct;
