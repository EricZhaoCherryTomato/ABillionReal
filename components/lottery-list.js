import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Tts from 'react-native-tts';

export default class LotteryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      DrawResults: [],
    };
  }

  componentDidMount() {
    this.fetchLott();
    Tts.speak('Hello, world!');
  }
  fetchLott = () => {
    const productIds = ['OzLotto', 'MonWedLotto', 'Powerball'];

    return fetch(
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
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        this.setState({DrawResults: data.DrawResults});
        // console.log(this.state.DrawResults);
      })
      .catch((error) => {
        // console.error('Error:', error);
      });
  };
  render() {
    console.log(this.state.DrawResults[0]);

    return (
      <>
        {this.state.DrawResults.map((DrawResult) => (
          <>
            <Text>{DrawResult.ProductId}</Text>
            <Text>{DrawResult.DrawLogoUrl}</Text>
            <Text>{DrawResult.DrawDate}</Text>
            <Text>{DrawResult.DrawNumber}</Text>
            <Text>{DrawResult.Dividends[0].BlocDividend}</Text>
            <Image
              style={styles.logo}
              source={{
                uri:
                  'http://media.tatts.com/TattsServices/Lotto/Products/Powerball_v1.png',
              }}
            />
          </>
        ))}
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  logo: {
    width: 66,
    height: 58,
  },
});
