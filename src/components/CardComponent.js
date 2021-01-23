import React from "react";
import styled from 'styled-components';
import { ImQuestion, 
    ImHome, 
    ImPencil, 
    ImPlay,
    ImStack,
    ImPhone,
    ImTablet,
    ImTv,
    ImBubble,
    ImMeter,
    ImAirplane
} from "react-icons/im";

const Container = styled('div')`
    width: 100%;
    height: 100%;
`

const ContentContainer = styled('div')`
    width: 100%;
    height: 100%;
    transition: 0.6s;
    box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.4);
    border-radius: 10px;
	transform-style: preserve-3d;
    position: relative;
    transform: ${props => props.front ? "rotateY(0deg)" : "rotateY(180deg)" };
`

const Content = styled('div')`
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.4);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
	position: absolute;
	top: 0;
    left: 0;
`

const Front = styled(Content)`
    z-index: 2;
    transform: rotateY(0deg);
    background: ${props => (props.correct ? "PaleGreen" : "white")};
`

const Back = styled(Content)`
    transform: rotateY(180deg);
`

const iconSize = 50;

const CardComponent = props => {

    const getIcon = (identifier) => {
        switch (identifier){
            case 0:
                return (<ImHome size={iconSize}></ImHome>)
            case 1:
                return (<ImPencil size={iconSize}></ImPencil>)
            case 2:
                return (<ImPlay size={iconSize}></ImPlay>)
            case 3:
                return (<ImStack size={iconSize}></ImStack>)
            case 4:
                return (<ImPhone size={iconSize}></ImPhone>)
            case 5:
                return (<ImTablet size={iconSize}></ImTablet>)
            case 6:
                return (<ImTv size={iconSize}></ImTv>)
            case 7:
                return (<ImBubble size={iconSize}></ImBubble>)
            case 8:
                return (<ImMeter size={iconSize}></ImMeter>)
            case 9:
                return (<ImAirplane size={iconSize}></ImAirplane>)
            default:
                return (<div/>)
        }
    }

    return (
        <Container>
            <ContentContainer front={props.front} onClick={props.flipCard}>
                <Front correct={props.correct}>
                    {getIcon(props.identifier)}
                </Front>
                <Back>
                    <ImQuestion size={iconSize}></ImQuestion>
                </Back>
            </ContentContainer>
        </Container>
    )
}

export default CardComponent;