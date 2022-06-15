import { StyleSheet, View, Modal, Image, Pressable } from "react-native";

const ModalWindow = ({ img, toggleModal, closeModal }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={toggleModal}>
        <Pressable style={styles.centeredView} onPressOut={closeModal}>
          <View style={styles.modalView}>
            <Image style={styles.largImg} source={{ uri: img }} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  largImg: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
  modalView: {
    position: "relative",
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    opacity: 1,
  },
});
export default ModalWindow;
