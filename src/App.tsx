import classNames from 'classnames';
import React from 'react';
import './App.scss';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const delicious:string[] = ['Appetizing', 'Flavorful', 'Fresh', 'Delish', 'Delectable', 'Tasteful', 'Tasty', 'Toothsome', 'Yummy', 'Flavorful'];

type State = {
  selectedGoods: string[],
};

class App extends React.Component<{}, State> {
  state = {
    selectedGoods: ['Jam'],
  };

  render() {
    const { selectedGoods } = this.state;

    return (
      <div className="App">
        <div className="productCards">
          {selectedGoods.length
            ? (
              <h1 className="productCards__cartContent">
                {selectedGoods.length > 1
                  ? `${selectedGoods.slice(0, -1).join(', ')} and ${selectedGoods[selectedGoods.length - 1]} are `
                  : (`${selectedGoods.join(', ')} is `)}

                selected

              </h1>
            )
            : <h1 className="productCards__cartContent">No goods selected</h1>}

          {selectedGoods.length > 0 && (
            <CloseButton
              type="button"
              className={classNames('button', 'button-close')}
              onClick={() => {
                this.setState({ selectedGoods: [] });
              }}
            />
          )}

          <p className="productCards__amount">
            Goods amount:
            {' '}
            {selectedGoods.length}
          </p>

          <div className="productCards__products">
            {goodsFromServer.map((el, i) => (
              <Card
                bg={el}
                key={el}
                style={{ width: '18rem' }}
                className={classNames(
                  'product',
                  'mb-2',
                  { product_selected: selectedGoods.includes(el) },
                )}
              >
                <Card.Body>
                  <Card.Title>{el}</Card.Title>

                  <Card.Text>
                    {delicious[i]}
                    {' '}
                    {el}
                  </Card.Text>

                  <Button
                    variant="outline-success"
                    className={classNames(
                      `${el.toLowerCase()}-button`,
                      'button',
                      { selected: selectedGoods.includes(el) },
                    )}
                    onClick={() => {
                      if (!selectedGoods.includes(el)) {
                        this.setState(prevState => (
                          { selectedGoods: [...prevState.selectedGoods, el] }));
                      } else {
                        this.setState(prevState => ({
                          selectedGoods: [...prevState.selectedGoods].filter(
                            product => product !== el,
                          ),
                        }));
                      }
                    }}
                  >
                    {!selectedGoods.includes(el)
                      ? 'Select'
                      : 'Remove'}
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
