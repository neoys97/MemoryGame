import React, { useEffect, useState } from "react";
import { Flipper, Flipped } from 'react-flip-toolkit'
import styled from 'styled-components';
import CardComponent from "../components/CardComponent";

const Container = styled('div')`
    width: 100%;
    display: flex;
    algin-items: center;
    justify-content: center;
`

const MainContainer = styled(Flipper)`
    display: flex;
    flex-wrap: wrap;
    width: 800px;
`

const CardContainer = styled('div')`
    height: 100px;
    width: 150px;
    margin: 10px;
`

const MemoryGameView = props => {
    const [cards, setCards] = useState([]);
    const [selectedCardIdx, setSelectedCardIdx] = useState([]);

    const initialiseCards = async () => {
        for (let i = 0; i < 20; i ++) {
            let card = {
                identifier: i,
                flipped: true,
                correct: false
            }
            cards.push(card);
            setCards([...cards]);
        }
        await new Promise(r => setTimeout(r, 500));
        coverAllCards();
        await new Promise(r => setTimeout(r, 500));
        shuffleCard();
    }

    const coverAllCards = () => {
        for (let i = 0; i < 20; i ++) {
            if (cards[i].correct === false)
                cards[i].flipped = false;
        }
        setCards([...cards]);
    }

    const shuffleCard = () => {
        setCards([...cards.sort(() => Math.random() - 0.5)]);
    }

    const flipCard = (pos)=>{
        cards[pos].flipped = true;
        setCards([...cards]);
        selectedCardIdx.push(pos);
        setSelectedCardIdx([...selectedCardIdx]);
        if (selectedCardIdx.length >= 2) {
            checkCorrect();
        }
    };

    const checkCorrect = async () => {
        await new Promise(r => setTimeout(r, 500));

        if (selectedCardIdx.length > 2) {
            coverAllCards();
            return
        }
        
        if ((cards[selectedCardIdx[0]].identifier % 10) === (cards[selectedCardIdx[1]].identifier % 10)) {
            cards[selectedCardIdx[0]].correct = true;
            cards[selectedCardIdx[1]].correct = true;
            setCards([...cards]);
        }
        else {
            coverAllCards();
        }
        setSelectedCardIdx([]);
        setCards([...cards]);

        let win = true;
        for (let i = 0; i < 20; i ++) {
            if (cards[i].correct === false) {
                win = false;
            }
        }
        if (win) {
            await new Promise(r => setTimeout(r, 500));
            alert ("You win");
        }
    }

    useEffect(
        initialiseCards,[]
    );

    return (
        <Container>
            <MainContainer flipKey={JSON.stringify(...cards)}>
                {cards.map((val, idx)=>(
                        <Flipped flipId={"unique-"+val.identifier}>
                            <CardContainer>
                                <CardComponent  identifier={val.identifier%10} 
                                                front={val.flipped}
                                                correct={val.correct}
                                                flipCard={()=>{flipCard(idx)}}/>
                            </CardContainer>
                        </Flipped>
                    )
                )}
            </MainContainer>
        </Container>
    )
}

export default MemoryGameView;
