'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getLog, getNotes } from '../actions'
import { createClient } from '@supabase/supabase-js'
import { createLog } from '../actions'

interface LogFormData {
  mood: number | null
  sleep: number | null
  comments: string
  peopleSeen: string[]
  weather: string[]
  activities: string[]
  health: string[]
  location: string[]
  emotionDescription: string[]
}

const RadioButton = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const dataStore: LogFormData[] = [] // Array to store submitted data
  const [mood, setMood] = useState<number | null>(null) // State for selected mood
  const [sleep, setSleep] = useState<number | null>(null) // State for selected mood
  const router = useRouter()
  const [datastuff, setDataStuff] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLog()
      console.log('Component received data:', data)
      setDataStuff(data)
    }
    fetchData()
  }, [])

  console.log('Current datastuff state:', datastuff)
  const handleMoodChange = (value: number) => {
    setMood(value)
  }
  const handleSleepChange = (value: number) => {
    setSleep(value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault() // Prevent page reload on submit

    if (formRef.current) {
      const formData = new FormData(formRef.current)

      // Build an object to store form data
      const entry: LogFormData = {
        mood: mood,
        sleep: sleep,
        comments: formData.get('comments')?.toString() || '',
        peopleSeen: formData.getAll('people-seen').map(String),
        weather: formData.getAll('weather').map(String),
        activities: formData.getAll('activities').map(String),
        health: formData.getAll('health').map(String),
        location: formData.getAll('location').map(String),
        emotionDescription: formData.getAll('emotion-description').map(String)
      }

      await createLog(entry)

      dataStore.push(entry) // Store the form data
      console.log('Submitted Data:', entry) // Log to verify the data structure

      router.push('/') // goes back to chat after submission
      formRef.current.reset() // resets options
      setMood(null)
    }
  }

    const getEmotionOptions = () => {
        if (mood === null) return [];

    if (mood >= 1 && mood <= 3) {
      return [
        'Frustrated',
        'Sad',
        'Disappointed',
        'Anxious',
        'Angry',
        'Tired',
        'Lonely'
      ]
    } else if (mood >= 4 && mood <= 6) {
      return [
        'Neutral',
        'Indifferent',
        'Content',
        'Confused',
        'Hopeful',
        'Bored'
      ]
    } else if (mood >= 7 && mood <= 10) {
      return [
        'Happy',
        'Pleased',
        'Excited',
        'Ecstatic',
        'Grateful',
        'Overjoyed',
        'Amazing'
      ]
    }
    return []
  }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div style={{ marginLeft: '50px' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '10px'}}> Your Daily Snapshot </h2>
                {/* mood */}
                <h3><b>1. Rate Your Mood (1 to 10):</b></h3>
                <div>
                    {Array.from({ length: 10 }, (_, index) => (
                        <label key={index + 1}>
                            <input
                                type="radio"
                                name="mood"
                                value={index + 1} // Set value from 1 to 10
                                onChange={() => handleMoodChange(index + 1)}
                            />
                            {index + 1} {/* Display the number */}
                        </label>
                    ))}
                </div>
                

                <br />
                {/* emotion-description */}
                <h3><b>2. What best describes your emotions?</b> </h3>
                <div>
                    {mood && (
                        <div>
                            {getEmotionOptions().map((emotion, index) => (
                                <label key={index}
                                style={{ display: "block"}} >
                                    <input type="checkbox" name="emotion-description" value={emotion} />
                                    {emotion}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
{/* </div> */}
                <br />
                {/* impact */}
                <h3><b> 3. What impacted you the most today?</b></h3>
                <div>
                    <label>
                        <input type="checkbox" name="impact" value="Physical Health" />
                        Physical Health 
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Mental Health" />
                        Mental Health 
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Fitness" />
                        Fitness
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Self-Care" />
                        Self-Care
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Hobbies" />
                        Hobbies
                    </label>
                    <br />
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Community" />
                        Community
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Family" />
                        Family
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Friends" />
                        Friends
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Partner/Dating" />
                        Partner/Dating
                    </label>
                    <br />
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Work" />
                        Work
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Education" />
                        Education
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Weather" />
                        Weather
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Current Events" />
                        Current Events
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Money" />
                        Money
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="impact" value="Other" />
                        Other: 
                        <input type="text" name="activities" placeholder="Other" />
                    </label>
                </div>
                

                <br />
                {/* sleep */}
                <h3><b>4. Rate Your Sleep (1 to 5)</b></h3>
                <div style={{ display: "flex", justifyContent: "left", gap: "20px" }}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <label key={index + 1}>
                            <input
                                type="radio"
                                name="sleep"
                                value={index + 1} // Set value from 1 to 10
                                onChange={() => handleSleepChange(index + 1)}
                            />
                            {index + 1} {/* Display the number */}
                        </label>
                    ))}
                </div>
                
                <br />
                {/* peopleSeen */}
                <h3><b>5. Who did you see today?</b></h3>
                <div style={{ display: "flex", justifyContent: "left", gap: "20px" }}>
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

                <br />
                {/* weather */}
                <h3><b>6. What was the weather like?</b></h3>
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
                    <br />
                    <label>
                        <input type="checkbox" name="weather" value="Cold" />
                        Cold
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="weather" value="Windy" />
                        Windy
                    </label>
                </div>

                <br />
                {/* activities */}
                <h3><b>7. What did you do today?</b></h3>
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

                <br />
                {/* health */}
                <h3><b>8. How is your health? </b></h3>
                <div>
                    <label>
                        <input type="checkbox" name="health" value="Healthy" />
                        Healthy
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="health" value="Sick :(" />
                        Sick
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="health" value="Recovering" />
                        Recovering
                    </label>
                </div>

                <br />
                {/* location */}
                <h3><b>9. Where did you go today?</b></h3>
                <div>
                    <label>
                        <input type="checkbox" name="location" value="Home" />
                        Home
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="location" value="Shopping Center" />
                        Shopping Center
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="location" value="Cafe" />
                        Cafe
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="location" value="School" />
                        School
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="location" value="Other" />
                        Other: 
                        <input type="text" name="activities" placeholder="Enter More Locations" />
                    </label>
                </div>

                <br />
                {/* comments */}
                <h3><b>10. Additional Comments: </b></h3>
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

                <br />
                <button type="submit" style={{
                    border: '2px solid #FFFFFF', // Set the border width, style, and color
                    padding: '10px 20px',       // Optional: Add padding for better appearance
                    backgroundColor: '#A52A2A',  // Optional: Set background color
                    color: '#FFFFFF',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
                }}><b>Submit</b></button>
                <br /><br /> 
            </div>
        </form>
    );
};

 export default RadioButton;