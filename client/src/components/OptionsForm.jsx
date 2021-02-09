import React, { useContext, useState } from 'react';
import ProductContext from './ProductContext';

export default function OptionsForm() {
  const { options } = useContext(ProductContext);
  const [currentOption, setCurrentOption] = useState(0);
  const [currentSize, setCurrentSize] = useState(options[currentOption].sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const colorList = options.map((option, i) => {
    const className = (i === currentOption)
      ? 'options-color-selected'
      : 'options-color';

    const colorName = option.color_name;
    const colorVal = option.color_value;

    return (
      <li key={colorVal} className={className}>
        <input
          type="button"
          className="options-size-button"
          alt={colorName}
          onClick={() => {
            setCurrentOption(i);
            setCurrentSize(option.sizes[0]);
          }}
          style={{ backgroundColor: colorVal }}
        />
      </li>
    );
  });

  const sizeList = options[currentOption].sizes.map((size, i) => {
    const className = (options[currentOption].sizes[i] === currentSize)
      ? 'options-size-selected'
      : 'options-size';

    return (
      <li key={size} className={className}>
        <input
          type="button"
          className="options-size-button"
          alt={size}
          onClick={() => setCurrentSize(size)}
          value={size}
        />
      </li>
    );
  });

  function changeQuantity(val) {
    const newVal = Math.max(1, quantity + val);
    setQuantity(newVal);
  }

  return (
    <div className="options-container">
      <fieldset className="options-form-color">
        <span className="options-form-legend">Select Color:</span>
        <span className="options-form-legend-active">{options[currentOption].color_name}</span>
        <ul>
          {colorList}
        </ul>
      </fieldset>

      <fieldset className="options-form-size">
        <span className="options-form-legend">Select Size:</span>
        <span className="options-form-legend-active">{currentSize}</span>
        <ul>
          {sizeList}
        </ul>
      </fieldset>

      <fieldset className="options-form-quantity">
        <span className="options-form-legend">Quantity:</span>

        <button type="button" onClick={() => changeQuantity(-1)}>-</button>

        <input
          type="text"
          className="options-quantity"
          value={quantity}
          readOnly
        />

        <button type="button" onClick={() => changeQuantity(1)}>+</button>
      </fieldset>

      <button className="form-submit" type="submit">Add to cart</button>
    </div>
  );
}
