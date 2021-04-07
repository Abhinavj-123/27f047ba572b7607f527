import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Content, Button, Text, List, ListItem } from "native-base";
import { SvgUri } from "react-native-svg";
import ProgressBar from "../../service/ProgressBar";
import { ApiConfig } from "../../service/Api";

export interface Props {
  email: string;
}

const Detail: React.FC<Props> = (props) => {
  const route = useRoute();
  const [hideProgress, setHideProgress] = useState(true);
  const [data, setData] = useState("");

  React.useEffect(() => {
    const { data } = route.params;
    setData(data);
  }, []);

  const getWeather = (capital) => {
    setHideProgress(false);
    let url =
      "https://api.weatherstack.com/current?access_key=7cd7268a83ba54b21fcb4a1ee28c2056&query=" +
      capital;
    new ApiConfig()
      .getJSON(url.replace(/ /g, "%20"))
      .then((response) => {
        setHideProgress(true);
        if(response.data.error){
          if(response.data.error.code==105){
            alert(response.data.error.info)
          }
        }
        else{
          //Not Able to proceed to show the below data on a new page due to HTTP issue as in standard plan on http://api.weatherstack.com/, only http request
          console.log(response.data.current.temperature,response.data.current.weather_icons[0],response.data.current.wind_speed,response.data.current.precip)
        }
        console.log(response.data);
      })
      .catch((ERROR) => {
        setHideProgress(true);
        console.log(ERROR.response);
        alert("Weather not found");
      });
  };

  return (
    <List
      dataArray={data}
      renderRow={(item) => (
        <ListItem>
          <Content>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 5,
                color: "#000",
              }}
            >
              Capital ={" "}
              <Text style={{ fontWeight: "400" }}>{item.capital}</Text>
            </Text>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Population ={" "}
              <Text style={{ fontWeight: "400" }}>{item.population}</Text>
            </Text>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              latlng ={" "}
              <Text style={{ fontWeight: "400" }}>
                {item.latlng[0]} , {item.latlng[1]}
              </Text>
            </Text>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Flag = </Text>
            <SvgUri
              width="90%"
              height="150"
              style={{ alignSelf: "center", marginVertical: 10 }}
              uri={item.flag}
            />
            <Button
              style={{ marginVertical: 10 }}
              onPress={() => getWeather(item.capital)}
              block
            >
              <Text>Capital Weather</Text>
            </Button>
          </Content>
        </ListItem>
      )}
      keyExtractor={(item, index) => index.toString()}
    >
      <ProgressBar hide={hideProgress} />
    </List>
  );
};

export default Detail;
