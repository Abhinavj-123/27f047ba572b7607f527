import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Input,
  Content,
  Text,
  Form,
  Item,
  Label,
  Button,
} from "native-base";
import ProgressBar from "../../service/ProgressBar";
import { ApiConfig } from "../../service/Api";

const Welcome = (props: any) => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [hideProgress, setHideProgress] = useState(true);

  React.useEffect(() => {}, []);

  const navigateDetail = () => {
    setHideProgress(false);
    new ApiConfig()
      .getJSON("https://restcountries.eu/rest/v2/name/" + text)
      .then((response) => {
        setHideProgress(true);
        navigation.navigate("Detail", { data: response.data });
      })
      .catch((ERROR) => {
        setHideProgress(true);
        console.log(ERROR.response);
        alert("Country not found");
      });
  };

  return (
    <Container>
      <Content style={{ width: "90%", alignSelf: "center" }}>
        <Form style={{ marginTop: 10 }}>
          <Text style={{ marginVertical: 20 }}>
            Enter the country below to see the details :
          </Text>
          <Item floatingLabel>
            <Label>Enter country</Label>
            <Input
              value={text}
              placeholder="Enter country"
              onChangeText={(input) => {
                setText(input);
              }}
            />
          </Item>
        </Form>

        <Button
          style={{ marginVertical: 40 }}
          disabled={text.length > 0 ? false : true}
          onPress={() => navigateDetail()}
          block
        >
          <Text>Search</Text>
        </Button>

        <ProgressBar hide={hideProgress} />
      </Content>
    </Container>
  );
};

export default Welcome;
