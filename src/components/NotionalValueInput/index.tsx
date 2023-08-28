import { CSSProperties, ChangeEvent, useState } from "react";
import { setNotionalValue } from "../../redux/actions";
import { useNotionalValue } from "../../hooks/useNotionalValue";
import { useTokenPair } from "../../hooks/useTokenPair";
import { Box } from "../Styled";
import { useTheme } from "../../hooks/useTheme";

const regex = new RegExp("(([0-9]+)?([.][0-9]*)?|[.][0-9]+)$");

const DecimalInput = () => {
  const notional = useNotionalValue();
  const pair = useTokenPair();
  const [inputValue, setInputValue] = useState(String(notional));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let targetValue = e.target.value;

    // remove undesirable chars
    targetValue = targetValue.replace(/[^0-9.]/g, "");

    if (/^0[0-9]$/.test(targetValue)) {
      // if 0123 make it 123
      targetValue = targetValue.slice(1);
    }

    if (targetValue[0] === ".") {
      // if .123 make it 0.123
      targetValue = "0" + targetValue;
    }

    if (regex.test(targetValue)) {
      setInputValue(targetValue);
      const maybeFloat = parseFloat(targetValue);
      const float = isNaN(maybeFloat) ? 0 : maybeFloat;
      setNotionalValue(float);
    }
  };

  const style: CSSProperties = {
    background: "transparent",
    border: "none",
    textAlign: "center",
    color: pair === undefined ? "grey" : "white",
    fontSize: "1em",
    width: "100%",
    height: "100%",
    outline: "none",
  };

  return (
    <input
      style={style}
      disabled={!pair}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export const NotionalValueInput = () => {
  const tokenPair = useTokenPair();
  const theme = useTheme();

  const style: CSSProperties = {
    height: "56px",
    borderRadius: "4px",
    position: "relative",
    outline: "none",
    border: "none",
    flex: "1 1 auto",
    backgroundColor: "rgb(20, 20, 81)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: theme.colors.text,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "18px",
  };

  const childStyle: CSSProperties = {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Box>
      <div style={{ minWidth: "130px", maxWidth: "132px" }}>Notional Value</div>
      <div style={style}>
        <div style={childStyle}>
          {tokenPair ? tokenPair.base.symbol : "Select pair"}
        </div>
        <div style={childStyle}>
          <DecimalInput />
        </div>
      </div>
    </Box>
  );
};
