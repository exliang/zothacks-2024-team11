// export default function Log() {
//     return (
//         <div>
//             <h1>Daily Journal Entry</h1>
//         </div>
//     )
// }

const RadioButton = () => {
    return (
        <div>


            <h3>Rate Your Mood (1 to 10):</h3>
            <div>
                {Array.from({ length: 10 }, (_, index) => (
                    <label key={index + 1}>
                        <input
                            type="radio"
                            name="mood"
                            value={index + 1} // Set value from 1 to 10
                        />
                        {index + 1} {/* Display the number */}
                    </label>
                ))}
            </div>


            <h3>Additional Comments: </h3>
            <div>
                <textarea
                    id="comments"
                    name="comments" // Include name attribute for form access
                    placeholder="Enter your comments here..."
                    rows = {5}
                    cols = {33}
                    >
                </textarea>
            </div>


            <h3>Who did you see today?</h3>
            <div>
                <label>
                    <input type="checkbox" name="people-seen" value="Family" />
                    Family
                </label>
                <br />
                <label>
                    <input type="checkbox" name="people-seen" value="Friends" />
                    Friends
                </label>
                <br />
                <label>
                    <input type="checkbox" name="people-seen" value="Other" />
                    Other: 
                    <input type="text" name="other-person" placeholder="Enter Other" />
                </label>
            </div>


            <h3>What was the weather like?</h3>
            <div>
                <label>
                    <input type="checkbox" name="weather" value="Sunny" />
                    Sunny
                </label>
                <br />
                <label>
                    <input type="checkbox" name="weather" value="Cloudy" />
                    Cloudy
                </label>
                <br />
                <label>
                    <input type="checkbox" name="weather" value="Rainy" />
                    Rainy
                </label>
                <br />
                <label>
                    <input type="checkbox" name="weather" value="Hot" />
                    Hot
                </label>
            </div>

            <h3>What did you do today?</h3>
            <div>
                <label>
                    <input type="checkbox" name="activities" value="Exercised" />
                    Exercised
                </label>
                <br />
                <label>
                    <input type="checkbox" name="activities" value="Gamed" />
                    Gamed
                </label>
                <br />
                <label>
                    <input type="checkbox" name="activities" value="Movie" />
                    Movie
                </label>
                <br />
                <label>
                    <input type="checkbox" name="activities" value="Music" />
                    Music
                </label>
                <br />
                <label>
                    <input type="checkbox" name="activities" value="Other" />
                    Other: 
                    <input type="text" name="activities" placeholder="Enter More Activities" />
                </label>
            </div>

            
        </div>
    );
 };

 export default RadioButton;