import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const Gallery = ({
  data,
  choseImg,
  addTo,
  remove,
  download,
  screen,
}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableHighlight
          onPress={() => choseImg(index)}
          key={index}
          underlayColor={"none"}
        >
          <View style={styles.containerImg} key={index}>
            <Image
              key={index}
              style={styles.img}
              source={{
                uri: `${item.urls.small}`,
              }}
            />
            {screen === "GalleryScreen" ? (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={() => remove(index)}
                >
                  <MaterialCommunityIcons
                    name="delete-circle"
                    size={30}
                    color="grey"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={() => download(index)}
                >
                  <MaterialCommunityIcons
                    name="download-circle"
                    size={30}
                    color="#4169e1"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={() => addTo(index)}
                >
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={30}
                    color="#ff6347"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={() => download(index)}
                >
                  <MaterialCommunityIcons
                    name="download-circle"
                    size={30}
                    color="#4169e1"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  img: {
    width: 150,
    height: 150,
  },
  containerImg: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
