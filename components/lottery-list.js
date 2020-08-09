import React, {useState, useEffect} from 'react';
import {Text, Image, FlatList, StyleSheet, View, Button} from 'react-native';

import Moment from 'moment';

import Tts from 'react-native-tts';

const LotteryList = () => {
  const [DrawResultslts, setDrawResultslts] = useState([]);
  const Separator = () => <View style={styles.separator} />;

  useEffect(() => {
    const getUsers = async () => {
      const productIds = ['OzLotto', 'MonWedLotto', 'Powerball'];
      const response = await fetch(
        'https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            CompanyId: 'Tattersalls',
            MaxDrawCountPerProduct: 1,
            OptionalProductFilter: productIds,
          }),
        },
      );
      const data = await response.json();
      setDrawResultslts(
        data.DrawResults.map((DrawResult) => ({
          id: DrawResult.ProductId,
          name: 'Lottery Name: ' + `${DrawResult.ProductId}`,
          DrawLogoUrl: DrawResult.DrawLogoUrl,
          DrawDate:
            'Lottery DrawDate: ' +
            `${Moment(DrawResult.DrawDate).format('d MMM')}`,
          DrawNumber: 'Lottery DrawNumber: ' + `${DrawResult.DrawNumber}`,
          Dividend:
            'First Dividend Amount: ' +
            `${DrawResult.Dividends[0].BlocDividend}`,
        })),
      );
    };

    getUsers();
  }, []);
  const ReadWinnerNumber = (num) => {
    Tts.speak(num);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={DrawResultslts}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.DrawDate}</Text>
            <Text>{item.DrawNumber}</Text>
            <Text>{item.Dividend}</Text>
            <Image
              style={styles.logo}
              source={{
                uri: item.DrawLogoUrl,
              }}
            />
            <Button
              onPress={() => ReadWinnerNumber(item.DrawNumber)}
              title="Press to Read Winner Number"
            />
            <Separator />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    fontSize: 18,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default LotteryList;
