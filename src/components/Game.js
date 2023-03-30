import { useState , useEffect} from 'react';
import ColorButton from './ColorButton'; 


function Game(){

    let randomNumber = Math.floor(Math.random()*4);

    const [colors, setColors] = useState([
        {id: 1, color: 'red', status: ""},
        {id: 2, color: 'blue', status: ""},
        {id: 3, color: 'green', status: ""},
        {id: 4, color: 'orange', status: ""},
    ])
    const [playing, setPlaying] = useState(false);
    const [sequence, setSequence] = useState([]);   
    const [randomSequence, setRandomSequence] = useState([]);
    const [highScore, setHighScore] = useState(0);
    const [score, setScore] = useState(0);

    function handleClick(id){
        if(playing){
            sequence.push(colors[id].color);
            if(sequence.length == randomSequence.length){
                if (JSON.stringify(sequence) != JSON.stringify(randomSequence)){
                    alert('Oh :( , press play to try again!');
                    setPlaying(false);
                    if (score > highScore) {
                        setHighScore(score);
                        alert("Wow! You got a new high score!🥳🥳 " + score + "!")
                    }
                    setScore(0);
                    setSequence([]);
                    setRandomSequence([]);
                }
                else {
                    setScore(randomSequence.length);
                    randomNumber = Math.floor(Math.random()*4);
                    randomSequence.push(colors[randomNumber].color);
                    setRandomSequence([...randomSequence]);
                    setSequence([]);
                }
            }
        }else{
            alert('you need to press play first!');
        }
        setColors([...colors]);
    }

    function handlePlay(){
        if (!playing) {
            for(var i = 0; i < 4; i++){
                randomSequence.push(colors[randomNumber].color);
                setRandomSequence([...randomSequence]);
                randomNumber = Math.floor(Math.random()*4);
            }
            setPlaying(true);
        }else{
            alert('already playing!');
        }
    }

    useEffect(() => {
        if (randomSequence.length > 0){
            const showSequence = (idx = 0) => {
                let itemIndex = colors.findIndex(item => item.color === randomSequence[idx]);
                setTimeout(() => {
                    colors[itemIndex].status = "active";
                    setColors([...colors]);
                    setTimeout(() => {
                        colors[itemIndex].status = "";
                        setColors([...colors]);
                        if (idx < randomSequence.length - 1) {
                            showSequence(idx + 1);
                        }
                    }, 250);
                }, 250);
            }
            showSequence();
        }
    }, [randomSequence]);

    return (
        <div className="main-container">
            <div className="colors-container">
                { colors.map((item, index) => ( 
                    <ColorButton key={index} item={item} id={index} handleClick={handleClick}/>
                ))  }
            </div>
            <div>
                <h1>High score: {highScore}</h1>
                <h2>score: {score}</h2>
            </div>
            <div className="button-container">
                <button className='button' onClick={() => handlePlay()}>Play</button>
            </div>
        </div>
    )
}

export default Game;