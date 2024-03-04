import './Game.css';
import { useEffect, useState, useCallback } from 'react';

interface GuessLetterProps {
    letter: string;
};

const GuessLetter: React.FunctionComponent<GuessLetterProps> = (props: GuessLetterProps) => {
    const [currentLetter, setCurrentLetter] = useState<string>(' ');
    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        setAnimate(currentLetter == ' ' && props.letter != ' '); 
        setCurrentLetter(props.letter);
    }, [props.letter]);

    let classes = 'guess-letter';
    if (animate) {
        classes = classes + ' guess-letter-add-animation';
    }
    if (currentLetter != ' ') {
        classes = classes + ' guess-letter-filled';
    }
    return (
        <div className={classes}>
            <h1 className='eb-garamond-header' style={{ fontSize: '24px' }}>
                {currentLetter}
            </h1>
        </div>
    );
};

interface GuessRowProps {
    guess: string[];
    animate?: boolean;
};

const GuessRow: React.FunctionComponent<GuessRowProps> = (props: GuessRowProps) => {
    let classNames = 'guess-row';
    if (props.animate) {
        classNames = classNames + ' guess-row-animation-shake';
    }
    return (
        <div className={classNames}>
            <GuessLetter letter={props.guess[0]} />
            <GuessLetter letter={props.guess[1]} />
            <GuessLetter letter={props.guess[2]} />
            <GuessLetter letter={props.guess[3]} />
            <GuessLetter letter={props.guess[4]} />
        </div>
    )
}

export const Game = () => {
    const [guesses, setGuesses] = useState<string[][]>([
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ]);
    const [guessIndex, setGuessIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [shouldAnimateRow, setShouldAnimateRow] = useState<boolean[]>(Array<boolean>(6).fill(false));

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        let shouldAnimate = Array<boolean>(6).fill(false);

        console.log(event.key);
        if (charIndex < 5 && event.key >= 'a' && event.key <= 'z') {
            let guesses_copy: string[][] = [];
            for (let i = 0; i < 6; i++) {
                let guesses_subarray = [];
                for (let j = 0; j < 5; j++) {
                    guesses_subarray.push(guesses[i][j]);
                }
                guesses_copy.push(guesses_subarray);
            }

            guesses_copy[guessIndex][charIndex] = event.key.toUpperCase();
            setGuesses(guesses_copy);
            setCharIndex(charIndex + 1);
        } else if (charIndex > 0 && event.key === 'Backspace') {
            let guesses_copy: string[][] = [];
            for (let i = 0; i < 6; i++) {
                let guesses_subarray = [];
                for (let j = 0; j < 5; j++) {
                    guesses_subarray.push(guesses[i][j]);
                }
                guesses_copy.push(guesses_subarray);
            }

            guesses_copy[guessIndex][charIndex - 1] = ' ';
            setGuesses(guesses_copy);
            setCharIndex(charIndex - 1);
        } else if (event.key === 'Enter') {
            shouldAnimate[guessIndex] = true;
        }

        setShouldAnimateRow(shouldAnimate);
    }, [guesses, charIndex]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [charIndex]);

    return (
        <div style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                height: '82px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderBottom: '1px solid',
                    borderColor: '#d3d6da'
                }}>
                    <h1 className='eb-garamond-header' style={{ 
                        fontSize: '36px',
                        margin: '10px 0px'
                    }}>Wordle</h1>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {Array.from(Array(6).keys()).map((index: number) => {
                    return (
                        <GuessRow guess={guesses[index]} animate={shouldAnimateRow[index]} />
                    );
                })}
            </div>
        </div>
    );
}