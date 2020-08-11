import React from "react";
import Icon from "./components/Icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { Card, CardBody, Row, Col, Container, Button } from "reactstrap";
import { useState } from "react";

const itemArray = new Array(3);

var i;
for (i = 0; i < 3; i++) {
  itemArray[i] = new Array(3).fill("empty");
}

export default function App() {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [drawCounter, setDrawCounter] = useState(0);

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    setDrawCounter(0);
    var j;
    for (j = 0; j < 3; j++) {
      itemArray[j].fill("empty", 0, 3);
    }
  };

  const checkIsWinner = () => {
    let k;
    for (k = 0; k < 3; k++) {
      if (
        itemArray[k][0] === itemArray[k][1] &&
        itemArray[k][0] === itemArray[k][2] &&
        itemArray[k][0] !== "empty"
      ) {
        setWinMessage(`${itemArray[k][0]} wins`);
      }
    }
    for (k = 0; k < 3; k++) {
      if (
        itemArray[0][k] === itemArray[1][k] &&
        itemArray[0][k] === itemArray[2][k] &&
        itemArray[0][k] !== "empty"
      ) {
        setWinMessage(`${itemArray[0][k]} wins`);
      }
    }

    if (
      itemArray[0][0] === itemArray[1][1] &&
      itemArray[0][0] === itemArray[2][2] &&
      itemArray[0][0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0][0]} wins`);
    }

    if (
      itemArray[0][2] === itemArray[1][1] &&
      itemArray[0][2] === itemArray[2][0] &&
      itemArray[0][2] !== "empty"
    ) {
      setWinMessage(`${itemArray[0][2]} wins`);
    }
  };

  const changeItem = (itemNumberrow, itemNumbercol) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }
    if (itemArray[itemNumberrow][itemNumbercol] === "empty") {
      itemArray[itemNumberrow][itemNumbercol] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
      setDrawCounter(drawCounter + 1);
    } else {
      return toast("already filled!", { type: "error" });
    }
    checkIsWinner();
  };
  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage && (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-center text-uppercase">
                {winMessage}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Restart the game
              </Button>
            </div>
          )}
          {drawCounter === 9 && !winMessage && (
            <div className="mb-2 mt-2">
              <h1 className="text-center text-info">Match Drawn</h1>
              <Button color="success" block onClick={reloadGame}>
                Restart the game
              </Button>
            </div>
          )}
          {drawCounter !== 9 && !winMessage && (
            <h1 className="text-center text-warning">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((itemr, indexr) => {
              return itemr.map((itemc, indexy) => (
                <Card
                  color={isCross ? "info" : "success"}
                  onClick={() => changeItem(indexr, indexy)}
                >
                  <CardBody className="box">
                    <Icon name={itemc} />
                  </CardBody>
                </Card>
              ));
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
