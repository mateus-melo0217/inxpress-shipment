import Lottie from 'react-lottie-player'

interface PropTypes {
    animationData: any
    width: number
    height: number
}

/**
 * Render a lottie json file
 */
export const LottieCanvas = ({ animationData, width, height }: PropTypes) => {
    return (
        <Lottie
            loop={true}
            play={true}
            animationData={animationData}
            style={{ width: width, height: height }}
        />
    );
}