import 'server-only'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { getLog } from '@/app/actions'


import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function createLogSummary() {
  const logs = await getLog();

  if (!logs || logs.length === 0) {
    return "No prior interactions found.";
  }

  const summary = logs.map((log, index) => {
    const date = new Date(log.created_at).toLocaleDateString();
    const mood = log.mood;
    const sleep = log.sleep;

    // Parse JSON string fields
    const activities = log.activities ? JSON.parse(log.activities).join(", ") : "No activities";
    const emotionDescription = log.emotionDescription ? JSON.parse(log.emotionDescription).join(", ") : "No emotion description";
    const health = log.health ? JSON.parse(log.health).join(", ") : "No health status";
    const location = log.location ? JSON.parse(log.location).join(", ") : "No location";
    const peopleSeen = log.peopleSeen ? JSON.parse(log.peopleSeen).join(", ") : "No people seen";
    const weather = log.weather ? JSON.parse(log.weather).join(", ") : "No weather information";
    const comments = log.comments || "No comments";

    return `Entry ${index + 1} - Date: ${date}, Mood rating (1 to 10): ${mood}, Sleep rating (1 to 5): ${sleep} , Activities: ${activities}, Emotion: ${emotionDescription}, Health: ${health}, Location: ${location}, People Seen: ${peopleSeen}, Weather: ${weather}, Comments: ${comments}`;
  }).join("\n");

  return `Summary of prior user entries:\n${summary}`;
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore
  })

  const json = await req.json()
  const { previewToken } = json
  const logsummary = await createLogSummary()

  console.log(logsummary)

  const intitial = {
    role: 'system',
    content: `If questions is about statistics answer normally, otherwise Always phrase your answer in terms of flowers: the Rose is a positive thing, the Bud is a thing that will be good in the future, and a thorn is a negative thing. Step 1: The user will provide you with a text that includes information about their day or questions about their day. Make sure to read the whole entry carefully. Step 2: From each sentence, you will extract positive or negative impacts on the user’s quality of life. Make sure to store each of these positive or negative impacts in your memory. Step 3: When you are asked, you will provide a 2 paragraph summarized report of every single positive and negative influence on the user’s quality of life that you have stored. If the user includes a certain date in their request, make sure to limit your memory to only those dates or date.  Always encourage a person to do their work and achieve great things. Desired format: Number of Roses: <integer_of_positive_impacts> Number of Thorns: <integer_of_negative_impacts> Roses: <comma_seperated_list_of_positive_impacts> Thorns: <comma_seperated_list_of_negative_impacts> Positives: {text} Negatives: {text}  Advice: Give the user strictly one detailed plan for the next day that can improve their quality of life. In addition, here is a summary of past user interactions for you to reference \n${logsummary} Ask the user: “Do you have any questions?”`
  }
  const messages = [intitial, ...json.messages]

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const initialPrompt = {
    role: 'system', // This indicates it's a system message
    content: "be very very mean"
  };
  
  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      // console.log('helllooooo')
      const payload = {
        id,
        title,
        createdAt,
        path,
        messages: [initialPrompt,
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      // Insert chat into database.
      await supabase.from('chats').upsert({ id, payload }).throwOnError()
    }
  })

  return new StreamingTextResponse(stream)
}
