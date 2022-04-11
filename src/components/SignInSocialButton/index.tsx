import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

import {
    Container,
    ImageContainer,
    Title
} from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>;
}

export function SignInSocialButton({
    title,
    svg: SVG,
    ...rest
}: Props) {
    return (
        <Container {...rest}>
            <ImageContainer>
                <SVG />
            </ImageContainer>
            <Title>{title}</Title>
        </Container>
    );
};

